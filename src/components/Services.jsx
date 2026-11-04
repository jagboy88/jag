import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '../lib/gsap.js';
import { cta, industries, pricing, process, services } from '../data/site.js';
import MagneticLink from './MagneticLink.jsx';

export default function Services() {
  const root = useRef(null);
  const list = useRef(null);
  const pin = useRef(null);
  const track = useRef(null);
  const progress = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Generic fade-ups, each scoped to its own trigger.
      gsap.utils.toArray('[data-reveal]', root.current).forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        });
      });

      // Service rows slide in as a staggered group (≤ 8 children).
      gsap.from(list.current.children, {
        opacity: 0,
        x: -28,
        duration: 0.7,
        stagger: 0.09,
        ease: 'power2.out',
        scrollTrigger: { trigger: list.current, start: 'top 80%' },
      });

      // Pinned horizontal process — desktop only; phones get a normal stack.
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const distance = () => track.current.scrollWidth - window.innerWidth + 80;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pin.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.to(track.current, { x: () => -distance(), ease: 'none' }).fromTo(
          progress.current,
          { scaleX: 0 },
          { scaleX: 1, ease: 'none' },
          0,
        );
        gsap.utils.toArray('.process-num', track.current).forEach((n) => {
          gsap.to(n, {
            xPercent: -30,
            ease: 'none',
            scrollTrigger: { trigger: pin.current, start: 'top top', end: () => `+=${distance()}`, scrub: 1 },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      {/* ───────────── Services ───────────── */}
      <section id="services" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16 grid gap-8 lg:grid-cols-12">
            <div data-reveal className="lg:col-span-5">
              <h2 className="section-label mb-5 normal-case tracking-[0.25em]">
                Video production, editing, social media management &amp; Meta ads
              </h2>
              <p className="text-balance font-display text-5xl font-normal leading-none text-ivory md:text-7xl">
                Done-for-you{' '}
                <span className="italic text-gold">content &amp; growth.</span>
              </p>
            </div>
            <p
              data-reveal
              className="max-w-md self-end font-sans text-sm font-light leading-relaxed text-ivory/60 lg:col-span-7 lg:justify-self-end"
            >
              Built for service-based businesses. We handle the filming, the
              editing, the posting and the ads, so the only thing on your plate
              is the work that comes in.{' '}
              <span className="text-gold">{pricing.line}</span>
            </p>
          </div>

          <ul ref={list} className="border-t border-ivory/10">
            {services.map((service) => (
              <li
                key={service.index}
                className="group relative grid gap-4 overflow-hidden border-b border-ivory/10 py-8 transition-colors duration-500 hover:border-gold md:grid-cols-12 md:items-baseline md:gap-8 md:py-10"
              >
                {/* Ghost numeral that swells behind the row on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 font-display text-[9rem] leading-none text-gold/0 transition-all duration-700 ease-out group-hover:-right-2 group-hover:text-gold/10 md:text-[12rem]"
                >
                  {service.index}
                </span>
                <span className="font-sans text-xs tracking-luxe text-gold md:col-span-1">
                  {service.index}
                </span>
                <h3 className="font-display text-3xl text-ivory transition-all duration-500 group-hover:translate-x-3 group-hover:text-gold md:col-span-5 md:text-5xl">
                  {/* The link's ::after covers the whole row, so every row is clickable */}
                  <a href={service.href} className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:underline">
                    {service.title}
                  </a>
                </h3>
                <p className="relative font-sans text-sm font-light leading-relaxed text-ivory/60 md:col-span-5">
                  {service.description}
                </p>
                <span
                  aria-hidden="true"
                  className="hidden justify-self-end font-display text-3xl text-gold opacity-0 transition-all duration-500 group-hover:opacity-100 md:col-span-1 md:block"
                >
                  →
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── Process (pinned horizontal on desktop) ───────────── */}
      <section id="process" className="relative border-y border-gold/30">
        <div
          ref={pin}
          className="flex flex-col justify-center py-20 lg:h-screen lg:py-0 lg:overflow-hidden"
        >
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <div data-reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="section-label mb-5 normal-case tracking-[0.25em]">
                  How our done-for-you content service works
                </h2>
                <p className="text-balance font-display text-4xl font-normal leading-tight text-ivory md:text-6xl">
                  Three steps. <br />
                  <span className="italic text-gold">Zero on your plate.</span>
                </p>
              </div>
              <div className="hidden w-64 lg:block">
                <div className="h-px w-full bg-ivory/15">
                  <div ref={progress} className="h-px w-full origin-left bg-gold" />
                </div>
              </div>
            </div>
          </div>

          <ol
            ref={track}
            className="mt-14 flex flex-col gap-12 px-6 lg:mt-16 lg:w-max lg:flex-row lg:gap-10 lg:px-10 lg:will-change-transform"
          >
            {process.map((item) => (
              <li
                key={item.step}
                className="process-panel relative shrink-0 border-l border-gold/40 pl-6 lg:w-[58vw] lg:pl-10"
              >
                <span
                  aria-hidden="true"
                  className="process-num pointer-events-none absolute -top-10 left-4 select-none font-display text-[9rem] leading-none text-gold/10 lg:-top-24 lg:text-[20rem]"
                >
                  {item.step}
                </span>
                <div className="relative">
                  <span className="font-sans text-xs tracking-luxe text-gold">Step {item.step}</span>
                  <h3 className="mt-3 font-display text-3xl text-ivory md:text-5xl lg:text-6xl">
                    {item.title}
                  </h3>
                  <p className="mt-5 max-w-md font-sans text-sm font-light leading-relaxed text-ivory/60 lg:text-base">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────── Industries + mid-page CTA ───────────── */}
      <section id="industries" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div data-reveal className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <h2 className="section-label normal-case tracking-[0.25em] lg:col-span-3">
              Industries we shoot for across the GTA
            </h2>
            <ul className="flex flex-wrap gap-x-8 gap-y-3 lg:col-span-9">
              {industries.map((industry) => (
                <li
                  key={industry.name}
                  className="font-display text-2xl text-ivory/80 transition-colors duration-300 hover:text-gold md:text-3xl"
                >
                  {industry.href ? (
                    <a href={industry.href} className="text-ivory underline decoration-gold/50 decoration-1 underline-offset-[6px] hover:decoration-gold">
                      {industry.name}
                    </a>
                  ) : (
                    industry.name
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div
            data-reveal
            className="mt-20 flex flex-col gap-8 border-t border-gold/30 pt-12 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-xl text-balance font-display text-3xl leading-tight text-ivory md:text-5xl">
              One shoot day. A month of content.{' '}
              <span className="italic text-gold">Your phone stays in your pocket.</span>
            </p>
            <MagneticLink
              href="#contact"
              className="btn-gold-solid min-h-touch shrink-0"
              data-cursor-label="Go"
            >
              {cta.primary}
              <span aria-hidden="true">→</span>
            </MagneticLink>
          </div>
        </div>
      </section>
    </div>
  );
}
