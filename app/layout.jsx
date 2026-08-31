import { Fraunces, IBM_Plex_Mono, Inter, Manrope } from "next/font/google";
import "./globals.css";

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const display = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

/* The editorial voice. A serif is the one type choice that reads as *authored*
   rather than templated, and for insolvency and legal work it buys authority
   rather than spending it — the sector's own documents are set in serif.

   Fraunces over Instrument Serif: Instrument was the lightest of the faces
   compared on /type, and at 96px it read delicate rather than authoritative,
   which is the wrong note for a firm selling "we get it right". Fraunces has
   weight to spare and real character in the terminals.

   Variable, so display headings can sit at 500-600 instead of synthesising
   bold from a single 400 master. Display sizes only; Manrope still handles
   card titles and UI labels. */
const serif = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
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
      className={`${body.variable} ${display.variable} ${serif.variable} ${mono.variable}`}
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
