"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "react-aria-components";

import { ButtonLink } from "./ui/Button";
import { SERVICES } from "../app/services/servicesData";

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

   The "Our Services" link carries a dropdown of every service page, so the
   individual registers are reachable in one move from anywhere on the site
   rather than only via the /services index.
--------------------------------------------------------------------------- */

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services", menu: true },
  { label: "Contact", href: "/contact" },
];

/* Built from the single service registry, so a new service page appears in the
   nav automatically. */
const SERVICE_LINKS = SERVICES.map((s) => ({
  label: s.title,
  href: `/services/${s.slug}`,
}));

function Chevron({ open }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M2.5 4.5L6 8L9.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
  /* Desktop "Our Services" dropdown. Opens on hover for pointer users and on
     click/Enter for keyboard and touch; closes on Escape, on a click outside,
     and whenever the route changes. */
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef(null);
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

  /* No "close on route change" effect is needed: each page mounts its own
     <Navbar>, so navigating remounts this component and both menus reset. The
     link onClick handlers below also close them for same-page cases. */

  // Escape closes the services dropdown; a click outside it does too.
  useEffect(() => {
    if (!servicesOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    const onClick = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onClick);
    };
  }, [servicesOpen]);

  /* `light` = light *text*, i.e. we are over the dark hero. `onHero` also
     covers the scrolled-but-still-over-the-hero case, which takes a dark
     blurred background rather than the light one.
     The panel is dark, so opening it no longer has to force the light
     treatment — the header can stay dark and the two read as one surface. */
  const onHero = onDark && !pastHero;
  const light = onHero;

  const linkClass = (active) =>
    `relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      light ? "text-ink-300 hover:text-on-dark" : "text-muted hover:text-brand"
    } ${active ? (light ? "text-on-dark" : "text-brand") : ""}`;

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
            const active = isActive(link.href);

            if (link.menu) {
              return (
                <div
                  key={link.href}
                  ref={servicesRef}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <span className="flex items-center">
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`${linkClass(active)} pr-1`}
                    >
                      {link.label}
                      {active && (
                        <span
                          aria-hidden
                          className={`absolute inset-x-3 -bottom-0.5 h-px ${
                            light ? "bg-accent-400" : "bg-primary-600"
                          }`}
                        />
                      )}
                    </Link>
                    <button
                      type="button"
                      aria-label="Toggle services menu"
                      aria-expanded={servicesOpen}
                      aria-controls="services-menu"
                      onClick={() => setServicesOpen((v) => !v)}
                      className={`-ml-1 rounded-md p-1 transition-colors ${
                        light
                          ? "text-ink-300 hover:text-on-dark"
                          : "text-muted hover:text-brand"
                      }`}
                    >
                      <Chevron open={servicesOpen} />
                    </button>
                  </span>

                  {/* pt-2 wrapper keeps a hover bridge between trigger and card
                      so the pointer never crosses a dead gap. */}
                  <div
                    id="services-menu"
                    hidden={!servicesOpen}
                    className="absolute left-0 top-full z-50 pt-2"
                  >
                    <ul className="w-72 overflow-hidden rounded-xl border border-subtle bg-surface p-1.5 shadow-card-hover">
                      {SERVICE_LINKS.map((s) => {
                        const sActive = pathname === s.href;
                        return (
                          <li key={s.href}>
                            <Link
                              href={s.href}
                              aria-current={sActive ? "page" : undefined}
                              onClick={() => setServicesOpen(false)}
                              className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                                sActive
                                  ? "bg-primary-50 text-brand"
                                  : "text-muted hover:bg-sunken hover:text-brand"
                              }`}
                            >
                              {s.label}
                            </Link>
                          </li>
                        );
                      })}
                      <li className="mt-1 border-t border-hairline pt-1">
                        <Link
                          href="/services"
                          onClick={() => setServicesOpen(false)}
                          className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-brand transition-colors hover:bg-sunken"
                        >
                          View all services
                          <span aria-hidden>&rarr;</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={linkClass(active)}
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
            const active = isActive(link.href);
            return (
              <div key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-baseline gap-4 py-4 transition-colors ${
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

                {/* Service pages listed inline under "Our Services" so they are
                    reachable directly from the mobile menu. */}
                {link.menu && (
                  <ul
                    className={`flex flex-col ${
                      light ? "border-b border-white/10" : "border-b border-hairline"
                    }`}
                  >
                    {SERVICE_LINKS.map((s) => {
                      const sActive = pathname === s.href;
                      return (
                        <li key={s.href}>
                          <Link
                            href={s.href}
                            aria-current={sActive ? "page" : undefined}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 py-2.5 pl-9 text-sm transition-colors ${
                              sActive
                                ? light
                                  ? "text-accent-400"
                                  : "text-brand"
                                : light
                                  ? "text-ink-300"
                                  : "text-muted"
                            }`}
                          >
                            <span
                              aria-hidden
                              className={`h-1 w-1 flex-shrink-0 rounded-full ${
                                light ? "bg-accent-400/70" : "bg-primary-600/70"
                              }`}
                            />
                            {s.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
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
              href="mailto:info@benchstrength.uk"
              className={`py-1 text-center text-sm transition-colors ${
                light
                  ? "text-ink-400 hover:text-accent-400"
                  : "text-subtle hover:text-brand"
              }`}
            >
              info@benchstrength.uk
            </a>
          </div>
        </nav>
      </div>

    </header>
  );
}
