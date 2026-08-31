"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ExtrudeGeometry,
  MathUtils,
  Shape,
} from "three";

/* ---------------------------------------------------------------------------
   CaseFileScene — five case files settling into alignment.

   The concept, and why it is this rather than an abstract form: the firm
   administers case files, so the object *is* the service, and the motion —
   scattered sheets squaring up into an ordered stack — is the value
   proposition ("get it right, not just done", "audit-ready"). Nothing needs
   decoding.

   Material language is deliberately paper, not glass: high roughness, zero
   metalness, one soft key light, real contact shadow, a long lens. No bloom,
   no emissive glow, no reflections — those are what make WebGL read as a tech
   demo, which is exactly wrong for a regulated-sector buyer.

   Built on plain three rather than drei so the bundle stays small: rounded
   sheets come from THREE.Shape + ExtrudeGeometry (the bevel doubles as paper
   thickness), and the shadow is a ShadowMaterial plane, which renders only
   the shadow and stays transparent everywhere else — so the canvas sits over
   the hero background with nothing to match.
--------------------------------------------------------------------------- */

const PAPER = "#FBFCFD";
const TEAL = "#159A9C";

// Resting pose per sheet, plus the scattered pose it animates from. The active
// file (last) ends squarest and frontmost.
const SHEETS = [
  { rest: [-0.62, 0.5, -0.36], from: [-1.5, 1.25, -0.36], tilt: -0.15 },
  { rest: [-0.34, 0.26, -0.18], from: [-0.95, 1.0, -0.18], tilt: -0.085 },
  { rest: [-0.1, 0.04, 0], from: [0.7, 0.95, 0], tilt: -0.035 },
  { rest: [0.14, -0.18, 0.18], from: [1.35, -1.15, 0.18], tilt: 0.03 },
  { rest: [0.4, -0.4, 0.36], from: [1.15, -1.5, 0.36], tilt: 0.012, active: true },
];

const SETTLE_DURATION = 1.7;
// easeOutBack-ish without the overshoot going silly — sheets arrive with a
// little weight, like something set down rather than teleported.
const easeSettle = (t) => 1 - Math.pow(1 - t, 3.2);

/** A single sheet: rounded rectangle, extruded so it has real thickness. */
function useSheetGeometry() {
  return useMemo(() => {
    const w = 2.05;
    const h = 2.75;
    const r = 0.1;

    const shape = new Shape();
    shape.moveTo(-w / 2 + r, -h / 2);
    shape.lineTo(w / 2 - r, -h / 2);
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    shape.lineTo(w / 2, h / 2 - r);
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    shape.lineTo(-w / 2 + r, h / 2);
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    shape.lineTo(-w / 2, -h / 2 + r);
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);

    const geometry = new ExtrudeGeometry(shape, {
      depth: 0.012,
      bevelEnabled: true,
      bevelThickness: 0.006,
      bevelSize: 0.006,
      bevelSegments: 2,
      curveSegments: 8,
    });
    geometry.center();
    return geometry;
  }, []);
}

function Stack({ pointer }) {
  const group = useRef(null);
  const sheets = useRef([]);
  const elapsed = useRef(0);
  const geometry = useSheetGeometry();

  useFrame((state, delta) => {
    // Cap delta so a backgrounded tab doesn't resume with one enormous step.
    elapsed.current += Math.min(delta, 0.05);

    const settle = Math.min(elapsed.current / SETTLE_DURATION, 1);
    const eased = easeSettle(settle);
    const t = state.clock.elapsedTime;

    SHEETS.forEach((sheet, i) => {
      const mesh = sheets.current[i];
      if (!mesh) return;

      // Stagger so the stack assembles front to back rather than all at once.
      const local = MathUtils.clamp(eased * 1.35 - i * 0.07, 0, 1);

      mesh.position.x = MathUtils.lerp(sheet.from[0], sheet.rest[0], local);
      mesh.position.y =
        MathUtils.lerp(sheet.from[1], sheet.rest[1], local) +
        // Idle float, only once settled. Tiny — presence, not animation.
        Math.sin(t * 0.55 + i * 0.9) * 0.022 * local;
      mesh.position.z = sheet.rest[2];

      // Sheets arrive from a steeper angle and rotate flat as they land.
      mesh.rotation.z = MathUtils.lerp(sheet.tilt * 5.5, sheet.tilt, local);
      mesh.rotation.x = Math.sin(t * 0.4 + i * 0.7) * 0.012 * local;
    });

    // Mouse parallax on the whole group, heavily damped. Disableable motion
    // under WCAG 2.3.3 — the wrapper never mounts this scene when the user
    // has asked for reduced motion.
    if (group.current) {
      group.current.rotation.y = MathUtils.lerp(
        group.current.rotation.y,
        pointer.current.x * 0.12,
        0.04,
      );
      group.current.rotation.x = MathUtils.lerp(
        group.current.rotation.x,
        -0.42 + pointer.current.y * 0.06,
        0.04,
      );
    }
  });

  return (
    <group ref={group} rotation={[-0.42, 0, 0]}>
      {SHEETS.map((sheet, i) => (
        <mesh
          key={i}
          ref={(node) => {
            sheets.current[i] = node;
          }}
          geometry={geometry}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color={PAPER}
            roughness={0.92}
            metalness={0}
          />

          {/* The active file's edge tab — the one teal accent in the scene,
              and the only thing marking a file as filed. */}
          {sheet.active && (
            <mesh position={[-1.03, 0.62, 0.012]}>
              <boxGeometry args={[0.05, 0.62, 0.026]} />
              <meshStandardMaterial
                color={TEAL}
                roughness={0.55}
                metalness={0}
              />
            </mesh>
          )}
        </mesh>
      ))}
    </group>
  );
}

export default function CaseFileScene({ frameloop = "always" }) {
  const pointer = useRef({ x: 0, y: 0 });

  return (
    <div
      aria-hidden
      className="relative mx-auto aspect-[4/3.4] w-full max-w-md"
      onPointerMove={(e) => {
        const box = e.currentTarget.getBoundingClientRect();
        pointer.current.x = ((e.clientX - box.left) / box.width) * 2 - 1;
        pointer.current.y = ((e.clientY - box.top) / box.height) * 2 - 1;
      }}
      onPointerLeave={() => {
        pointer.current.x = 0;
        pointer.current.y = 0;
      }}
    >
      <Canvas
        shadows
        /* Driven by the wrapper: the loop stops when the hero scrolls out of
           view or the tab is hidden, so we never burn battery rendering a
           canvas nobody is looking at. */
        frameloop={frameloop}
        // A long lens (low fov) keeps perspective distortion out of it, which
        // is what makes the stack read as photographed rather than rendered.
        camera={{ position: [0, 0.35, 8.4], fov: 22 }}
        // Cap at 1.5: past that we are paying for pixels nobody can see on a
        // matte-paper subject with no fine detail.
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1.35} />

        {/* Single soft key from upper-left — one light source is what reads as
            a photographed desk rather than a lit stage. */}
        <directionalLight
          position={[-3.2, 4.6, 3.4]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={0.5}
          shadow-camera-far={16}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
          shadow-bias={-0.0006}
          shadow-radius={5}
        />
        {/* A whisper of cool fill from the opposite side so the shadow side of
            each sheet doesn't go dead. */}
        <directionalLight position={[3, -1.5, 2]} intensity={0.28} />

        <Stack pointer={pointer} />

        {/* ShadowMaterial renders only where shadow falls, so the plane is
            invisible against the hero background — no colour to match. */}
        <mesh
          position={[0, -1.95, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[14, 14]} />
          <shadowMaterial transparent opacity={0.16} />
        </mesh>
      </Canvas>
    </div>
  );
}
