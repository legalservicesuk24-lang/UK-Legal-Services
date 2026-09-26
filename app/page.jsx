import { preload } from "react-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutIntro from "../components/AboutIntro";
import StatsBand from "../components/StatsBand";
import ServicesOverview from "../components/ServicesOverview";
import Process from "../components/Process";
import Footer from "../components/Footer";
import ScrollEndToggle from "../components/ScrollEndToggle";
import GlobeBackground from "../components/globe/GlobeBackground";
import ChapterDirector from "../components/globe/ChapterDirector";

/* The homepage is five pinned chapters over one fixed globe. The globe's
   camera keyframes (lib/globe-keyframes.js) are timed to these chapters, so
   adding, removing or reordering one means re-timing the keys. */
export default function Home() {
  preload("/geo/countries-110m.json", { as: "fetch", crossOrigin: "anonymous" });

  return (
    <>
      <GlobeBackground />
      <Navbar onDark />
      <main id="main">
        {/* `home` keeps the Navbar in its dark treatment for the whole page
            (it measures this element's bottom edge). The negative margin pulls
            the chapters up under the sticky header — it must match the
            header's rendered height: py-2 + h-14 logo (+1px border) below sm,
            py-2 + h-16 logo from sm up. */}
        <div
          id="home"
          className="chapters -mt-[calc(4.5rem_+_1px)] sm:-mt-[calc(5rem_+_1px)]"
        >
          <Hero />
          <AboutIntro />
          <StatsBand />
          <ServicesOverview />
          <Process />
        </div>
        <ChapterDirector
          rootId="home"
          labels={["Overview", "Who we are", "Track record", "What we do", "How it runs"]}
        />
      </main>
      <div className="relative z-[2]">
        <Footer />
      </div>
      <ScrollEndToggle />
    </>
  );
}
