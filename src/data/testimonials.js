/**
 * Client testimonials. Only add wording the client has written or approved,
 * quoted exactly (whitespace tidy-ups only). Record when and how approval
 * was given so it can be shown if ever asked.
 */
export const testimonials = {
  dshine: {
    id: 'dshine',
    // Approved by the owner, sent to Impact Media GTA on 2026-11-04; also
    // posted by them as a five-star Google review.
    quote:
      'Impact Media came to our mobile detailing sites, filmed all our work, handled the editing, and our meta ads. After around 3 weeks of running meta ads I got fully booked out for details and had to stop accepting new clients for the month and half of next month. They made it super easy didn’t have to film or edit anything ourselves.',
    author: 'Owner · Google review',
    company: 'D Shine Details',
    industry: 'Mobile auto detailing',
    // Short pull-quote shown large; must be a verbatim excerpt of `quote`.
    highlight: 'After around 3 weeks of running meta ads I got fully booked out',
    source: 'google',
  },
  rhcc: {
    id: 'rhcc',
    // Five-star Google review, sent by the owners on 2026-11-04. Verbatim.
    quote:
      'The team at impact media helped me out with my business tons when we weren’t getting any clients or bookings, we started working with impact they came to our clinic, shot content for us, then edited them and also ran the meta ads which were amazing and got us almost fully booked out for the month! I recommend these guys to anyone struggling to get bookings or anyone who wants more bookings',
    author: 'Google review',
    company: 'Richmond Hill Health And Cosmetic Clinic',
    industry: 'Cosmetic clinic',
    highlight: 'got us almost fully booked out for the month',
    source: 'google',
  },
};
