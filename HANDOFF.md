# Handoff — Impact Media GTA website

_Last updated: 2026-11-04 · Repo: `jagboy88/jag` (branch `master`) · Live: **https://impactmediagroup.ca**_

---

## 1. The goal

A marketing website for **Impact Media GTA**, a content agency in the Greater Toronto Area. The site should win leads from **service businesses** (auto detailers, cosmetic clinics, landscapers, contractors and similar) and send every lead to the owner's iPhone instantly.

**What the business does:** films on location at the client's business with professional videographers, edits everything with an in-house team, and runs the client's social media (Instagram, TikTok, Facebook, YouTube) and Meta (Facebook and Instagram) ads.

**Fixed brand rules**
- Colours: jet black `#000000`, white `#FFFFFF`, gold `#D4AF37`
- **No image files on the page.** Visuals come from video, type and a 3D WebGL scene only.
- Fonts: **Instrument Serif** (display) + **Jost** (body). Bodoni Moda was tried and rejected for poor spacing.
- Email: `contact@impactmediagroup.ca` · Instagram: `@impactmediagta`
- Price as published: **"Packages start at $1,000 CAD."** Whether that's per month or per shoot is unconfirmed (see To-do).
- Primary CTA: **"Get a free content plan"** (set in `src/data/site.js` → `cta`).

---

## 2. Current state

**Everything is committed, pushed and live.** Nothing is in progress.

| Area | Status |
|---|---|
| Site live on `impactmediagroup.ca` via GitHub Pages + Cloudflare proxy | ✅ |
| 9 prerendered pages (home, 4 service, 3 industry, FAQ), each with its own HTML, title, description, canonical, Open Graph tags and JSON-LD | ✅ |
| `sitemap.xml` (generated at build), `robots.txt`, `llms.txt`, branded `404.html` | ✅ |
| Contact form → Cloudflare Worker → **Pushover push to iPhone** | ✅ Tested end to end |
| Turnstile bot check enforced on the form | ✅ Tests without a token or with a fake token get 403 |
| D Shine Details testimonial (approved, quoted exactly) on the homepage and the auto detailing page | ✅ |
| Google Search Console + Bing Webmaster Tools set up, sitemap submitted | ✅ (done by the owner) |
| Google Business Profile created | ✅ Created; **verification status unknown** |
| Worker rate limits (per-IP and site-wide) | ⚠️ Deployed but **not blocking**; see Failed attempts |

**Stack:** React 18 + Vite 5 + Tailwind 3 · Three.js / React Three Fiber · GSAP 3 (ScrollTrigger, SplitText) · Lenis smooth scroll · Framer Motion · Cloudflare Worker (contact form) · GitHub Actions (deploys).

**Deploys run automatically on push to `master`:**
- `.github/workflows/deploy.yml`: builds and publishes the site to GitHub Pages
- `.github/workflows/deploy-worker.yml`: tests and deploys the Worker when `worker/**` changes

**Secrets are stored in GitHub Actions secrets only, never in code:** `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `PUSHOVER_TOKEN`, `PUSHOVER_USER`, `TURNSTILE_SECRET`. The Turnstile **site key** is public and lives in `src/data/site.js`.

---

## 3. Files in flight

**None.** The working tree is clean, and the latest commit is `f811547 Add D Shine Details testimonial`.

### Key files map

| File | What it is |
|---|---|
| `src/data/site.js` | Brand constants, `pricing`, `cta`, nav, homepage services/process/industries |
| `src/data/pages.js` | **All service, industry and FAQ page copy and the route table.** To add a page, add an entry here. |
| `src/data/testimonials.js` | Approved client quotes (verbatim only) |
| `src/data/videos.js` | Reel clips. **Still demo footage**; swap in real URLs here. |
| `src/lib/seo.js` | Per-page `<head>` tags and JSON-LD (ProfessionalService, Service, BreadcrumbList, FAQPage) |
| `scripts/prerender.mjs` | Renders every route to `dist/<path>/index.html` and writes `sitemap.xml` |
| `src/App.jsx` / `src/main.jsx` / `src/entry-server.jsx` | Path-based rendering and hydration (no client router; links are plain `<a href>`) |
| `src/pages/HomePage.jsx`, `src/pages/ContentPage.jsx` | Page templates |
| `src/components/*` | Navbar, Hero (3D), MarqueeBand, VideoReel/VideoModal, Testimonial, Services, ContactForm, Turnstile, Footer, Preloader, Cursor, MagneticLink, SmoothScroll |
| `worker/src/index.js` | Contact endpoint: origin check, honeypot, rate limits, Turnstile, Pushover |
| `worker/test/contact.test.js` | 12 Worker tests (`cd worker && npm test`) |
| `public/llms.txt` | Plain-text business summary for AI assistants (**edit by hand when the site changes**) |
| `.claude/skills/` | Installed project skills: `ui-ux-pro-max` (plus design, design-system, ui-styling, brand, banner-design, slides) and `prompt-master` |

**Build and test commands:** `npm run build` (client + SSR + prerender) · `npm run build:client` (no prerender) · `npm run lint` · `npm run preview` · `cd worker && npm test`.

---

## 4. What's been changed (summary)

1. **Scaffolded** the React/Vite/Tailwind site: glass navbar, typographic hero, infinite video marquee, unmuted lightbox, services, contact form, footer.
2. **Repositioned the copy** for service businesses (shoot, edit, social, Meta ads) and changed the email to `contact@impactmediagroup.ca`.
3. **Applied UI/UX Pro Max recommendations:** 44px touch targets, form validation with an error summary, a pause control on the reel, reduced-motion support, and contrast fixes.
4. **Motion/3D layer:** preloader (about 1.3 s, shown once per 24 h, homepage only), a gold particle torus-knot WebGL hero (lazy-loaded; skipped on Save-Data, devices with ≤2 GB RAM and devices without WebGL), SplitText headline, Lenis smooth scroll, a velocity-reactive marquee, a pinned horizontal process section (desktop only), 3D tilt reel tiles, magnetic CTAs and a custom cursor.
5. **Hosting:** GitHub Pages with auto-deploy, a custom domain through Cloudflare, Full (strict) SSL, and the `www` → apex redirect.
6. **SEO/GEO audit fixes:** prerendering (the site used to be empty without JS), keyword-bearing headings (the small gold eyebrows are the `h1`/`h2`; the large display lines are paragraphs), canonical, Open Graph tags, favicon, JSON-LD, robots/sitemap/404, and a lower-commitment CTA.
7. **Contact pipeline:** Cloudflare Worker at `/api/contact` sends a Pushover push. The form falls back to `mailto:` if the endpoint is unreachable. Turnstile is enforced.
8. **Multi-page site:** 4 service pages, 3 industry pages (auto detailing, cosmetic clinics, landscaping) and `/faq/`, each with an FAQ and FAQPage schema, plus links between pages and a footer with Services/Industries/FAQ columns.
9. **Starting price** published everywhere; **`llms.txt`** added; **D Shine Details testimonial** added.
10. **Page title/description:** "Impact Media GTA — Video Content, Social & Meta Ads for Service Businesses".

---

## 5. Failed attempts / gotchas

- **Worker rate limits don't block.** The `[[ratelimits]]` bindings (`IP_LIMITER` 3 per 60 s, `GLOBAL_LIMITER` 20 per 60 s) are deployed (the deploy log shows both), but 60 parallel test requests all got through. The cause is unknown; Cloudflare documents the feature as approximate and per-location. The code is still in place and harmless. **A reliable alternative:** a Cloudflare WAF rate-limiting rule (dashboard) or a Durable Object counter.
- **Bodoni Moda font:** rejected for its spacing; replaced with Instrument Serif.
- **The `npx ui-ux-pro-max-cli` installer was blocked** by the sandbox's permission check. The skills were copied in manually instead.
- **The first GitHub Pages deploy failed** because Pages wasn't enabled. Fixed by setting Settings → Pages → Source: **GitHub Actions**.
- **`node --test worker/test/`** fails on Node 22 (it doesn't accept a directory). Use `node --test worker/test/*.test.js`.
- **The SSR build failed with `manualChunks`.** The fix: the vite config skips chunking when `isSsrBuild`.
- **Nested routes need `base: '/'`** in `vite.config.js`. Relative `./` broke asset paths on `/services/...`.
- **Headless browser tests:** the moving marquee makes Playwright clicks "unstable" (hover first, or use the mouse API). Turnstile keeps the network busy on localhost, so use `waitUntil: 'load'`, not `networkidle`. The real Turnstile key only works on `impactmediagroup.ca`.
- **Testing the form on the live site sends a real push.** For safe tests, use honeypot requests (`"website":"x"`) or requests with no token or a fake token (both rejected).
- **Don't write or edit testimonials.** Only use client-approved wording, quoted exactly.

---

## 6. Next steps / To-do

### Owner (not code)
- [ ] **Confirm the price unit:** is $1,000 CAD per month or per shoot? (Then update `pricing.line` in `src/data/site.js` and `public/llms.txt`.)
- [ ] **Do one real form test from your phone** on impactmediagroup.ca (with Turnstile active) and confirm the push arrives.
- [ ] **Finish Google Business Profile verification** (usually a video), then fill in services, photos/videos, website and hours.
- [ ] Use the description already written for the profile (about 700 characters, no price, URL or phone).
- [ ] **Get reviews:** send the GBP review link to 5–10 past clients, and ask D Shine to post his quote as a Google review. Reply to every review.
- [ ] **Bing Places** (import from GBP) and **Apple Business Connect**.
- [ ] **Resubmit `https://impactmediagroup.ca/sitemap.xml`** in Search Console and Bing now that there are 9 pages.
- [ ] **Cloudflare:** Caching → Cache Rules: `/assets/*` Edge and Browser TTL = 1 year. Caching → Configuration → **Crawler Hints: On**. Check that Security → Bots / AI Crawl Control does **not** block AI *search* crawlers (OAI-SearchBot, ChatGPT-User, PerplexityBot).
- [ ] Optional: **WAF rate-limit rule** (Security → WAF → Rate limiting rules): `/api/contact`, POST, 5 requests per 10 s per IP, block.
- [ ] Ask D Shine whether his **city** can be added to his testimonial.
- [ ] Skim three claims on the new pages and confirm they're true: cosmetic clinics ("we'll plan around your college's advertising rules"), landscaping (snow-removal content suggestion), social media ("monthly reporting").
- [ ] Post one GBP update a week; list on Yelp, Clutch, DesignRush and Facebook with the same name, website and phone; ask clients for "Video by Impact Media GTA" credit links.

### Waiting on owner input, then code
- [ ] **Real footage** for the reel: 6–8 MP4s, 15–30 s each, ≤8 MB, direct URLs, plus client, industry and city for each → `src/data/videos.js` (then add `VideoObject` schema, captions and `poster` frames).
- [ ] **GBP share link + review link** → add to JSON-LD `sameAs` and a "Review us on Google" link in the footer/contact section.
- [ ] **Phone/WhatsApp number** (if wanted) → nav, contact section, footer, schema `telephone`.
- [ ] **More testimonials** (approved wording only) → `src/data/testimonials.js`.
- [ ] **Real figures** (videos per shoot day, turnaround time) → page copy and `llms.txt`.
- [ ] **`og:image` decision:** yes/no to a single 1200×630 share image (the only image file the site would have).

### Code, ready when wanted
- [ ] Short FAQ section on the **homepage** (4–5 questions, FAQPage schema, link to `/faq/`).
- [ ] More industry pages (add entries to `src/data/pages.js`; the page, sitemap entry and schema are generated automatically).
- [ ] Fix rate limiting properly (Durable Object counter) if the WAF rule isn't used.
- [ ] Optional: an automatic AI-drafted "free content plan" on form submission, or an AI chat assistant on the site.
