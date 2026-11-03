import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import VideoReel from './components/VideoReel.jsx';
import Services from './components/Services.jsx';
import ContactForm from './components/ContactForm.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    // reducedMotion="user" makes every Framer Motion transition respect the
    // OS-level prefers-reduced-motion setting automatically.
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-jet text-ivory">
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:font-sans focus:text-xs focus:uppercase focus:tracking-luxe focus:text-jet"
        >
          Skip to content
        </a>

        <Navbar />

        <main>
          <Hero />
          <VideoReel />
          <Services />
          <ContactForm />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
