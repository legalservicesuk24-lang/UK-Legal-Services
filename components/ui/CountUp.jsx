"use client";

import { useEffect, useRef, useState } from "react";

/* ---------------------------------------------------------------------------
   CountUp — animates a proof number from 0 to its value when scrolled into
   view. Used for the oversized stats in the navy proof band.

   The tricky part is avoiding a visible reset. The server renders the final
   value (so it is correct for crawlers, for no-JS, and for reduced motion),
   which means naively rewinding to 0 on mount would flash the real number
   first. So on mount we only rewind if the element is still off-screen —
   where nobody can see it happen. Anything already in view is left alone.
--------------------------------------------------------------------------- */

const DURATION = 1400;

// easeOutExpo — fast out of the gate, long settle. Reads as "landing on" a
// figure rather than sliding to a stop.
const ease = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export default function CountUp({ to, prefix = "", suffix = "", ...props }) {
  const [value, setValue] = useState(to);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already visible — leave the rendered value as-is rather than rewinding
    // in front of the reader.
    const box = el.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) return;

    setValue(0);

    let frame = 0;
    let start = 0;

    const step = (now) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / DURATION, 1);
      setValue(Math.round(ease(progress) * to));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          frame = requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to]);

  return (
    <span ref={ref} {...props}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
