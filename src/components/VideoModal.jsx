import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { lockScroll } from '../lib/scrollLock.js';

/**
 * Full-screen lightbox for a single reel item.
 * - Auto-unmutes and plays on open (user gesture originated the open, so
 *   browsers permit unmuted playback).
 * - Native controls, gold close button, Escape key and backdrop click to close.
 * - Locks body scroll while mounted.
 */
export default function VideoModal({ video, onClose }) {
  const videoRef = useRef(null);
  const closeRef = useRef(null);

  // Escape to close + body scroll lock
  useEffect(() => {
    if (!video) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    lockScroll(true);
    closeRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      lockScroll(false);
    };
  }, [video, onClose]);

  // Unmute + play as soon as the element mounts for this video
  useEffect(() => {
    const el = videoRef.current;
    if (!video || !el) return;
    el.muted = false;
    el.volume = 1;
    el.currentTime = 0;
    el.play().catch(() => {
      // If the browser refuses unmuted autoplay, native controls remain
      // available so the user can press play manually.
    });
  }, [video]);

  // Nothing to portal to on the server (prerender) and nothing to show
  // until a video is selected.
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {video && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-jet/95 backdrop-blur-xl"
          onClick={onClose}
        >
          {/* Top bar */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 py-5 lg:px-10">
            <div onClick={(e) => e.stopPropagation()}>
              <p className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold">
                {video.client} &nbsp;·&nbsp; {video.category}
              </p>
              <h3
                id="lightbox-title"
                className="mt-1 font-display text-2xl text-ivory md:text-3xl"
              >
                {video.title}
              </h3>
            </div>

            <button
              ref={closeRef}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close video"
              className="group flex items-center gap-3 border border-gold bg-jet/60 px-5 py-3 font-sans text-[0.65rem] uppercase tracking-luxe text-gold transition-all duration-300 hover:bg-gold hover:text-jet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-jet"
            >
              <span>Close</span>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-3.5 w-3.5 stroke-current transition-transform duration-300 group-hover:rotate-90"
                fill="none"
                strokeWidth="1.5"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          {/* Player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative mx-4 w-full max-w-6xl border border-gold/60 shadow-gold-soft"
          >
            <video
              ref={videoRef}
              key={video.id}
              src={video.src}
              type={video.type}
              controls
              autoPlay
              playsInline
              preload="auto"
              controlsList="nodownload"
              className="aspect-video w-full bg-jet"
            />
          </motion.div>

          <p className="absolute bottom-6 font-sans text-[0.6rem] uppercase tracking-luxe text-ivory/40">
            Press Esc or click outside to close
          </p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
