"use client";

import { useLayoutEffect, useState } from "react";

/* ---------------------------------------------------------------------------
   ChapterDirector — scroll choreography for the globe homepage chapters.

     - Reveal: each `.fx` element rises in with a blur-fade as its chapter's
       copy block enters, and leaves the same way. Keyed to the copy block's
       own rect, not the chapter's or the pin's — content is centred in a
       100vh pin, so either of those leaves blank screens between chapters.
     - Tall chapters: a pin whose content is taller than the viewport gets a
       negative sticky `top`, so it scrolls through until its bottom edge
       reaches the viewport's and holds there. The chapter grows to match, so
       the hold budget is the same as a short chapter's.
     - Process track: a `.scroll-track` inside a chapter gets `--progress`
       from how far through its chapter's hold the page is. (ScrollTrack's own
       rect-based progress freezes once the section is pinned.)
     - Rail: one button per chapter along the right edge.

   The hidden `.fx` state only exists under `.chapters.is-live`, which is
   added here, in a layout effect, in the same tick as the first reveal pass.
   So no JavaScript, or a failed hydration, leaves a fully visible page, and
   an already-visible chapter never flashes.
--------------------------------------------------------------------------- */

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const smooth = (t) => t * t * (3 - 2 * t);

/* `labels` names the rail ticks, one per chapter, in page order. */
export default function ChapterDirector({ rootId, labels }) {
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const chapters = [...root.querySelectorAll(".chapter")];
    const pins = chapters.map((ch) => ch.querySelector(".chapter-pin"));
    const blocks = pins.map((p) => p.firstElementChild);
    const tracks = chapters.map((ch) => ch.querySelector(".scroll-track"));
    const fx = chapters.map((ch) =>
      [...ch.querySelectorAll(".fx")].map((el) => ({
        el,
        d: (Number(el.dataset.fx) || 0) * 0.055,
        last: -1,
      })),
    );
    let H = window.innerHeight;
    let activeR = -1;
    let queued = false;
    let frame = 0;

    // Fit tall pins. Runs on resize only — it writes layout.
    function fit() {
      H = window.innerHeight;
      chapters.forEach((ch, i) => {
        const pin = pins[i];
        ch.style.height = "";
        pin.style.top = "";
        const pinH = pin.offsetHeight;
        if (pinH > H + 1) {
          pin.style.top = `${H - pinH}px`;
          ch.style.height = `${ch.offsetHeight - H + pinH}px`;
        }
      });
    }

    function reveal() {
      queued = false;
      // pass 1 — reads only
      const n = chapters.length;
      const enter = new Array(n);
      const exit = new Array(n);
      const hold = new Array(n);
      let current = 0;
      const ramp = H * 0.24;
      for (let ci = 0; ci < n; ci++) {
        const r = chapters[ci].getBoundingClientRect();
        // A short copy block is treated as at least 60% of a viewport tall,
        // centred on itself — otherwise the empty pin space above and below it
        // opens a blank gap between one chapter leaving and the next arriving.
        const b = blocks[ci].getBoundingClientRect();
        const mid = (b.top + b.bottom) / 2;
        const top = Math.min(b.top, mid - H * 0.3);
        const bottom = Math.max(b.bottom, mid + H * 0.3);
        enter[ci] = clamp((H + 40 - top) / ramp, 0, 1);
        exit[ci] = clamp((bottom + 40) / ramp, 0, 1);
        if (tracks[ci]) {
          const pinH = pins[ci].offsetHeight;
          const stick = Math.min(0, H - pinH);
          hold[ci] = clamp((stick - r.top) / Math.max(r.height - pinH, 1), -1, 1);
        }
        if (r.top <= H * 0.5 && r.bottom > H * 0.5) current = ci;
      }
      // pass 2 — writes only
      for (let ci = 0; ci < n; ci++) {
        const inn = ci === 0 ? 1 : enter[ci]; // chapter 1 rises in via CSS on load
        const out = ci === n - 1 ? 1 : exit[ci]; // the last chapter never fades out
        for (const it of fx[ci]) {
          const t = reduce ? 1 : clamp((inn - it.d) / (1 - it.d || 1), 0, 1) * out;
          const e = smooth(t);
          if (Math.abs(e - it.last) < 0.004) continue;
          it.last = e;
          const s = it.el.style;
          s.opacity = e.toFixed(3);
          s.transform = `translate3d(0,${((1 - e) * 44).toFixed(2)}px,0) scale(${(0.985 + e * 0.015).toFixed(4)})`;
          s.filter = e > 0.985 ? "none" : `blur(${((1 - e) * 6).toFixed(2)}px)`;
        }
        if (tracks[ci] && !reduce) {
          // the line starts just before the pin locks and is drawn by 60% of the hold
          tracks[ci].style.setProperty(
            "--progress",
            clamp((hold[ci] + 0.1) / 0.7, 0, 1).toFixed(3),
          );
        }
      }
      if (current !== activeR) {
        activeR = current;
        setActive(current);
      }
    }

    const onScroll = () => {
      if (queued) return;
      queued = true;
      frame = requestAnimationFrame(reveal);
    };
    const onResize = () => {
      fit();
      onScroll();
    };

    // Chapter 1 rises in with a CSS animation (staggered in globals.css, so it
    // plays before hydration); once it ends, the scroll reveal takes over.
    const onAnimEnd = (e) => {
      if (e.target.classList.contains("fx")) e.target.style.animation = "none";
    };
    chapters[0]?.addEventListener("animationend", onAnimEnd);

    root.classList.add("is-live");
    fit();
    reveal();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // web fonts change text metrics, so re-fit once they are in
    document.fonts?.ready.then(onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      chapters[0]?.removeEventListener("animationend", onAnimEnd);
      root.classList.remove("is-live");
    };
  }, [rootId]);

  const goTo = (i) => {
    const ch = document.getElementById(rootId)?.querySelectorAll(".chapter")[i];
    if (ch) {
      const top = ch.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav aria-label="Page sections" className="chapter-rail">
      {labels.map((label, i) => (
        <button
          key={label}
          type="button"
          aria-label={`Go to ${label}`}
          aria-current={i === active ? "true" : undefined}
          onClick={() => goTo(i)}
        >
          <i />
          <span>
            {String(i + 1).padStart(2, "0")} · {label}
          </span>
        </button>
      ))}
    </nav>
  );
}
