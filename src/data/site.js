/**
 * Site-wide constants: brand identity, navigation and social links.
 * Edit here once and every component (Navbar, Footer, Contact) updates.
 */
export const site = {
  name: 'Impact Media GTA',
  shortName: 'Impact Media',
  region: 'Greater Toronto Area',
  tagline: 'Content, social and ads for service businesses — done for you.',
  email: 'contact@impactmediagroup.ca',
  instagram: {
    handle: '@impactmediagta',
    url: 'https://www.instagram.com/impactmediagta',
  },
};

/**
 * Primary call to action. A free, specific, low-commitment next step
 * converts better than "book a shoot" for a first-time visitor.
 */
export const cta = {
  primary: 'Get a free content plan',
  short: 'Free plan', // compact mobile-header button
  subline: "We'll map out a month of posts for your business. No commitment.",
  submit: 'Request my free plan',
};

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

/**
 * The four pillars of the offer. Ordered the way a client experiences
 * them: we come to you, we shoot, we edit, we run the channels.
 */
export const services = [
  {
    index: '01',
    title: 'On-Site Content Shoots',
    description:
      'We come to your business. Professional videographers capture your team, your space and your work in action — no studio, no downtime.',
  },
  {
    index: '02',
    title: 'In-House Editing',
    description:
      'Every clip is cut by our own team of highly trained editors. Colour, sound, captions and pacing tuned for how people actually scroll.',
  },
  {
    index: '03',
    title: 'Social Media Management',
    description:
      'We run your Instagram, TikTok, Facebook and YouTube end to end — posting schedule, captions, community replies and monthly reporting.',
  },
  {
    index: '04',
    title: 'Meta Ads',
    description:
      'Paid campaigns across Facebook and Instagram, built on the content we shoot for you. Targeting, creative testing and budget management handled.',
  },
];

/**
 * How an engagement runs, start to finish.
 */
export const process = [
  {
    step: '01',
    title: 'We come to you',
    description:
      'A shoot day at your location. Our videographers plan the shot list around your services, your people and your customers.',
  },
  {
    step: '02',
    title: 'We edit everything',
    description:
      'Footage goes straight to our editing team. You get a library of short-form videos, reels and ad creative — ready to post.',
  },
  {
    step: '03',
    title: 'We run your channels',
    description:
      'We publish, manage and grow your social accounts, and run Meta ad campaigns that turn the content into booked work.',
  },
];

/**
 * The kinds of service businesses we work with. Shown as a typographic
 * list — edit freely to match your real client base.
 */
export const industries = [
  'Contractors & Trades',
  'Clinics & Med Spas',
  'Gyms & Studios',
  'Salons & Barbershops',
  'Real Estate Teams',
  'Restaurants & Cafés',
  'Auto Detailing & Shops',
  'Law & Accounting Firms',
];
