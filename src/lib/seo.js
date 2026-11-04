/**
 * Per-page <head> tags and structured data. scripts/prerender.mjs swaps the
 * block between <!--seo:start--> and <!--seo:end--> in index.html with
 * headFor(route) for every route, so each URL ships its own title,
 * description, canonical, Open Graph tags and JSON-LD.
 */
import { site, pricing, services as homeServices } from '../data/site.js';
import { pageByPath } from '../data/pages.js';

export const ORIGIN = 'https://impactmediagroup.ca';

const HOME = {
  title: 'Impact Media GTA — Video Content, Social & Meta Ads for Service Businesses',
  description:
    'We come to your business, shoot with professional videographers, edit in-house, and run your social media and Meta ads. Greater Toronto Area.',
};

const AREA_SERVED = [
  { '@type': 'AdministrativeArea', name: 'Greater Toronto Area' },
  ...['Toronto', 'Mississauga', 'Vaughan', 'Markham', 'Brampton'].map((name) => ({ '@type': 'City', name })),
];

const PRICE = {
  '@type': 'Offer',
  priceCurrency: pricing.currency,
  priceSpecification: {
    '@type': 'PriceSpecification',
    minPrice: pricing.min,
    priceCurrency: pricing.currency,
  },
  description: pricing.line,
};

const businessId = `${ORIGIN}/#business`;

const business = {
  '@type': 'ProfessionalService',
  '@id': businessId,
  name: site.name,
  alternateName: 'Impact Media Group',
  url: `${ORIGIN}/`,
  email: site.email,
  description:
    'On-site video content shoots, in-house editing, social media management and Meta ads for service-based businesses in the Greater Toronto Area.',
  priceRange: `From ${pricing.from}`,
  areaServed: AREA_SERVED,
  address: { '@type': 'PostalAddress', addressLocality: 'Toronto', addressRegion: 'ON', addressCountry: 'CA' },
  sameAs: [site.instagram.url],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: homeServices.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, description: s.description, url: `${ORIGIN}${s.href}` },
    })),
  },
};

const escapeAttr = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escapeText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Breadcrumb trail for a content page. */
export function breadcrumbsFor(page) {
  const trail = [{ name: 'Home', path: '/' }];
  if (page.kind === 'service') trail.push({ name: 'Services', path: '/#services' });
  if (page.kind === 'industry') trail.push({ name: 'Industries', path: '/#industries' });
  trail.push({ name: page.navLabel, path: page.path });
  return trail;
}

function graphFor(route) {
  if (route.kind === 'home') {
    return [
      business,
      { '@type': 'WebSite', '@id': `${ORIGIN}/#website`, url: `${ORIGIN}/`, name: site.name, publisher: { '@id': businessId } },
    ];
  }
  const page = pageByPath[route.path];
  const url = `${ORIGIN}${page.path}`;
  const graph = [business];

  if (page.kind === 'service' || page.kind === 'industry') {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: page.serviceName,
      description: page.description,
      url,
      provider: { '@id': businessId },
      areaServed: AREA_SERVED,
      offers: PRICE,
      ...(page.audience ? { audience: { '@type': 'BusinessAudience', name: page.audience } } : {}),
    });
  }

  graph.push({
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbsFor(page)
      .filter((c) => !c.path.includes('#'))
      .map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${ORIGIN}${c.path}` })),
  });

  if (page.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: page.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }
  return graph;
}

/** The HTML that replaces the <!--seo--> block in index.html. */
export function headFor(route) {
  const page = route.kind === 'home' ? HOME : pageByPath[route.path];
  const url = `${ORIGIN}${route.path}`;
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graphFor(route) }).replace(
    /</g,
    '\\u003c',
  );
  return [
    `<title>${escapeText(page.title)}</title>`,
    `<meta name="description" content="${escapeAttr(page.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escapeAttr(page.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(page.description)}" />`,
    `<meta name="twitter:title" content="${escapeAttr(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(page.description)}" />`,
    `<script type="application/ld+json">${json}</script>`,
  ].join('\n    ');
}
