import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '../lib/gsap.js';
import { testimonials } from '../data/testimonials.js';

/**
 * Client testimonial: a verbatim pull-quote set large, the full quote
 * beneath it, and the attribution. Uses <figure>/<blockquote>/<figcaption>
 * so the quote and its source stay machine-readable.
 */
export default function Testimonial({ id, heading = 'What our clients say' }) {
  const root = useRef(null);
  const t = testimonials[id];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from('[data-quote-part]', {
        opacity: 0,
        y: 32,
        duration: 0.9,
        stagger: 0.12,
        ease: 'expo.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
    },
    { scope: root },
  );

  if (!t) return null;

  return (
    <section ref={root} className="relative overflow-hidden px-6 py-24 lg:px-10 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.07] blur-[140px]"
      />
      <div className="relative mx-auto max-w-6xl">
        <h2 data-quote-part className="section-label mb-10 normal-case tracking-[0.25em]">
          {heading}
        </h2>

        <figure>
          <p
            data-quote-part
            aria-hidden="true"
            className="text-balance font-display text-[clamp(2.25rem,6vw,5.5rem)] font-normal leading-[1] tracking-[-0.01em] text-ivory"
          >
            <span className="mr-2 text-gold">“</span>
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
                {t.author} · {t.industry}
              </p>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
