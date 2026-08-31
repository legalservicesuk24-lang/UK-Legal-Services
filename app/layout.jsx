import { Figtree, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

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

export const metadata = {
  title: "Bench Strength — Minimize Costs. Maximize Reserves",
  description:
    "Practical, done-right insolvency case support, legal compliance auditing, and back-office admin for UK firms.",
  openGraph: {
    title: "Bench Strength — Minimize Costs. Maximize Reserves",
    description:
      "Practical, done-right insolvency case support, legal compliance auditing, and back-office admin for UK firms.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      /* Next 16 no longer overrides `scroll-behavior: smooth` (set on html in
         globals.css) during route transitions, so navigation would animate a
         long smooth scroll to the top instead of jumping. This opts back into
         the old instant-scroll behaviour while keeping smooth in-page anchors. */
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${mono.variable}`}
    >
      <body>
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
