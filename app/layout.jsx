import { Inter, Manrope, IBM_Plex_Mono } from "next/font/google";
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
      className={`${body.variable} ${display.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
