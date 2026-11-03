import { motion } from 'framer-motion';
import { industries, process, services } from '../data/site.js';

const row = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Services() {
  return (
    <>
      {/* ───────────── Services ───────────── */}
      <section id="services" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="section-label mb-5">What we do</p>
              <h2 className="text-balance font-display text-5xl font-medium leading-none text-ivory md:text-7xl">
                Done-for-you{' '}
                <span className="italic text-gold">content &amp; growth.</span>
              </h2>
            </div>
            <p className="max-w-md self-end font-sans text-sm font-light leading-relaxed text-ivory/60 lg:col-span-7 lg:justify-self-end">
              Built for service-based businesses. We handle the filming, the
              editing, the posting and the ads, so the only thing on your plate
              is the work that comes in.
            </p>
          </div>

          <ul className="border-t border-ivory/10">
            {services.map((service, i) => (
              <motion.li
                key={service.index}
                custom={i}
                variants={row}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className="group grid gap-4 border-b border-ivory/10 py-8 transition-colors duration-500 hover:border-gold md:grid-cols-12 md:items-baseline md:gap-8 md:py-10"
              >
                <span className="font-sans text-xs tracking-luxe text-gold md:col-span-1">
                  {service.index}
                </span>
                <h3 className="font-display text-3xl text-ivory transition-all duration-500 group-hover:translate-x-2 group-hover:text-gold md:col-span-5 md:text-5xl">
                  {service.title}
                </h3>
                <p className="font-sans text-sm font-light leading-relaxed text-ivory/60 md:col-span-5">
                  {service.description}
                </p>
                <span
                  aria-hidden="true"
                  className="hidden justify-self-end font-display text-3xl text-gold opacity-0 transition-all duration-500 group-hover:opacity-100 md:col-span-1 md:block"
                >
                  →
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── Process ───────────── */}
      <section id="process" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="border-y border-gold/30 py-16 lg:py-20">
            <div className="mb-14 grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="section-label mb-5">How it works</p>
                <h2 className="text-balance font-display text-4xl font-medium leading-tight text-ivory md:text-6xl">
                  Three steps. <br />
                  <span className="italic text-gold">Zero on your plate.</span>
                </h2>
              </div>
            </div>

            <ol className="grid gap-12 md:grid-cols-3 md:gap-8">
              {process.map((item, i) => (
                <motion.li
                  key={item.step}
                  custom={i}
                  variants={row}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                  className="border-l border-gold/40 pl-6"
                >
                  <span className="font-sans text-xs tracking-luxe text-gold">
                    Step {item.step}
                  </span>
                  <h3 className="mt-3 font-display text-3xl text-ivory md:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-xs font-sans text-sm font-light leading-relaxed text-ivory/60">
                    {item.description}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* Industries strip */}
          <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:items-start">
            <p className="section-label lg:col-span-3">Who we work with</p>
            <ul className="flex flex-wrap gap-x-8 gap-y-3 lg:col-span-9">
              {industries.map((industry) => (
                <li
                  key={industry}
                  className="font-display text-2xl text-ivory/80 transition-colors duration-300 hover:text-gold md:text-3xl"
                >
                  {industry}
                </li>
              ))}
            </ul>
          </div>

          {/* Mid-page CTA — repeats the primary action after the features */}
          <div className="mt-20 flex flex-col gap-8 border-t border-gold/30 pt-12 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-balance font-display text-3xl leading-tight text-ivory md:text-5xl">
              One shoot day. A month of content.{' '}
              <span className="italic text-gold">Your phone stays in your pocket.</span>
            </p>
            <a href="#contact" className="btn-gold-solid min-h-touch shrink-0">
              Book a shoot
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
