"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  BufferAttribute,
  CanvasTexture,
  EquirectangularReflectionMapping,
  ExtrudeGeometry,
  MathUtils,
  Shape,
  SRGBColorSpace,
  Texture,
} from "three";

/* ---------------------------------------------------------------------------
   CaseFileScene — five case files settling into a squared stack.

   The concept, and why it is this rather than an abstract form: the firm
   administers case files, so the object *is* the service, and the motion —
   scattered sheets squaring up into one flush stack — is the value
   proposition ("get it right, not just done", "audit-ready"). Nothing needs
   decoding.

   Material language is deliberately paper, not glass: high roughness, zero
   metalness, one soft key light, a long lens. No bloom, no emissive glow, no
   reflections — those are what make WebGL read as a tech demo, which is
   exactly wrong for a regulated-sector buyer.

   Built on plain three rather than drei so the bundle stays small: rounded
   sheets come from Shape + ExtrudeGeometry (the bevel doubles as paper
   thickness), so the scene needs no 3D assets at all.

   Four settings here are load-bearing, and all four were wrong on the first
   pass — they are the difference between paper and grey slabs:

     - Tone mapping. R3F defaults to ACESFilmicToneMapping, which maps
       near-white paper down to a mid grey. Fixed twice over: `flat` on the
       Canvas, and `toneMapped={false}` on the materials. The second matters
       because `flat` is applied asynchronously via root.configure() and does
       not reliably survive HMR — the material flag always wins.
     - `shadows="percentage"`. A bare `shadows` selects PCFSoftShadowMap, which
       three 0.185 has deprecated — it falls back to PCFShadowMap and warns
       every frame. "percentage" *is* PCFShadowMap. `shadow-radius` only ever
       applied to PCFSoft, so it is gone.
     - Light intensities are LARGE. This one bit twice. Since three r155
       (useLegacyLights = false) the shader divides light contribution by PI,
       so intensities need to be roughly 3x what the pre-r155 convention used
       — not less. Guessing "physical units means go lower" produced
       (0.42 + 0.9*0.765)/PI = 0.35 linear = sRGB 159, i.e. the exact mid grey
       the sheets first rendered as. Lit faces should land near 1.0 linear.
     - The camera is well back with a narrow fov. Too close and the sheets
       both clip and shear into trapezoids.

   Pose and lighting need a real screen to judge; these are conservative
   starting points, not sacred numbers.
--------------------------------------------------------------------------- */

const PAPER = "#FBFCFD";
const TEAL = "#159A9C";

const SHEET_W = 1.55;
const SHEET_H = 2.05;

/* `rest` is near-aligned on purpose. The payoff of the animation is a *flush*
   stack, so the sheets finish squared, offset just enough to show there are
   five of them — depth separation does the layering work instead, which reads
   once the group is tilted and shadows fall between sheets. An earlier version
   rested in a wide fan, which contradicted the whole idea of squaring up.
   `from` is scattered wide and mostly outside the frame, so they fly in. */
const SHEETS = [
  { rest: [-0.06, 0.06, -0.3], tilt: -0.018, from: [-1.9, 1.5], fromTilt: -0.5 },
  { rest: [-0.03, 0.03, -0.15], tilt: -0.01, from: [-1.25, -1.65], fromTilt: 0.38 },
  { rest: [0, 0, 0], tilt: -0.003, from: [1.75, 1.35], fromTilt: 0.46 },
  { rest: [0.03, -0.03, 0.15], tilt: 0.004, from: [1.35, -1.7], fromTilt: -0.42 },
  {
    rest: [0.06, -0.06, 0.3],
    tilt: 0.01,
    from: [-0.45, 2.05],
    fromTilt: 0.55,
    active: true,
  },
];

const SETTLE_DURATION = 1.7;
// Decelerating arrival — sheets land with a little weight, like something set
// down rather than teleported into place.
const easeSettle = (t) => 1 - Math.pow(1 - t, 3.2);

const GROUP_TILT = -0.32;
/* Yaw matters more than it sounds. A squared stack viewed dead-on is, by
   definition, one rectangle — which is exactly how it read: a single grey
   slab. Turning it ~24 degrees puts the sheets' depth separation on screen as
   layered edges, so the stack is legible as five sheets without spreading
   them into a fan and contradicting the "squared up" idea. */
const GROUP_YAW = -0.42;

/* The page itself, painted to a canvas and used as the sheet's colour map.

   Blank paper was the single biggest thing wrong with this scene: at hero
   scale a featureless slab reads as a grey panel, not as a case file. Drawing
   the page content is also what makes the object self-explanatory — you can
   see it is a document without being told.

   Generated in code so there is still no asset to ship, and so the palette
   stays in sync with the site rather than being baked into an image. */
function useDocumentTexture() {
  return useMemo(() => {
    const W = 620;
    const H = 820;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const c = canvas.getContext("2d");

    // roundRect is Chrome 99+ / Safari 16.4+. Square corners on a 9px bar are
    // imperceptible, and degrading beats throwing into the error boundary and
    // losing the whole scene over a cosmetic radius.
    const rounded = typeof c.roundRect === "function";

    const bar = (x, y, w, h, fill, r = h / 2) => {
      c.fillStyle = fill;
      if (!rounded) {
        c.fillRect(x, y, w, h);
        return;
      }
      c.beginPath();
      c.roundRect(x, y, w, h, r);
      c.fill();
    };

    c.fillStyle = "#FBFCFD";
    c.fillRect(0, 0, W, H);

    const PAD = 62;
    const INK = "#0B1F33";
    const GREY = "#C9D2D8";
    const GREY_SOFT = "#DEE5E9";

    // File reference, in the same mono small-caps idiom as the site's .file-tag
    c.fillStyle = "#159A9C";
    c.font = "600 19px ui-monospace, SFMono-Regular, Menlo, monospace";
    c.letterSpacing = "3px";
    c.fillText("CASE FILE / 04-118", PAD, PAD + 18);

    // Heading
    c.fillStyle = INK;
    c.letterSpacing = "0px";
    // System sans stack rather than the loaded webfont: canvas painting happens
    // before/independently of font loading, so relying on Figtree here would
    // race. At this size the difference is not readable anyway.
    c.font = "700 42px ui-sans-serif, -apple-system, 'Segoe UI', sans-serif";
    c.fillText("Compliance", PAD, PAD + 96);
    c.fillText("Audit", PAD, PAD + 148);

    // Rule
    bar(PAD, PAD + 190, W - PAD * 2, 2, GREY_SOFT, 0);

    // Body copy, as ruled bars — legible as text at distance without needing
    // real sentences that would be unreadable anyway.
    const lines = [0.92, 1, 0.78, 0.96, 0.64];
    lines.forEach((frac, i) => {
      bar(PAD, PAD + 224 + i * 26, (W - PAD * 2) * frac, 9, GREY);
    });

    // Checklist — the "filed" evidence, with teal ticks
    const items = [0.68, 0.82, 0.58, 0.74];
    items.forEach((frac, i) => {
      const y = PAD + 400 + i * 46;
      c.strokeStyle = "#159A9C";
      c.lineWidth = 3;
      c.beginPath();
      c.arc(PAD + 9, y + 4, 10, 0, Math.PI * 2);
      c.stroke();
      c.beginPath();
      c.moveTo(PAD + 4, y + 4);
      c.lineTo(PAD + 8, y + 9);
      c.lineTo(PAD + 15, y - 1);
      c.stroke();
      bar(PAD + 34, y - 1, (W - PAD * 2 - 34) * frac, 9, GREY);
    });

    // Signature block and a FILED chip, bottom aligned
    bar(PAD, H - 150, 190, 9, GREY);
    bar(PAD, H - 126, 130, 9, GREY_SOFT);

    bar(W - PAD - 148, H - 158, 148, 46, "#EAF6F6", 23);
    c.fillStyle = "#0F7C7E";
    c.font = "600 17px ui-monospace, SFMono-Regular, Menlo, monospace";
    c.letterSpacing = "2px";
    c.fillText("FILED", W - PAD - 100, H - 128);

    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = 4;
    return texture;
  }, []);
}

/** A single sheet: rounded rectangle, extruded so it has real thickness. */
function useSheetGeometry() {
  return useMemo(() => {
    const w = SHEET_W;
    const h = SHEET_H;
    const r = 0.075;

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
      depth: 0.014,
      bevelEnabled: true,
      bevelThickness: 0.005,
      bevelSize: 0.005,
      bevelSegments: 2,
      curveSegments: 8,
    });
    geometry.center();

    /* ExtrudeGeometry's default UV generator maps UVs straight from the
       shape's own coordinates, so on a 1.55 x 2.05 sheet they run roughly
       -0.78..0.78 and -1.03..1.03 — a texture applied to that would tile and
       mirror. Rewrite them as normalized 0..1 across the face. The side and
       bevel faces get squashed UVs as a side effect, which is invisible at
       0.014 units thick. */
    const pos = geometry.attributes.position;
    const uv = new Float32Array(pos.count * 2);
    for (let i = 0; i < pos.count; i += 1) {
      uv[i * 2] = (pos.getX(i) + w / 2) / w;
      uv[i * 2 + 1] = (pos.getY(i) + h / 2) / h;
    }
    geometry.setAttribute("uv", new BufferAttribute(uv, 2));

    return geometry;
  }, []);
}

function Stack({ pointer }) {
  const group = useRef(null);
  const sheets = useRef([]);
  const elapsed = useRef(0);
  const geometry = useSheetGeometry();
  const page = useDocumentTexture();

  useFrame((state, delta) => {
    // Cap delta so a backgrounded tab doesn't resume with one enormous step.
    elapsed.current += Math.min(delta, 0.05);

    const eased = easeSettle(Math.min(elapsed.current / SETTLE_DURATION, 1));
    const t = state.clock.elapsedTime;

    SHEETS.forEach((sheet, i) => {
      const mesh = sheets.current[i];
      if (!mesh) return;

      // Stagger so the stack assembles rather than snapping together at once.
      const local = MathUtils.clamp(eased * 1.35 - i * 0.06, 0, 1);

      mesh.position.x = MathUtils.lerp(sheet.from[0], sheet.rest[0], local);
      mesh.position.y =
        MathUtils.lerp(sheet.from[1], sheet.rest[1], local) +
        // Idle float, scaled in only once settled. Tiny — presence, not motion.
        Math.sin(t * 0.55 + i * 0.9) * 0.018 * local;
      mesh.position.z = sheet.rest[2];

      mesh.rotation.z = MathUtils.lerp(sheet.fromTilt, sheet.tilt, local);
      mesh.rotation.x = Math.sin(t * 0.4 + i * 0.7) * 0.01 * local;
    });

    // Pointer parallax on the whole group, heavily damped. This is why the
    // wrapper refuses to mount the scene under prefers-reduced-motion — WCAG
    // 2.3.3 covers exactly this kind of interaction-driven movement.
    if (group.current) {
      group.current.rotation.y = MathUtils.lerp(
        group.current.rotation.y,
        GROUP_YAW + pointer.current.x * 0.12,
        0.045,
      );
      group.current.rotation.x = MathUtils.lerp(
        group.current.rotation.x,
        GROUP_TILT + pointer.current.y * 0.07,
        0.045,
      );
    }
  });

  return (
    <group ref={group} rotation={[GROUP_TILT, GROUP_YAW, 0]}>
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
          {/* `toneMapped={false}` belts-and-braces the Canvas `flat` prop.
              `flat` is applied asynchronously by R3F's root.configure(), so it
              can lose a race (and does not always survive HMR); this is a
              property on the material itself, so paper renders as authored
              regardless of the renderer's tone-mapping setting. */}
          <meshStandardMaterial
            map={page}
            // White, so the map is shown as painted rather than tinted by it.
            color="#ffffff"
            roughness={0.86}
            metalness={0}
            // Low but non-zero: enough for the environment gradient to vary
            // across a sheet's face without ever looking like a reflection.
            envMapIntensity={0.35}
            toneMapped={false}
          />

          {/* The active file's edge tab — the single teal accent in the scene,
              and the only thing marking a file as filed. */}
          {sheet.active && (
            <mesh position={[-(SHEET_W / 2) - 0.015, 0.44, 0.014]}>
              <boxGeometry args={[0.05, 0.6, 0.028]} />
              <meshStandardMaterial
                color={TEAL}
                roughness={0.5}
                metalness={0}
                toneMapped={false}
              />
            </mesh>
          )}
        </mesh>
      ))}
    </group>
  );
}

/* A two-stop vertical gradient baked to a canvas and used as the environment
   map. Paper is a diffuse material, so it takes almost nothing from an
   environment — but "almost nothing" is the difference between flat shading and
   a surface that varies across its face. Generated in code rather than loaded
   as an HDR: no asset, no request, a few KB of canvas. */
function useStudioEnvironment() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, 64);
    gradient.addColorStop(0, "#dfe9ea"); // soft sky above the subject
    gradient.addColorStop(0.5, "#5d7275");
    gradient.addColorStop(1, "#101c24"); // dark floor, matching the section
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 16, 64);

    const texture = new Texture(canvas);
    texture.mapping = EquirectangularReflectionMapping;
    texture.colorSpace = SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }, []);
}

function Environment() {
  const texture = useStudioEnvironment();

  /* `attach` is the declarative equivalent of `scene.environment = texture`,
     and the reason to prefer it is not only style: assigning to a value
     returned from useThree mutates a hook result, which the React Compiler
     lint rules reject. R3F sets the property on mount and restores it on
     unmount.

     Deliberately not attached as `background` — the canvas has to stay
     transparent so the section's own gradient and grain show through. */
  return <primitive object={texture} attach="environment" />;
}

export default function CaseFileScene({
  frameloop = "always",
  fill = false,
  /* Supplied by Hero, which tracks the pointer across the whole section. The
     local fallback keeps the component usable on its own. */
  pointerRef,
}) {
  const localPointer = useRef({ x: 0, y: 0 });
  const pointer = pointerRef ?? localPointer;

  return (
    <div
      aria-hidden
      className={
        fill
          ? "absolute inset-0 h-full w-full"
          : "relative mx-auto aspect-[4/3.4] w-full max-w-md"
      }
      /* Only bound when no external ref was supplied. In the hero the
         wrapper is pointer-events-none, so these would never fire. */
      onPointerMove={
        pointerRef
          ? undefined
          : (e) => {
              const box = e.currentTarget.getBoundingClientRect();
              pointer.current.x = ((e.clientX - box.left) / box.width) * 2 - 1;
              pointer.current.y = ((e.clientY - box.top) / box.height) * 2 - 1;
            }
      }
      onPointerLeave={pointerRef ? undefined : () => {
        pointer.current.x = 0;
        pointer.current.y = 0;
      }}
    >
      <Canvas
        // PCFShadowMap: a bare `shadows` picks the deprecated PCFSoftShadowMap.
        shadows="percentage"
        // NoToneMapping: R3F's ACESFilmic default renders paper as grey.
        flat
        /* Driven by the wrapper: the loop stops when the hero scrolls out of
           view or the tab is hidden, so we never burn battery rendering a
           canvas nobody is looking at. */
        frameloop={frameloop}
        /* A narrow fov pulled well back keeps perspective distortion out of it,
           which is what makes the stack read as photographed rather than
           rendered. At fov 22 and z 8.8 this frames ~3.4 units of height,
           against a ~2.2-unit subject. */
        /* 7.2 framed the sheet at 73% of viewport height before the tilt and
           the stack spread were added on, which is why it overwhelmed the
           panel. 10 frames ~3.9 units against a ~2.2-unit subject — still a
           large, confident object with room to read as a stack. */
        camera={{ position: [0, 0.1, fill ? 10 : 8.8], fov: 22 }}
        // Past 1.5 we are paying for pixels nobody can see on matte paper.
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        {/* Retuned for the dark section. On the old light ground a high
            ambient was needed to keep the paper from looking dingy against
            off-white; against near-black the opposite is true — the key does
            the work and ambient only lifts the shadow side enough that it
            still reads as paper. Lit face lands ~sRGB 250, shadow side ~120,
            which is far more form than the flat 1.45/2.2 pairing gave. */}
        <ambientLight intensity={0.55} />

        {/* Single soft key from upper-left — one source is what reads as a
            photographed desk rather than a lit stage. Shadow frustum kept tight
            to the subject so the 1024 map isn't spent on empty space. */}
        <directionalLight
          position={[-3.4, 4.2, 4]}
          intensity={2.9}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={0.5}
          shadow-camera-far={14}
          shadow-camera-left={-2.6}
          shadow-camera-right={2.6}
          shadow-camera-top={2.6}
          shadow-camera-bottom={-2.6}
          /* The sheets were shadowing themselves: a fully lit face computes to
             sRGB 239, but the render was ~115, which is exactly ambient-only.
             `shadow-bias` cannot fix acne on a large flat face at a shallow
             light angle; `shadow-normalBias` offsets the shadow lookup along
             the surface normal and does. */
          shadow-bias={-0.0002}
          shadow-normalBias={0.035}
        />
        {/* A whisper of fill from the opposite side so the shadowed edge of
            each sheet doesn't go dead. */}
        <directionalLight position={[3, -1.2, 2]} intensity={0.5} />

        <Environment />

        <Stack pointer={pointer} />
      </Canvas>
    </div>
  );
}
