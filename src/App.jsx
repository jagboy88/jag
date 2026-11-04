import { MotionConfig } from 'framer-motion';
import SmoothScroll from './components/SmoothScroll.jsx';
import Preloader from './components/Preloader.jsx';
import Cursor from './components/Cursor.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import ContentPage from './pages/ContentPage.jsx';
import LegalPage from './pages/LegalPage.jsx';
import { findRoute, pageByPath } from './data/pages.js';

/**
 * Each URL is prerendered to its own HTML file (scripts/prerender.mjs) and
 * hydrated here with the same path, so links between pages are plain
 * <a href> navigations.
 */
export default function App({ path = '/' }) {
  const route = findRoute(path);
  const isHome = route.kind === 'home';

  return (
    // reducedMotion="user" makes every Framer Motion transition respect the
    // OS-level prefers-reduced-motion setting automatically.
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <Preloader enabled={isHome} />
        <Cursor />

        <div className="relative min-h-screen bg-jet text-ivory">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:font-sans focus:text-xs focus:uppercase focus:tracking-luxe focus:text-jet"
          >
            Skip to content
          </a>

          <Navbar isHome={isHome} />

          <main id="main">
            {isHome ? (
              <HomePage />
            ) : route.kind === 'legal' ? (
              <LegalPage page={pageByPath[route.path]} />
            ) : (
              <ContentPage page={pageByPath[route.path]} />
            )}
          </main>

          <Footer isHome={isHome} />
        </div>

        {/* Cinematic vignette over everything except overlays */}
        <div aria-hidden="true" className="vignette" />
      </SmoothScroll>
    </MotionConfig>
  );
}
