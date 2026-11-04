/**
 * Single GSAP entry point. Registers plugins once and exposes small helpers
 * the motion components share. Import `gsap` from here, never from 'gsap'
 * directly, so plugin registration is guaranteed.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

gsap.defaults({ ease: 'expo.out', duration: 0.9 });

// iOS/Android show and hide the browser toolbar while scrolling, which fires
// resize events. Without this, ScrollTrigger recalculates mid-scroll and
// scroll-linked animations jump.
ScrollTrigger.config({ ignoreMobileResize: true });

/** Mouse/trackpad desktop — where scroll-scrubbed and pointer effects run. */
export const DESKTOP_MOTION = '(min-width: 1024px) and (hover: hover) and (pointer: fine)';

/** True when the visitor asked the OS for less motion. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** True for mouse/trackpad devices — hover and cursor effects only make sense there. */
export const isFinePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/**
 * Search-engine renderers (Googlebot) don't scroll: they expand the viewport
 * to the full page height and take a snapshot. Scroll-triggered reveals
 * would leave below-the-fold content at opacity 0 in that snapshot. When the
 * viewport is taller than any real screen, finish every scroll animation
 * and show anything still pre-hidden. Real visitors never hit this.
 */
const TALL_VIEWPORT = 1600;
export function installRevealFailsafe() {
  if (typeof window === 'undefined') return () => {};
  const check = () => {
    if (window.innerHeight < TALL_VIEWPORT) return;
    ScrollTrigger.getAll().forEach((st) => st.animation?.progress(1));
    gsap.set('[data-page-fade], [data-hero-fade], .hero-line', { opacity: 1, y: 0 });
  };
  check();
  const late = setTimeout(check, 1500);
  window.addEventListener('resize', check);
  return () => {
    clearTimeout(late);
    window.removeEventListener('resize', check);
  };
}

export { gsap, ScrollTrigger, SplitText };
