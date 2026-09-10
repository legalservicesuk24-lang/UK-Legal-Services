import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Services from "../../components/Services";
import { pageMetadata } from "../../lib/metadata";

export const metadata = pageMetadata({
  title: "Services — Bench Strength — Minimize Costs. Maximize Reserves",
  description:
    "Six tracked registers — personal insolvency case support, legal & compliance auditing, contract lifecycle admin, CRM data management, operations & process support, and end-to-end software development.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Services />
      </main>
      <Footer />
    </>
  );
}
