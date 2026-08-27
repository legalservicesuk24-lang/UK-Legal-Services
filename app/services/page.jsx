import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Services from "../../components/Services";

export const metadata = {
  title: "Services — Bench Strength — Minimize Costs. Maximize Reserves",
  description:
    "Five tracked registers — personal insolvency case support, legal & compliance auditing, contract lifecycle admin, CRM data management, and operations & process support.",
  openGraph: {
    title: "Services — Bench Strength — Minimize Costs. Maximize Reserves",
    description:
      "Five tracked registers — personal insolvency case support, legal & compliance auditing, contract lifecycle admin, CRM data management, and operations & process support.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <Services />
      </main>
      <Footer />
    </>
  );
}
