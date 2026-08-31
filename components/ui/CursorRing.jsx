"use client";

import { useEffect, useRef } from "react";

/* ---------------------------------------------------------------------------
   CursorRing — a soft ring that trails the pointer inside its container, and
   swells when it is over something interactive.

   The one rule this respects that most custom cursors break: the native cursor
   stays visible. Hiding it is the actual usability failure — people lose their
   pointer, hit-targets stop feeling accurate, and anyone relying on the system
   cursor size or a high-contrast theme is left worse off. This is an addition
   to the pointer, not a replacement for it.

   Position is written straight to the element's transform on rAF rather than
   through React state, so pointer movement never triggers a render.

   Skipped entirely for coarse pointers (nothing to trail on touch) and under
   prefers-reduced-motion.
--------------------------------------------------------------------------- */

export default function CursorRing({ containerRef }) {
  const ring = useRef(null);

  useEffect(() => {
    const host = containerRef.current;
    const dot = ring.current;
    if (!host || !dot) return;

    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let scale = 0;
    let targetScale = 0;
    let frame = 0;
    let inside = false;

    const onMove = (e) => {
      const box = host.getBoundingClientRect();
      target.x = e.clientX - box.left;
      target.y = e.clientY - box.top;

      if (!inside) {
        // Jump on entry so the ring doesn't sweep in from the last position.
        current.x = target.x;
        current.y = target.y;
        inside = true;
      }

      // Swell over anything the pointer can actually act on.
      targetScale = e.target.closest("a, button, [role='button']") ? 2.1 : 1;
    };

    const onLeave = () => {
      inside = false;
      targetScale = 0;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.14;
      current.y += (target.y - current.y) * 0.14;
      scale += (targetScale - scale) * 0.12;
      dot.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      frame = requestAnimationFrame(tick);
    };

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [containerRef]);

  return (
    <span
      ref={ring}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-30 hidden h-10 w-10 rounded-full border border-accent-400/60 mix-blend-screen md:block"
      style={{ transform: "scale(0)" }}
    />
  );
}
