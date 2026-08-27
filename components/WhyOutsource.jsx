const CROSS_ICON = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M5 5L13 13M13 5L5 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CHECK_ICON = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path
      d="M3.5 9.5L7 13L14.5 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DOT_CROSS = (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M2.5 2.5L7.5 7.5M7.5 2.5L2.5 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const DOT_CHECK = (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M2.5 6.2L5 8.5L9.5 3.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HIRE_COSTS = [
  "Salary",
  "National Insurance",
  "Pension contributions",
  "Sick pay",
  "Holiday cover",
  "Months of ramp-up before they're genuinely productive",
];

const BENCH_BENEFITS = [
  "Scale up when things get busy",
  "Scale down when they don't",
  "Pay for the work itself, not a fixed headcount on payroll year-round",
];

export default function WhyOutsource() {
  return (
    <section id="why-outsource" className="border-b border-ink-200 bg-white">
      <div className="container-page py-24 sm:py-32">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl">
            Why outsource instead of hiring
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-600">
            The same standard of work — without the fixed cost of a permanent seat
            on payroll.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
          {/* Full-time hire */}
          <article className="flex flex-col rounded-2xl border border-ink-200 bg-ink-50 p-8">
            <header className="flex items-center gap-3 border-b border-ink-200 pb-5">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-ink-100 text-ink-500">
                {CROSS_ICON}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink-900">
                  A full-time hire
                </h3>
                <p className="text-xs text-ink-500">
                  Fixed cost every month — caseload or not
                </p>
              </div>
            </header>
            <ul className="mt-5 space-y-3">
              {HIRE_COSTS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink-600">
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-ink-200 text-ink-500">
                    {DOT_CROSS}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>

          {/* VS */}
          <div className="flex items-center justify-center lg:self-center">
            <span className="flex items-center justify-center rounded-full border border-ink-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500 shadow-card">
              vs
            </span>
          </div>

          {/* Bench Strength */}
          <article className="flex flex-col rounded-2xl border border-primary-200 bg-white p-8 shadow-card ring-1 ring-primary-100">
            <header className="flex items-center gap-3 border-b border-primary-100 pb-5">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-600 text-white">
                {CHECK_ICON}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink-900">
                  Bench Strength
                </h3>
                <p className="text-xs font-medium text-primary-700">
                  Specialist work, only when you need it
                </p>
              </div>
            </header>
            <p className="mt-5 text-sm leading-relaxed text-ink-700">
              The same standard of work — arguably better, since specialist
              casework and compliance admin is all we do — without that overhead.
            </p>
            <ul className="mt-4 space-y-3 border-t border-primary-100 pt-4">
              {BENCH_BENEFITS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink-700">
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                    {DOT_CHECK}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
