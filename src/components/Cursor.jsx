import { useEffect, useRef } from 'react';
import { gsap, isFinePointer, prefersReducedMotion } from '../lib/gsap.js';

const INTERACTIVE = 'a, button, [data-cursor]';

/**
 * Gold dot + trailing ring that replaces the system cursor on mouse
 * devices. Over interactive elements the ring expands and fills; elements
 * can set data-cursor-label="Play" to show a word inside it.
 */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return undefined;
    const html = document.documentElement;
    html.classList.add('has-cursor');

    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3' });
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3' });
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' });
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' });

    let shown = false;
    const move = (e) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      if (!shown) {
        shown = true;
        gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 });
      }
    };

    const over = (e) => {
      const target = e.target.closest(INTERACTIVE);
      const text = target?.dataset.cursorLabel ?? '';
      label.current.textContent = text;
      gsap.to(ring.current, {
        scale: target ? (text ? 2.6 : 1.8) : 1,
        backgroundColor: target ? 'rgba(212,175,55,0.92)' : 'rgba(212,175,55,0)',
        duration: 0.35,
        ease: 'power3.out',
        overwrite: 'auto',
      });
      gsap.to(dot.current, { scale: target ? 0 : 1, duration: 0.25, overwrite: 'auto' });
    };

    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3 });
    const enter = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 });

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    document.documentElement.addEventListener('pointerleave', leave);
    document.documentElement.addEventListener('pointerenter', enter);

    return () => {
      html.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
      document.documentElement.removeEventListener('pointerenter', enter);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <span ref={label} />
      </div>
    </>
  );
}
