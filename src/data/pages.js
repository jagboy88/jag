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
import { aboutPage } from './about.js';

const AREAS = 'Toronto, Mississauga, Vaughan, Markham, Brampton and across the Greater Toronto Area';

/* ───────────────────────────── Services ─────────────────────────────
 * Body text, bullets and FAQ answers may contain inline links written as
 * [link text](/path/). ContentPage renders them as <a>; structured data
 * gets the plain text.
 */

export const servicePages = [
  {
    path: '/services/video-production/',
    kind: 'service',
    navLabel: 'On-site video production',
    cardText: 'Videographers film at your business, job site or clinic. No studio, no downtime.',
    serviceName: 'On-Site Video Production',
    title: 'On-Site Video Production in Toronto | Impact Media GTA',
    description:
      'Videographers film at your shop, clinic or job site across Toronto and the GTA, then our team edits it for social and ads. Packages from $1,000 CAD.',
    h1: 'On-site video production for service businesses in Toronto and the GTA',
    display: ['We bring the camera', 'to you.'],
    intro:
      "Impact Media GTA is a Toronto video production agency that films where your work actually happens. We come to your shop, clinic, studio or job site and capture your team, your space and your customers' results, so your content shows the real business instead of stock footage.",
    sections: [
      {
        heading: 'Video production built for service businesses',
        body: [
          "Most video production companies are set up for one polished brand film. A service business needs something different: a steady stream of short videos that show the work, the people and the results, week after week. That's what our shoots are planned for.",
          'We film the things that make customers choose you: the skill in the work, the care your team takes, the finished result and the experience of being your customer. One visit gives us enough variety to keep your channels posting long after the shoot.',
        ],
      },
      {
        heading: 'What we film on a shoot day',
        bullets: [
          'Your work in progress, start to finish',
          'Before-and-after results',
          'Your team and the people customers will meet',
          'Your space: shop, clinic, studio or job site',
          'Short clips answering the questions customers ask most',
          'Footage framed specifically for paid ads',
        ],
      },
      {
        heading: 'How a video shoot works, step by step',
        body: [
          'Plan. Before the shoot we agree on a shot list built around the services you want more of, the people customers will meet and the results you are proudest of. The [free content plan](/#contact) is where this starts.',
          'Film. On the day we work around your schedule so the business keeps running. Customers can keep coming in; we fit in around real jobs rather than staging fake ones.',
          'Edit and deliver. The footage goes straight to our [in-house video editing team](/services/video-editing/), who turn it into short-form videos and ad creative ready to post.',
        ],
      },
      {
        heading: 'Vertical video for Reels, TikTok and Shorts',
        body: [
          'Every shoot is planned for how people watch now: vertical video for Instagram Reels, TikTok and YouTube Shorts, plus horizontal versions where they make sense, such as YouTube or your website. Framing, movement and sound are captured with short-form editing in mind, so nothing important ends up cropped out.',
          'If you want us to post the videos too, our [social media management](/services/social-media-management/) service publishes them on a consistent schedule, and the strongest clips can become [Facebook and Instagram ads](/services/meta-ads/).',
        ],
      },
      {
        heading: 'Who on-site video production is for',
        body: [
          'Service businesses whose work is worth seeing: [auto detailers](/industries/auto-detailing/), [cosmetic clinics and med spas](/industries/cosmetic-clinics/), [landscapers](/industries/landscaping/), contractors and trades, gyms, salons and more. If customers judge you on the quality of your work, video of that work is the most convincing thing you can post.',
          "It's less of a fit if you need a scripted TV commercial or studio product photography. We focus on real footage at real businesses.",
        ],
      },
      {
        heading: 'Where we film in the GTA',
        body: [`Our video production team films on location in ${AREAS}. Tell us where your business or job site is when you request your free plan.`],
      },
    ],
    faqs: [
      {
        q: 'Do you come to our location?',
        a: 'Yes. Every shoot happens at your business or job site in the Greater Toronto Area. There is no studio to book.',
      },
      {
        q: 'Do we have to close while you film?',
        a: 'No. We plan the shoot around your schedule and film real work as it happens, so you can keep serving customers.',
      },
      {
        q: 'Who edits the footage?',
        a: 'Our own in-house team edits everything we shoot. See [video editing](/services/video-editing/) for what that includes.',
      },
      {
        q: 'What do you need from us before a shoot?',
        a: 'Tell us which services you want more of and anything customers always ask about. We build the shot list from that, so the content supports your business goals.',
      },
      {
        q: 'How much does video production cost?',
        a: `${pricing.line} The package depends on how often you need new footage and whether we also post and advertise it for you. Request a free content plan and we'll recommend one.`,
      },
      {
        q: 'Can you also post the videos and run ads with them?',
        a: 'Yes. We can run your [social media](/services/social-media-management/) and your [Facebook and Instagram ads](/services/meta-ads/) with the content we shoot, so one team handles everything.',
      },
    ],
    related: ['/services/video-editing/', '/services/social-media-management/', '/services/meta-ads/'],
  },
  {
    path: '/services/video-editing/',
    kind: 'service',
    navLabel: 'Video editing',
    cardText: 'Reels, TikToks, Shorts and ad creative, cut in-house with captions, colour and sound.',
    serviceName: 'Short-Form Video Editing',
    title: 'Short-Form Video Editing in Toronto | Impact Media GTA',
    description:
      'Short-form video editing in Toronto: Reels, TikToks, Shorts and ad creative with captions, colour and sound done in-house. Packages from $1,000 CAD.',
    h1: 'In-house video editing for Instagram Reels, TikTok, YouTube Shorts and ads',
    display: ['Every cut', 'earns its place.'],
    intro:
      "Raw footage doesn't win customers; edited content does. Every video we deliver is cut by Impact Media GTA's own editing team and made for the platform it's going on and the people you want to reach.",
    sections: [
      {
        heading: 'Short-form video editing that stops the scroll',
        body: [
          'On Reels, TikTok and Shorts, people decide in the first couple of seconds whether to keep watching. Our video editing is built around that: a strong opening, tight pacing, captions that carry the story with the sound off, and an ending that tells viewers what to do next.',
          "We don't run your footage through a template. Each edit is cut around what matters to your customers: the result, the people doing the work and a reason to trust you.",
        ],
      },
      {
        heading: "What's included in every edit",
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
        heading: 'One shoot day, a library of videos',
        body: [
          'A single [on-site shoot](/services/video-production/) becomes a library of short-form videos, reels and ad creative ready to post, so your accounts stay active without you filming every week.',
          'We cut the same footage several ways: a quick before-and-after, a process clip, a team introduction, an answer to a common question. Different angles reach different customers and give your [ads](/services/meta-ads/) fresh creative to test.',
        ],
      },
      {
        heading: 'Edited for your industry',
        body: [
          'A detailer, a cosmetic clinic and a landscaper need different content. [Detailing](/industries/auto-detailing/) edits lean on the reveal and the finish. [Clinic](/industries/cosmetic-clinics/) edits focus on the people, the space and clear explanations, within your college\'s advertising rules. [Landscaping](/industries/landscaping/) edits show the transformation from bare yard to finished space.',
        ],
      },
      {
        heading: 'Why in-house editing matters',
        body: [
          'The people editing your videos work alongside the people filming them. Nothing gets lost between a production company and a separate editor, and when your [social media](/services/social-media-management/) shows that a style is working, the next round of edits can follow it straight away.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Who does the editing?',
        a: 'Our own in-house editing team. We do not outsource your edits to a template service.',
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
        q: 'Can you edit footage we filmed ourselves?',
        a: 'Our service is built around footage we shoot at your business, which is what gives the best results. Ask in your free plan request if you have existing footage you want included.',
      },
      {
        q: 'How much does video editing cost?',
        a: `${pricing.line} Editing is part of our packages together with the shoot. Request a free content plan to see what fits your business.`,
      },
    ],
    related: ['/services/video-production/', '/services/social-media-management/', '/services/meta-ads/'],
  },
  {
    path: '/services/social-media-management/',
    kind: 'service',
    navLabel: 'Social media management',
    cardText: 'Instagram, TikTok, Facebook and YouTube run for you, with content we film.',
    serviceName: 'Social Media Management',
    title: 'Social Media Management in Toronto | Impact Media GTA',
    description:
      'Social media management in Toronto for service businesses: Instagram, TikTok, Facebook and YouTube run for you with content we film. From $1,000 CAD.',
    h1: 'Social media management for service businesses in Toronto and the GTA',
    display: ['Your channels,', 'handled.'],
    intro:
      "Most business owners know they should post more and don't have the time. As a Toronto social media management agency, we run your accounts end to end with content we film and edit ourselves, so your channels stay active and on-brand while you focus on the work.",
    sections: [
      {
        heading: 'What our social media management includes',
        bullets: [
          'Instagram, TikTok, Facebook and YouTube',
          'A consistent posting schedule',
          'Captions written for your customers and your area',
          'Replies to comments and community engagement',
          "Monthly reporting on what's working",
        ],
      },
      {
        heading: 'Social media content that is actually yours',
        body: [
          "Templates and stock clips are easy to spot, and customers scroll past them. Because we [film at your business](/services/video-production/), every post shows your real team, work and results, and that's what builds trust with local customers.",
          'That also means you never have to stop work to film something for Instagram. We plan, shoot, [edit](/services/video-editing/) and post; you approve and get on with your day.',
        ],
      },
      {
        heading: 'How we run your accounts',
        body: [
          'We start with a [free content plan](/#contact): a month of posts mapped out for your business. Once you are on board, we film, build a posting schedule and publish on each platform in the format it rewards, such as Reels on Instagram, short videos on TikTok and Shorts on YouTube.',
          'Between posts we reply to comments and keep your profiles up to date, so a customer who finds you on social media sees an active, trustworthy business.',
        ],
      },
      {
        heading: 'Local reach across the GTA',
        body: [
          `Captions, locations and hashtags are written for the areas you serve, so your posts reach people who can actually become customers in ${AREAS}.`,
        ],
      },
      {
        heading: 'Connected to your Facebook and Instagram ads',
        body: [
          'Organic posts build trust; paid ads reach new customers. Your best-performing posts can become [Facebook and Instagram ads](/services/meta-ads/), so what you post and what you pay to promote work together instead of being run by two different companies.',
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
        a: 'No. We [film at your business](/services/video-production/) and edit everything in-house.',
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
        q: 'How much does social media management cost?',
        a: `${pricing.line} Social media management is offered together with the content we film for you. Request a free content plan and we'll recommend a package.`,
      },
    ],
    related: ['/services/video-production/', '/services/meta-ads/', '/industries/cosmetic-clinics/'],
  },
  {
    path: '/services/meta-ads/',
    kind: 'service',
    navLabel: 'Facebook & Instagram ads',
    cardText: 'Meta ad campaigns built on footage of your own business, managed end to end.',
    serviceName: 'Facebook and Instagram Ads Management',
    title: 'Facebook & Instagram Ads in Toronto | Impact Media GTA',
    description:
      'Facebook and Instagram ads for GTA service businesses, built on video we film at your business. Targeting, testing and budgets handled. From $1,000 CAD.',
    h1: 'Facebook and Instagram ads management for service businesses in the GTA',
    display: ['Ads that look', 'like you.'],
    intro:
      "Ads only work as well as the creative in them. We run Meta ad campaigns on Facebook and Instagram using video we film at your business, so your ads show your real work instead of looking like everyone else's.",
    sections: [
      {
        heading: 'Facebook and Instagram ads that bring in bookings',
        body: [
          'For a local service business, the goal of an ad is simple: more calls, messages and bookings from people in the areas you serve. We set up and manage Meta campaigns around that goal, using video of your own business as the creative.',
          'Our clients have seen it work. D Shine Details, a mobile detailer, was fully booked within about three weeks of running ads with us, and Richmond Hill Health And Cosmetic Clinic was almost fully booked for the month. Read their words on our [auto detailing](/industries/auto-detailing/) and [cosmetic clinic](/industries/cosmetic-clinics/) pages.',
        ],
      },
      {
        heading: "What's included in ads management",
        bullets: [
          'Campaign setup on Facebook and Instagram',
          'Targeting people in the areas you serve across the GTA',
          'Ad creative cut from your own footage',
          'Creative testing to find what gets results',
          'Budget management',
        ],
      },
      {
        heading: 'Why ads made from your own footage work better',
        body: [
          'People choosing a detailer, a clinic or a landscaper want to see who they are hiring and what the result looks like. Real footage of your work answers that before they ever call, which stock images and generic graphics cannot do.',
          'Because we [shoot](/services/video-production/) and [edit](/services/video-editing/) the creative ourselves, we can test several versions of an ad, such as a before-and-after, a team introduction and a customer-question clip, and put more budget behind whichever brings in enquiries.',
        ],
      },
      {
        heading: 'Targeting the GTA neighbourhoods you serve',
        body: [
          `Campaigns are aimed at people in the cities and neighbourhoods you actually serve, whether that's one part of Toronto or ${AREAS}. Mobile businesses can target the areas they travel to; shops and clinics can focus on the drive time customers will accept.`,
        ],
      },
      {
        heading: 'One team from shoot to ad',
        body: [
          'The same team films, edits and runs your ads, so fresh creative is ready when a campaign needs it, without waiting on a separate production company. Your ads and your [social media](/services/social-media-management/) also stay consistent, so customers who see an ad and then check your profile find the same business.',
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
        a: 'Yes. We cut ad creative from footage we [film at your business](/services/video-production/).',
      },
      {
        q: 'Can you target only the areas we serve?',
        a: 'Yes. Campaigns target people in the cities and neighbourhoods you serve across the GTA.',
      },
      {
        q: 'How much does Facebook and Instagram ads management cost?',
        a: `${pricing.line} Request a free content plan and we'll recommend a package based on your goals and the areas you serve.`,
      },
    ],
    related: ['/services/video-production/', '/services/social-media-management/', '/industries/landscaping/'],
  },
];

/* ───────────────────────────── Industries ───────────────────────────── */

export const industryPages = [
  {
    path: '/industries/auto-detailing/',
    kind: 'industry',
    navLabel: 'Auto detailers',
    cardText: 'Before-and-after reels and ads for detailing shops and mobile detailers.',
    serviceName: 'Video Marketing for Auto Detailers',
    audience: 'Auto detailing businesses',
    testimonial: 'dshine',
    title: 'Auto Detailing Marketing in Toronto | Impact Media GTA',
    description:
      'Marketing for auto detailers in Toronto: before-and-after reels, social media and Instagram ads. We film at your shop or mobile jobs. From $1,000 CAD.',
    h1: 'Video content, social media and ads for auto detailers in the GTA',
    display: ['Let the finish', 'do the selling.'],
    intro:
      "Detailing is one of the most visual services there is, but most detailers' social media doesn't show it. Whether you run a shop or a mobile detailing business, we film your work, turn it into short-form video, and run the accounts and ads that bring in more bookings.",
    sections: [
      {
        heading: 'Marketing for detailing shops and mobile detailers',
        body: [
          'We film wherever you work: in your bay, or on location at your customers\' driveways and workplaces if you run a mobile detailing business. Our client D Shine Details is a mobile detailer; we filmed at their job sites, handled the editing and ran their Meta ads, and they were fully booked within about three weeks.',
        ],
      },
      {
        heading: 'Detailing content that gets attention',
        bullets: [
          'Before-and-after reveals',
          'Paint correction and ceramic coating in progress',
          'Interior deep-clean transformations',
          'Close-ups of the finish: reflections, gloss and water beading',
          'Your team at work and the handover to the customer',
          'Mobile setups arriving and working on site',
        ],
      },
      {
        heading: 'From your bay to their feed',
        body: [
          'We film a [shoot day](/services/video-production/) at your shop or on your mobile jobs, our in-house team [edits](/services/video-editing/) it into reels and ad creative, and we post and [manage](/services/social-media-management/) your Instagram, TikTok, Facebook and YouTube.',
          'Detailing content works best when it shows the transformation, so we plan shoots around your most visual jobs: heavily soiled interiors, paint correction, coatings and full details.',
        ],
      },
      {
        heading: 'Instagram and Facebook ads for detailers',
        body: [
          '[Facebook and Instagram ads](/services/meta-ads/) put your work in front of car owners in the areas you serve. Mobile detailers can target the neighbourhoods they travel to; shops can target drivers within easy reach. Campaigns can be timed around busy periods, such as spring clean-ups and pre-winter protection.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do you film mobile detailers on location?',
        a: 'Yes. We film at your customers\' locations as you work, the same way we did for D Shine Details.',
      },
      {
        q: 'Do you film at our shop?',
        a: 'Yes. We come to your detailing shop anywhere in the Greater Toronto Area.',
      },
      {
        q: 'What content works best for detailers?',
        a: 'Before-and-after reveals, process clips like paint correction and ceramic coating, interior transformations and close-ups of the finished car.',
      },
      {
        q: 'How much does marketing for a detailing business cost?',
        a: `${pricing.line} Request a free content plan and we'll map out a month of detailing content for your business.`,
      },
    ],
    related: ['/services/meta-ads/', '/services/video-production/', '/industries/landscaping/'],
  },
  {
    path: '/industries/cosmetic-clinics/',
    kind: 'industry',
    navLabel: 'Cosmetic clinics',
    cardText: 'Content and ads that build trust before the consultation, within your college\'s rules.',
    serviceName: 'Video Marketing for Cosmetic Clinics',
    audience: 'Cosmetic clinics and med spas',
    title: 'Cosmetic Clinic Marketing in Toronto | Impact Media GTA',
    description:
      'Marketing for cosmetic clinics and med spas in Toronto: video at your clinic, social media and Instagram ads that drive consultations. From $1,000 CAD.',
    h1: 'Video content, social media and ads for cosmetic clinics and med spas in the GTA',
    display: ['Build trust', 'before the consult.'],
    intro:
      "People choosing a clinic want to know who will be treating them and what the experience is like. We film at your clinic, edit in-house and run your social media and ads, so prospective clients can see it all before they book.",
    sections: [
      {
        heading: 'Med spa and cosmetic clinic marketing that fills the calendar',
        body: [
          'Richmond Hill Health And Cosmetic Clinic came to us when they weren\'t getting any clients or bookings. We filmed at their clinic, edited the content and ran their Meta ads, and they were almost fully booked for the month. Their review is below.',
          'Clinic marketing works when it makes a first visit feel familiar: the people, the space, what a treatment involves and how clients are looked after.',
        ],
      },
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
          "Regulated health professionals in Ontario follow their college's advertising rules, which can limit things like patient testimonials and before-and-after images. Tell us which rules apply to your clinic and we'll plan your content around them, focusing on your team, your space and clear information.",
        ],
      },
      {
        heading: 'From shoot to booked consultations',
        body: [
          'We [film at your clinic](/services/video-production/) at a time that suits your schedule and clients, [edit](/services/video-editing/) the footage in-house and [manage your social media](/services/social-media-management/) so your profiles stay active and on-brand.',
          '[Facebook and Instagram ads](/services/meta-ads/) then put your clinic in front of people in the areas you serve, using footage of your own space and team rather than stock images.',
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
        a: 'Yes. We come to your clinic anywhere in the Greater Toronto Area and work around your appointments.',
      },
      {
        q: 'Do you film clients or patients?',
        a: 'Only with their consent and only where your college\'s rules allow it. Many clinics focus on practitioners, the space and treatment explainers instead.',
      },
      {
        q: 'How much does marketing for a cosmetic clinic cost?',
        a: `${pricing.line} Request a free content plan and we'll map out a month of content for your clinic.`,
      },
    ],
    testimonial: 'rhcc',
    related: ['/services/meta-ads/', '/services/social-media-management/', '/industries/auto-detailing/'],
  },
  {
    path: '/industries/landscaping/',
    kind: 'industry',
    navLabel: 'Landscapers',
    cardText: 'Job-site project reels and ads that turn your best yards into new quotes.',
    serviceName: 'Video Marketing for Landscapers',
    audience: 'Landscaping and hardscaping companies',
    title: 'Landscaping Marketing in Toronto | Impact Media GTA',
    description:
      'Marketing for landscapers in Toronto: job-site video, social media and Facebook ads that turn your best projects into new quotes. From $1,000 CAD.',
    h1: 'Video content, social media and ads for landscapers in the GTA',
    display: ['Show the yard', "they'll get."],
    intro:
      'Homeowners hire landscapers by looking at past work. We film on your job sites, turn each project into short-form video, and run your social media and ads so your best yards reach the homeowners who want one.',
    sections: [
      {
        heading: 'Landscaping marketing built on your real projects',
        body: [
          'Photos of a finished yard are good; a video of the transformation is better. It shows the scale of the job, the skill of your crew and the care you take with a customer\'s property, which is exactly what a homeowner weighs before asking for a quote.',
        ],
      },
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
          'We [film on your job sites](/services/video-production/) while projects are underway in spring and summer, capturing the start, the work in progress and the reveal. Our team [edits](/services/video-editing/) each project into reels, and we plan your posting and ads so you head into next season with a full schedule.',
          'If you offer snow removal, winter content can promote that too, keeping your [social media](/services/social-media-management/) active all year.',
        ],
      },
      {
        heading: 'Reach homeowners where you work',
        body: [
          '[Facebook and Instagram ads](/services/meta-ads/) target homeowners in the cities and neighbourhoods you serve across the GTA. Showing a finished project from the same area tells them you already work nearby.',
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
        a: 'While projects are underway, so we can capture the transformation from start to finish. Several visits across a project give the best before, during and after footage.',
      },
      {
        q: 'Do you work with hardscaping and interlock companies?',
        a: 'Yes. Interlock, patios, walls and other hardscaping installs make strong transformation videos.',
      },
      {
        q: 'How much does marketing for a landscaping company cost?',
        a: `${pricing.line} Request a free content plan and we'll map out a month of content for your company.`,
      },
    ],
    related: ['/services/video-production/', '/services/meta-ads/', '/industries/auto-detailing/'],
  },
];

/* ───────────────────────────── Hub pages ───────────────────────────── */

export const servicesHub = {
  path: '/services/',
  kind: 'hub',
  navLabel: 'Services',
  title: 'Video & Social Media Marketing Services | Impact Media GTA',
  description:
    'Video production, short-form editing, social media management and Facebook and Instagram ads for service businesses in Toronto and the GTA.',
  h1: 'Video and social media marketing services in Toronto and the GTA',
  display: ['One team,', 'shoot to post.'],
  intro:
    'Impact Media GTA is a video and social media marketing agency for service businesses. We film at your business, edit in-house, post to your channels and run your ads. Use one service or let us handle the whole process.',
  cards: servicePages.map((p) => p.path),
  sections: [
    {
      heading: 'How the services fit together',
      body: [
        'Everything starts with [on-site video production](/services/video-production/): real footage of your business. Our team [edits](/services/video-editing/) it into short-form videos, we [post and manage your accounts](/services/social-media-management/), and the strongest clips become [Facebook and Instagram ads](/services/meta-ads/). One team means nothing gets lost between a production company, an editor and an ad agency.',
      ],
    },
  ],
  faqs: [],
  related: ['/industries/', '/about/', '/faq/'],
};

export const industriesHub = {
  path: '/industries/',
  kind: 'hub',
  navLabel: 'Industries',
  title: 'Industries We Serve in the GTA | Impact Media GTA',
  description:
    'Video content, social media and Meta ads for auto detailers, cosmetic clinics and med spas, landscapers and other service businesses in the GTA.',
  h1: 'Video marketing for service businesses across the GTA',
  display: ['Made for', 'your industry.'],
  intro:
    'We work with service businesses whose work is worth seeing. Each industry needs different content and different ads, so we plan every shoot around what your customers want to see before they book.',
  cards: industryPages.map((p) => p.path),
  sections: [
    {
      heading: 'Other service businesses',
      body: [
        'We also work with contractors and trades, gyms and studios, salons and barbershops, real estate teams, and restaurants and cafés. If your customers judge you on the quality of your work, [video of that work](/services/video-production/) is the most convincing thing you can post. Request a free content plan and tell us about your business.',
      ],
    },
  ],
  faqs: [],
  related: ['/services/', '/about/', '/faq/'],
};

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

export const contentPages = [servicesHub, ...servicePages, industriesHub, ...industryPages, faqPage, aboutPage, privacyPage];

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
