import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import HeroSection from "./sections/HeroSection";
import ServicesSection from "./sections/ServicesSection";
import ClientsSection from "./sections/ClientsSection";
import TechStackSection from "./sections/TechStackSection";
import AboutSection from "./sections/AboutSection";
import ProcessSection from "./sections/ProcessSection";
import ContactSection from "./sections/ContactSection";
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
        <TechStackSection />
        <ServicesSection />
        <ClientsSection />
        <AboutSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;
