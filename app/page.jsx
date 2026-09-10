import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RegisterMarquee from "../components/RegisterMarquee";
import AboutIntro from "../components/AboutIntro";
import StatsBand from "../components/StatsBand";
import ServicesOverview from "../components/ServicesOverview";
import Process from "../components/Process";
import Footer from "../components/Footer";
import ScrollEndToggle from "../components/ScrollEndToggle";

export default function Home() {
  return (
    <>
      <Navbar onDark />
      <main id="main">
        <Hero />
        <RegisterMarquee />
        <AboutIntro />
        <StatsBand />
        <ServicesOverview />
        <Process />
      </main>
      <Footer />
      <ScrollEndToggle />
    </>
  );
}
