import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Services from "../../components/Services";

export const metadata = {
  title: "Services — Bench Strength — Minimize Costs. Maximize Reserves",
  description:
    "Six tracked registers — personal insolvency case support, legal & compliance auditing, contract lifecycle admin, CRM data management, operations & process support, and end-to-end software development.",
  openGraph: {
    title: "Services — Bench Strength — Minimize Costs. Maximize Reserves",
    description:
      "Six tracked registers — personal insolvency case support, legal & compliance auditing, contract lifecycle admin, CRM data management, operations & process support, and end-to-end software development.",
  },
};

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
