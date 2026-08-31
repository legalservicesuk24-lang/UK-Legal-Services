import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RegisterMarquee from "../components/RegisterMarquee";
import ProofBand from "../components/ProofBand";
import AboutIntro from "../components/AboutIntro";
import ServicesOverview from "../components/ServicesOverview";
import Process from "../components/Process";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <RegisterMarquee />
        <ProofBand />
        <AboutIntro />
        <ServicesOverview />
        <Process />
      </main>
      <Footer />
    </>
  );
}
