import CountUp from "./ui/CountUp";

/* ---------------------------------------------------------------------------
   StatsBand — the track-record proof band. Rendered inside the "Who we are"
   chapter of the globe homepage (see AboutIntro) rather than as a chapter of
   its own, so three figures don't cost a whole screen of scroll.

   Four columns on desktop: a short section title, then three metrics. Collapses
   to two columns on tablet and one on mobile. The numbers count up from zero
   the first time the band scrolls into view (see CountUp).

   The eyebrow sits above the row so the heading and the figures can share a
   baseline: "Measured, not claimed." lines up with the bottom of each number
   rather than floating between them.

   `fxStart` continues the host chapter's reveal stagger (`data-fx`).
--------------------------------------------------------------------------- */

const STATS = [
  { to: 100, suffix: "%", label: "Audit pass rate" },
  { prefix: "<", to: 24, unit: "hrs", label: "Average response time" },
  { to: 5, suffix: "+", label: "Years of experience" },
];

export default function StatsBand({ fxStart = 0, className = "" }) {
  return (
    <div id="track-record" className={`text-center ${className}`}>
      <p className="file-tag fx mb-4 !text-accent-400" data-fx={fxStart}>
        Track record
      </p>
      <div className="grid grid-cols-1 items-baseline gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-12">
        {/* Column 1 — section title, baseline-aligned with the figures */}
        <h2
          className="fx font-display text-2xl font-semibold leading-tight text-white"
          data-fx={fxStart + 1}
        >
          Measured, not claimed.
        </h2>

        {/* Columns 2–4 — metrics */}
        {STATS.map((stat, i) => (
          <div key={stat.label} className="fx flex flex-col items-center" data-fx={fxStart + i + 2}>
            <p className="font-display text-4xl font-light tracking-tight text-white sm:text-5xl">
              <CountUp
                to={stat.to}
                prefix={stat.prefix ?? ""}
                suffix={stat.suffix ?? ""}
                className="tabular-nums"
              />
              {stat.unit && (
                <span className="ml-1.5 text-xl font-normal tracking-normal text-ink-300 sm:text-2xl">
                  {stat.unit}
                </span>
              )}
            </p>
            <p className="mt-2 text-sm font-normal leading-snug text-ink-300">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
