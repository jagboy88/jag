# Impact Media GTA — Website

Corporate website for **Impact Media GTA**, a media production company based in the Greater Toronto Area.

Luxury dark theme — Jet Black `#000000` · Bright White `#FFFFFF` · Premium Gold `#D4AF37`.
No image files anywhere: the visual engine is built entirely from semantic HTML5 `<video>` players and typography.

## Stack

- [React 18](https://react.dev) + [Vite 5](https://vitejs.dev)
- [Tailwind CSS 3](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) for entrance animations and the lightbox transitions

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production bundle → dist/
npm run preview   # serve the production bundle locally
npm run lint
```

## Project structure

```
index.html
src/
  main.jsx                  # React entry
  App.jsx                   # Page assembly
  index.css                 # Tailwind layers + brand component classes
  data/
    site.js                 # Brand constants, nav links, services copy
    videos.js               # Video asset metadata for the reel
  components/
    Navbar.jsx              # Glassmorphism header, responsive drawer
    Hero.jsx                # Bold typographic hero
    VideoReel.jsx           # Infinite marquee of muted autoplay videos
    VideoModal.jsx          # Full-screen unmuted lightbox
    Services.jsx            # Typography-forward capabilities list + About strip
    ContactForm.jsx         # Inquiry form with gold accents
    Footer.jsx              # Links, Instagram, attribution
    icons/
      InstagramIcon.jsx     # Inline SVG glyph (no image assets)
```

## Swapping video sources

Edit `src/data/videos.js`. Each entry:

```js
{
  id: 'unique-key',
  title: 'Momentum',
  client: 'Brand Film',
  category: 'Commercial',
  src: 'https://your-cdn.com/clip.mp4',
  type: 'video/mp4',
}
```

Keep `id` unique — it drives React keys and lightbox selection. Use H.264 MP4 (or WebM) hosted on a CDN that supports range requests for smooth scrubbing.

## Reel behaviour

- Tiles autoplay `muted · loop · playsinline`; an `IntersectionObserver` pauses off-screen tiles to save bandwidth.
- The track is duplicated once and translated `-50%` for a seamless infinite loop (`animate-marquee` in `tailwind.config.js` — adjust `60s` to change speed).
- Hovering the track or opening the lightbox pauses the marquee.
- Clicking a tile opens `VideoModal`, which unmutes and plays immediately, exposes native controls, and closes via the gold button, `Esc`, or a backdrop click.

## Contact form

`ContactForm.jsx` ships with a `mailto:` fallback so it works with no backend. To wire a real endpoint, replace the body of the `send()` function with a `fetch` to Formspree, Resend, a serverless function, etc.

## Brand constants

All copy that identifies the company (name, region, email, Instagram `@impactmediagta`, nav links, service descriptions) lives in `src/data/site.js`.
