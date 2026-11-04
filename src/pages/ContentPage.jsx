import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '../lib/gsap.js';
import { cta, pricing } from '../data/site.js';
import { pageByPath } from '../data/pages.js';
import { breadcrumbsFor } from '../lib/seo.js';
import ContactForm from '../components/ContactForm.jsx';
import MagneticLink from '../components/MagneticLink.jsx';
import Testimonial from '../components/Testimonial.jsx';

/**
 * Template for service, industry and FAQ pages. Content comes from
 * src/data/pages.js. The keyword heading is the gold eyebrow (h1); the big
 * display line is styled copy, matching the homepage.
 */
export default function ContentPage({ page }) {
  const root = useRef(null);
  const crumbs = breadcrumbsFor(page);
  const related = (page.related ?? []).map((p) => pageByPath[p]).filter(Boolean);

  useGSAP(
    () => {
      // [data-page-fade] starts hidden via CSS (no flash on load).
      if (prefersReducedMotion()) {
        gsap.set('[data-page-fade]', { opacity: 1 });
        return;
      }
      gsap.fromTo(
        '[data-page-fade]',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'expo.out' },
      );
      gsap.utils.toArray('[data-reveal]', root.current).forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      {/* ───────── Page hero ───────── */}
      <section className="relative overflow-hidden px-6 pb-16 pt-36 lg:px-10 lg:pb-24 lg:pt-44">
        <div
          aria-hidden="true"
          className="glow-gold pointer-events-none absolute -top-1/3 right-0 h-[100vh] w-[100vh]"
        />
        <div className="relative mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" data-page-fade>
            <ol className="flex flex-wrap items-center gap-2 font-sans text-xs text-ivory/60">
              {crumbs.map((c, i) => (
                <li key={c.path} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true" className="text-gold/60">/</span>}
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-ivory/80">{c.name}</span>
                  ) : (
                    <a href={c.path} className="transition-colors hover:text-gold">{c.name}</a>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <h1 data-page-fade className="section-label mb-8 mt-10 max-w-3xl normal-case tracking-[0.25em]">
            {page.h1}
          </h1>
          <p
            data-page-fade
            className="text-balance font-display text-[clamp(3rem,8vw,7.5rem)] font-normal leading-[0.95] tracking-[-0.015em] text-ivory"
          >
            {page.display[0]} <span className="block italic text-gold">{page.display[1]}</span>
          </p>

          <div data-page-fade className="mt-12 grid gap-10 border-t border-ivory/10 pt-10 md:grid-cols-12 md:items-end">
            <p className="max-w-xl font-sans text-base font-light leading-relaxed text-ivory/75 md:col-span-7">
              {page.intro}
            </p>
            <div className="flex flex-col gap-3 md:col-span-5 md:items-end">
              <MagneticLink href="#contact" className="btn-gold-solid min-h-touch" data-cursor-label="Go">
                {cta.primary}
                <span aria-hidden="true">→</span>
              </MagneticLink>
              <p className="font-sans text-xs text-ivory/60 md:text-right">{cta.subline}</p>
              <p className="font-sans text-xs text-gold md:text-right">{pricing.line}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Sections ───────── */}
      {page.sections.length > 0 && (
        <section className="px-6 py-12 lg:px-10 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-14">
            {page.sections.map((s) => (
              <article key={s.heading} data-reveal className="grid gap-6 border-t border-ivory/10 pt-10 lg:grid-cols-12">
                <h2 className="text-balance font-display text-3xl font-normal leading-tight text-ivory md:text-5xl lg:col-span-5">
                  {s.heading}
                </h2>
                <div className="space-y-5 lg:col-span-7">
                  {s.body?.map((para) => (
                    <p key={para} className="max-w-2xl font-sans text-base font-light leading-relaxed text-ivory/70">
                      {para}
                    </p>
                  ))}
                  {s.bullets && (
                    <ul className="grid gap-4 sm:grid-cols-2">
                      {s.bullets.map((b) => (
                        <li key={b} className="border-l border-gold/50 pl-4 font-sans text-sm leading-relaxed text-ivory/80">
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ───────── Client testimonial ───────── */}
      {page.testimonial && <Testimonial id={page.testimonial} heading="From a client" />}

      {/* ───────── FAQ ───────── */}
      {page.faqs?.length > 0 && (
        <section id="faq" className="px-6 py-12 lg:px-10 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12">
            <h2 data-reveal className="section-label normal-case tracking-[0.25em] lg:col-span-4">
              {page.kind === 'faq' ? 'All questions' : 'Questions, answered'}
            </h2>
            <div className="divide-y divide-ivory/10 border-y border-ivory/10 lg:col-span-8">
              {page.faqs.map((f) => (
                <details key={f.q} className="group py-6">
                  <summary className="flex min-h-touch cursor-pointer list-none items-start justify-between gap-6 font-display text-2xl text-ivory transition-colors hover:text-gold md:text-3xl [&::-webkit-details-marker]:hidden">
                    <span>{f.q}</span>
                    <span aria-hidden="true" className="mt-1 shrink-0 font-sans text-2xl text-gold transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl font-sans text-base font-light leading-relaxed text-ivory/70">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────── Related ───────── */}
      {related.length > 0 && (
        <section className="px-6 py-12 lg:px-10 lg:py-16">
          <div className="mx-auto max-w-7xl border-t border-gold/30 pt-10">
            <h2 className="section-label mb-6 normal-case tracking-[0.25em]">Related</h2>
            <ul className="grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <li key={r.path}>
                  <a
                    href={r.path}
                    className="group flex min-h-touch items-center justify-between gap-4 border border-ivory/10 px-5 py-5 transition-colors duration-300 hover:border-gold"
                  >
                    <span className="font-display text-2xl text-ivory transition-colors group-hover:text-gold">{r.navLabel}</span>
                    <span aria-hidden="true" className="text-gold">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ContactForm />
    </div>
  );
}
