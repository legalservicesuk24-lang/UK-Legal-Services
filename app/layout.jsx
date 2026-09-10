import { Figtree, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "../components/JsonLd";
import { SITE_URL, SITE_NAME } from "../lib/site";

/* One typeface for everything, which is how the Rezibase FE is set up
   (`--font-sans: 'Figtree'`). Figtree is variable across 300-900, so a single
   family covers 96px display headings and 12px UI labels without needing
   Manrope alongside it — and one family loading instead of three is less to
   download and one less thing to keep consistent.

   This replaces the Inter/Manrope/Fraunces trio. The serif experiment is in
   git if the editorial direction is wanted back.

   Mono stays: the .file-tag / register-reference idiom depends on it. */
const sans = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
  display: "swap",
});

/* Home <title>. Descriptive and keyword-led — the slogan lives in the hero,
   not the tab. `template` appends the brand to every child page's own title
   ("About" -> "About | Bench Strength") without each page restating it. */
const DEFAULT_TITLE =
  "Bench Strength — Insolvency & Compliance Support for UK Firms";
const DESCRIPTION =
  "Practical, done-right insolvency case support, legal compliance auditing, and back-office admin for UK firms.";

export const metadata = {
  /* Resolves relative OG/canonical URLs against the production origin, so
     `openGraph.url: "/"` and `alternates.canonical` emit absolute URLs and the
     build no longer falls back to localhost. */
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_GB",
    title: DEFAULT_TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DESCRIPTION,
  },
};

/* Organization + WebSite structured data. Rendered once on every page via the
   root layout so crawlers and AI assistants have a stable entity for the firm
   regardless of entry point. */
const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      email: "info@benchstrength.uk",
      description:
        "Specialist operations, compliance, and case-administration support for UK insolvency, legal, and advisory firms.",
      areaServed: { "@type": "Country", name: "United Kingdom" },
      contactPoint: {
        "@type": "ContactPoint",
        email: "info@benchstrength.uk",
        contactType: "sales",
        availableLanguage: "English",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-GB",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-GB"
      /* Next 16 no longer overrides `scroll-behavior: smooth` (set on html in
         globals.css) during route transitions, so navigation would animate a
         long smooth scroll to the top instead of jumping. This opts back into
         the old instant-scroll behaviour while keeping smooth in-page anchors. */
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${mono.variable}`}
    >
      <body>
        <JsonLd data={ORG_JSON_LD} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink-900 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
