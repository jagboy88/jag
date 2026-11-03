import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '../lib/gsap.js';
import { markIntroDone } from '../lib/intro.js';
import { lockScroll } from '../lib/scrollLock.js';
import { site } from '../data/site.js';

const SESSION_KEY = 'impact:intro-seen';

function alreadySeen() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function remember() {
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    // private mode etc. — the intro simply plays again next time
  }
}

/**
 * Cinematic intro: a counter runs 0→100 while a gold rule draws across,
 * the wordmark lands, then the black curtain lifts to reveal the hero.
 * Plays once per session; never under reduced motion.
 */
export default function Preloader() {
  const [show, setShow] = useState(
    () => !prefersReducedMotion() && !alreadySeen(),
  );
  const root = useRef(null);
  const counter = useRef(null);
  const line = useRef(null);
  const word = useRef(null);

  useEffect(() => {
    if (!show) markIntroDone();
  }, [show]);

  useGSAP(
    () => {
      if (!show) return;
      lockScroll(true);
      const progress = { v: 0 };

      gsap
        .timeline({
          defaults: { ease: 'power3.inOut' },
          onComplete: () => {
            remember();
            lockScroll(false);
            setShow(false);
          },
        })
        .to(progress, {
          v: 100,
          duration: 1.5,
          onUpdate: () => {
            if (counter.current) {
              counter.current.textContent = String(
                Math.round(progress.v),
              ).padStart(3, '0');
            }
          },
        })
        .fromTo(line.current, { scaleX: 0 }, { scaleX: 1, duration: 1.5 }, 0)
        .from(word.current, { opacity: 0, y: 24, duration: 0.9, ease: 'expo.out' }, 0.3)
        .to([word.current, counter.current], { opacity: 0, y: -16, duration: 0.35, ease: 'power2.in' }, 1.6)
        .to(root.current, { yPercent: -100, duration: 0.95, ease: 'expo.inOut' }, 1.8)
        // Let the hero start a beat before the curtain fully clears.
        .call(markIntroDone, null, 2.05);
    },
    { scope: root, dependencies: [show] },
  );

  if (!show) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-[60] flex flex-col justify-between bg-jet px-6 py-8 lg:px-10"
    >
      <p
        ref={counter}
        className="self-end font-display text-7xl tabular-nums text-ivory md:text-8xl"
      >
        000
      </p>

      <div>
        <p ref={word} className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-none text-ivory">
          {site.shortName}
          <span className="ml-[0.2em] font-sans text-[0.25em] uppercase tracking-luxe text-gold">
            GTA
          </span>
        </p>
        <div ref={line} className="mt-6 h-px w-full origin-left bg-gold" />
      </div>
    </div>
  );
}
