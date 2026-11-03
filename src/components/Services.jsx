import { motion } from 'framer-motion';
import { services } from '../data/site.js';

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
    <section id="services" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="section-label mb-5">Services</p>
            <h2 className="text-balance font-display text-5xl font-medium leading-none text-ivory md:text-7xl">
              Full-stack <span className="italic text-gold">production.</span>
            </h2>
          </div>
          <p className="max-w-md self-end font-sans text-sm font-light leading-relaxed text-ivory/60 lg:col-span-7 lg:justify-self-end">
            From the first treatment to the final export, we handle every stage
            in-house. One team, one standard, no hand-offs.
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

      {/* About strip */}
      <div
        id="about"
        className="mx-auto mt-28 max-w-7xl px-6 lg:mt-36 lg:px-10"
      >
        <div className="grid gap-12 border-y border-gold/30 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-4">
            <p className="section-label mb-5">About</p>
            <p className="font-display text-4xl leading-tight text-ivory md:text-5xl">
              Built in Toronto. <br />
              <span className="italic text-gold">Shot everywhere.</span>
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8 lg:self-end">
            {[
              { value: '250+', label: 'Projects delivered' },
              { value: '6', label: 'Service verticals' },
              { value: 'GTA', label: 'Home base, global reach' },
            ].map((stat) => (
              <div key={stat.label} className="border-l border-gold/40 pl-6">
                <p className="font-display text-5xl text-ivory md:text-6xl">
                  {stat.value}
                </p>
                <p className="mt-2 font-sans text-[0.65rem] uppercase tracking-luxe text-ivory/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
