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

// Offsets are in the same visual order as the 3D scene: the active file sits
// squarest and frontmost, the rest fan back and up.
const SHEETS = [
  { x: -22, y: 34, rotate: -3.4, tone: "bg-white", z: "z-[1]" },
  { x: -10, y: 22, rotate: -1.8, tone: "bg-white", z: "z-[2]" },
  { x: 2, y: 11, rotate: -0.6, tone: "bg-white", z: "z-[3]" },
  { x: 12, y: 0, rotate: 0.7, tone: "bg-white", z: "z-[4]" },
];

export default function StackFallback({ className = "" }) {
  return (
    <div
      aria-hidden
      className={`relative mx-auto aspect-[4/3.4] w-full max-w-md ${className}`}
    >
      {SHEETS.map((sheet, i) => (
        <div
          key={i}
          className={`absolute inset-x-6 top-8 h-[74%] rounded-xl border border-ink-200/80 shadow-card ${sheet.tone} ${sheet.z}`}
          style={{
            transform: `translate(${sheet.x}px, ${sheet.y}px) rotate(${sheet.rotate}deg)`,
          }}
        />
      ))}

      {/* The active file — squared, frontmost, teal-tabbed. Carries a few
          ruled lines so it reads as a document rather than a blank card. */}
      <div className="absolute inset-x-6 top-8 z-[5] h-[74%] rounded-xl border border-ink-200 bg-white shadow-card-hover">
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
      <div className="absolute inset-x-12 bottom-2 h-6 rounded-[50%] bg-ink-900/[0.09] blur-lg" />
    </div>
  );
}
