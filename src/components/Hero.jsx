import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, SplitText, prefersReducedMotion } from '../lib/gsap.js';
import { onIntroDone } from '../lib/intro.js';
import { site } from '../data/site.js';
import MagneticLink from './MagneticLink.jsx';

// WebGL is the heaviest thing on the page — split it out so the first
// paint never waits for Three.js.
const HeroScene = lazy(() => import('./three/HeroScene.jsx'));

const headline = [
  { text: 'We shoot.', accent: false },
  { text: 'We edit.', accent: false },
  { text: 'We run it.', accent: true },
];

/** CSS-only fallback shown until the scene loads (and for no-WebGL). */
function GlowFallback() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-1/3 left-1/2 h-[80vh] w-[80vh] -translate-x-1/2 rounded-full bg-gold/10 blur-[160px]"
    />
  );
}

export default function Hero() {
  const section = useRef(null);
  const copy = useRef(null);
  const sceneWrap = useRef(null);
  const h1 = useRef(null);
  const [sceneActive, setSceneActive] = useState(true);
  const [webgl] = useState(() => {
    try {
      const c = document.createElement('canvas');
      return Boolean(c.getContext('webgl2') || c.getContext('webgl'));
    } catch {
      return false;
    }
  });
  const reduced = prefersReducedMotion();

  // Stop rendering the WebGL loop when the hero scrolls out of view.
  useEffect(() => {
    const el = section.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => setSceneActive(entry.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      const lines = gsap.utils.toArray('.hero-line', h1.current);
      const split = new SplitText(lines, { type: 'chars', charsClass: 'hero-char' });
      const fades = gsap.utils.toArray('[data-hero-fade]', section.current);

      if (!reduced) {
        gsap.set(split.chars, { opacity: 0, y: 70, rotateX: -75 });
        gsap.set(fades, { opacity: 0, y: 24 });
      }

      const unsubscribe = onIntroDone(() => {
        if (reduced) return;
        gsap
          .timeline()
          .to(split.chars, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.1,
            stagger: 0.028,
            ease: 'expo.out',
          })
          .to(fades, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'expo.out' }, '-=0.7');
      });

      if (!reduced) {
        // Decorative layers only: copy drifts up and dims, the scene zooms.
        const st = { trigger: section.current, start: 'top top', end: 'bottom top', scrub: true };
        gsap.to(copy.current, { yPercent: -14, opacity: 0.1, ease: 'none', scrollTrigger: st });
        gsap.to(sceneWrap.current, { scale: 1.25, opacity: 0.25, ease: 'none', scrollTrigger: st });
      }

      return () => {
        unsubscribe();
        split.revert();
      };
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      id="top"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-20 pt-40 lg:px-10 lg:pb-28"
    >
      {/* 3D backdrop */}
      <div ref={sceneWrap} className="absolute inset-0 will-change-transform">
        {webgl ? (
          <Suspense fallback={<GlowFallback />}>
            <HeroScene active={sceneActive} reduced={reduced} />
          </Suspense>
        ) : (
          <GlowFallback />
        )}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.25)_0%,transparent_35%,#000000_100%)]"
      />

      <div ref={copy} className="relative mx-auto w-full max-w-7xl">
        <p data-hero-fade className="section-label mb-8">
          {site.name} &nbsp;·&nbsp; Content, social &amp; ads for service businesses
        </p>

        <h1
          ref={h1}
          className="hero-h1 text-balance font-display text-[clamp(3.25rem,10vw,10rem)] font-normal leading-[0.92] tracking-[-0.015em] text-ivory"
        >
          {headline.map((part) => (
            <span
              key={part.text}
              className={`hero-line block ${part.accent ? 'italic text-gold' : ''}`}
            >
              {part.text}
            </span>
          ))}
        </h1>

        <div className="mt-14 grid gap-10 border-t border-ivory/10 pt-10 md:grid-cols-12 md:items-end">
          <p
            data-hero-fade
            className="max-w-md font-sans text-base font-light leading-relaxed text-ivory/70 md:col-span-6 lg:col-span-5"
          >
            We come to your business with professional videographers, edit
            everything with our in-house team, then run your social media and
            Meta ads. One team, start to finish, so you can stay on the tools.
          </p>

          <div
            data-hero-fade
            className="flex flex-wrap gap-4 md:col-span-6 md:justify-end lg:col-span-7"
          >
            <MagneticLink
              href="#contact"
              className="btn-gold-solid min-h-touch"
              data-cursor-label="Go"
            >
              Book a shoot
              <span aria-hidden="true">→</span>
            </MagneticLink>
            <MagneticLink href="#work" className="btn-gold min-h-touch" strength={0.2}>
              Watch the reel
            </MagneticLink>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        data-hero-fade
        href="#work"
        aria-label="Scroll to our work"
        className="absolute bottom-8 right-6 hidden flex-col items-center gap-3 lg:right-10 lg:flex"
      >
        <span className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="h-12 w-px bg-gradient-to-b from-gold to-transparent animate-pulse-gold" />
      </a>
    </section>
  );
}
