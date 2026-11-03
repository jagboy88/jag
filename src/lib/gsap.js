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

/** True when the visitor asked the OS for less motion. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** True for mouse/trackpad devices — hover and cursor effects only make sense there. */
export const isFinePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export { gsap, ScrollTrigger, SplitText };
