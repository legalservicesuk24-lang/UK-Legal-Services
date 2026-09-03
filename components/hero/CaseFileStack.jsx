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
     - The CSS fallback renders until the scene is ready, so the hero looks
       finished at all times — there is no empty box and no layout shift,
       because both states share the same aspect ratio.
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

const CaseFileScene = dynamic(() => import("./CaseFileScene"), {
  ssr: false,
  loading: () => <StackFallback dark fill />,
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
  const [enabled, setEnabled] = useState(false);
  const [failed, setFailed] = useState(false);
  const [frameloop, setFrameloop] = useState("always");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!sceneIsWorthIt()) return;
    if (!supportsWebGL()) return;

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
        <StackFallback dark={dark} fill={fill} />
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
