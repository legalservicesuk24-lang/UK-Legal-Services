import Link from "next/link";

import CountUp from "./ui/CountUp";

/* The two headline metrics moved here from the former "Qualified, not generic"
   band — kept as compact proof cards alongside the intro rather than carrying
   a full section of their own. */
const METRICS = [
  {
    value: 100,
    suffix: "%",
    label: "Audit pass rate",
    note: "Across every compliance file we've submitted.",
  },
  {
    prefix: "<",
    value: 24,
    suffix: " hrs",
    label: "Average response time",
    note: "From first contact to a scoped, practical answer.",
  },
];

export default function AboutIntro() {
  return (
    <section id="about" className="border-t border-ink-200 bg-white">
      <div className="container-page py-24 sm:py-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="file-tag mb-5">About Bench Strength</p>
            <h2 className="font-display text-display-lg font-bold text-heading">
              Who we are
            </h2>
          </div>

          <div className="lg:col-span-8">
            <p className="text-lg leading-relaxed text-muted">
              A specialist operations, compliance and case-administration
              partner for UK insolvency, legal and advisory firms — scaled to
              what your firm can carry right now, without the overhead of a
              permanent hire.
            </p>
            <Link
              href="/about"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 transition-colors hover:text-primary-800"
            >
              More about how we work
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path
                  d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {METRICS.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-subtle bg-surface p-5 sm:p-6"
                >
                  <dd className="font-display text-3xl font-semibold text-heading sm:text-4xl">
                    <CountUp
                      to={metric.value}
                      prefix={metric.prefix ?? ""}
                    />
                    <span className="ml-0.5 text-[0.5em] font-semibold text-brand">
                      {metric.suffix}
                    </span>
                  </dd>
                  <dt className="mt-2 text-sm font-semibold text-brand">
                    {metric.label}
                  </dt>
                  <p className="mt-1 text-xs leading-relaxed text-subtle">
                    {metric.note}
                  </p>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
