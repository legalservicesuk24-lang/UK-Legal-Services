/* ---------------------------------------------------------------------------
   StackFallback — the case-file stack in plain CSS.

   This is not a placeholder. It is what actually renders for a meaningful
   share of visitors:

     - every server-rendered response, until the WebGL bundle arrives
     - anyone with `prefers-reduced-motion: reduce` (we never load three.js)
     - anyone whose browser or GPU can't give us a WebGL context
     - anyone on a connection where a ~180KB 3D bundle is a bad trade

   So it has to look deliberate on its own. Because the composition is just
   offset rounded rectangles, CSS can carry it — which is the whole reason this
   concept was chosen over a modelled object needing a poster image.

   Purely decorative: the hero's real content is the h1 and the CTAs.
--------------------------------------------------------------------------- */

/* Mirrors the 3D scene's resting pose: a squared stack, offset just enough to
   show there are five sheets. Kept in step with the `rest` values in
   CaseFileScene — if the stack is retuned there, retune it here, or the scene
   will visibly jump when it swaps in over this. */
const SHEETS = [
  { x: -9, y: -9, rotate: -1.1, z: "z-[1]" },
  { x: -5, y: -5, rotate: -0.6, z: "z-[2]" },
  { x: 0, y: 0, rotate: -0.2, z: "z-[3]" },
  { x: 4, y: 4, rotate: 0.25, z: "z-[4]" },
];

export default function StackFallback({
  className = "",
  dark = false,
  fill = false,
}) {
  return (
    <div
      aria-hidden
      className={
        fill
          ? `absolute inset-0 m-auto aspect-[4/3.4] max-h-full w-full max-w-xl ${className}`
          : `relative mx-auto aspect-[4/3.4] w-full max-w-md ${className}`
      }
    >
      {SHEETS.map((sheet, i) => (
        <div
          key={i}
          className={`absolute inset-x-10 top-7 h-[76%] rounded-xl bg-white ${
            dark ? "border border-white/15 shadow-xl" : "border border-ink-200/80 shadow-card"
          } ${sheet.z}`}
          style={{
            transform: `translate(${sheet.x}px, ${sheet.y}px) rotate(${sheet.rotate}deg)`,
          }}
        />
      ))}

      {/* The active file — squared, frontmost, teal-tabbed. Carries a few
          ruled lines so it reads as a document rather than a blank card. */}
      <div
        className={`absolute inset-x-10 top-7 z-[5] h-[76%] rounded-xl bg-white ${
          dark ? "border border-white/20 shadow-2xl" : "border border-ink-200 shadow-card-hover"
        }`}
        style={{ transform: "translate(8px, 8px) rotate(0.6deg)" }}
      >
        <span className="absolute -left-px top-9 h-16 w-[3px] rounded-r bg-primary-600" />

        <div className="flex h-full flex-col gap-3 p-7">
          <div className="h-2 w-1/3 rounded-full bg-primary-600/25" />
          <div className="mt-1 h-2 w-4/5 rounded-full bg-ink-200" />
          <div className="h-2 w-full rounded-full bg-ink-200" />
          <div className="h-2 w-2/3 rounded-full bg-ink-200" />
          <div className="mt-auto flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary-600" />
            <div className="h-2 w-1/4 rounded-full bg-ink-200" />
          </div>
        </div>
      </div>

      {/* Contact shadow under the stack, matching the scene's ShadowMaterial. */}
      <div
        className={`absolute inset-x-12 bottom-2 h-6 rounded-[50%] blur-lg ${
          dark ? "bg-black/50" : "bg-ink-900/[0.09]"
        }`}
      />
    </div>
  );
}
