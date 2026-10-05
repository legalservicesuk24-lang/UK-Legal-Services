import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Contact from "../../components/Contact";
import { pageMetadata } from "../../lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Scope your next case file with Bench Strength. Tell us what your team needs covered and we'll come back with a clear, practical plan.",
  path: "/contact",
});

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
