import { useState } from 'react';
import { motion } from 'framer-motion';
import { site } from '../data/site.js';
import InstagramIcon from './icons/InstagramIcon.jsx';

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
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | submitting | sent | error

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  /**
   * Submission handler. Replace the body of `send()` with your own
   * endpoint (Formspree, Resend, a serverless function, etc.). The
   * mailto fallback keeps the form functional with zero backend.
   */
  const send = async (payload) => {
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

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await send(form);
      setStatus('sent');
      setForm(initialForm);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:px-10">
        {/* Left column */}
        <div className="lg:col-span-5">
          <p className="section-label mb-5">Contact</p>
          <h2 className="text-balance font-display text-5xl font-medium leading-none text-ivory md:text-7xl">
            Let&apos;s get you <span className="italic text-gold">on camera.</span>
          </h2>
          <p className="mt-8 max-w-sm font-sans text-sm font-light leading-relaxed text-ivory/60">
            Tell us about your business and what you want more of — leads,
            bookings, followers. We reply within one business day.
          </p>

          <dl className="mt-12 space-y-6 border-t border-ivory/10 pt-8">
            <div>
              <dt className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold">
                Email
              </dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${site.email}`}
                  className="font-display text-2xl text-ivory transition-colors hover:text-gold"
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
                  className="inline-flex items-center gap-3 font-display text-2xl text-ivory transition-colors hover:text-gold"
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
          <div className="grid gap-8 sm:grid-cols-2">
            <label className="block">
              <span className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold">
                Name *
              </span>
              <input
                type="text"
                name="name"
                required
                autoComplete="name"
                value={form.name}
                onChange={update('name')}
                placeholder="Your full name"
                className="input-luxe"
              />
            </label>

            <label className="block">
              <span className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold">
                Email *
              </span>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={update('email')}
                placeholder="you@company.com"
                className="input-luxe"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold">
                Business
              </span>
              <input
                type="text"
                name="company"
                autoComplete="organization"
                value={form.company}
                onChange={update('company')}
                placeholder="Business name and what you do"
                className="input-luxe"
              />
            </label>

            <label className="block min-w-0">
              <span className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold">
                What you need
              </span>
              <select
                name="projectType"
                value={form.projectType}
                onChange={update('projectType')}
                className="input-luxe min-w-0 max-w-full cursor-pointer appearance-none truncate bg-jet"
              >
                {projectTypes.map((type) => (
                  <option key={type} value={type} className="bg-jet text-ivory">
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <fieldset className="block">
              <legend className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold">
                Monthly budget
              </legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {budgets.map((b) => {
                  const selected = form.budget === b;
                  return (
                    <label
                      key={b}
                      className={`cursor-pointer border px-3 py-2 font-sans text-[0.65rem] uppercase tracking-wider transition-all duration-300 ${
                        selected
                          ? 'border-gold bg-gold text-jet'
                          : 'border-ivory/20 text-ivory/70 hover:border-gold hover:text-gold'
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

            <label className="block sm:col-span-2">
              <span className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold">
                Tell us about it *
              </span>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={update('message')}
                placeholder="Your location, current socials, and what you'd like to see happen…"
                className="input-luxe resize-none"
              />
            </label>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p
              role="status"
              aria-live="polite"
              className="font-sans text-xs text-ivory/50"
            >
              {status === 'sent' && (
                <span className="text-gold">
                  Your mail client should have opened — thank you.
                </span>
              )}
              {status === 'error' && (
                <span className="text-gold">
                  Something went wrong. Email us directly at {site.email}.
                </span>
              )}
              {status === 'idle' && '* Required fields'}
              {status === 'submitting' && 'Sending…'}
            </p>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-gold-solid disabled:cursor-not-allowed disabled:opacity-60"
            >
              Send inquiry
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
