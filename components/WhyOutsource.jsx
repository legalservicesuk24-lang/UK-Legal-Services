import Image from "next/image";

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
    <section
      id="why-outsource"
      className="relative isolate overflow-hidden border-b border-ink-200 bg-ink-50"
    >
      {/* Team photo behind the comparison, carried very faint so it reads as
          texture under the two cards rather than competing with them. */}
      <Image
        src="/people.jpg"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-10 object-cover object-center opacity-90"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-50/95 via-ink-50/15 to-ink-50/70"
      />

      <div className="container-page py-24 sm:py-32">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl">
            Why outsource instead of hiring
          </h2>
          <p className="mt-4 text-base font-semibold leading-relaxed text-primary-600">
            The same standard of work — without the fixed cost of a permanent seat
            on payroll.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-stretch gap-y-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-5 lg:gap-y-0">
          {/* The problem — the old, static method. Softer grey-blue framing. */}
          <article className="flex flex-col rounded-2xl border border-slate-300 bg-slate-50/90 p-8 backdrop-blur-sm">
            <header className="flex items-center gap-3 border-b border-slate-200 pb-5">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 ring-1 ring-slate-200">
                {CROSS_ICON}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-slate-700">
                  A full-time hire
                </h3>
                <p className="text-xs text-slate-500">
                  Fixed cost every month — caseload or not
                </p>
              </div>
            </header>
            <ul className="mt-5 space-y-3">
              {HIRE_COSTS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-400">
                    {DOT_CROSS}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>

          {/* VS — the connecting element between the two approaches. The ring
              itself grades from the grey-blue of the problem side to the brand
              teal of the solution side. */}
          <div className="relative z-10 flex items-center justify-center py-1 lg:self-center lg:py-0">
            <span
              aria-hidden
              className="absolute right-full top-1/2 hidden h-[2px] w-8 -translate-y-1/2 rounded-full bg-gradient-to-l from-slate-300 to-transparent lg:block"
            />
            <span
              aria-hidden
              className="absolute left-full top-1/2 hidden h-[2px] w-8 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary-400 to-transparent lg:block"
            />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-slate-400 via-ink-300 to-primary-500 shadow-[0_10px_30px_-8px_rgba(11,31,51,0.28)]">
              <span className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full bg-white text-xs font-bold uppercase tracking-[0.18em] text-ink-800">
                vs
              </span>
            </span>
          </div>

          {/* Bench Strength — framed in the brand's vibrant teal. */}
          <article className="flex flex-col rounded-2xl border-2 border-primary-500 bg-white p-8 shadow-[0_16px_44px_-16px_rgba(21,154,156,0.4)]">
            <header className="flex items-center gap-3 border-b border-primary-100 pb-5">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
                {CHECK_ICON}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink-900">
                  Bench Strength
                </h3>
                <p className="text-xs font-semibold text-primary-600">
                  Specialist work, only when you need it
                </p>
              </div>
            </header>
            <p className="mt-5 text-sm leading-relaxed text-ink-700">
              The same standard of work — arguably better, since specialist
              casework and compliance admin is all we do — without that overhead.
            </p>
            <ul className="mt-5 space-y-2.5">
              {BENCH_BENEFITS.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-primary-50/80 px-4 py-3 text-sm font-medium text-ink-800 ring-1 ring-primary-100"
                >
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
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
