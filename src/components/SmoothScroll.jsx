import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap.js';
import { onScrollLock } from '../lib/scrollLock.js';

/**
 * Lenis smooth scrolling wired into GSAP's ticker so ScrollTrigger and the
 * scroll position always agree. Skipped entirely under reduced motion —
 * native scrolling is then used and anchors jump instantly.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.9,
      anchors: { offset: -80 }, // clear the fixed navbar
    });

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const offLock = onScrollLock((locked) =>
      locked ? lenis.stop() : lenis.start(),
    );

    // Pinned sections depend on accurate heights — recalc once fonts land.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      offLock();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return children;
}
