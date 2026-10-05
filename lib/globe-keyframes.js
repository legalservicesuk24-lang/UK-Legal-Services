/* ---------------------------------------------------------------------------
   Globe camera keyframes — all homepage globe motion tuning lives here.
   Change numbers in this file, never inside components/globe/GlobeBackground.

   `p` is scroll measured in chapters: 0 on the first chapter, 1 on the
   second, and so on (GlobeBackground computes it from the chapters' positions,
   so it stays in step whatever height each chapter renders at). Between two
   keys every field is smoothstepped, so the globe moves gradually with the
   scroll as one chapter gives way to the next.

     r      radius as a multiple of the base radius. Diameter runs from about
            0.43x to 1.26x the viewport's short edge across the page — raise it
            further and the sphere leaves the frame early, leaving a flat dark
            field behind the copy.
     sink   how far the centre is pushed below mid-screen, in radii. At 1 the
            top of the sphere sits on the midline, so only the top hemisphere
            shows.
     lam    rotation about the vertical axis (degrees). A gentle quarter-ish
            turn (~110) between neighbouring keys — a full turn per chapter
            reads as a frantic spin.
     phi    tilt (degrees). Only drifts; clamped to ±78 at render time.
     dot    alpha of the land-dot lattice.
     night  alpha of the night-side shading.

   One key per homepage chapter (app/page.jsx), in page order. Adding or
   removing a chapter means adding or removing a key.
--------------------------------------------------------------------------- */

export const KEYS = [
  { p: 0, r: 0.72, sink: 0.0, lam: -6, phi: -12, dot: 0.86, night: 0.0 }, // 1 hero
  { p: 1, r: 1.1, sink: 0.2, lam: -116, phi: -5, dot: 0.95, night: 0.08 }, // 2 who we are + track record
  { p: 2, r: 1.62, sink: 0.68, lam: -226, phi: 3, dot: 1.0, night: 0.15 }, // 3 what we do
  { p: 3, r: 2.1, sink: 1.0, lam: -336, phi: 8, dot: 1.0, night: 0.18 }, // 4 how it runs
];

/* Damping. Scroll is smoothed by a critically damped spring (SCROLL_SPRING is
   its angular frequency), then the camera eases toward the sampled key.
   Keep both stages — driving the camera straight off scroll looks scrubby. */
export const SCROLL_SPRING = 4.5;
export const CAMERA_EASE = 0.2;
export const POINTER_EASE = 0.06;

/* Free-running spin so the globe keeps turning when scrolling stops. */
export const SPIN_RATE = 1.1;
