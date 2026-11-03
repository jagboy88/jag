import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap.js';

const items = [
  'On-site shoots',
  'In-house editing',
  'Social media management',
  'Meta ads',
];

/**
 * Giant italic ticker between the hero and the reel. It scrolls on its own,
 * speeds up and skews with scroll velocity, and settles back when you stop.
 * Under reduced motion it renders as a static single line.
 */
export default function MarqueeBand() {
  const root = useRef(null);
  const track = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const loop = gsap.to(track.current, {
        xPercent: -50,
        ease: 'none',
        duration: 32,
        repeat: -1,
      });

      ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity();
          gsap.to(track.current, {
            skewX: gsap.utils.clamp(-10, 10, v / -160),
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
          });
          loop.timeScale(gsap.utils.clamp(0.6, 4, 1 + Math.abs(v) / 1400));
          gsap.to(loop, { timeScale: 1, duration: 1.4, ease: 'power2.out', overwrite: true });
          gsap.to(track.current, { skewX: 0, duration: 0.8, delay: 0.25, ease: 'power2.out' });
        },
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="motion-reduce:overflow-x-auto overflow-hidden border-y border-gold/30 bg-jet py-6 lg:py-8"
    >
      <div ref={track} className="flex w-max whitespace-nowrap will-change-transform">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex items-center">
            {items.map((text) => (
              <span
                key={`${copy}-${text}`}
                className="font-display text-[clamp(2.4rem,6.5vw,6.5rem)] italic leading-none text-ivory"
              >
                {text}
                <span aria-hidden="true" className="px-6 not-italic text-gold lg:px-10">
                  ·
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
