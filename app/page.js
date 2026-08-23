import BackgroundEffects from "../components/BackgroundEffects";
import GlobalInteractions from "../components/GlobalInteractions";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Showreel from "../components/Showreel";
import About from "../components/About";
import PortfolioWrapper from "../components/PortfolioWrapper";
import Services from "../components/Services";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <GlobalInteractions>
      <BackgroundEffects />
      
      <a className="skip-link" href="#main">Skip to main content</a>
      
      <Header />
      
      <main id="main">
        <Hero />
        <Showreel />
        <About />
        <PortfolioWrapper />
        <Services />
        <FAQ />
        <Contact />
      </main>
      
      <Footer />
    </GlobalInteractions>
  );
}
