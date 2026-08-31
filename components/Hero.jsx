import { ButtonLink } from "./ui/Button";

/* A clean, restrained summary panel — the professional equivalent of a
   "proof point" card. One accent color, real content, no decorative clutter. */
function SummaryPanel() {
  const rows = [
    { label: "Case administration", status: "done" },
    { label: "Creditor liaison log", status: "done" },
    { label: "Statutory documentation", status: "done" },
    { label: "Compliance file audit", status: "progress" },
  ];

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="rounded-2xl border border-ink-200 bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-ink-100 px-6 py-5">
          <div>
            <p className="file-tag">Case Status • Active</p>
            <p className="mt-1.5 font-display text-base font-semibold text-ink-900">
              Compliance Case File
            </p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-confirm-50">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M4 9.5L7.2 12.7L14 5.5"
                stroke="#159A9C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <ul className="divide-y divide-ink-100 px-6">
          {rows.map((row) => (
            <li key={row.label} className="flex items-center justify-between py-3.5">
              <span className="text-sm text-ink-700">{row.label}</span>
              {row.status === "done" ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-confirm-50 px-2.5 py-1 text-[11px] font-medium text-confirm-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-confirm-500" />
                  Filed
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-100 px-2.5 py-1 text-[11px] font-medium text-ink-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-ink-400" />
                  In review
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* Stat strip — the two proof points, integrated into the panel itself
            instead of floating loosely around it */}
        <div className="grid grid-cols-2 divide-x divide-ink-100 border-t border-ink-100">
          <div className="px-6 py-5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-ink-400">
              Avg. Response
            </p>
            <p className="mt-1 font-display text-xl font-semibold text-ink-900">Under 24 hrs</p>
          </div>
          <div className="px-6 py-5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-ink-400">
              Audit Pass Rate
            </p>
            <p className="mt-1 font-display text-xl font-semibold text-ink-900">100%</p>
          </div>
        </div>
      </div>

      {/* One restrained accent shape, kept subtle and structural rather than decorative */}
      <div className="pointer-events-none absolute -right-3 -top-3 -z-10 h-full w-full rounded-2xl border border-primary-200" />
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-ink-50">
      {/* Ambient animated backdrop — slow-drifting teal light over faint ledger
          lines. Decorative only; motion freezes under prefers-reduced-motion
          (handled globally in globals.css). */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="animate-drift-a absolute -left-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-primary-300/25 blur-3xl" />
        <div className="animate-drift-b absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full bg-accent-300/20 blur-3xl" />
        <div className="animate-drift-c absolute -bottom-56 left-1/4 h-[32rem] w-[32rem] rounded-full bg-primary-200/30 blur-3xl" />
        <div className="absolute inset-0 bg-ledger-lines opacity-50" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink-50" />
      </div>

      <div className="container-page relative z-10 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="file-tag mb-5">Operations &amp; Compliance Support</p>
            <h1 className="text-display-2xl font-semibold text-heading">
              The back office UK firms trust to get it{" "}
              <span className="text-primary-600">right</span>, not just done.
            </h1>
            <p className="mt-6 font-display text-lg font-semibold text-brand sm:text-xl">
              Minimize Costs. Maximize Reserves.
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Bench Strength handles the case administration, compliance auditing, and
              regulatory admin that insolvency practitioners, legal teams, and advisory
              firms can&apos;t afford to get wrong — delivered by experienced professionals,
              not a generic outsourcing agency.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" lift>
                Book a Consultation
              </ButtonLink>
              <ButtonLink href="/services" variant="outlined">
                Explore Services
              </ButtonLink>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink-500">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-confirm-500" />
                PIP-certified case support
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-confirm-500" />
                Audit-ready documentation
              </span>
            </div>
          </div>

          <SummaryPanel />
        </div>
      </div>
    </section>
  );
}
