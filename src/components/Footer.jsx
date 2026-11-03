import { navLinks, site } from '../data/site.js';
import InstagramIcon from './icons/InstagramIcon.jsx';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-gold/30">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-20 lg:px-10">
        {/* Brand statement */}
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[0.95] text-ivory">
              Impact Media
              <span className="block italic text-gold">GTA</span>
            </p>
            <p className="mt-6 max-w-sm font-sans text-sm font-light leading-relaxed text-ivory/60">
              {site.tagline}
            </p>
          </div>

          {/* Links */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-10 lg:col-span-6 lg:grid-cols-3"
          >
            <div>
              <p className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold">
                Navigate
              </p>
              <ul className="mt-5 space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-flex min-h-[32px] items-center font-sans text-sm text-ivory/70 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold">
                Contact
              </p>
              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex min-h-[32px] items-center break-all font-sans text-sm text-ivory/70 transition-colors hover:text-gold"
                  >
                    {site.email}
                  </a>
                </li>
                <li className="font-sans text-sm text-ivory/70">
                  {site.region}
                </li>
              </ul>
            </div>

            <div className="col-span-2 lg:col-span-1">
              <p className="font-sans text-[0.6rem] uppercase tracking-luxe text-gold">
                Follow
              </p>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 inline-flex min-h-touch items-center gap-3 border border-gold/50 px-4 font-sans text-xs uppercase tracking-luxe text-gold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-jet"
              >
                <InstagramIcon className="h-4 w-4" />
                {site.instagram.handle}
              </a>
            </div>
          </nav>
        </div>

        <div className="gold-hairline mt-16" />

        {/* Legal row */}
        <div className="mt-8 flex flex-col gap-4 font-sans text-[0.65rem] uppercase tracking-luxe text-ivory/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>
            Crafted in the{' '}
            <span className="text-gold">{site.region}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
