import Hero from '../components/Hero.jsx';
import MarqueeBand from '../components/MarqueeBand.jsx';
import VideoReel from '../components/VideoReel.jsx';
import Services from '../components/Services.jsx';
import ContactForm from '../components/ContactForm.jsx';

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBand />
      <VideoReel />
      <Services />
      <ContactForm />
    </>
  );
}
