"use client";

import { useEffect, useRef } from "react";

/* ---------------------------------------------------------------------------
   ScrollTrack — draws a rule from 0 to 100% as its section crosses the
   viewport, and lights each marker as the line passes it.

   This is the "scroll as narrative" idea from the reference sites, in the one
   place on this page it genuinely belongs: a process that runs first
   assessment -> closure is literally a progression, so tying it to scroll adds
   meaning rather than decoration.

   It is scroll-*linked*, never scroll-*jacked*. Scroll position is read; it is
   never intercepted, redirected or re-timed. Hijacking is what breaks keyboard
   navigation and triggers vestibular symptoms, and it is the one technique
   from the award-winning references that should not be copied.

   Progress is written to a CSS custom property on the host and consumed by the
   children's own CSS, so scrolling never triggers a React render. Reads happen
   inside rAF and are batched to one per frame.

   With no JS or reduced motion the property is never set, and the CSS default
   (`--progress: 1`) leaves the track fully drawn and every marker lit — the
   finished state, which is the correct resting appearance.
--------------------------------------------------------------------------- */

export default function ScrollTrack({ children, className = "" }) {
  const host = useRef(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let queued = false;

    const measure = () => {
      queued = false;
      const box = el.getBoundingClientRect();
      // Drive the line from when the section's top reaches 80% of the viewport
      // to when it reaches 30% — so it completes while the steps are still
      // comfortably on screen, not as they leave.
      const start = window.innerHeight * 0.8;
      const end = window.innerHeight * 0.3;
      const raw = (start - box.top) / (start - end);
      el.style.setProperty("--progress", String(Math.min(Math.max(raw, 0), 1)));
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

  return (
    <div ref={host} className={`scroll-track ${className}`}>
      {children}
    </div>
  );
}
