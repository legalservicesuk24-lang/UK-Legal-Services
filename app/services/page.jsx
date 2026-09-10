import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Services from "../../components/Services";
import { pageMetadata } from "../../lib/metadata";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Six specialist registers for UK firms: insolvency case support, compliance auditing, contract and CRM admin, operations support and software development.",
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
