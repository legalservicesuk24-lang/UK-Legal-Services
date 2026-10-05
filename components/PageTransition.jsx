"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/* Brief branded pause between pages. App Router navigations are near-instant,
   which reads as a jump cut; this covers the swap with a cream screen and a
   slim progress bar so every page change has the same deliberate beat.

   - Starts on the click itself (capture phase, before next/link's handler),
     so feedback is immediate even if the route is still fetching.
   - Also catches navigations that don't come from a click (back/forward,
     router.push) via the pathname change — during render, so the cover is up
     in the same commit as the new page.
   - Lives in the root layout, so it persists across routes; app/template.jsx
     would only remount on first-segment changes (/services -> /services/x
     would be missed). */

const HOLD_MS = 900; // how long the cover stays up — the "small pause"
const FADE_MS = 300; // fade-out to reveal the new page
const GIVE_UP_MS = 6000; // click that never navigates: don't strand the cover

export default function PageTransition() {
  const pathname = usePathname();
  // idle | cover (fading in from a click) | hold (cover up instantly) | leaving
  const [phase, setPhase] = useState("idle");
  const [run, setRun] = useState(0); // restarts the bar animation per navigation
  const startedAt = useRef(0);
  const timers = useRef([]);
  const lastPath = useRef(pathname);
  const [seenPath, setSeenPath] = useState(pathname);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  const finish = (fromMs) => {
    clearTimers();
    const wait = Math.max(0, HOLD_MS - (Date.now() - fromMs));
    later(() => {
      setPhase("leaving");
      later(() => setPhase("idle"), FADE_MS);
    }, wait);
  };

  useEffect(() => {
    const onClick = (e) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.("a[href]");
      if (!a || a.hasAttribute("download")) return;
      if (a.target && a.target !== "_self") return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      // Same page (incl. #anchor links): nothing to transition.
      if (url.pathname === location.pathname) return;

      clearTimers();
      startedAt.current = Date.now();
      setRun((n) => n + 1);
      setPhase("cover");
      later(() => setPhase("leaving"), GIVE_UP_MS);
      later(() => setPhase("idle"), GIVE_UP_MS + FADE_MS);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearTimers();
    };
  }, []);

  /* Pathname changed without a click (back/forward, router.push): put the
     cover up in this same render, so the new page is never painted bare. */
  if (pathname !== seenPath) {
    setSeenPath(pathname);
    if (phase !== "cover") {
      setRun((n) => n + 1);
      setPhase("hold");
    }
  }

  // Once the new route is in, hold out the rest of the pause, then reveal.
  useEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    // "hold" = no click started the clock, so the full pause runs from now.
    if (phase !== "cover") startedAt.current = Date.now();
    finish(startedAt.current);
    // Only pathname changes should drive this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const active = phase !== "idle";

  return (
    <div
      className="page-transition"
      data-phase={phase}
      aria-hidden={!active}
      style={{ "--pt-hold": `${HOLD_MS}ms`, "--pt-fade": `${FADE_MS}ms` }}
    >
      {active && (
        <div key={run} className="page-transition__inner" role="status">
          <span className="sr-only">Loading page</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/benchstrength-mark.png"
            alt=""
            width={56}
            height={56}
            className="page-transition__mark"
          />
          <div className="page-transition__track">
            <div className="page-transition__bar" />
          </div>
        </div>
      )}
    </div>
  );
}
