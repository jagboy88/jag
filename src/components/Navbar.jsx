import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks, site } from '../data/site.js';
import InstagramIcon from './icons/InstagramIcon.jsx';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
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
            <li key={link.href}>
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
          <li>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${site.instagram.handle}`}
              className="flex items-center gap-2 border border-gold/60 px-4 py-2 font-sans text-[0.65rem] uppercase tracking-luxe text-gold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-jet"
            >
              <InstagramIcon className="h-3.5 w-3.5" />
              <span>{site.instagram.handle}</span>
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="relative flex h-10 w-10 items-center justify-center md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
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

            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border-t border-gold/30 pt-6 font-sans text-xs uppercase tracking-luxe text-gold"
            >
              <span className="flex items-center gap-3">
                <InstagramIcon className="h-4 w-4" />
                {site.instagram.handle}
              </span>
              <span aria-hidden="true">↗</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
