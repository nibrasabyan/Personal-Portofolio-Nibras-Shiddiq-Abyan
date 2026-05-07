import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import Certificates from './components/Certificates.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import LoadingScreen from './components/ui/LoadingScreen.jsx';
import CustomCursor from './components/ui/CustomCursor.jsx';
import ScrollProgressBar from './components/ui/ScrollProgressBar.jsx';
import { experiences, navSections } from './data/content.js';

function App() {
  // Build the visible section list. Hide "experience" automatically when empty.
  const visibleSections = navSections.filter(
    (s) => s !== 'experience' || experiences.length > 0
  );

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar sections={visibleSections} />

      <main className="relative" data-testid="app-main">
        <Hero />
        {visibleSections.includes('about') && <About />}
        {visibleSections.includes('skills') && <Skills />}
        {visibleSections.includes('experience') && <Experience />}
        {visibleSections.includes('certificates') && <Certificates />}
        {visibleSections.includes('projects') && <Projects />}
        {visibleSections.includes('contact') && <Contact />}
      </main>

      <Footer />
    </>
  );
}

export default App;
