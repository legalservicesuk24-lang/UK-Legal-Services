/* ---------------------------------------------------------------------------
   Globe camera keyframes — all homepage globe motion tuning lives here.
   Change numbers in this file, never inside components/globe/GlobeBackground.

   `p` is normalised document scroll: 0 at the top of the page, 1 at the
   bottom (footer included). Between two keys every field is smoothstepped.

     r      radius as a multiple of the base radius. Diameter runs from about
            0.43x to 1.26x the viewport's short edge across the page — raise it
            further and the sphere leaves the frame early, leaving a flat dark
            field behind the copy.
     sink   how far the centre is pushed below mid-screen, in radii. At 1 the
            top of the sphere sits on the midline, so only the top hemisphere
            shows.
     lam    rotation about the vertical axis (degrees). Carries the journey —
            nearly two full turns across the page.
     phi    tilt (degrees). Only drifts; clamped to ±78 at render time.
     dot    alpha of the land-dot lattice.
     night  alpha of the night-side shading.

   The p values are timed to the five homepage chapters (app/page.jsx). Adding,
   removing or re-sizing a chapter moves every key after it.
--------------------------------------------------------------------------- */

export const KEYS = [
  { p: 0.0, r: 0.72, sink: 0.0, lam: -6, phi: -12, dot: 0.86, night: 0.0 }, // 1 hero
  { p: 0.22, r: 0.95, sink: 0.08, lam: -150, phi: -7, dot: 0.92, night: 0.05 }, // 2 who we are
  { p: 0.45, r: 1.25, sink: 0.32, lam: -310, phi: -2, dot: 0.97, night: 0.1 }, // 3 track record
  { p: 0.7, r: 1.62, sink: 0.68, lam: -480, phi: 3, dot: 1.0, night: 0.15 }, // 4 what we do
  { p: 1.0, r: 2.1, sink: 1.0, lam: -660, phi: 8, dot: 1.0, night: 0.18 }, // 5 how it runs
];

/* Damping. Scroll is smoothed by a critically damped spring (SCROLL_SPRING is
   its angular frequency), then the camera eases toward the sampled key.
   Keep both stages — driving the camera straight off scroll looks scrubby. */
export const SCROLL_SPRING = 8.5;
export const CAMERA_EASE = 0.2;
export const POINTER_EASE = 0.06;

/* Free-running spin so the globe keeps turning when scrolling stops. */
export const SPIN_RATE = 1.1;
