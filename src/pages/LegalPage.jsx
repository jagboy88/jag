import { site } from '../data/site.js';
import { breadcrumbsFor } from '../lib/seo.js';

/**
 * Plain, readable template for legal pages (privacy policy). No entrance
 * animations: the text is visible in the prerendered HTML straight away.
 */
export default function LegalPage({ page }) {
  const crumbs = breadcrumbsFor(page);

  return (
    <article className="px-6 pb-24 pt-36 lg:px-10 lg:pb-32 lg:pt-44">
      <div className="mx-auto max-w-3xl">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 font-sans text-xs text-ivory/60">
            {crumbs.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true" className="text-gold/60">/</span>}
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-ivory/80">{c.name}</span>
                ) : (
                  <a href={c.path} className="transition-colors hover:text-gold">{c.name}</a>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <h1 className="mt-10 font-display text-[clamp(2.75rem,7vw,5.5rem)] font-normal leading-[0.95] text-ivory">
          {page.h1}
        </h1>
        <p className="mt-6 font-sans text-xs uppercase tracking-luxe text-gold">
          Last updated <time dateTime={page.updated}>{page.updatedLabel}</time>
        </p>
        <p className="mt-10 font-sans text-base font-light leading-relaxed text-ivory/80">{page.intro}</p>

        <div className="mt-14 space-y-12">
          {page.sections.map((s) => (
            <section key={s.heading} className="border-t border-ivory/10 pt-8">
              <h2 className="font-display text-3xl font-normal leading-tight text-ivory md:text-4xl">{s.heading}</h2>
              <div className="mt-5 space-y-4">
                {s.body?.map((para) => (
                  <p key={para} className="font-sans text-base font-light leading-relaxed text-ivory/75">
                    {para}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="space-y-3">
                    {s.bullets.map((b) => (
                      <li key={b} className="border-l border-gold/50 pl-4 font-sans text-base font-light leading-relaxed text-ivory/75">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {s.after?.map((para) => (
                  <p key={para} className="font-sans text-base font-light leading-relaxed text-ivory/75">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-16 border-t border-gold/30 pt-8 font-sans text-sm text-ivory/70">
          Privacy questions:{' '}
          <a href={`mailto:${site.email}`} className="text-gold underline-offset-4 hover:underline">
            {site.email}
          </a>
        </p>
      </div>
    </article>
  );
}
