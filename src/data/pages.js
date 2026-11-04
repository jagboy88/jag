/**
 * Content for every page beyond the homepage. Each entry becomes its own
 * prerendered URL with its own title, description, headings, structured
 * data and sitemap entry (see src/lib/seo.js and scripts/prerender.mjs).
 *
 * Keep copy factual: only claims the business can stand behind. When real
 * figures arrive (turnaround, videos per shoot day, client results) add
 * them here.
 */
import { pricing } from './site.js';
import { privacyPage } from './legal.js';

const AREAS = 'Toronto, Mississauga, Vaughan, Markham, Brampton and across the Greater Toronto Area';

/* ───────────────────────────── Services ───────────────────────────── */

export const servicePages = [
  {
    path: '/services/video-production/',
    kind: 'service',
    navLabel: 'On-site video production',
    serviceName: 'On-Site Video Production',
    title: 'On-Site Video Production in Toronto | Impact Media GTA',
    description:
      'Professional videographers film at your business across the GTA — your team, your space and your work — for social media and ads. Packages from $1,000 CAD.',
    h1: 'On-site video production for service businesses in Toronto and the GTA',
    display: ['We bring the camera', 'to you.'],
    intro:
      "Impact Media GTA films where your work actually happens. Our professional videographers come to your shop, clinic, studio or job site and capture your team, your space and your customers' results, so your content shows the real business instead of stock footage.",
    sections: [
      {
        heading: 'What we film',
        bullets: [
          'Your work in progress, start to finish',
          'Before-and-after results',
          'Your team and the people customers will meet',
          'Your space: shop, clinic, studio or job site',
          'Short clips answering the questions customers ask most',
          'Footage cut specifically for paid ads',
        ],
      },
      {
        heading: 'How a shoot day works',
        body: [
          'Before the shoot, we plan a shot list around the services you want more of, your people and your customers.',
          'On the day, we work around your schedule so the business keeps running. There is no studio to book and no downtime.',
          'Afterwards, the footage goes straight to our in-house editing team.',
        ],
      },
      {
        heading: 'Made for social media',
        body: [
          'Every shoot is planned for how people watch now: vertical video for Instagram Reels, TikTok and YouTube Shorts, plus horizontal versions where they make sense. We film enough variety in one visit to keep your channels posting long after the shoot.',
        ],
      },
      {
        heading: 'Where we shoot',
        body: [`We film on location in ${AREAS}.`],
      },
    ],
    faqs: [
      {
        q: 'Do you come to our location?',
        a: 'Yes. Every shoot happens at your business or job site in the Greater Toronto Area. There is no studio to book.',
      },
      {
        q: 'Who edits the footage?',
        a: 'Our own in-house team of editors edits everything we shoot.',
      },
      {
        q: 'How much does it cost?',
        a: `${pricing.line} Request a free content plan and we'll recommend the right package for your business.`,
      },
      {
        q: 'Can you also post the videos and run ads with them?',
        a: 'Yes. We can manage your social media and your Facebook and Instagram ads using the content we shoot, so one team handles everything.',
      },
    ],
    related: ['/services/video-editing/', '/services/social-media-management/', '/services/meta-ads/'],
  },
  {
    path: '/services/video-editing/',
    kind: 'service',
    navLabel: 'Video editing',
    serviceName: 'Short-Form Video Editing',
    title: 'Short-Form Video Editing in Toronto | Impact Media GTA',
    description:
      'In-house editors turn your footage into Reels, TikToks, Shorts and ad creative, with colour, sound, captions and pacing done for you. Serving the GTA. From $1,000 CAD.',
    h1: 'In-house video editing for Instagram Reels, TikTok, YouTube Shorts and ads',
    display: ['Every cut', 'earns its place.'],
    intro:
      "Raw footage doesn't win customers; edited content does. Every video we deliver is cut by Impact Media GTA's own team of highly trained editors and made for the platform it's going on and the people you want to reach.",
    sections: [
      {
        heading: "What's included",
        bullets: [
          'Vertical short-form edits for Instagram Reels, TikTok and YouTube Shorts',
          'Colour grading so your work looks the way it does in person',
          'Sound clean-up, music and pacing',
          'On-screen captions, because most social video is watched with the sound off',
          'A strong opening in the first seconds to stop the scroll',
          'Ad-ready versions for Facebook and Instagram campaigns',
        ],
      },
      {
        heading: 'A library, not a single video',
        body: [
          'One shoot day becomes a library of short-form videos, reels and ad creative ready to post, so your accounts stay active without you filming every week.',
        ],
      },
      {
        heading: 'Edited for your customers',
        body: [
          'A detailer, a cosmetic clinic and a landscaper need different content. We edit around what your customers care about: the result, the people doing the work, and a reason to trust you.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Who does the editing?',
        a: 'Our own in-house team of editors.',
      },
      {
        q: 'What formats do you deliver?',
        a: 'Vertical short-form videos for Instagram Reels, TikTok and YouTube Shorts, versions for Facebook and Instagram ads, and horizontal cuts where needed.',
      },
      {
        q: 'Do you add captions?',
        a: 'Yes. Short-form videos include on-screen captions so they work with the sound off.',
      },
      {
        q: 'How much does it cost?',
        a: `${pricing.line} Request a free content plan to see what fits your business.`,
      },
    ],
    related: ['/services/video-production/', '/services/social-media-management/', '/services/meta-ads/'],
  },
  {
    path: '/services/social-media-management/',
    kind: 'service',
    navLabel: 'Social media management',
    serviceName: 'Social Media Management',
    title: 'Social Media Management in Toronto | Impact Media GTA',
    description:
      'We run your Instagram, TikTok, Facebook and YouTube end to end, including posting, captions, replies and monthly reporting, with content we film for you. From $1,000 CAD.',
    h1: 'Social media management for service businesses in Toronto and the GTA',
    display: ['Your channels,', 'handled.'],
    intro:
      "Most business owners know they should post more and don't have the time. We run your social media end to end with content we film and edit ourselves, so your accounts stay active and on-brand while you focus on the work.",
    sections: [
      {
        heading: 'What we manage',
        bullets: [
          'Instagram, TikTok, Facebook and YouTube',
          'A consistent posting schedule',
          'Captions written for your customers and your area',
          'Replies to comments and community engagement',
          "Monthly reporting on what's working",
        ],
      },
      {
        heading: 'Content that is actually yours',
        body: [
          "Templates and stock clips are easy to spot. Because we film at your business, every post shows your real team, work and results, and that's what builds trust with local customers.",
        ],
      },
      {
        heading: 'Connected to your ads',
        body: [
          'Your best-performing posts can become Facebook and Instagram ads, so what you post and what you pay to promote work together.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Which platforms do you manage?',
        a: 'Instagram, TikTok, Facebook and YouTube.',
      },
      {
        q: 'Do we need to create the content?',
        a: 'No. We film at your business and edit everything in-house.',
      },
      {
        q: 'Do you reply to comments?',
        a: 'Yes. Replying to comments and engaging with your community is part of the service.',
      },
      {
        q: 'How do we know it is working?',
        a: "You get a monthly report on what's working.",
      },
      {
        q: 'How much does it cost?',
        a: `${pricing.line} Request a free content plan and we'll recommend a package.`,
      },
    ],
    related: ['/services/video-production/', '/services/video-editing/', '/services/meta-ads/'],
  },
  {
    path: '/services/meta-ads/',
    kind: 'service',
    navLabel: 'Facebook & Instagram ads',
    serviceName: 'Facebook and Instagram Ads Management',
    title: 'Facebook & Instagram Ads in Toronto | Impact Media GTA',
    description:
      'Facebook and Instagram ad campaigns built on video we shoot at your business, with targeting, creative testing and budget management handled. Serving the GTA. From $1,000 CAD.',
    h1: 'Facebook and Instagram ads management for service businesses in the GTA',
    display: ['Ads that look', 'like you.'],
    intro:
      "Ads only work as well as the creative in them. We run Meta ad campaigns on Facebook and Instagram using video we film at your business, so your ads show your real work instead of looking like everyone else's.",
    sections: [
      {
        heading: "What's included",
        bullets: [
          'Campaign setup on Facebook and Instagram',
          'Targeting people in the areas you serve across the GTA',
          'Ad creative cut from your own footage',
          'Creative testing to find what gets results',
          'Budget management',
        ],
      },
      {
        heading: 'Why use footage of your own business',
        body: [
          'People choosing a detailer, a clinic or a landscaper want to see who they are hiring and what the result looks like. Real footage of your work answers that before they ever call.',
        ],
      },
      {
        heading: 'One team from shoot to ad',
        body: [
          'The same team films, edits and runs your ads, so fresh creative is ready when a campaign needs it, without waiting on a separate production company.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Which platforms do you run ads on?',
        a: "Facebook and Instagram, through Meta's ad platform.",
      },
      {
        q: 'Do you make the ads too?',
        a: 'Yes. We cut ad creative from footage we film at your business.',
      },
      {
        q: 'Can you target only the areas we serve?',
        a: 'Yes. Campaigns target people in the cities and neighbourhoods you serve across the GTA.',
      },
      {
        q: 'How much does it cost?',
        a: `${pricing.line} Request a free content plan and we'll recommend a package.`,
      },
    ],
    related: ['/services/video-production/', '/services/video-editing/', '/services/social-media-management/'],
  },
];

/* ───────────────────────────── Industries ───────────────────────────── */

export const industryPages = [
  {
    path: '/industries/auto-detailing/',
    kind: 'industry',
    navLabel: 'Auto detailers',
    serviceName: 'Video Marketing for Auto Detailers',
    audience: 'Auto detailing businesses',
    testimonial: 'dshine',
    title: 'Video Marketing for Auto Detailers in Toronto | Impact Media GTA',
    description:
      'Before-and-after reels, social media and Instagram ads for auto detailing shops in the GTA. We film at your shop, edit in-house and run your channels. From $1,000 CAD.',
    h1: 'Video content, social media and ads for auto detailers in the GTA',
    display: ['Let the finish', 'do the selling.'],
    intro:
      "Detailing is one of the most visual services there is, but most detailers' social media doesn't show it. We film at your shop, turn the work into short-form video, and run the accounts and ads that bring more cars through the door.",
    sections: [
      {
        heading: 'Content that works for detailers',
        bullets: [
          'Before-and-after reveals',
          'Paint correction and ceramic coating in progress',
          'Interior deep-clean transformations',
          'Close-ups of the finish: reflections, gloss and water beading',
          'Your team at work and the handover to the customer',
        ],
      },
      {
        heading: 'From your bay to their feed',
        body: [
          'We film a shoot day at your shop, our in-house editors cut it into reels and ad creative, and we post and manage your Instagram, TikTok, Facebook and YouTube.',
        ],
      },
      {
        heading: 'Reach car owners near you',
        body: [
          'Facebook and Instagram ads put your work in front of car owners in the areas you serve, and campaigns can be timed around your busy seasons.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do you film at our shop?',
        a: 'Yes. We come to your detailing shop anywhere in the Greater Toronto Area.',
      },
      {
        q: 'What content works best for detailers?',
        a: 'Before-and-after reveals, process clips like paint correction and ceramic coating, interior transformations and close-ups of the finished car.',
      },
      {
        q: 'How much does it cost?',
        a: `${pricing.line} Request a free content plan for your shop.`,
      },
    ],
    related: ['/services/video-production/', '/services/meta-ads/', '/industries/cosmetic-clinics/'],
  },
  {
    path: '/industries/cosmetic-clinics/',
    kind: 'industry',
    navLabel: 'Cosmetic clinics',
    serviceName: 'Video Marketing for Cosmetic Clinics',
    audience: 'Cosmetic clinics and med spas',
    title: 'Video Marketing for Cosmetic Clinics in Toronto | Impact Media GTA',
    description:
      'Video content, social media management and Instagram ads for cosmetic clinics and med spas in the GTA. We film at your clinic and edit in-house. From $1,000 CAD.',
    h1: 'Video content, social media and ads for cosmetic clinics and med spas in the GTA',
    display: ['Build trust', 'before the consult.'],
    intro:
      "People choosing a clinic want to know who will be treating them and what the experience is like. We film at your clinic, edit in-house and run your social media and ads, so prospective clients can see it all before they book.",
    sections: [
      {
        heading: 'Content that works for clinics',
        bullets: [
          'Introductions to your practitioners',
          'Walkthroughs of your clinic and treatment rooms',
          'Explainers that answer common treatment questions',
          'The client experience, from arrival to aftercare',
          'Ad creative built to drive consultation bookings',
        ],
      },
      {
        heading: 'Advertising rules come first',
        body: [
          "Regulated health professionals in Ontario follow their college's advertising rules, which can limit things like testimonials and before-and-after images. Tell us which rules apply to your clinic and we'll plan your content around them.",
        ],
      },
      {
        heading: 'Reach clients near you',
        body: [
          'Facebook and Instagram ads put your clinic in front of people in the areas you serve, using footage of your own space and team.',
        ],
      },
    ],
    faqs: [
      {
        q: "Can you work within our college's advertising rules?",
        a: "Yes. Tell us which rules apply to your clinic and we'll plan the content around them.",
      },
      {
        q: 'Do you film at our clinic?',
        a: 'Yes. We come to your clinic anywhere in the Greater Toronto Area.',
      },
      {
        q: 'How much does it cost?',
        a: `${pricing.line} Request a free content plan for your clinic.`,
      },
    ],
    related: ['/services/social-media-management/', '/services/meta-ads/', '/industries/auto-detailing/'],
  },
  {
    path: '/industries/landscaping/',
    kind: 'industry',
    navLabel: 'Landscapers',
    serviceName: 'Video Marketing for Landscapers',
    audience: 'Landscaping and hardscaping companies',
    title: 'Video Marketing for Landscapers in Toronto | Impact Media GTA',
    description:
      'Project reels, social media and Facebook and Instagram ads for landscaping and hardscaping companies in the GTA. We film on your job sites. From $1,000 CAD.',
    h1: 'Video content, social media and ads for landscapers in the GTA',
    display: ['Show the yard', "they'll get."],
    intro:
      'Homeowners hire landscapers by looking at past work. We film on your job sites, turn each project into short-form video, and run your social media and ads so your best yards reach the homeowners who want one.',
    sections: [
      {
        heading: 'Content that works for landscapers',
        bullets: [
          'Project transformations from bare yard to finished space',
          'Hardscaping and interlock installs',
          'Planting, sod and garden design',
          'Your crew at work and equipment in action',
          'Walkthroughs of finished projects',
        ],
      },
      {
        heading: 'Built around your season',
        body: [
          'Shoot while projects are underway in spring and summer, and plan your content and ads so you head into next season with a full schedule. If you offer snow removal, winter content can promote that too.',
        ],
      },
      {
        heading: 'Reach homeowners where you work',
        body: [
          'Facebook and Instagram ads target homeowners in the cities and neighbourhoods you serve across the GTA.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do you film on our job sites?',
        a: 'Yes. We come to your job sites anywhere in the Greater Toronto Area.',
      },
      {
        q: 'When should we book a shoot?',
        a: 'While projects are underway, so we can capture the transformation from start to finish.',
      },
      {
        q: 'How much does it cost?',
        a: `${pricing.line} Request a free content plan for your company.`,
      },
    ],
    related: ['/services/video-production/', '/services/social-media-management/', '/industries/auto-detailing/'],
  },
];

/* ───────────────────────────── FAQ ───────────────────────────── */

export const faqPage = {
  path: '/faq/',
  kind: 'faq',
  navLabel: 'FAQ',
  title: 'FAQ: Video Content, Social Media & Ads | Impact Media GTA',
  description:
    'Answers about Impact Media GTA: what we do, where we film, what it costs, which platforms we manage and how to get a free content plan.',
  h1: 'Frequently asked questions about Impact Media GTA',
  display: ['Questions,', 'answered.'],
  intro:
    'Straight answers about how we work with service businesses across the Greater Toronto Area. If your question is not here, ask us through the form below.',
  sections: [],
  faqs: [
    {
      q: 'What does Impact Media GTA do?',
      a: 'We film video at your business with professional videographers, edit it with our in-house team, and run your social media and Facebook and Instagram ads. One team handles it from shoot to post.',
    },
    {
      q: 'Where are you based and which areas do you serve?',
      a: `We are based in Toronto and film on location in ${AREAS}.`,
    },
    {
      q: 'How much does it cost?',
      a: `${pricing.line} Request a free content plan and we'll recommend the right package for your business.`,
    },
    {
      q: 'Do you come to our location?',
      a: 'Yes. Every shoot happens at your business or job site. There is no studio to book.',
    },
    {
      q: 'Who edits the videos?',
      a: 'Our own in-house team of editors edits everything we shoot.',
    },
    {
      q: 'Which social platforms do you manage?',
      a: 'Instagram, TikTok, Facebook and YouTube.',
    },
    {
      q: 'Do you run paid ads?',
      a: 'Yes. We run Facebook and Instagram (Meta) ad campaigns built on the content we film for you.',
    },
    {
      q: 'What types of businesses do you work with?',
      a: 'Service businesses, including auto detailers, cosmetic clinics and med spas, landscapers, contractors and trades, gyms, salons, real estate teams and restaurants.',
    },
    {
      q: 'What is the free content plan?',
      a: "Tell us about your business and we'll map out a month of posts for it. It's free and there is no commitment.",
    },
    {
      q: 'How do we get started?',
      a: 'Fill in the contact form. We reply within one business day.',
    },
  ],
  related: ['/services/video-production/', '/services/social-media-management/', '/services/meta-ads/'],
};

/* ───────────────────────────── Route table ───────────────────────────── */

export const contentPages = [...servicePages, ...industryPages, faqPage, privacyPage];

export const routes = [{ path: '/', kind: 'home' }, ...contentPages];

/** Normalise a browser path to a route path ('/services/x' → '/services/x/'). */
export function normalizePath(pathname = '/') {
  let p = pathname.replace(/index\.html$/, '');
  if (!p.startsWith('/')) p = `/${p}`;
  if (!p.endsWith('/')) p = `${p}/`;
  return p;
}

export function findRoute(pathname) {
  const p = normalizePath(pathname);
  return routes.find((r) => r.path === p) ?? routes[0];
}

export const pageByPath = Object.fromEntries(contentPages.map((p) => [p.path, p]));
