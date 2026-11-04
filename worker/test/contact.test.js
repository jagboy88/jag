import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import worker, { buildPush, clean, validate } from '../src/index.js';

const ORIGIN = 'https://impactmediagroup.ca';
const env = {
  ALLOWED_ORIGINS: 'https://impactmediagroup.ca,https://www.impactmediagroup.ca',
  PUSHOVER_TOKEN: 'test-token',
  PUSHOVER_USER: 'test-user',
};
const lead = {
  name: 'Sam Rivera',
  email: 'sam@riverareno.ca',
  company: 'Rivera Renovations',
  projectType: 'Full package (shoot + edit + social + ads)',
  budget: '$1.5k – $3k / mo',
  message: 'We do kitchens in Mississauga and want more leads from Instagram.',
  website: '',
};

let calls;
let realFetch;
beforeEach(() => {
  calls = [];
  realFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), body: init?.body?.toString() ?? '' });
    return new Response(JSON.stringify({ status: 1 }), { status: 200 });
  };
});
afterEach(() => {
  globalThis.fetch = realFetch;
});

const post = (body, headers = { Origin: ORIGIN }) =>
  worker.fetch(
    new Request('https://impactmediagroup.ca/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    }),
    env,
  );

test('valid lead sends one Pushover message and returns ok', async () => {
  const res = await post(lead);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://api.pushover.net/1/messages.json');
  const sent = new URLSearchParams(calls[0].body);
  assert.equal(sent.get('token'), 'test-token');
  assert.equal(sent.get('user'), 'test-user');
  assert.equal(sent.get('title'), 'New lead: Sam Rivera — Rivera Renovations');
  assert.match(sent.get('message'), /Budget: \$1\.5k – \$3k \/ mo/);
  assert.match(sent.get('url'), /^mailto:sam@riverareno\.ca\?subject=/);
});

test('honeypot submissions are accepted silently and not sent', async () => {
  const res = await post({ ...lead, website: 'http://spam.example' });
  assert.equal(res.status, 200);
  assert.equal(calls.length, 0);
});

test('missing or wrong Origin is rejected', async () => {
  assert.equal((await post(lead, {})).status, 403);
  assert.equal((await post(lead, { Origin: 'https://evil.example' })).status, 403);
  assert.equal(calls.length, 0);
});

test('invalid fields return 422 with the field names', async () => {
  const res = await post({ ...lead, email: 'not-an-email', message: '  ' });
  assert.equal(res.status, 422);
  assert.deepEqual((await res.json()).fields, ['email', 'message']);
  assert.equal(calls.length, 0);
});

test('malformed JSON returns 400', async () => {
  assert.equal((await post('{nope')).status, 400);
});

test('GET returns 405 and unknown paths return 404', async () => {
  const get = await worker.fetch(new Request('https://impactmediagroup.ca/api/contact'), env);
  assert.equal(get.status, 405);
  const other = await worker.fetch(new Request('https://impactmediagroup.ca/api/other'), env);
  assert.equal(other.status, 404);
});

test('missing Pushover secrets return 500 without calling out', async () => {
  const res = await worker.fetch(
    new Request('https://impactmediagroup.ca/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: ORIGIN },
      body: JSON.stringify(lead),
    }),
    { ALLOWED_ORIGINS: env.ALLOWED_ORIGINS },
  );
  assert.equal(res.status, 500);
  assert.equal(calls.length, 0);
});

test('Pushover failure returns 502', async () => {
  globalThis.fetch = async () => new Response('{"status":0}', { status: 400 });
  assert.equal((await post(lead)).status, 502);
});

test('Turnstile is enforced only when a secret is configured', async () => {
  globalThis.fetch = async (url) => {
    calls.push({ url: String(url) });
    if (String(url).includes('turnstile')) {
      return new Response(JSON.stringify({ success: false }), { status: 200 });
    }
    return new Response('{"status":1}', { status: 200 });
  };
  const res = await worker.fetch(
    new Request('https://impactmediagroup.ca/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: ORIGIN },
      body: JSON.stringify({ ...lead, turnstileToken: 'bad' }),
    }),
    { ...env, TURNSTILE_SECRET: 'secret' },
  );
  assert.equal(res.status, 403);
  assert.ok(!calls.some((c) => c.url.includes('pushover')));
});

test('rate limiters return 429 before anything is sent', async () => {
  const keys = [];
  const blockIp = { limit: async ({ key }) => (keys.push(key), { success: false }) };
  const allow = { limit: async () => ({ success: true }) };
  const req = () =>
    new Request('https://impactmediagroup.ca/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: ORIGIN, 'CF-Connecting-IP': '203.0.113.7' },
      body: JSON.stringify(lead),
    });

  const perIp = await worker.fetch(req(), { ...env, IP_LIMITER: blockIp, GLOBAL_LIMITER: allow });
  assert.equal(perIp.status, 429);
  assert.equal(perIp.headers.get('Retry-After'), '60');
  assert.deepEqual(keys, ['203.0.113.7']);

  const global = await worker.fetch(req(), { ...env, IP_LIMITER: allow, GLOBAL_LIMITER: { limit: async () => ({ success: false }) } });
  assert.equal(global.status, 429);

  const ok = await worker.fetch(req(), { ...env, IP_LIMITER: allow, GLOBAL_LIMITER: allow });
  assert.equal(ok.status, 200);
  assert.equal(calls.length, 1);
});

test('clean trims and truncates; validate flags bad fields', () => {
  const c = clean({ name: '  Ana  ', email: 'a@b.co', message: 'x'.repeat(5000), extra: 'ignored' });
  assert.equal(c.name, 'Ana');
  assert.equal(c.message.length, 3000);
  assert.equal(c.extra, undefined);
  assert.deepEqual(validate(c), []);
  assert.deepEqual(validate(clean({})), ['name', 'email', 'message']);
});

test('push body stays within Pushover limits', () => {
  const p = buildPush({ ...clean(lead), message: 'y'.repeat(3000) }, env);
  assert.ok(p.get('message').length <= 1024);
});
