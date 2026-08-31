"use client";

import { useEffect, useRef } from "react";

/* ---------------------------------------------------------------------------
   Reveal — fades content up as it scrolls into view.

   The hidden resting state is CSS (`.reveal` in globals.css), not React state,
   so the server-rendered markup is already correct and nothing shifts at
   hydration. This component's only job is to add `.is-visible` at the right
   moment, via a ref rather than state — a re-render per element would be a lot
   of churn for a class toggle.

   Content is never permanently hidden: globals.css unhides `.reveal` under
   `prefers-reduced-motion`, and a <noscript> block in app/layout.jsx unhides
   it when JavaScript is unavailable.

   `delay` staggers siblings. Keep it small — a list where the last item
   arrives a second late reads as slow, not as choreographed.
--------------------------------------------------------------------------- */

export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    // Tell the inline arming script in app/layout.jsx that hydration happened,
    // so it leaves the `.js-reveal` gate in place. If this never runs, the
    // script drops the gate and the content shows un-animated.
    document.documentElement.setAttribute("data-reveal-ready", "");

    const el = ref.current;
    if (!el) return;

    // Nothing to observe if the user has asked for less motion — globals.css
    // has already reset the resting state, so bail out entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Anything already on screen at mount (the hero, above-the-fold content)
    // should just appear rather than animate in after the fact.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      // Fire slightly before the element is fully in view, so the animation
      // is finishing as it reaches a comfortable reading position.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}
