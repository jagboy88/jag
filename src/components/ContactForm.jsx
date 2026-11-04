import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cta, site } from '../data/site.js';
import InstagramIcon from './icons/InstagramIcon.jsx';
import Turnstile from './Turnstile.jsx';

const projectTypes = [
  'Full package (shoot + edit + social + ads)',
  'Content shoot & editing',
  'Social media management',
  'Meta ads management',
  'Not sure yet',
];

const budgets = [
  'Under $1.5k / mo',
  '$1.5k – $3k / mo',
  '$3k – $6k / mo',
  '$6k+ / mo',
];

const initialForm = {
  name: '',
  email: '',
  company: '',
  projectType: projectTypes[0],
  budget: budgets[1],
  message: '',
  website: '', // honeypot — hidden from people, filled only by bots
};

const CONTACT_ENDPOINT = '/api/contact';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Returns { fieldName: message } for every invalid field. */
function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Enter your name.';
  if (!form.email.trim()) errors.email = 'Enter your email address.';
  else if (!EMAIL_RE.test(form.email.trim()))
    errors.email = 'Enter an email address in the format you@business.com.';
  if (!form.message.trim())
    errors.message = 'Tell us a little about your business.';
  return errors;
}

const fieldLabels = {
  name: 'Name',
  email: 'Email',
  message: 'Tell us about it',
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | verifying | submitting | sent | mailto | error | verify-failed
  const [checkVisible, setCheckVisible] = useState(false);
  const summaryRef = useRef(null);
  const turnstileRef = useRef(null);

  const errorKeys = Object.keys(errors);

  // After a failed submit, move focus to the error summary so keyboard and
  // screen-reader users land on it immediately.
  useEffect(() => {
    if (errorKeys.length > 0) summaryRef.current?.focus();
  }, [errorKeys.length]);

  const update = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear an inline error as soon as the field is corrected.
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  /** Last resort: hand the lead to the visitor's mail app. */
  const openMailto = (payload) => {
    const subject = encodeURIComponent(
      `New inquiry — ${payload.projectType} (${payload.name})`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Business: ${payload.company || '—'}`,
        `Looking for: ${payload.projectType}`,
        `Monthly budget: ${payload.budget}`,
        '',
        payload.message,
      ].join('\n'),
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  /**
   * Posts the lead to the Cloudflare Worker (worker/), which sends an
   * instant push notification. If the endpoint isn't reachable (not yet
   * deployed, or offline) falls back to the visitor's mail app so no lead
   * is lost. Returns 'sent' or 'mailto'; throws on a real server error.
   */
  const send = async (payload) => {
    let res = null;
    try {
      res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      res = null;
    }
    if (res?.ok) return 'sent';
    if (!res || res.status === 404 || res.status === 405) {
      openMailto(payload);
      return 'mailto';
    }
    throw new Error(`Contact endpoint returned ${res.status}`);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus('idle');
      return;
    }
    // 1. Security check runs only now, on submit. Most visitors pass
    //    automatically; some are asked to tick the box. Their answers stay
    //    in the form if it doesn't complete.
    setStatus('verifying');
    let turnstileToken;
    try {
      turnstileToken = await turnstileRef.current.run();
    } catch {
      setStatus('verify-failed');
      return;
    }

    // 2. Send the lead with the single-use token.
    setStatus('submitting');
    try {
      const outcome = await send({ ...form, turnstileToken });
      setStatus(outcome);
      setForm(initialForm);
    } catch {
      setStatus('error');
    }
  };

  const busy = status === 'verifying' || status === 'submitting';

  const describedBy = (field) =>
    errors[field] ? `${field}-error` : undefined;

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:px-10">
        {/* Left column */}
        <div className="lg:col-span-5">
          <h2 className="section-label mb-5 normal-case tracking-[0.25em]">
            Book a video content shoot in Toronto
          </h2>
          <p className="text-balance font-display text-5xl font-normal leading-none text-ivory md:text-7xl">
            Let&apos;s get you <span className="italic text-gold">on camera.</span>
          </p>
          <p className="mt-8 max-w-sm font-sans text-sm font-light leading-relaxed text-ivory/60">
            Tell us about your business and what you want more of — leads,
            bookings, followers. We&apos;ll map out a month of content for you,
            free, and reply within one business day.
          </p>

          <dl className="mt-12 space-y-6 border-t border-ivory/10 pt-8">
            <div>
              <dt className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold">
                Email
              </dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-touch items-center break-all font-display text-2xl text-ivory transition-colors hover:text-gold"
                >
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold">
                Instagram
              </dt>
              <dd className="mt-1">
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-touch items-center gap-3 font-display text-2xl text-ivory transition-colors hover:text-gold"
                >
                  <InstagramIcon className="h-5 w-5 text-gold" />
                  {site.instagram.handle}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold">
                Based in
              </dt>
              <dd className="mt-1 font-display text-2xl text-ivory">
                {site.region}
              </dd>
            </div>
          </dl>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="border border-gold/30 p-8 lg:col-span-7 lg:p-12"
          noValidate
        >
          {/* Honeypot: off-screen and skipped by keyboard and screen readers,
              so only bots fill it. The Worker drops any lead that does. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={update('website')}
            />
          </div>
          {/* Error summary — focusable, links to each invalid field */}
          {errorKeys.length > 0 && (
            <div
              ref={summaryRef}
              role="alert"
              tabIndex={-1}
              aria-labelledby="form-error-title"
              className="mb-10 border border-gold/60 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <p
                id="form-error-title"
                className="font-sans text-[0.65rem] uppercase tracking-luxe text-gold"
              >
                A few things need attention
              </p>
              <ul className="mt-3 space-y-2">
                {errorKeys.map((key) => (
                  <li key={key}>
                    <a
                      href={`#${key}`}
                      className="inline-flex min-h-[24px] items-center font-sans text-sm text-ivory underline decoration-gold/60 underline-offset-4 hover:decoration-gold"
                    >
                      {fieldLabels[key]}: {errors[key]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="min-w-0">
              <label
                htmlFor="name"
                className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold"
              >
                Name *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                autoComplete="name"
                value={form.name}
                onChange={update('name')}
                placeholder="Your full name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={describedBy('name')}
                className="input-luxe"
              />
              {errors.name && (
                <p id="name-error" className="field-error">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="min-w-0">
              <label
                htmlFor="email"
                className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold"
              >
                Email *
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={update('email')}
                placeholder="you@business.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={describedBy('email')}
                className="input-luxe"
              />
              {errors.email && (
                <p id="email-error" className="field-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="min-w-0 sm:col-span-2">
              <label
                htmlFor="company"
                className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold"
              >
                Business
              </label>
              <input
                id="company"
                type="text"
                name="company"
                autoComplete="organization"
                value={form.company}
                onChange={update('company')}
                placeholder="Business name and what you do"
                className="input-luxe"
              />
            </div>

            <div className="min-w-0">
              <label
                htmlFor="projectType"
                className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold"
              >
                What you need
              </label>
              <select
                id="projectType"
                name="projectType"
                value={form.projectType}
                onChange={update('projectType')}
                className="input-luxe min-h-touch min-w-0 max-w-full cursor-pointer appearance-none truncate bg-jet"
              >
                {projectTypes.map((type) => (
                  <option key={type} value={type} className="bg-jet text-ivory">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <fieldset className="min-w-0">
              <legend className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold">
                Monthly budget
              </legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {budgets.map((b) => {
                  const selected = form.budget === b;
                  return (
                    <label
                      key={b}
                      className={`inline-flex min-h-touch cursor-pointer items-center border px-3 font-sans text-[0.65rem] uppercase tracking-wider transition-all duration-300 ${
                        selected
                          ? 'border-gold bg-gold text-jet'
                          : 'border-ivory/20 text-ivory/80 hover:border-gold hover:text-gold'
                      }`}
                    >
                      <input
                        type="radio"
                        name="budget"
                        value={b}
                        checked={selected}
                        onChange={update('budget')}
                        className="sr-only"
                      />
                      {b}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="min-w-0 sm:col-span-2">
              <label
                htmlFor="message"
                className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold"
              >
                Tell us about it *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={update('message')}
                placeholder="Your location, current socials, and what you'd like to see happen…"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={describedBy('message')}
                className="input-luxe resize-none"
              />
              {errors.message && (
                <p id="message-error" className="field-error">
                  {errors.message}
                </p>
              )}
            </div>
          </div>

          {/* Security check slot: collapsed until the visitor submits, then
              shows Cloudflare's box in its own space. */}
          <div
            className={checkVisible ? 'mt-8 flex min-h-[65px] flex-col gap-3' : 'h-0 overflow-hidden'}
            aria-hidden={!checkVisible}
          >
            {checkVisible && (
              <p className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold">Quick security check</p>
            )}
            <Turnstile ref={turnstileRef} siteKey={site.turnstileSiteKey} onVisibleChange={setCheckVisible} />
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p
              role="status"
              aria-live="polite"
              className="font-sans text-xs text-ivory/60"
            >
              {status === 'sent' && (
                <span className="text-gold">
                  Got it — we&apos;ll reply within one business day.
                </span>
              )}
              {status === 'mailto' && (
                <span className="text-gold">
                  Your mail app should have opened with your message — just hit send.
                </span>
              )}
              {status === 'error' && (
                <span className="text-gold">
                  Something went wrong. Email us directly at {site.email}.
                </span>
              )}
              {status === 'verify-failed' && (
                <span className="text-gold">
                  The security check didn&apos;t finish. Tap the button to try again, or email us at {site.email}.
                </span>
              )}
              {status === 'idle' && '* Required fields'}
              {status === 'verifying' && 'Checking you’re human — tick the box if it appears.'}
              {status === 'submitting' && 'Sending…'}
            </p>

            <button
              type="submit"
              disabled={busy}
              aria-busy={busy}
              className="btn-gold-solid min-h-touch disabled:cursor-not-allowed disabled:opacity-80"
            >
              {busy ? (
                <>
                  <span
                    aria-hidden="true"
                    className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-jet/30 border-t-jet"
                  />
                  {status === 'verifying' ? 'Verifying…' : 'Sending…'}
                </>
              ) : (
                <>
                  {cta.submit}
                  <span aria-hidden="true">→</span>
                </>
              )}
            </button>
          </div>

          <p className="mt-6 font-sans text-xs leading-relaxed text-ivory/60">
            We use these details only to reply and prepare your free plan. They&apos;re sent securely through
            Cloudflare and Pushover (USA). See our{' '}
            <a href="/privacy/" className="text-gold underline-offset-4 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </motion.form>
      </div>
    </section>
  );
}
