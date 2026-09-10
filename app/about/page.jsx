import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ScrollEndToggle from "../../components/ScrollEndToggle";
import About from "../../components/About";
import WhyWeExist from "../../components/WhyWeExist";
import Practitioners from "../../components/Practitioners";
import WhyOutsource from "../../components/WhyOutsource";
import WhatWeDontDo from "../../components/WhatWeDontDo";
import FoundingPartners from "../../components/FoundingPartners";
import { pageMetadata } from "../../lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Specialist case administration, compliance and operations capacity for UK insolvency and legal firms — on demand, without the overhead of a permanent hire.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <About />
        <WhyWeExist />
        <Practitioners />
        <WhyOutsource />
        <WhatWeDontDo />
        <FoundingPartners />
      </main>
      <Footer />
      <ScrollEndToggle />
    </>
  );
}
