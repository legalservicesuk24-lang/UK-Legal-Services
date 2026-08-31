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

   Three states, because two were not enough:

     - `onDark`, at rest (homepage, opening on the near-black hero):
       transparent, light text.
     - `onDark`, scrolled but still over the hero: dark blurred background,
       light text. This state exists because a purely transparent header lets
       the headline scroll up behind it and collide with the nav links, while
       switching straight to the light treatment would put a light bar back on
       top of the dark section.
     - past the hero, or any other page: light blurred background, dark text.
       /about, /services and /contact are light at the top and would get an
       invisible header otherwise.

   The hero boundary is measured off the hero element rather than guessed from
   a fraction of the viewport.

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
      <span className="font-display font-bold">Bench Strength</span>
    </Link>
  );
}

export default function Navbar({ onDark = false }) {
  const [isOpen, setIsOpen] = useState(false);
  /* Three states, not two. A single transparent/solid flip at 70% of viewport
     height meant the headline scrolled up *behind* a still-transparent header
     and collided with the nav links. The header now goes solid as soon as
     anything moves under it, but stays dark while it is over the hero so we
     do not put a light bar back on top of the dark section. */
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;
    let queued = false;

    const measure = () => {
      queued = false;
      const y = window.scrollY;

      // Solid almost immediately: anything else lets content collide with the
      // nav while the background is still see-through.
      setScrolled(y > 8);

      // Measured off the hero itself rather than a guessed fraction of the
      // viewport, so the light treatment starts exactly when the dark section
      // has passed under the header.
      const hero = document.getElementById("home");
      setPastHero(hero ? hero.getBoundingClientRect().bottom <= 76 : true);

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

  /* `light` = light *text*, i.e. we are over the dark hero. `onHero` also
     covers the scrolled-but-still-over-the-hero case, which takes a dark
     blurred background rather than the light one.
     The panel is dark, so opening it no longer has to force the light
     treatment — the header can stay dark and the two read as one surface. */
  const onHero = onDark && !pastHero;
  const light = onHero;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        onHero
          ? scrolled || isOpen
            ? "border-b border-white/10 bg-ink-950/90 backdrop-blur"
            : "border-b border-transparent bg-transparent"
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

      {/* Mobile panel. Numbered serif rows rather than a generic list of
          links, so it carries the same editorial voice as the page. Themed to
          match the header it drops out of — dark over the hero, light on the
          inner pages — because a dark sheet under a light bar reads as a
          separate widget pasted on. */}
      <div
        id="mobile-menu"
        hidden={!isOpen}
        className={`md:hidden ${
          light ? "border-t border-white/10 bg-ink-950" : "border-t border-subtle bg-surface"
        }`}
      >
        <nav aria-label="Mobile primary" className="container-page py-2">
          {NAV_LINKS.map((link, i) => {
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
                className={`group flex items-baseline gap-4 py-4 transition-colors last:border-0 ${
                  light ? "border-b border-white/10" : "border-b border-hairline"
                } ${
                  active
                    ? light
                      ? "text-accent-400"
                      : "text-brand"
                    : light
                      ? "text-on-dark"
                      : "text-heading"
                }`}
              >
                <span
                  aria-hidden
                  className={`font-mono text-[10px] font-semibold tracking-[0.16em] ${
                    active
                      ? light
                        ? "text-accent-400"
                        : "text-brand"
                      : "text-ink-500"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-2xl font-semibold">
                  {link.label}
                </span>
                {active && (
                  <span
                    aria-hidden
                    className={`ml-auto self-center h-1.5 w-1.5 rounded-full ${
                      light ? "bg-accent-400" : "bg-primary-600"
                    }`}
                  />
                )}
              </Link>
            );
          })}

          <div className="flex flex-col gap-3 py-6">
            <ButtonLink
              href="/contact"
              onClick={() => setIsOpen(false)}
              color={light ? "onDark" : "navy"}
              fullWidth
            >
              Book a Consultation
            </ButtonLink>
            <a
              href="mailto:hello@benchstrength.uk"
              className={`py-1 text-center text-sm transition-colors ${
                light
                  ? "text-ink-400 hover:text-accent-400"
                  : "text-subtle hover:text-brand"
              }`}
            >
              hello@benchstrength.uk
            </a>
          </div>
        </nav>
      </div>

    </header>
  );
}
