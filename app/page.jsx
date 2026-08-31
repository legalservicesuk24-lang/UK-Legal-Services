import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutIntro from "../components/AboutIntro";
import ServicesOverview from "../components/ServicesOverview";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <AboutIntro />
        <ServicesOverview />
      </main>
      <Footer />
    </>
  );
}
