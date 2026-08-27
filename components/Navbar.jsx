"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "react-aria-components";

const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/#about" },
  { label: "Our Services", href: "/#services" },
  { label: "Contact", href: "/contact" },
];

function Logo() {
  return (
    <Link
      href="/#home"
      className="flex items-center gap-2 font-display text-lg font-semibold text-ink-900"
    >
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <rect width="30" height="30" rx="8" className="fill-primary-600" />
        <path
          d="M8 15.5L13 20.5L22 9.5"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Bench Strength
    </Link>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-ink-200 bg-ink-50/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:flex md:items-center md:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-700 transition-colors hover:text-primary-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            onPress={() => router.push("/contact")}
            className="rounded-lg bg-ink-900 px-4 py-2 text-sm font-semibold text-white shadow-card transition-colors hover:bg-accent-400 hover:text-ink-900 pressed:bg-accent-500"
          >
            Book a Consultation
          </Button>
        </div>

        {/* Mobile toggle */}
        <Button
          onPress={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-700 transition-colors hover:bg-ink-100 md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {isOpen ? (
              <path
                d="M5 5L17 17M17 5L5 17"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 6H19M3 11H19M3 16H19"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </Button>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={`md:hidden ${isOpen ? "block" : "hidden"} border-t border-ink-200 bg-ink-50`}
      >
        <nav aria-label="Mobile primary" className="container-page flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-100"
            >
              {link.label}
            </Link>
          ))}
          <Button
            onPress={() => {
              setIsOpen(false);
              router.push("/contact");
            }}
            className="mt-2 rounded-lg bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-400 hover:text-ink-900"
          >
            Book a Consultation
          </Button>
        </nav>
      </div>
    </header>
  );
}
