import { useEffect } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap.js';
import { onScrollLock } from '../lib/scrollLock.js';

/**
 * Lenis smooth scrolling wired into GSAP's ticker so ScrollTrigger and the
 * scroll position always agree. Skipped entirely under reduced motion —
 * native scrolling is then used and anchors jump instantly. Lenis is
 * imported inside the effect so the prerender never touches it.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    let lenis;
    let tick;
    let offLock = () => {};
    let cancelled = false;

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        lerp: 0.09,
        wheelMultiplier: 0.9,
        anchors: { offset: -80 }, // clear the fixed navbar
      });
      lenis.on('scroll', ScrollTrigger.update);
      tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      offLock = onScrollLock((locked) => (locked ? lenis.stop() : lenis.start()));
      // Pinned sections depend on accurate heights — recalc once fonts land.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    });

    return () => {
      cancelled = true;
      offLock();
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, []);

  return children;
}
