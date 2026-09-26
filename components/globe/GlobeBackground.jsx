"use client";

import { useEffect, useRef } from "react";
import {
  geoCircle,
  geoEquirectangular,
  geoGraticule10,
  geoOrthographic,
  geoPath,
} from "d3-geo";
import { feature, mesh } from "topojson-client";

import {
  CAMERA_EASE,
  KEYS,
  POINTER_EASE,
  SCROLL_SPRING,
  SPIN_RATE,
} from "../../lib/globe-keyframes";

/* ---------------------------------------------------------------------------
   GlobeBackground — the fixed full-viewport wireframe globe behind the
   homepage chapters. Ported from the Bench Strength globe handoff; motion
   tuning lives in lib/globe-keyframes.js.

   The canvas never takes pointer events. Pointer parallax is tracked on
   window instead.

   Palette is the site's, not the handoff's gold:
     LINE  accent-400 ochre  — grid, coastline, land dots, rim, atmosphere
     GLOW  primary-600 clay  — the ambient light behind the sphere

   Things that look optional but are not (see the handoff's pitfalls):
     - The loop is not guarded on document.hidden, and a watchdog timer forces
       a frame when rAF stalls. Some embedded/preview contexts report hidden
       forever, which would ship a blank hero.
     - dt is clamped at 0, because frame() runs on two clocks (rAF and the
       watchdog) and a negative dt walks the camera backwards.
     - The land-dot mask is geographic, so it is built once, never on resize.
--------------------------------------------------------------------------- */

const LINE = [200, 130, 59];
const GLOW = [156, 72, 43];
const TOPOLOGY_URL = "/geo/countries-110m.json";

const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const smooth = (t) => t * t * (3 - 2 * t);
const mix = (a, b, t) => a + (b - a) * t;

function camAt(p, cam) {
  let i = 0;
  while (i < KEYS.length - 2 && p > KEYS[i + 1].p) i++;
  const a = KEYS[i];
  const b = KEYS[i + 1];
  const t = smooth(clamp((p - a.p) / (b.p - a.p), 0, 1));
  const out = {};
  for (const k in cam) out[k] = mix(a[k], b[k], t);
  return out;
}

/* Rasterise land onto a small equirectangular canvas and sample it on a
   lat/lon lattice. Far faster than geoContains per point. */
function buildDots(land, step) {
  const MW = 900;
  const MH = 450;
  const off = document.createElement("canvas");
  off.width = MW;
  off.height = MH;
  const octx = off.getContext("2d");
  const proj = geoEquirectangular()
    .scale(MW / (2 * Math.PI))
    .translate([MW / 2, MH / 2]);
  octx.fillStyle = "#fff";
  octx.beginPath();
  geoPath(proj, octx)(land);
  octx.fill();
  const data = octx.getImageData(0, 0, MW, MH).data;
  const isLand = (lon, lat) => {
    const x = Math.round(((lon + 180) / 360) * MW);
    const y = Math.round(((90 - lat) / 180) * MH);
    if (x < 0 || y < 0 || x >= MW || y >= MH) return false;
    return data[(y * MW + x) * 4 + 3] > 120;
  };

  const out = [];
  for (let lat = -84; lat <= 84; lat += step) {
    const rad = (lat * Math.PI) / 180;
    const cl = Math.cos(rad);
    const lonStep = step / Math.max(cl, 0.16);
    for (let lon = -180; lon < 180; lon += lonStep) {
      if (!isLand(lon, lat)) continue;
      const lr = (lon * Math.PI) / 180;
      out.push({ x: cl * Math.cos(lr), y: cl * Math.sin(lr), z: Math.sin(rad) });
    }
  }
  return out;
}

export default function GlobeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower =
      (navigator.hardwareConcurrency || 4) <= 4 || window.innerWidth < 700;
    const DOT_STEP = lowPower ? 2.6 : 1.8;

    const projection = geoOrthographic().clipAngle(90).precision(0.35);
    const path = geoPath(projection, ctx);
    const grat = geoGraticule10();
    const night = geoCircle().radius(88);

    let land = null;
    let borders = null;
    let dots = [];
    let W = 0;
    let H = 0;
    let Rb = 0;
    let narrow = false;
    let alive = true;

    const k0 = KEYS[0];
    const cam = {
      r: k0.r,
      sink: k0.sink,
      lam: k0.lam,
      phi: k0.phi,
      dot: k0.dot,
      night: k0.night,
    };
    const ptr = { x: 0, y: 0, px: 0, py: 0 };
    let spin = 0;
    let progR = 0;
    let progV = 0;
    let t0 = performance.now();
    let lastDraw = 0;

    function layout() {
      W = window.innerWidth;
      H = window.innerHeight;
      narrow = W < 980;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      Rb = narrow
        ? Math.min(W, H) * 0.32
        : clamp(Math.min(W, H) * 0.3, 190, H * 0.34);
    }

    function frame(now) {
      const dt = clamp((now - t0) / 1000, 0, 0.05);
      t0 = now;
      if (!reduce) spin += dt * SPIN_RATE * (0.6 + cam.r * 0.5);
      const ease = (k) => 1 - Math.pow(1 - k, dt * 60);

      const doc = Math.max(document.documentElement.scrollHeight - H, 1);
      const prog = clamp(window.scrollY / doc, 0, 1);
      // critically damped spring: accelerates and settles, never overshoots
      const acc = SCROLL_SPRING * SCROLL_SPRING * (prog - progR) - 2 * SCROLL_SPRING * progV;
      progV += acc * dt;
      progR += progV * dt;
      if (Math.abs(prog - progR) < 1e-5 && Math.abs(progV) < 1e-4) {
        progR = prog;
        progV = 0;
      }

      const ep = ease(POINTER_EASE);
      ptr.px += (ptr.x - ptr.px) * ep;
      ptr.py += (ptr.y - ptr.py) * ep;

      const target = camAt(progR, cam);
      const ec = ease(CAMERA_EASE);
      for (const key in cam) cam[key] += (target[key] - cam[key]) * ec;

      const R = Rb * cam.r;
      const cx = W * 0.5 + (narrow ? 0 : ptr.px * 20);
      const cy = H * (narrow ? 0.46 : 0.5) + R * cam.sink + (narrow ? 0 : ptr.py * 10);
      const rLam = cam.lam + spin * 0.55 + (narrow ? 0 : ptr.px * 7);
      const rPhi = clamp(cam.phi + (narrow ? 0 : ptr.py * 4), -78, 78);
      const rotLam = (rLam * Math.PI) / 180;
      const rotPhi = (rPhi * Math.PI) / 180;
      projection.scale(R).translate([cx, cy]).rotate([rLam, rPhi, 0]);

      ctx.clearRect(0, 0, W, H);

      // 0 ambient glow, strongest as the globe arrives
      const gy = cy - R * 0.55;
      const ga = 0.18 + clamp(cam.r, 0, 2.1) * 0.07;
      const hg = ctx.createRadialGradient(cx, gy, 0, cx, gy, R * 1.5);
      hg.addColorStop(0, rgba(GLOW, ga));
      hg.addColorStop(0.45, rgba(GLOW, ga * 0.35));
      hg.addColorStop(1, rgba(GLOW, 0));
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = hg;
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";

      // 1 atmosphere
      let g = ctx.createRadialGradient(cx, cy, R * 0.84, cx, cy, R * 1.3);
      const aa = 0.26 + clamp(cam.r - 0.72, 0, 1.38) * 0.08;
      g.addColorStop(0, rgba(LINE, aa));
      g.addColorStop(0.38, rgba(LINE, aa * 0.32));
      g.addColorStop(1, rgba(LINE, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.32, 0, Math.PI * 2);
      ctx.fill();

      // 2 sphere body, lit from the upper left, lifting as it grows
      g = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.08, cx, cy, R);
      const lift = clamp((cam.r - 0.72) / 1.38, 0, 1);
      g.addColorStop(
        0,
        `rgba(${Math.round(58 + 22 * lift)},${Math.round(45 + 16 * lift)},${Math.round(33 + 10 * lift)},.96)`,
      );
      g.addColorStop(
        0.62,
        `rgba(${Math.round(34 + 12 * lift)},${Math.round(28 + 9 * lift)},${Math.round(22 + 6 * lift)},.95)`,
      );
      g.addColorStop(1, "rgba(13,12,11,.97)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // 3 graticule
      ctx.beginPath();
      path(grat);
      ctx.lineWidth = clamp(0.6 * Math.sqrt(cam.r), 0.55, 1.2);
      ctx.strokeStyle = rgba(LINE, 0.26 + clamp(cam.r, 0, 2.1) * 0.05);
      ctx.stroke();

      // 4 land, 5 borders
      if (land) {
        ctx.beginPath();
        path(land);
        ctx.fillStyle = rgba(LINE, 0.08 + clamp(cam.r, 0, 2.1) * 0.022);
        ctx.fill();
        ctx.lineWidth = clamp(0.95 * Math.sqrt(cam.r), 0.9, 2.6);
        ctx.strokeStyle = rgba(LINE, 0.52 + clamp(cam.r, 0, 2.1) * 0.14);
        ctx.stroke();
        if (borders && cam.r > 1.0) {
          ctx.beginPath();
          path(borders);
          ctx.lineWidth = 0.6;
          ctx.strokeStyle = rgba(LINE, 0.14 * clamp((cam.r - 1.0) / 0.4, 0, 1));
          ctx.stroke();
        }
      }

      // 6 land dots — projected inline (rotate about z by λ, then about y by
      // -φ, then orthographic); a d3 projection call per dot blows the budget
      if (dots.length && cam.dot > 0.02) {
        ctx.fillStyle = rgba(LINE, 1);
        const sz = clamp(1.35 * Math.sqrt(cam.r), 0.7, 3.4);
        const cl = Math.cos(rotLam);
        const sl = Math.sin(rotLam);
        const cp = Math.cos(rotPhi);
        const sp = Math.sin(rotPhi);
        let alpha = -1;
        for (let i = 0; i < dots.length; i++) {
          const d = dots[i];
          const xr = d.x * cl - d.y * sl;
          const yr = d.x * sl + d.y * cl;
          const front = xr * cp - d.z * sp; // dot product with the view centre
          if (front <= 0.05) continue;
          const px = cx + R * yr;
          const py = cy - R * (xr * sp + d.z * cp);
          if (px < -40 || px > W + 40 || py < -40 || py > H + 40) continue;
          const a = Math.round(clamp((0.26 + front * 0.72) * cam.dot, 0, 1) * 100) / 100;
          if (a !== alpha) {
            alpha = a;
            ctx.globalAlpha = a;
          }
          const s = sz * (0.75 + front * 0.45);
          ctx.fillRect(px - s / 2, py - s / 2, s, s);
        }
        ctx.globalAlpha = 1;
      }

      // 7 night side
      if (cam.night > 0.02) {
        const sunLon = ((now / 1000) * 6) % 360 - 180;
        ctx.beginPath();
        path(night.center([sunLon + 180, -12])());
        ctx.fillStyle = `rgba(10,7,5,${0.5 * cam.night})`;
        ctx.fill();
      }

      // 8 rim
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.lineWidth = 1.3 + clamp(cam.r - 1, 0, 1.1) * 0.5;
      ctx.strokeStyle = rgba(LINE, 0.44 + clamp(cam.r - 0.7, 0, 1.4) * 0.14);
      ctx.stroke();

      lastDraw = performance.now();
    }

    function loop(now) {
      if (!alive) return;
      frame(now);
      raf = requestAnimationFrame(loop);
    }

    const onPointerMove = (e) => {
      if (e.pointerType === "touch") return;
      ptr.x = (e.clientX / W) * 2 - 1;
      ptr.y = (e.clientY / H) * 2 - 1;
    };
    const onPointerLeave = () => {
      ptr.x = 0;
      ptr.y = 0;
    };

    layout();
    window.addEventListener("resize", layout);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    let raf = requestAnimationFrame(loop);
    const watchdog = setInterval(() => {
      const n = performance.now();
      if (n - lastDraw > 150) frame(n);
    }, 120);

    // If this fails the globe still renders its grid and rim — never blank.
    fetch(TOPOLOGY_URL)
      .then((r) => r.json())
      .then((topo) => {
        if (!alive) return;
        land = feature(topo, topo.objects.countries);
        borders = mesh(topo, topo.objects.countries, (a, b) => a !== b);
        dots = buildDots(land, DOT_STEP);
      })
      .catch(() => {});

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      clearInterval(watchdog);
      window.removeEventListener("resize", layout);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <>
      <div aria-hidden className="globe-stage">
        <canvas ref={canvasRef} />
      </div>
      <div aria-hidden className="globe-veil" />
    </>
  );
}
