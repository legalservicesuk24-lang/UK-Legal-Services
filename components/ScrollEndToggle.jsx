"use client";

import { useEffect, useState } from "react";

/* ---------------------------------------------------------------------------
   ScrollEndToggle — a fixed corner control that jumps between the two ends
   of a long page.

   The About page stacks six sections between the intro and the footer. This
   gives a one-press trip down to the footer and, once you are there, a
   one-press trip back to the top. The arrow points the way it will send you:
   down by default, and it flips to point straight up once the footer is in
   view.

   Scroll position is read on a rAF-throttled listener (the same pattern as
   the Navbar) so it never thrashes layout, and the smooth scroll is dropped
   under prefers-reduced-motion to match the rest of the site.
--------------------------------------------------------------------------- */

export default function ScrollEndToggle() {
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    let queued = false;

    const measure = () => {
      queued = false;
      const doc = document.documentElement;
      const remaining = doc.scrollHeight - window.innerHeight - window.scrollY;
      // Within a viewport-tenth (min 120px) of the bottom counts as "at the
      // footer", so the flip happens as the footer settles into view rather
      // than only at the exact last pixel.
      setAtEnd(remaining <= Math.max(120, window.innerHeight * 0.1));
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const jump = () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top: atEnd ? 0 : document.documentElement.scrollHeight,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={jump}
      aria-label={atEnd ? "Back to top" : "Skip to footer"}
      title={atEnd ? "Back to top" : "Skip to footer"}
      className="fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-subtle bg-raised text-heading shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-300 hover:text-brand hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        aria-hidden="true"
        className={`transition-transform duration-300 ${
          atEnd ? "rotate-180" : ""
        }`}
      >
        <path
          d="M9 3v12M9 15l-5-5M9 15l5-5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
