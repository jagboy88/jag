import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '../lib/gsap.js';
import { markIntroDone } from '../lib/intro.js';
import { lockScroll } from '../lib/scrollLock.js';
import { site } from '../data/site.js';

const STORAGE_KEY = 'impact:intro-seen-at';
const REPLAY_AFTER_MS = 24 * 60 * 60 * 1000; // once per day, not once per tab

function seenRecently() {
  try {
    const at = Number(localStorage.getItem(STORAGE_KEY));
    return at > 0 && Date.now() - at < REPLAY_AFTER_MS;
  } catch {
    return false;
  }
}

function remember() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // private mode etc. — the intro simply plays again next time
  }
}

/**
 * Short cinematic intro (~1.3 s): counter runs 0→100 while a gold rule
 * draws across, the wordmark lands, the curtain lifts. Plays at most once
 * a day per browser; never under reduced motion. Renders nothing on the
 * server and decides on the client so prerendered HTML stays identical.
 */
export default function Preloader() {
  const [show, setShow] = useState(null); // null = undecided (SSR / first paint)
  const root = useRef(null);
  const counter = useRef(null);
  const line = useRef(null);
  const word = useRef(null);

  useEffect(() => {
    setShow(!prefersReducedMotion() && !seenRecently());
  }, []);

  useEffect(() => {
    if (show === false) markIntroDone();
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
          duration: 0.7,
          onUpdate: () => {
            if (counter.current) {
              counter.current.textContent = String(Math.round(progress.v)).padStart(3, '0');
            }
          },
        })
        .fromTo(line.current, { scaleX: 0 }, { scaleX: 1, duration: 0.7 }, 0)
        .from(word.current, { opacity: 0, y: 24, duration: 0.5, ease: 'expo.out' }, 0.1)
        .to([word.current, counter.current], { opacity: 0, y: -16, duration: 0.25, ease: 'power2.in' }, 0.75)
        .to(root.current, { yPercent: -100, duration: 0.6, ease: 'expo.inOut' }, 0.85)
        // Let the hero start a beat before the curtain fully clears.
        .call(markIntroDone, null, 1.0);
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
      <p ref={counter} className="self-end font-display text-7xl tabular-nums text-ivory md:text-8xl">
        000
      </p>

      <div>
        <p ref={word} className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-none text-ivory">
          {site.shortName}
          <span className="ml-[0.2em] font-sans text-[0.25em] uppercase tracking-luxe text-gold">GTA</span>
        </p>
        <div ref={line} className="mt-6 h-px w-full origin-left bg-gold" />
      </div>
    </div>
  );
}
