import { Inter, Manrope, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
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
      className={`${body.variable} ${display.variable} ${mono.variable}`}
    >
      <body>
        {/* Arms the scroll-reveal effect. `beforeInteractive` puts this in the
            <head> and runs it before hydration, so the hidden state is applied
            before first paint and nothing flashes.

            The failsafe matters more than the gate: `Reveal` stamps
            data-reveal-ready on <html> when it mounts. If that never happens —
            blocked bundle, script error, hydration failure — the gate is
            dropped and every section becomes visible, just un-animated. The
            alternative is a page with blank sections, which is far worse than
            a page without transitions. */}
        <Script id="reveal-arm" strategy="beforeInteractive">
          {`(function(){var d=document.documentElement;d.classList.add('js-reveal');
setTimeout(function(){if(!d.hasAttribute('data-reveal-ready'))d.classList.remove('js-reveal');},2500);})();`}
        </Script>
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
