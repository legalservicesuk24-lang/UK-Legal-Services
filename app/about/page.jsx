import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import About from "../../components/About";
import WhyWeExist from "../../components/WhyWeExist";
import Practitioners from "../../components/Practitioners";
import WhyOutsource from "../../components/WhyOutsource";
import WhatWeDontDo from "../../components/WhatWeDontDo";
import FoundingPartners from "../../components/FoundingPartners";

export const metadata = {
  title: "About — Bench Strength — Minimize Costs. Maximize Reserves",
  description:
    "Specialist case administration, compliance, and operations capacity — on demand, without the overhead of a permanent hire.",
  openGraph: {
    title: "About — Bench Strength — Minimize Costs. Maximize Reserves",
    description:
      "Specialist case administration, compliance, and operations capacity — on demand, without the overhead of a permanent hire.",
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <About />
        <WhyWeExist />
        <Practitioners />
        <WhyOutsource />
        <WhatWeDontDo />
        <FoundingPartners />
      </main>
      <Footer />
    </>
  );
}
