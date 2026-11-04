/**
 * Privacy policy. Plain-language, written for Canada's PIPEDA (and Quebec's
 * Law 25 where it applies). Every processor listed here must match what the
 * site and the contact pipeline actually use — update this page whenever a
 * tool is added or removed, and bump `updated`.
 */
import { site } from './site.js';

export const privacyPage = {
  path: '/privacy/',
  kind: 'legal',
  navLabel: 'Privacy',
  title: 'Privacy Policy | Impact Media GTA',
  description:
    'How Impact Media GTA collects, uses, stores and protects personal information sent through impactmediagroup.ca, and how to access or delete it.',
  h1: 'Privacy Policy',
  updated: '2026-11-04',
  updatedLabel: 'November 4, 2026',
  intro: `This policy explains what personal information ${site.name} (“we”, “us”) collects through impactmediagroup.ca, why we collect it, who helps us handle it and the choices you have. We follow Canada’s Personal Information Protection and Electronic Documents Act (PIPEDA).`,
  sections: [
    {
      heading: 'Who is responsible',
      body: [
        `${site.name} is a video content and social media marketing business based in Toronto, Ontario. We are responsible for the personal information we hold and have designated a Privacy Officer to oversee how it is handled.`,
        `Questions, requests or complaints about privacy can be sent to our Privacy Officer at ${site.email}.`,
      ],
    },
    {
      heading: 'What we collect',
      body: ['We only collect what we need to reply to you and prepare your free content plan.'],
      bullets: [
        'Contact form: your name, email address, company (optional), what you need, your monthly budget range and your message.',
        'Email: anything you choose to include when you email us directly.',
        'Security check: when you submit the form, Cloudflare Turnstile checks that you are a person, using signals such as your IP address and browser details. We do not receive these signals; we only receive a pass or fail result.',
        'Technical data: like most websites, our hosting and security providers process your IP address, browser type and the pages you request so the site can load and stay protected from abuse. We use Cloudflare Web Analytics, which counts visits without cookies and without identifying you.',
      ],
    },
    {
      heading: 'Cookies and tracking',
      body: [
        'Our website does not set cookies and does not use advertising or tracking pixels. Your browser stores one small, non-personal value so the intro animation does not replay on every visit. You can clear it at any time in your browser settings.',
      ],
    },
    {
      heading: 'How we use your information',
      bullets: [
        'To reply to your enquiry and prepare the free content plan you asked for.',
        'To provide and invoice our services if you become a client.',
        'To keep the website and contact form secure and free of spam.',
        'To meet our legal, tax and accounting obligations.',
      ],
      after: [
        'We do not sell or rent personal information. We will not add you to a marketing email list unless you agree to it, and every marketing email we send will include a way to unsubscribe.',
      ],
    },
    {
      heading: 'How long we keep it',
      body: [
        'If you contact us and do not become a client, we delete your enquiry within 24 months of our last conversation. If you become a client, we keep your information for as long as we work together and afterwards for as long as Canadian tax and accounting law requires. Security and technical logs kept by our providers are short-lived and deleted on their own schedules.',
      ],
    },
    {
      heading: 'How we protect it',
      body: [
        'The site and contact form use encrypted HTTPS connections, the form is protected against automated spam, and access to our accounts is limited to the people who need it and secured with strong passwords and two-factor authentication. Some of the services we use to run the site and receive messages are located in the United States, so your information may be stored or processed there and be subject to the laws of that country. No method of transmission or storage is completely secure, but we work to protect your information and will notify you and the Privacy Commissioner if a breach creates a real risk of significant harm.',
      ],
    },
    {
      heading: 'Your rights and choices',
      bullets: [
        'Ask what personal information we hold about you and get a copy of it.',
        'Ask us to correct information that is inaccurate or incomplete.',
        'Withdraw your consent or ask us to delete your information, subject to legal or contractual limits.',
      ],
      after: [
        `To make a request, email ${site.email}. We will reply within 30 days. If you are not satisfied with our answer, you can contact the Office of the Privacy Commissioner of Canada at priv.gc.ca.`,
      ],
    },
    {
      heading: 'Children',
      body: [
        'Our services are for businesses. The website is not directed at children and we do not knowingly collect personal information from anyone under 16.',
      ],
    },
    {
      heading: 'Changes to this policy',
      body: [
        'If we change how we handle personal information, we will update this page and the date at the top. Significant changes will be highlighted here.',
      ],
    },
  ],
};
