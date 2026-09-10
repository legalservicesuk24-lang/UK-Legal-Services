import CountUp from "./ui/CountUp";

/* ---------------------------------------------------------------------------
   StatsBand — full-bleed navy proof band.

   Four columns on desktop: a short section title, then three metrics. Collapses
   to two columns on tablet and one on mobile. The numbers count up from zero
   the first time the band scrolls into view (see CountUp).
--------------------------------------------------------------------------- */

const STATS = [
  { to: 100, suffix: "%", label: "Audit pass rate" },
  { prefix: "<", to: 24, label: "Average response time" },
  { to: 10, suffix: "+", label: "Cases completed successfully" },
];

export default function StatsBand() {
  return (
    <section
      aria-label="Track record"
      className="border-t border-white/10 bg-ink-950"
    >
      <div className="container-page py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-12">
          {/* Column 1 — section title */}
          <div className="flex flex-col justify-center">
            <p className="file-tag !text-accent-400">Track record</p>
            <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-white">
              Measured, not claimed.
            </h2>
          </div>

          {/* Columns 2–4 — metrics */}
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <p className="font-display text-4xl font-light tracking-tight text-white sm:text-5xl">
                <CountUp
                  to={stat.to}
                  prefix={stat.prefix ?? ""}
                  suffix={stat.suffix ?? ""}
                  className="tabular-nums"
                />
              </p>
              <p className="mt-2 text-sm font-normal leading-snug text-ink-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
