import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, SplitText, prefersReducedMotion } from '../lib/gsap.js';
import { onIntroDone } from '../lib/intro.js';
import { cta } from '../data/site.js';
import MagneticLink from './MagneticLink.jsx';

// WebGL is the heaviest thing on the page — split it out so the first
// paint never waits for Three.js.
const HeroScene = lazy(() => import('./three/HeroScene.jsx'));

const headline = [
  { text: 'We shoot.', accent: false },
  { text: 'We edit.', accent: false },
  { text: 'We run it.', accent: true },
];

/** CSS-only backdrop shown until the scene loads, and for devices that skip it. */
function GlowFallback() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-1/3 left-1/2 h-[80vh] w-[80vh] -translate-x-1/2 rounded-full bg-gold/10 blur-[160px]"
    />
  );
}

/**
 * Decide on the client whether to load the 3D scene at all: never on
 * Save-Data connections or very low-memory devices, and only once the
 * browser is idle after the intro so it never competes with first paint.
 */
function useDeferredScene() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const nav = navigator;
    if (nav.connection?.saveData) return undefined;
    if (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 2) return undefined;
    let supported = false;
    try {
      const c = document.createElement('canvas');
      supported = Boolean(c.getContext('webgl2') || c.getContext('webgl'));
    } catch {
      supported = false;
    }
    if (!supported) return undefined;

    let idleId;
    const unsubscribe = onIntroDone(() => {
      const schedule = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 200));
      idleId = schedule(() => setEnabled(true), { timeout: 1500 });
    });
    return () => {
      unsubscribe();
      if (idleId && window.cancelIdleCallback) window.cancelIdleCallback(idleId);
    };
  }, []);
  return enabled;
}

export default function Hero() {
  const section = useRef(null);
  const copy = useRef(null);
  const sceneWrap = useRef(null);
  const display = useRef(null);
  const [sceneActive, setSceneActive] = useState(true);
  const sceneEnabled = useDeferredScene();
  const reduced = typeof window !== 'undefined' && prefersReducedMotion();

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
      const lines = gsap.utils.toArray('.hero-line', display.current);
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
          .to(split.chars, { opacity: 1, y: 0, rotateX: 0, duration: 1.1, stagger: 0.028, ease: 'expo.out' })
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
      {/* 3D backdrop — loaded only when the device and connection can afford it */}
      <div ref={sceneWrap} className="absolute inset-0 will-change-transform">
        {sceneEnabled ? (
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
        {/* The keyword-bearing heading is the small gold eyebrow; the big
            display line below it is styled copy, not a heading. */}
        <h1 data-hero-fade className="section-label mb-8 max-w-3xl normal-case tracking-[0.25em]">
          Video content, social media &amp; Meta ads for service businesses in the Greater Toronto
          Area
        </h1>

        <p
          ref={display}
          className="hero-h1 text-balance font-display text-[clamp(3.25rem,10vw,10rem)] font-normal leading-[0.92] tracking-[-0.015em] text-ivory"
        >
          {headline.map((part) => (
            <span key={part.text} className={`hero-line block ${part.accent ? 'italic text-gold' : ''}`}>
              {part.text}
            </span>
          ))}
        </p>

        <div className="mt-14 grid gap-10 border-t border-ivory/10 pt-10 md:grid-cols-12 md:items-end">
          <p
            data-hero-fade
            className="max-w-md font-sans text-base font-light leading-relaxed text-ivory/70 md:col-span-6 lg:col-span-5"
          >
            We come to your business with professional videographers, edit everything with our
            in-house team, then run your social media and Meta ads. One team, start to finish, so
            you can stay on the tools. Based in Toronto, shooting across the GTA — Mississauga,
            Vaughan, Markham, Brampton and beyond.
          </p>

          <div data-hero-fade className="flex flex-col gap-4 md:col-span-6 md:items-end lg:col-span-7">
            <div className="flex flex-wrap gap-4 md:justify-end">
              <MagneticLink href="#contact" className="btn-gold-solid min-h-touch" data-cursor-label="Go">
                {cta.primary}
                <span aria-hidden="true">→</span>
              </MagneticLink>
              <MagneticLink href="#work" className="btn-gold min-h-touch" strength={0.2}>
                Watch the reel
              </MagneticLink>
            </div>
            <p className="font-sans text-xs text-ivory/60 md:text-right">{cta.subline}</p>
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
