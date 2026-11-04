import { useCallback, useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, isFinePointer, prefersReducedMotion } from '../lib/gsap.js';
import { videos } from '../data/videos.js';
import VideoModal from './VideoModal.jsx';

/**
 * Single tile in the marquee. Muted/looping preview; click opens the lightbox.
 * On mouse devices the tile tilts in 3D toward the pointer; on touch the
 * play glyph and labels are always visible.
 */
function ReelTile({ video, onSelect, tabbable, previewsPlaying, preload = 'metadata' }) {
  const videoRef = useRef(null);
  const tileRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.1,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (inView && previewsPlaying) el.play().catch(() => {});
    else el.pause();
  }, [inView, previewsPlaying]);

  // 3D tilt — transform/scale only, so it stays on the compositor thread.
  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return undefined;
    const el = tileRef.current;
    gsap.set(el, { transformPerspective: 900 });
    const opts = { duration: 0.5, ease: 'power3.out' };
    const rx = gsap.quickTo(el, 'rotateX', opts);
    const ry = gsap.quickTo(el, 'rotateY', opts);
    const sc = gsap.quickTo(el, 'scale', opts);

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      rx(py * -10);
      ry(px * 12);
    };
    const enter = () => sc(1.05);
    const leave = () => {
      rx(0);
      ry(0);
      sc(1);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <button
      ref={tileRef}
      type="button"
      onClick={() => onSelect(video)}
      tabIndex={tabbable ? 0 : -1}
      aria-label={`Play ${video.title} — ${video.client}`}
      data-cursor-label="Play"
      className="group relative aspect-video w-[72vw] shrink-0 overflow-hidden border border-ivory/10 bg-jet
        transition-[border-color,box-shadow] duration-300 ease-out will-change-transform
        hover:border-gold hover:shadow-gold
        focus-visible:outline-none focus-visible:border-gold focus-visible:shadow-gold
        sm:w-[52vw] md:w-[40vw] lg:w-[30vw] xl:w-[26vw]"
    >
      <video
        ref={videoRef}
        src={video.src}
        type={video.type}
        muted
        loop
        playsInline
        preload={preload}
        className="h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-jet/90 via-jet/10 to-transparent p-5 text-left">
        <span className="self-end font-sans text-[0.6rem] uppercase tracking-luxe text-gold">
          {video.category}
        </span>
        <div>
          <p className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold">{video.client}</p>
          <p className="mt-1 font-display text-2xl text-ivory lg:text-3xl">{video.title}</p>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/70 bg-jet/40 text-gold opacity-70 backdrop-blur transition-opacity duration-300 group-hover:opacity-100"
      >
        <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-current">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}

function PauseIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <rect x="6" y="5" width="4" height="14" />
      <rect x="14" y="5" width="4" height="14" />
    </svg>
  );
}

function PlayIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export default function VideoReel() {
  const root = useRef(null);
  const [active, setActive] = useState(null);
  const [hovering, setHovering] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const open = useCallback((video) => setActive(video), []);
  const close = useCallback(() => setActive(null), []);

  const paused = Boolean(active) || hovering || userPaused;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from('[data-reveal]', {
        opacity: 0,
        y: 32,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="work"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <div className="mx-auto mb-14 flex max-w-7xl flex-col gap-6 px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div data-reveal>
          <h2 className="section-label mb-5 normal-case tracking-[0.25em]">
            Our work — on-site video for Toronto-area businesses
          </h2>
          <p className="text-balance font-display text-5xl font-normal leading-none text-ivory md:text-7xl">
            A 360° look at <span className="italic text-gold">the reel.</span>
          </p>
        </div>

        <div data-reveal className="flex flex-col gap-5 lg:items-end">
          <p className="max-w-sm font-sans text-sm font-light leading-relaxed text-ivory/60">
            Tap any piece to watch it full-screen with sound.
          </p>
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-pressed={userPaused}
            className="inline-flex min-h-touch items-center gap-3 self-start border border-ivory/20 px-4 font-sans text-[0.65rem] uppercase tracking-luxe text-ivory/80 transition-all duration-300 hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold lg:self-auto"
          >
            {userPaused ? <PlayIcon className="h-3.5 w-3.5" /> : <PauseIcon className="h-3.5 w-3.5" />}
            {userPaused ? 'Play reel' : 'Pause reel'}
          </button>
        </div>
      </div>

      <div
        className="marquee-viewport relative"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-jet to-transparent lg:w-40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-jet to-transparent lg:w-40"
        />

        <div
          className={`flex w-max gap-5 py-10 pl-6 animate-marquee will-change-transform lg:gap-8 lg:pl-10 ${
            paused ? 'marquee-paused' : ''
          }`}
        >
          <div className="flex gap-5 lg:gap-8">
            {videos.map((video) => (
              <ReelTile
                key={video.id}
                video={video}
                onSelect={open}
                tabbable
                previewsPlaying={!userPaused && !active}
              />
            ))}
          </div>
          {/* Duplicate set for the seamless loop — client-only so the
              prerendered HTML carries each piece of work exactly once. */}
          {mounted && (
            <div className="marquee-clone flex gap-5 lg:gap-8" aria-hidden="true">
              {videos.map((video) => (
                <ReelTile
                  key={`${video.id}-clone`}
                  video={video}
                  onSelect={open}
                  tabbable={false}
                  previewsPlaying={!userPaused && !active}
                  preload="none"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl px-6 lg:px-10">
        <div className="gold-hairline" />
      </div>

      <VideoModal video={active} onClose={close} />
    </section>
  );
}
