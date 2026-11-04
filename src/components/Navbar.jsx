import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '../lib/gsap.js';
import { onIntroDone } from '../lib/intro.js';
import { lockScroll } from '../lib/scrollLock.js';
import { cta, navLinks, site } from '../data/site.js';
import InstagramIcon from './icons/InstagramIcon.jsx';
import MagneticLink from './MagneticLink.jsx';

export default function Navbar() {
  const header = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock scrolling while the mobile drawer is open
  useEffect(() => {
    if (menuOpen) lockScroll(true);
    return () => {
      if (menuOpen) lockScroll(false);
    };
  }, [menuOpen]);

  // Nav items drop in once the intro curtain lifts
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const items = gsap.utils.toArray('[data-nav-item]', header.current);
      gsap.set(items, { opacity: 0, y: -14 });
      const unsubscribe = onIntroDone(() => {
        gsap.to(items, { opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: 'expo.out' });
      });
      return unsubscribe;
    },
    { scope: header },
  );

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      ref={header}
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'border-b border-gold/20 bg-jet/60 backdrop-blur-xl backdrop-saturate-150'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10"
      >
        {/* Brand */}
        <a
          href="#top"
          onClick={closeMenu}
          data-nav-item
          className="group flex items-baseline gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <span className="font-display text-2xl font-semibold tracking-wide text-ivory">
            {site.shortName}
          </span>
          <span className="font-sans text-[0.65rem] uppercase tracking-luxe text-gold transition-colors group-hover:text-gold-soft">
            GTA
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <li key={link.href} data-nav-item>
              <a
                href={link.href}
                className="relative font-sans text-xs uppercase tracking-luxe text-ivory/80 transition-colors duration-300 hover:text-ivory
                  after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300
                  hover:after:w-full focus-visible:outline-none focus-visible:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li data-nav-item>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${site.instagram.handle}`}
              className="flex min-h-touch items-center gap-2 border border-gold/60 px-4 font-sans text-[0.65rem] uppercase tracking-luxe text-gold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-jet"
            >
              <InstagramIcon className="h-3.5 w-3.5" />
              <span>{site.instagram.handle}</span>
            </a>
          </li>
          {/* Sticky nav CTA — the conversion pattern repeats this at the
              end of Process and in the contact section. */}
          <li data-nav-item className="hidden lg:block">
            <MagneticLink
              href="#contact"
              strength={0.25}
              data-cursor-label="Go"
              className="flex min-h-touch items-center bg-gold px-5 font-sans text-[0.65rem] uppercase tracking-luxe text-jet transition-colors duration-300 hover:bg-gold-soft hover:shadow-gold-soft"
            >
              {cta.primary}
            </MagneticLink>
          </li>
        </ul>

        {/* Mobile: compact CTA + toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="#contact"
            onClick={closeMenu}
            data-nav-item
            className="flex min-h-touch items-center bg-gold px-4 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-jet transition-colors duration-300 hover:bg-gold-soft"
          >
            {cta.short}
          </a>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          data-nav-item
          className="relative flex min-h-touch min-w-touch items-center justify-center md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <span
            className={`absolute h-px w-6 bg-gold transition-all duration-300 ${
              menuOpen ? 'rotate-45' : '-translate-y-1.5'
            }`}
          />
          <span
            className={`absolute h-px w-6 bg-gold transition-all duration-300 ${
              menuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute h-px w-6 bg-gold transition-all duration-300 ${
              menuOpen ? '-rotate-45' : 'translate-y-1.5'
            }`}
          />
        </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-20 bottom-0 flex flex-col justify-between border-t border-gold/20 bg-jet/95 px-6 pb-10 pt-12 backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="flex items-baseline gap-4 font-display text-4xl text-ivory transition-colors hover:text-gold"
                  >
                    <span className="font-sans text-xs tracking-luxe text-gold">
                      0{i + 1}
                    </span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col gap-4 border-t border-gold/30 pt-6">
              <a
                href="#contact"
                onClick={closeMenu}
                className="btn-gold-solid min-h-touch w-full"
              >
                {cta.primary}
              </a>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-touch items-center justify-between font-sans text-xs uppercase tracking-luxe text-gold"
              >
                <span className="flex items-center gap-3">
                  <InstagramIcon className="h-4 w-4" />
                  {site.instagram.handle}
                </span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
