# Impact Media GTA — Website

Corporate website for **Impact Media GTA**, a Greater Toronto Area content agency for service-based businesses: on-site shoots with professional videographers, in-house editing, social media management and Meta ads.

Contact: contact@impactmediagroup.ca · Instagram [@impactmediagta](https://www.instagram.com/impactmediagta)

Luxury dark theme — Jet Black `#000000` · Bright White `#FFFFFF` · Premium Gold `#D4AF37`.
Typography — **Bodoni Moda** (display, optical-size axis) + **Jost** (body/labels), the "Luxury Minimalist" pairing from the UI/UX Pro Max typography database.
No image files anywhere: the visual engine is built entirely from semantic HTML5 `<video>` players and typography.

## Stack

- [React 18](https://react.dev) + [Vite 5](https://vitejs.dev)
- [Tailwind CSS 3](https://tailwindcss.com)
- [Three.js](https://threejs.org) via [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) — hero particle scene (lazy-loaded chunk)
- [GSAP 3](https://gsap.com) + ScrollTrigger + SplitText — intro, headline reveal, scroll reveals, pinned process, marquee band, tilt, magnetic CTAs, cursor
- [Lenis](https://lenis.darkroom.engineering) — smooth scrolling
- [Framer Motion](https://www.framer.com/motion/) — lightbox and mobile drawer transitions

## Motion system

| Piece | File | Notes |
|---|---|---|
| Intro preloader | `components/Preloader.jsx` | Counter + gold rule + curtain lift; once per session (`sessionStorage`) |
| Hero 3D scene | `components/three/HeroScene.jsx` | 3000-point gold torus knot + dust, pointer parallax, pauses off-screen, `dpr ≤ 1.5` |
| Headline reveal | `components/Hero.jsx` | SplitText chars flip in on a 3D axis after the intro |
| Smooth scroll | `components/SmoothScroll.jsx` | Lenis driven by GSAP's ticker; overlays pause it via `lib/scrollLock.js` |
| Marquee band | `components/MarqueeBand.jsx` | Infinite ticker; skews and speeds up with scroll velocity |
| Pinned process | `components/Services.jsx` | Desktop (≥1024px) only: section pins, steps sweep horizontally with a gold progress line |
| Reel tilt | `components/VideoReel.jsx` | 3D tilt toward the pointer, transform/scale only |
| Magnetic CTAs | `components/MagneticLink.jsx` | Elastic pull, clamped to 0.3 so the hit box is never left |
| Custom cursor | `components/Cursor.jsx` | Gold dot + ring; `data-cursor-label="Play"` shows a word inside |

**Reduced motion:** every effect checks `prefers-reduced-motion`. With it on there is no preloader, no Lenis, no cursor, no tilt/magnetic, the marquees stop (the reel becomes hand-scrollable), Framer Motion is set to `reducedMotion="user"`, and the 3D scene draws a single static frame.

**Pointer:** cursor, tilt and magnetic effects are enabled only for `(hover: hover) and (pointer: fine)` devices.

**Sequencing:** `lib/intro.js` lets sections wait for the preloader curtain (`onIntroDone`). Import GSAP from `lib/gsap.js`, which registers the plugins once.

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
  App.jsx                   # Page assembly (SmoothScroll → Preloader, Cursor, sections, vignette)
  index.css                 # Tailwind layers, brand classes, cursor/vignette, reduced-motion rules
  lib/
    gsap.js                 # GSAP + plugin registration, reduced-motion / pointer helpers
    intro.js                # Preloader → sections hand-off
    scrollLock.js           # Shared scroll lock for overlays (pauses Lenis)
  data/
    site.js                 # Brand constants, nav links, services / process / industries copy
    videos.js               # Video asset metadata for the reel
  components/
    SmoothScroll.jsx        # Lenis provider
    Preloader.jsx           # Cinematic intro
    Cursor.jsx              # Custom gold cursor
    MagneticLink.jsx        # Magnetic CTA wrapper
    Navbar.jsx              # Glassmorphism header, responsive drawer, sticky CTA
    Hero.jsx                # 3D scene + SplitText headline
    MarqueeBand.jsx         # Velocity-reactive ticker
    VideoReel.jsx           # Infinite video marquee with 3D tilt tiles
    VideoModal.jsx          # Full-screen unmuted lightbox
    Services.jsx            # Services list, pinned horizontal process, industries, CTA
    ContactForm.jsx         # Inquiry form with validation + error summary
    Footer.jsx              # Parallax wordmark, links, Instagram
    three/
      HeroScene.jsx         # React Three Fiber particle knot
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

All copy that identifies the company (name, region, email, Instagram `@impactmediagta`, nav links, services, process steps, industries) lives in `src/data/site.js`.

## Deploying

Live at **https://jagboy88.github.io/jag/**

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on **every push to `master`** (and can be run manually from the Actions tab). Pages is configured with **Settings → Pages → Source: GitHub Actions**.
