/* ---------------------------------------------------------------------------
   StackFallback — the case-file stack in plain CSS.

   Not a placeholder. It is what actually renders for a meaningful share of
   visitors, and on phones it is the *only* thing that renders:

     - every server-rendered response, until the WebGL bundle arrives
     - every viewport under 768px (see `sceneIsWorthIt` — a quarter-megabyte
       of decoration over cellular is a bad trade)
     - anyone with `prefers-reduced-motion: reduce`, Save-Data, or 2G
     - anyone whose browser or GPU can't give us a WebGL context

   So it carries the same document content as the 3D page texture rather than
   generic ruled lines: file reference, heading, body rules, a checklist and a
   FILED chip. Previously it was a blank white slab, which is exactly the
   complaint the 3D version already had — and on mobile nobody ever saw the
   fixed version.

   Kept deliberately in step with `useDocumentTexture` in CaseFileScene. If the
   page design changes there, change it here too, or the scene will visibly
   jump when it swaps in over this.

   Purely decorative: the hero's real content is the h1 and the CTAs.
--------------------------------------------------------------------------- */

const SHEETS = [
  { x: -9, y: -9, rotate: -1.1, z: "z-[1]" },
  { x: -5, y: -5, rotate: -0.6, z: "z-[2]" },
  { x: 0, y: 0, rotate: -0.2, z: "z-[3]" },
  { x: 4, y: 4, rotate: 0.25, z: "z-[4]" },
];

const BODY_RULES = ["w-[92%]", "w-full", "w-[78%]", "w-[96%]", "w-[64%]"];
const CHECKS = ["w-[68%]", "w-[82%]", "w-[58%]"];

function Tick() {
  return (
    <span className="flex h-[14px] w-[14px] flex-shrink-0 items-center justify-center rounded-full border-[1.5px] border-primary-600">
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
        <path
          d="M1 4.2L2.9 6L7 1.4"
          stroke="#159A9C"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

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
          : `relative mx-auto aspect-[3/3.7] w-full max-w-[19rem] ${className}`
      }
    >
      {SHEETS.map((sheet, i) => (
        <div
          key={i}
          className={`absolute inset-x-6 top-4 bottom-6 rounded-xl bg-white ${
            dark
              ? "border border-white/15 shadow-xl"
              : "border border-ink-200/80 shadow-card"
          } ${sheet.z}`}
          style={{
            transform: `translate(${sheet.x}px, ${sheet.y}px) rotate(${sheet.rotate}deg)`,
          }}
        />
      ))}

      {/* The active file — squared, frontmost, teal-tabbed, and carrying the
          page itself. */}
      <div
        className={`absolute inset-x-6 top-4 bottom-6 z-[5] overflow-hidden rounded-xl bg-white ${
          dark
            ? "border border-white/20 shadow-2xl"
            : "border border-ink-200 shadow-card-hover"
        }`}
        style={{ transform: "translate(8px, 8px) rotate(0.6deg)" }}
      >
        <span className="absolute -left-px top-10 h-14 w-[3px] rounded-r bg-primary-600" />

        <div className="flex h-full flex-col p-6">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-primary-600">
            Case file / 04-118
          </p>

          <p className="mt-3 font-display text-xl font-semibold leading-[1.15] text-ink-900">
            Compliance
            <br />
            Audit
          </p>

          <span className="mt-4 block h-px w-full bg-ink-100" />

          <div className="mt-4 space-y-[7px]">
            {BODY_RULES.map((w, i) => (
              <span key={i} className={`block h-[5px] rounded-full bg-ink-200 ${w}`} />
            ))}
          </div>

          <div className="mt-5 space-y-[9px]">
            {CHECKS.map((w, i) => (
              <span key={i} className="flex items-center gap-2.5">
                <Tick />
                <span className={`block h-[5px] rounded-full bg-ink-200 ${w}`} />
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-end justify-between gap-3">
            <span className="space-y-1.5">
              <span className="block h-[5px] w-16 rounded-full bg-ink-200" />
              <span className="block h-[5px] w-11 rounded-full bg-ink-100" />
            </span>
            <span className="rounded-full bg-primary-50 px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-primary-700">
              Filed
            </span>
          </div>
        </div>
      </div>

      {/* Contact shadow under the stack, matching the scene's shadow. */}
      <div
        className={`absolute inset-x-10 bottom-1 h-5 rounded-[50%] blur-lg ${
          dark ? "bg-black/60" : "bg-ink-900/[0.09]"
        }`}
      />
    </div>
  );
}
