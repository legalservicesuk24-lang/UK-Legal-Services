"use client";

import { useEffect, useRef } from "react";

/* ---------------------------------------------------------------------------
   Reveal — fades content up as it scrolls into view.

   The important property is that the server renders everything visible. This
   component only ever *adds* a hidden state, and only to elements sitting
   entirely below the fold, where nobody can see them become invisible. So:

     - no JavaScript, blocked bundle, or failed hydration -> readable page
     - reduced motion                                     -> readable page
     - above-the-fold content                             -> never hidden

   An earlier version hid everything in CSS and relied on JS to reveal it,
   which blanked whole sections the moment anything went wrong, and then needed
   a pre-paint script mutating <html> — which caused a className hydration
   mismatch. Arming from the client instead removes both problems and drops a
   <script> from the page.

   `delay` staggers siblings. Keep it small — a list whose last item arrives a
   second late reads as slow, not as choreographed.
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
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Only arm what cannot currently be seen. An element already on screen —
    // or even partly above the fold — stays exactly as rendered rather than
    // blinking out and fading back in.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.classList.add("is-armed");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      // Fire slightly before the element is fully in view, so the transition
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
