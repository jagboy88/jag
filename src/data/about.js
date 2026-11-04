/**
 * About page. Facts only: add bios, founding year and credentials here
 * when the owners supply them.
 */
import { site } from './site.js';

const [ownerA, ownerB] = site.owners;

export const aboutPage = {
  path: '/about/',
  kind: 'about',
  navLabel: 'About',
  title: 'About Impact Media GTA | Ryan Adamson & Milano S.',
  description:
    'Impact Media GTA is a Toronto video content and social media marketing agency owned by Ryan Adamson and Milano S., serving service businesses across the GTA.',
  h1: 'About Impact Media GTA',
  display: ['Two owners.', 'One team.'],
  intro: `Impact Media GTA is a Toronto-based video content and social media marketing agency for service businesses, owned by ${ownerA} and ${ownerB}. We come to your business, film the work, edit it ourselves and run your social media and Meta ads.`,
  sections: [
    {
      heading: 'Who we are',
      body: [
        `${site.name} is owned and run by ${ownerA} and ${ownerB}. We are based in Toronto and work with service businesses across the Greater Toronto Area, including Mississauga, Vaughan, Markham and Brampton.`,
      ],
    },
    {
      heading: 'What we do',
      bullets: [
        'On-site shoots at your business or job site — no studio needed.',
        'Editing done by our own team, with captions, sound and pacing made for social.',
        'Social media management across Instagram, TikTok, Facebook and YouTube.',
        'Facebook and Instagram ad campaigns built on the content we film.',
      ],
    },
    {
      heading: 'How we work',
      body: [
        'We plan the shoot around your services, people and customers, film everything on location, and turn the footage into a library of short-form videos and ad creative. Then we post it, manage your accounts and run your ads, so you never have to film or edit anything yourself.',
      ],
    },
  ],
  testimonial: ['dshine', 'rhcc'],
  related: ['/services/video-production/', '/services/social-media-management/', '/services/meta-ads/'],
};
