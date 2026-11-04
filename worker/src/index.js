/**
 * Impact Media GTA — contact form endpoint.
 *
 * Runs as a Cloudflare Worker on https://impactmediagroup.ca/api/contact.
 * Receives the website's contact form as JSON, validates it, filters bots,
 * and sends an instant push notification to the owner's phone via Pushover.
 *
 * Secrets (set through GitHub → Cloudflare, never committed):
 *   PUSHOVER_TOKEN    Pushover application API token
 *   PUSHOVER_USER     Pushover user key (who receives the push)
 *   TURNSTILE_SECRET  optional — Cloudflare Turnstile secret; when set,
 *                     every submission must carry a valid Turnstile token
 * Vars (wrangler.toml):
 *   ALLOWED_ORIGINS   comma-separated list of origins allowed to post
 */

export const LIMITS = {
  name: 120,
  email: 200,
  company: 200,
  projectType: 120,
  budget: 60,
  message: 3000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PUSHOVER_URL = 'https://api.pushover.net/1/messages.json';
const TURNSTILE_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

function allowedOrigins(env) {
  return String(env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
}

function corsHeaders(origin, env) {
  const headers = { Vary: 'Origin' };
  if (origin && allowedOrigins(env).includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Content-Type';
    headers['Access-Control-Max-Age'] = '86400';
  }
  return headers;
}

function json(body, status, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers },
  });
}

/** Trim every known field to a string within its length limit. */
export function clean(body) {
  const out = {};
  for (const [key, max] of Object.entries(LIMITS)) {
    const value = typeof body?.[key] === 'string' ? body[key] : '';
    out[key] = value.replace(/\s+$/g, '').trim().slice(0, max);
  }
  return out;
}

/** Returns the names of fields that are missing or malformed. */
export function validate(data) {
  const bad = [];
  if (!data.name) bad.push('name');
  if (!data.email || !EMAIL_RE.test(data.email)) bad.push('email');
  if (!data.message) bad.push('message');
  return bad;
}

/** Build the Pushover request fields for a lead. */
export function buildPush(data, env) {
  const title = `New lead: ${data.name}${data.company ? ` — ${data.company}` : ''}`;
  const lines = [
    data.projectType && `Wants: ${data.projectType}`,
    data.budget && `Budget: ${data.budget}`,
    `Email: ${data.email}`,
    '',
    data.message,
  ].filter((line) => line !== false && line !== undefined);
  // Pushover caps message bodies at 1024 characters.
  let message = lines.join('\n');
  if (message.length > 1024) message = `${message.slice(0, 1020)}…`;

  const subject = encodeURIComponent('Re: your Impact Media GTA inquiry');
  return new URLSearchParams({
    token: env.PUSHOVER_TOKEN,
    user: env.PUSHOVER_USER,
    title: title.slice(0, 250),
    message,
    url: `mailto:${data.email}?subject=${subject}`,
    url_title: `Reply to ${data.name}`.slice(0, 100),
    priority: '0',
    sound: 'cashregister',
  });
}

async function verifyTurnstile(token, ip, secret) {
  if (!token) return false;
  const form = new URLSearchParams({ secret, response: token });
  if (ip) form.set('remoteip', ip);
  const res = await fetch(TURNSTILE_URL, { method: 'POST', body: form });
  if (!res.ok) return false;
  const result = await res.json();
  return result.success === true;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');
    const cors = corsHeaders(origin, env);

    if (url.pathname !== '/api/contact') {
      return json({ error: 'Not found' }, 404, cors);
    }
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, { ...cors, Allow: 'POST, OPTIONS' });
    }
    // Only the website itself may post. Blocks drive-by scripts that
    // don't send an Origin header or send someone else's.
    if (!origin || !allowedOrigins(env).includes(origin)) {
      return json({ error: 'Forbidden' }, 403, cors);
    }

    // Per-visitor rate limit (Cloudflare Workers Rate Limiting binding, see
    // wrangler.toml): a few attempts per minute per IP, checked early so one
    // client can't hammer the endpoint.
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (env.IP_LIMITER) {
      const { success } = await env.IP_LIMITER.limit({ key: ip });
      if (!success) return json({ error: 'Too many requests' }, 429, { ...cors, 'Retry-After': '60' });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid request' }, 400, cors);
    }

    // Honeypot: a hidden field real visitors never fill. Pretend success so
    // bots don't learn they were caught.
    if (typeof body?.website === 'string' && body.website.trim() !== '') {
      return json({ ok: true }, 200, cors);
    }

    const data = clean(body);
    const invalid = validate(data);
    if (invalid.length > 0) {
      return json({ error: 'Invalid fields', fields: invalid }, 422, cors);
    }

    if (env.TURNSTILE_SECRET) {
      const ok = await verifyTurnstile(body.turnstileToken, ip, env.TURNSTILE_SECRET);
      if (!ok) return json({ error: 'Verification failed' }, 403, cors);
    }

    // Site-wide ceiling, counted only for verified submissions. Junk and
    // unverified requests are rejected above without touching this counter,
    // so nobody can fill it up to lock real visitors out of the form.
    if (env.GLOBAL_LIMITER) {
      const { success } = await env.GLOBAL_LIMITER.limit({ key: 'all' });
      if (!success) return json({ error: 'Too many requests' }, 429, { ...cors, 'Retry-After': '60' });
    }

    if (!env.PUSHOVER_TOKEN || !env.PUSHOVER_USER) {
      console.error('contact: Pushover secrets are not configured');
      return json({ error: 'Not configured' }, 500, cors);
    }

    const res = await fetch(PUSHOVER_URL, { method: 'POST', body: buildPush(data, env) });
    if (!res.ok) {
      console.error('contact: Pushover rejected the message', res.status, await res.text());
      return json({ error: 'Delivery failed' }, 502, cors);
    }

    return json({ ok: true }, 200, cors);
  },
};
