import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Contact from "../../components/Contact";

export const metadata = {
  title: "Contact — Bench Strength — Minimize Costs. Maximize Reserves",
  description:
    "Scope your next case file with Bench Strength. Tell us what your team needs covered and we'll come back with a clear, practical plan.",
  openGraph: {
    title: "Contact — Bench Strength — Minimize Costs. Maximize Reserves",
    description:
      "Scope your next case file with Bench Strength. Tell us what your team needs covered and we'll come back with a clear, practical plan.",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
