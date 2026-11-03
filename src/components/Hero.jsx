import { motion } from 'framer-motion';
import { site } from '../data/site.js';

const headline = ['We', 'make', 'brands', 'move.'];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const word = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-20 pt-40 lg:px-10 lg:pb-28"
    >
      {/* Ambient gold glow — pure CSS, no imagery */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/3 left-1/2 h-[80vh] w-[80vh] -translate-x-1/2 rounded-full bg-gold/10 blur-[160px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,#000000_100%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="section-label mb-8"
        >
          {site.name} &nbsp;·&nbsp; {site.region}
        </motion.p>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="text-balance font-display text-[clamp(3.5rem,11vw,11rem)] font-medium leading-[0.9] tracking-tight text-ivory"
        >
          {headline.map((w, i) => (
            <motion.span
              key={w}
              variants={word}
              className={`inline-block mr-[0.22em] ${
                i === headline.length - 1 ? 'italic text-gold' : ''
              }`}
            >
              {w}
            </motion.span>
          ))}
        </motion.h1>

        <div className="mt-14 grid gap-10 border-t border-ivory/10 pt-10 md:grid-cols-12 md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-md font-sans text-base font-light leading-relaxed text-ivory/70 md:col-span-6 lg:col-span-5"
          >
            A Toronto-based production house crafting brand films, commercials
            and social content with a cinematic edge. Every frame intentional.
            Every cut earned.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="flex flex-wrap gap-4 md:col-span-6 md:justify-end lg:col-span-7"
          >
            <a href="#work" className="btn-gold-solid">
              Watch the reel
              <span aria-hidden="true">→</span>
            </a>
            <a href="#contact" className="btn-gold">
              Start a project
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#work"
        aria-label="Scroll to our work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-8 right-6 hidden flex-col items-center gap-3 lg:right-10 lg:flex"
      >
        <span className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="h-12 w-px bg-gradient-to-b from-gold to-transparent animate-pulse-gold" />
      </motion.a>
    </section>
  );
}
