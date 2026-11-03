import { useEffect, useRef } from 'react';
import { gsap, isFinePointer, prefersReducedMotion } from '../lib/gsap.js';

/**
 * A link (or button) that is gently pulled toward the pointer, with the
 * inner label moving a touch further for parallax. Pull strength is clamped
 * so the element never leaves its own hit box. Reserve for 1–2 focal CTAs
 * per screen; it becomes noise beyond that.
 */
export default function MagneticLink({
  as: Tag = 'a',
  strength = 0.3,
  className = '',
  children,
  ...props
}) {
  const outer = useRef(null);
  const inner = useRef(null);

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return undefined;
    const el = outer.current;
    const opts = { duration: 0.7, ease: 'elastic.out(1, 0.45)' };
    const ox = gsap.quickTo(el, 'x', opts);
    const oy = gsap.quickTo(el, 'y', opts);
    const ix = gsap.quickTo(inner.current, 'x', opts);
    const iy = gsap.quickTo(inner.current, 'y', opts);

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength;
      ox(x);
      oy(y);
      ix(x * 0.4);
      iy(y * 0.4);
    };
    const leave = () => {
      ox(0);
      oy(0);
      ix(0);
      iy(0);
    };

    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [strength]);

  return (
    <Tag ref={outer} className={`${className} will-change-transform`} {...props}>
      <span ref={inner} className="inline-flex items-center gap-3">
        {children}
      </span>
    </Tag>
  );
}
