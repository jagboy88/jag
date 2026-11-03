/**
 * Overlays (lightbox, mobile drawer, preloader) call lockScroll(true/false).
 * SmoothScroll listens and pauses Lenis; the body overflow is handled here
 * so every overlay behaves identically.
 */
const EVENT = 'impact:scroll-lock';

export function lockScroll(locked) {
  document.body.style.overflow = locked ? 'hidden' : '';
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { locked } }));
}

export function onScrollLock(cb) {
  const handler = (e) => cb(Boolean(e.detail?.locked));
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
