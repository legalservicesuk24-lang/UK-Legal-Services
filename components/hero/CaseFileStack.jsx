"use client";

import { Component, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import StackFallback from "./StackFallback";

/* ---------------------------------------------------------------------------
   CaseFileStack — decides whether the 3D scene is appropriate, and only then
   pays for it.

   Everything that keeps a WebGL hero from being a liability lives here rather
   than in the scene:

     - `ssr: false` + dynamic import, so three.js is never in the initial
       bundle and cannot delay first paint. The hero h1 stays the LCP element.
     - The CSS fallback covers the very first paint, so the hero is never an
       empty box — both states share the same aspect ratio, so there's no
       layout shift either. On a device that will never get the scene, it
       stays up permanently. On one that will, it's hidden again the moment
       that's known (before the bundle has even loaded), so the scene's own
       fly-in — not a re-animated version of a stack the visitor already saw
       finished — is the first thing anyone actually sees settle into place.
     - `prefers-reduced-motion` means the bundle is never even requested. This
       is both a WCAG 2.3.3 obligation (the scene has parallax) and the right
       performance call for anyone who has asked for calm.
     - Narrow viewports, Save-Data and 2G connections also skip it: see
       `sceneIsWorthIt` for why the CSS fallback wins there.
     - No WebGL context, or a runtime failure in the scene, falls back to the
       CSS stack instead of a blank space.
     - The frame loop stops when the hero scrolls out of view or the tab is
       hidden. A hero canvas rendering while someone reads the footer is pure
       battery drain.
     - Only mounts once the hero is actually near the viewport.

   The h1, the strapline and both CTAs are real DOM in Hero.jsx. Nothing in the
   canvas is content, which is why it carries `aria-hidden`.
--------------------------------------------------------------------------- */

/* No `loading` fallback here on purpose: by the time this dynamic import is
   even requested, the CSS fallback has already been hidden (see the effect
   below) so the scene's fly-in is the first thing the visitor sees settle
   into place. Rendering the assembled StackFallback here while the chunk
   downloads would undo that — the same "already finished, then resets"
   problem this file exists to avoid. */
const CaseFileScene = dynamic(() => import("./CaseFileScene"), {
  ssr: false,
});

/* three + @react-three/fiber is ~228KB gzipped and does not shrink with
   granular imports — R3F pulls the WebGL renderer in regardless, so that is
   the floor rather than something to optimise away. It is lazy and off the
   critical path, but "lazy" is not free on a metered connection, so the scene
   is withheld where the trade is bad and the CSS fallback is genuinely the
   better answer:

     - narrow viewports: the hero stacks vertically on phones and the stack is
       small there anyway; a quarter-megabyte of decoration over cellular for a
       lead-generation page is not a good deal.
     - Save-Data, or a 2G effective connection.

   This is a judgement call, not a hard rule — raise or drop the breakpoint if
   the client wants the scene on mobile. */
function sceneIsWorthIt() {
  if (window.matchMedia("(max-width: 767px)").matches) return false;

  const conn = navigator.connection;
  if (conn?.saveData) return false;
  if (conn?.effectiveType && /(^|-)2g$/.test(conn.effectiveType)) return false;

  return true;
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

export default function CaseFileStack({ fill = true, dark = true, pointerRef }) {
  const hostRef = useRef(null);
  /* Wraps the CSS fallback so it can be hidden with a direct DOM write
     rather than React state (see below) — a plain ref, not tracked state. */
  const fallbackRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [failed, setFailed] = useState(false);
  const [frameloop, setFrameloop] = useState("always");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!sceneIsWorthIt()) return;
    if (!supportsWebGL()) return;

    /* This device will load the WebGL scene, so the CSS fallback shouldn't
       sit there fully assembled for the whole bundle download — otherwise
       the scene's fly-in, once it finally mounts, visibly resets a stack
       the visitor already saw finished. Hide the fallback immediately
       instead, so the scene's own settle animation is the first thing
       anyone actually sees happen.

       A direct style write, not React state: this only ever needs to hide
       an already-rendered node once, as a one-off sync with a browser
       capability that isn't known until the client mounts — there's no
       following render that depends on the "eligible" value, so routing it
       through state would just add a render pass for nothing. On a device
       that never reaches this branch (reduced motion, narrow viewport, slow
       connection, no WebGL) the fallback is left alone as the permanent
       picture, exactly as before. */
    if (fallbackRef.current) fallbackRef.current.style.display = "none";

    const el = hostRef.current;
    if (!el) return;

    // Don't fetch the bundle until the hero is close to being looked at.
    const loader = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        setEnabled(true);
        loader.disconnect();
      },
      { rootMargin: "200px" },
    );
    loader.observe(el);

    return () => loader.disconnect();
  }, []);

  // Pause the render loop whenever the canvas isn't being looked at.
  useEffect(() => {
    if (!enabled) return;

    const el = hostRef.current;
    if (!el) return;

    let onScreen = true;

    const apply = () => {
      const active = onScreen && document.visibilityState === "visible";
      setFrameloop(active ? "always" : "never");
    };

    const visibility = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((e) => e.isIntersecting);
        apply();
      },
      { threshold: 0 },
    );
    visibility.observe(el);
    document.addEventListener("visibilitychange", apply);

    return () => {
      visibility.disconnect();
      document.removeEventListener("visibilitychange", apply);
    };
  }, [enabled]);

  return (
    <div ref={hostRef} className={fill ? "relative h-full w-full" : "w-full"}>
      {enabled && !failed ? (
        <SceneBoundary onFail={() => setFailed(true)}>
          <CaseFileScene
            frameloop={frameloop}
            fill={fill}
            pointerRef={pointerRef}
          />
        </SceneBoundary>
      ) : (
        // `contents`: a plain wrapper for the hide-on-mount ref, invisible
        // to layout so it doesn't interfere with StackFallback's own sizing.
        <div ref={fallbackRef} className="contents">
          <StackFallback dark={dark} fill={fill} />
        </div>
      )}
    </div>
  );
}

/* A decorative canvas must never take the whole page down with it — a shader
   compile failure or a lost context on some driver would otherwise blank the
   hero. React has no hook-based error boundary, so this stays a class. */
class SceneBoundary extends Component {
  state = { crashed: false };

  static getDerivedStateFromError() {
    return { crashed: true };
  }

  componentDidCatch() {
    // Tell the parent so it stops re-mounting the scene on later renders.
    this.props.onFail?.();
  }

  render() {
    if (this.state.crashed) return <StackFallback />;
    return this.props.children;
  }
}
