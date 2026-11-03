import { useCallback, useEffect, useRef, useState } from 'react';
import { videos } from '../data/videos.js';
import VideoModal from './VideoModal.jsx';

/**
 * Single tile in the marquee. Muted/looping preview; click opens the lightbox.
 * `aria-hidden` is set on the duplicated track so screen readers only
 * encounter each piece of work once.
 */
function ReelTile({ video, onSelect, tabbable }) {
  const ref = useRef(null);

  // Autoplay can be blocked until the element is in view — nudge it.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <button
      type="button"
      onClick={() => onSelect(video)}
      tabIndex={tabbable ? 0 : -1}
      aria-label={`Play ${video.title} — ${video.client}`}
      className="group relative aspect-video w-[72vw] shrink-0 overflow-hidden border border-ivory/10 bg-jet
        transition-all duration-500 ease-out
        hover:scale-[1.04] hover:border-gold hover:shadow-gold
        focus-visible:outline-none focus-visible:border-gold focus-visible:shadow-gold
        sm:w-[52vw] md:w-[40vw] lg:w-[30vw] xl:w-[26vw]"
    >
      <video
        ref={ref}
        src={video.src}
        type={video.type}
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Typography overlay */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-jet/90 via-jet/10 to-transparent p-5 text-left">
        <span className="self-end font-sans text-[0.6rem] uppercase tracking-luxe text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {video.category}
        </span>
        <div>
          <p className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold">
            {video.client}
          </p>
          <p className="mt-1 font-display text-2xl text-ivory lg:text-3xl">
            {video.title}
          </p>
        </div>
      </div>

      {/* Play glyph */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/70 bg-jet/40 text-gold opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100 group-hover:scale-110"
      >
        <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-current">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}

export default function VideoReel() {
  const [active, setActive] = useState(null);
  const [hovering, setHovering] = useState(false);

  const open = useCallback((video) => setActive(video), []);
  const close = useCallback(() => setActive(null), []);

  const paused = Boolean(active) || hovering;

  return (
    <section
      id="work"
      className="relative overflow-hidden border-t border-ivory/10 py-24 lg:py-32"
    >
      <div className="mx-auto mb-14 flex max-w-7xl flex-col gap-6 px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div>
          <p className="section-label mb-5">Our Work</p>
          <h2 className="text-balance font-display text-5xl font-medium leading-none text-ivory md:text-7xl">
            A 360° look at <span className="italic text-gold">the reel.</span>
          </h2>
        </div>
        <p className="max-w-sm font-sans text-sm font-light leading-relaxed text-ivory/60">
          Hover to pause the panorama. Click any piece to watch it full-screen
          with sound.
        </p>
      </div>

      {/* Marquee track */}
      <div
        className="relative"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {/* Edge fades — pure gradients */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-jet to-transparent lg:w-40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-jet to-transparent lg:w-40"
        />

        <div
          className={`flex w-max gap-5 py-6 animate-marquee will-change-transform lg:gap-8 ${
            paused ? 'marquee-paused' : ''
          }`}
        >
          {/* Primary set */}
          <div className="flex gap-5 lg:gap-8">
            {videos.map((video) => (
              <ReelTile key={video.id} video={video} onSelect={open} tabbable />
            ))}
          </div>
          {/* Duplicate set — creates the seamless infinite loop */}
          <div className="flex gap-5 lg:gap-8" aria-hidden="true">
            {videos.map((video) => (
              <ReelTile
                key={`${video.id}-clone`}
                video={video}
                onSelect={open}
                tabbable={false}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl px-6 lg:px-10">
        <div className="gold-hairline" />
      </div>

      <VideoModal video={active} onClose={close} />
    </section>
  );
}
