const NON_FEE_WORK = [
  "Case files",
  "Compliance audits",
  "Contract renewals",
  "CRM records",
  "Process admin",
];

const OPTIONS = [
  {
    kind: "Traditional",
    label: "Hire in-house",
    body: "Expensive, slow to ramp up, and often oversized for the actual workload.",
    highlight: false,
  },
  {
    kind: "Traditional",
    label: "Generalist outsourcer",
    body: "Has to learn your sector from scratch.",
    highlight: false,
  },
  {
    kind: "Our approach",
    label: "Bench Strength",
    body: "The option in between — specialist support, on demand, without the overhead of a permanent hire.",
    highlight: true,
  },
];

export default function WhyWeExist() {
  return (
    <section id="why-we-exist" className="border-b border-ink-200 bg-white">
      <div className="container-page py-24 sm:py-32">
        <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl">
          Why we exist
        </h2>

        {/* The problem */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-ink-200 bg-ink-50">
          <div className="border-l-2 border-primary-500 p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600">
              The problem
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-800">
              Firms lose more time than they realise to work that isn&apos;t
              fee-earning but can&apos;t be skipped.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {NON_FEE_WORK.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-sm font-medium text-ink-700 transition-colors hover:border-primary-300 hover:text-primary-700"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-600">
              It&apos;s necessary, it&apos;s regulated or time-sensitive more often
              than not, and it pulls focus from the work that actually grows the
              business.
            </p>
          </div>
        </div>

        {/* The options */}
        <p className="mt-12 max-w-2xl text-base leading-relaxed text-ink-600">
          The usual fix is one of two things. Bench Strength is a third.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          {OPTIONS.map((opt) => (
            <article
              key={opt.label}
              className={`flex flex-col rounded-2xl border p-7 transition-all duration-300 ease-out hover:-translate-y-1.5 ${
                opt.highlight
                  ? "border-primary-300 bg-gradient-to-b from-primary-50/60 to-white shadow-card-hover ring-1 ring-primary-100"
                  : "border-ink-200 bg-white shadow-card hover:border-primary-200"
              }`}
            >
              <span
                className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${
                  opt.highlight
                    ? "bg-primary-600 text-white"
                    : "bg-ink-100 text-ink-500"
                }`}
              >
                {opt.kind}
              </span>
              <h3
                className={`mt-4 font-display text-base font-semibold ${
                  opt.highlight ? "text-primary-800" : "text-ink-900"
                }`}
              >
                {opt.label}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
                {opt.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
