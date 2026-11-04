import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '../lib/gsap.js';
import { testimonials } from '../data/testimonials.js';
import { site } from '../data/site.js';

function Stars({ className = '' }) {
  return (
    <span className={`tracking-[0.15em] text-gold ${className}`} aria-hidden="true">
      ★★★★★
    </span>
  );
}

/**
 * Client testimonials: for each, a verbatim pull-quote set large, the full
 * quote beneath it, and the attribution. Uses <figure>/<blockquote>/
 * <figcaption> so quotes and sources stay machine-readable. Ends with a
 * link to the Google reviews. (No Review/AggregateRating markup: Google
 * ignores self-published review stars.)
 */
export default function Testimonial({ ids = [], heading = 'What our clients say' }) {
  const root = useRef(null);
  const items = ids.map((id) => testimonials[id]).filter(Boolean);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray('[data-quote-part]', root.current).forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });
    },
    { scope: root },
  );

  if (items.length === 0) return null;

  return (
    <section ref={root} className="relative overflow-hidden px-6 py-24 lg:px-10 lg:py-32">
      <div
        aria-hidden="true"
        className="glow-gold pointer-events-none absolute left-1/2 top-1/2 h-[90vh] w-[90vh] -translate-x-1/2 -translate-y-1/2 opacity-70"
      />
      <div className="relative mx-auto max-w-6xl">
        <h2 data-quote-part className="section-label mb-10 normal-case tracking-[0.25em]">
          {heading}
        </h2>

        <div className="space-y-24">
          {items.map((t) => (
            <figure key={t.id}>
              <p
                data-quote-part
                aria-hidden="true"
                className="text-balance font-display text-[clamp(2.25rem,6vw,5.5rem)] font-normal leading-[1] tracking-[-0.01em] text-ivory"
              >
                <span className="mr-2 text-gold">“</span>
                {/* Mid-sentence excerpt: lead with an ellipsis too */}
                {/^[a-z]/.test(t.highlight) && <span className="text-gold">…</span>}
                {t.highlight}
                {/* Ellipsis: the highlight is an excerpt, so don't imply the sentence ends here */}
                <span className="italic text-gold">…”</span>
              </p>

              <div data-quote-part className="mt-12 grid gap-8 border-t border-gold/30 pt-8 md:grid-cols-12">
                <blockquote className="max-w-2xl font-sans text-base font-light leading-relaxed text-ivory/75 md:col-span-8">
                  <p>“{t.quote}”</p>
                </blockquote>
                <figcaption className="md:col-span-4 md:text-right">
                  <p className="font-display text-2xl text-ivory">{t.company}</p>
                  <p className="mt-1 font-sans text-[0.65rem] uppercase tracking-luxe text-gold">
                    {t.source === 'google' ? (
                      <>
                        <Stars className="mr-2" />
                        <span className="sr-only">Five stars. </span>
                      </>
                    ) : null}
                    {t.author} · {t.industry}
                  </p>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>

        <p data-quote-part className="mt-16 font-sans text-xs text-ivory/70">
          <a
            href={site.google.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-touch items-center gap-3 whitespace-nowrap border border-gold/50 px-4 text-[0.65rem] uppercase tracking-[0.15em] text-gold transition-colors duration-300 hover:bg-gold hover:text-jet"
          >
            <Stars />
            {site.google.rating} on Google · Read reviews
            <span aria-hidden="true">→</span>
          </a>
        </p>
      </div>
    </section>
  );
}
