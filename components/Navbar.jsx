"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "react-aria-components";

import { ButtonLink } from "./ui/Button";

/* ---------------------------------------------------------------------------
   Navbar — transparent over a dark hero, solid once you scroll off it.

   The old bar was opaque ink-50 at all times, which put a hard light edge
   across the top of the dark hero and made the header read as a separate
   object sitting on the page rather than part of it.

   Two states, because the pages genuinely differ:

     - `onDark` (the homepage, which opens on the near-black hero): starts
       transparent with light text, then swaps to the solid light treatment
       once scrolled past the hero, where the sections underneath are light.
     - default: solid light from the start, for /about, /services and /contact,
       which have light backgrounds at the top and would otherwise get an
       invisible header.

   Also adds a current-page indicator, which was missing entirely — the nav
   gave no feedback about where you were. And a scroll-progress rule along the
   bottom edge, which is decorative but reads as intentional and costs a
   single transform.

   Progress is written to a CSS custom property inside rAF, so scrolling does
   not re-render this component; only the boolean state flip does.
--------------------------------------------------------------------------- */

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

function Logo({ light }) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-2.5 text-xl transition-colors ${
        light ? "text-on-dark" : "text-heading"
      }`}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        aria-hidden="true"
        className="flex-shrink-0"
      >
        <rect
          width="30"
          height="30"
          rx="8"
          className="fill-primary-600 transition-colors group-hover:fill-accent-400"
        />
        <path
          d="M8 15.5L13 20.5L22 9.5"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {/* Serif wordmark, matching the display voice introduced on the page. */}
      <span className="font-serif">Bench Strength</span>
    </Link>
  );
}

export default function Navbar({ onDark = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;
    let queued = false;

    const measure = () => {
      queued = false;
      const y = window.scrollY;
      // Swap the treatment once the header has cleared most of the viewport
      // height — i.e. once it is over the light sections rather than the hero.
      setScrolled(y > window.innerHeight * 0.7);

      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      doc.style.setProperty(
        "--scroll-progress",
        max > 0 ? String(Math.min(y / max, 1)) : "0",
      );
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Light treatment applies while we're still over the dark hero. Opening the
  // mobile panel forces the solid treatment, since the panel itself is solid.
  const light = onDark && !scrolled && !isOpen;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        light
          ? "border-b border-white/10 bg-transparent"
          : "border-b border-subtle bg-surface/85 backdrop-blur"
      }`}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <Logo light={light} />

        <nav
          aria-label="Primary"
          className="hidden md:flex md:items-center md:gap-1"
        >
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  light
                    ? "text-ink-300 hover:text-on-dark"
                    : "text-muted hover:text-brand"
                } ${active ? (light ? "text-on-dark" : "text-brand") : ""}`}
              >
                {link.label}
                {/* Current-page rule. Sized to the label rather than the
                    padded box so it reads as an underline, not a tab. */}
                {active && (
                  <span
                    aria-hidden
                    className={`absolute inset-x-3 -bottom-0.5 h-px ${
                      light ? "bg-accent-400" : "bg-primary-600"
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <ButtonLink
            href="/contact"
            size="sm"
            color={light ? "onDark" : "navy"}
            className={light ? undefined : "shadow-card"}
          >
            Book a Consultation
          </ButtonLink>
        </div>

        <Button
          onPress={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className={`-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg transition-colors md:hidden ${
            light
              ? "text-on-dark hovered:bg-white/10"
              : "text-muted hovered:bg-sunken"
          }`}
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

      {/* Scroll progress. Scales a single element, and the property defaults to
          0 so with no JS it simply never appears. */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-primary-600"
        style={{ transform: "scaleX(var(--scroll-progress, 0))" }}
      />

      <div
        id="mobile-menu"
        className={`md:hidden ${isOpen ? "block" : "hidden"} border-t border-subtle bg-surface`}
      >
        <nav
          aria-label="Mobile primary"
          className="container-page flex flex-col py-3"
        >
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between border-b border-hairline py-3.5 font-serif text-xl transition-colors last:border-0 ${
                  active ? "text-brand" : "text-heading hover:text-brand"
                }`}
              >
                {link.label}
                {active && (
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-primary-600"
                  />
                )}
              </Link>
            );
          })}
          <ButtonLink
            href="/contact"
            onClick={() => setIsOpen(false)}
            fullWidth
            className="mt-5"
          >
            Book a Consultation
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
