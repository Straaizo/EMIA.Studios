import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./sections/HeroSection";
import ServicesSection from "./sections/ServicesSection";
import AboutSection from "./sections/AboutSection";
import ProcessSection from "./sections/ProcessSection";
import CTASection from "./sections/CTASection";
import { useLenis } from "./hooks/useLenis";

function App() {
  useLenis();

  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ProcessSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

export default App;
