/* ---------------------------------------------------------------------------
   OperationsCard — the hero's supporting graphic.

   Replaces the earlier WebGL case-file stack (and its CSS "compliance audit"
   fallback). That version was a single, very specific artefact — one audit
   file at hero scale. This is generalised: a compact card that sketches how
   *any* engagement runs, ringed by the service names so the breadth of the
   offer is visible at a glance.

   Deliberately smaller than the object it replaces (max-w-sm rather than
   max-w-xl) so it reads as a supporting element beside the copy, not a second
   focal point competing with the headline.

   Purely decorative — the hero's real content is the h1 and the CTAs — so the
   whole thing carries `aria-hidden` and nothing here is a link.
--------------------------------------------------------------------------- */

// A brief, high-level pass through an engagement — the same shape as the
// "How it runs" section, compressed to four lines.
const FLOW = [
  "Scope agreed in writing",
  "Work executed and tracked",
  "Progress reviewed each milestone",
  "Signed off and handed back",
];

/* Service names, floating clear of the card rather than sitting on its face.
   They ring the top and bottom edges only: the headline sits immediately to
   the left, and the hero clips anything pushed off the right, so those two
   sides are out. Each `pos` clears the border by a comfortable gap; `delay`
   and `duration` stagger the bob so they don't move in lockstep. */
const TAGS = [
  {
    label: "Insolvency case support",
    pos: "left-6 -top-10 -translate-y-1/2 sm:left-7",
    delay: "0s",
    duration: "6.5s",
  },
  {
    label: "Compliance auditing",
    pos: "right-6 -top-10 -translate-y-1/2 sm:right-6",
    delay: "1.4s",
    duration: "7.2s",
  },
  {
    label: "Contract lifecycle",
    pos: "left-1/2 -top-[5.5rem] -translate-x-1/2 -translate-y-1/2",
    delay: "0.7s",
    duration: "6s",
  },
  {
    label: "CRM data cleanup",
    pos: "right-6 -bottom-10 translate-y-1/2 sm:right-6",
    delay: "2.1s",
    duration: "7.6s",
  },
  {
    label: "Operations support",
    pos: "left-6 -bottom-10 translate-y-1/2 sm:left-7",
    delay: "1s",
    duration: "6.8s",
  },
  {
    label: "Software development",
    pos: "left-1/2 -bottom-[5.5rem] -translate-x-1/2 translate-y-1/2",
    delay: "1.7s",
    duration: "7s",
  },
];

/* Two elements on purpose: the outer span owns the position (including any
   `-translate-*` centering), the inner span owns the bob. The `float` keyframe
   animates `transform`, so pairing it with a translate utility on one element
   would let the animation clobber the offset. */
function Tag({ label, pos, delay, duration }) {
  return (
    <span className={`absolute ${pos}`}>
      <span
        className="animate-float block whitespace-nowrap rounded-full border border-white/40 bg-white/95 px-3 py-1.5 text-[11px] font-medium text-ink-700 shadow-lg"
        style={{ animationDelay: delay, animationDuration: duration }}
      >
        <span className="mr-1.5 inline-block h-1.5 w-1.5 -translate-y-px rounded-full bg-primary-500 align-middle" />
        {label}
      </span>
    </span>
  );
}

export default function OperationsCard({ className = "" }) {
  return (
    <div
      aria-hidden
      className={`relative mx-auto w-full max-w-sm ${className}`}
    >
      {/* Soft teal bloom behind the card, so it lifts off the near-black
          ground without a hard rectangle of shadow. */}
      <div className="absolute -inset-5 rounded-[2rem] bg-primary-500/15 blur-2xl" />

      <div className="relative rounded-2xl border border-white/15 bg-white p-6 shadow-2xl sm:p-7">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-primary-600">
            Operations file
          </p>
          <span className="rounded-full bg-primary-50 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-primary-700">
            On track
          </span>
        </div>

        <p className="mt-4 font-display text-xl font-semibold leading-snug text-ink-900">
          How your work runs with us
        </p>

        <ol className="mt-5 space-y-3">
          {FLOW.map((step, i) => (
            <li key={step} className="flex items-start gap-3">
              <span className="mt-px flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-primary-200 bg-primary-50 font-mono text-[10px] font-semibold text-primary-700">
                {i + 1}
              </span>
              <span className="text-sm leading-snug text-ink-600">{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex items-center gap-2 border-t border-ink-100 pt-4">
          <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-confirm-100 text-confirm-600">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M2 5.2L4 7.2L8 2.6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-xs font-medium text-ink-500">
            Documented and audit-ready at every stage
          </span>
        </div>
      </div>

      {TAGS.map((tag) => (
        <Tag key={tag.label} {...tag} />
      ))}
    </div>
  );
}
