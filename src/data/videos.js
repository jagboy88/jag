/**
 * Reels shown in the "Our work" marquee. All are Impact Media GTA's own
 * short-form reels, shot and edited in-house. Files live in
 * public/media/reels/: `preview` is a small muted loop for the marquee,
 * `src` is the full-quality version with sound for the lightbox.
 *
 * Only add work the business actually produced, with the client's
 * permission, and label it truthfully (client, industry).
 */
const reel = (id, title) => ({
  id,
  title,
  client: 'Impact Media GTA',
  category: 'Short-form reel',
  preview: `/media/reels/${id}-preview.mp4`,
  src: `/media/reels/${id}.mp4`,
  type: 'video/mp4',
});

export const videos = [
  reel('they-searched', 'They Searched'),
  reel('next-video-question', 'Next Video Question'),
  reel('they-think-youre-closed', 'They Think You’re Closed'),
  reel('12-hours-vs-zero', '12 Hours vs Zero'),
];
