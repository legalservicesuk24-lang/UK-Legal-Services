import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Bench Strength — Operations, Compliance & Admin Support",
  description: "We are currently enhancing our digital platform. Something great is under construction and launching soon.",
  openGraph: {
    title: "Bench Strength — Operations, Compliance & Admin Support",
    description: "We are currently enhancing our digital platform. Something great is under construction and launching soon.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
