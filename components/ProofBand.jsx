import { ICONS } from "./serviceIcons";
import { ButtonLink } from "./ui/Button";
import Pill from "./ui/Pill";
import CountUp from "./ui/CountUp";
import Reveal from "./ui/Reveal";

/* ---------------------------------------------------------------------------
   ProofBand — the full-bleed navy section directly under the hero.

   Its job is to put the differentiator where it can actually be seen: the PIP1
   Merit / MaPS accreditation and the two metrics were small grey text before.

   Originally this was the page's dark beat. Now that the hero is full-bleed
   dark and the marquee sits under it, a third dark section immediately after
   would merge the three into one long dark run, so this is inverted: light
   ground, oversized navy figures. Scale carries the emphasis instead of
   contrast, and the dark/light switch lands where it does the most work — one
   hard cut straight after the hero.
--------------------------------------------------------------------------- */

const STATS = [
  {
    value: 100,
    suffix: "%",
    label: "Audit pass rate",
    note: "Across every compliance file we've submitted.",
  },
  {
    prefix: "<",
    value: 24,
    suffix: "hrs",
    label: "Average response",
    note: "From first contact to a scoped, practical answer.",
  },
];

export default function ProofBand() {
  return (
    <section
      id="proof"
      className="relative overflow-hidden border-b border-subtle bg-raised"
    >
      {/* A single soft teal wash, low and off-centre. Deliberately one shape
          rather than the hero's three: this section's job is contrast, and
          competing ambient light would flatten it. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-primary-100/50 blur-3xl" />
      </div>

      <div className="container-page relative z-10 py-20 sm:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          {/* ── Credential ───────────────────────────────────────────── */}
          <Reveal className="lg:col-span-5">
            <p className="file-tag mb-5">Qualified, not generic</p>
            <h2 className="font-serif text-display-xl font-medium text-heading">
              Qualified to know what they&apos;re looking at.
            </h2>

            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-subtle bg-surface p-6">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                {ICONS.scale}
              </span>
              <div>
                <p className="font-display text-base font-semibold text-heading">
                  PIP1 — awarded with Merit
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-subtle">
                  Personal Insolvency Practical, accredited by the Money and
                  Pensions Service.
                </p>
                <ul className="mt-3.5 flex flex-wrap gap-1.5">
                  {["End-to-end caseload", "Debt legal advice", "Creditor negotiation"].map(
                    (item) => (
                      <li key={item}>
                        <Pill tone="quiet">{item}</Pill>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>

            <ButtonLink
              href="/about"
              variant="outlined"
              className="mt-8"
            >
              How we work
            </ButtonLink>
          </Reveal>

          {/* ── Metrics ──────────────────────────────────────────────── */}
          <div className="lg:col-span-7 lg:pl-8">
            <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-subtle bg-ink-200 sm:grid-cols-2">
              {STATS.map((stat, i) => (
                <Reveal
                  key={stat.label}
                  delay={i * 90}
                  className="bg-raised p-8 sm:p-10"
                >
                  {/* The unit is set well below the figure so the number
                      carries the emphasis — a "hrs" at 88px competes with the
                      24 it is qualifying. */}
                  <dd className="text-stat font-display font-semibold text-heading">
                    <CountUp to={stat.value} prefix={stat.prefix ?? ""} />
                    <span className="ml-0.5 text-[0.34em] font-semibold tracking-normal text-brand">
                      {stat.suffix}
                    </span>
                  </dd>
                  <dt className="mt-4 font-display text-base font-semibold text-brand">
                    {stat.label}
                  </dt>
                  <p className="mt-2 text-sm leading-relaxed text-subtle">
                    {stat.note}
                  </p>
                </Reveal>
              ))}
            </dl>

            <Reveal
              delay={180}
              className="mt-5 rounded-2xl border border-subtle bg-surface px-8 py-6 sm:px-10"
            >
              <p className="text-sm leading-relaxed text-subtle">
                Every engagement is its own tracked file. Statutory decisions
                stay with the instructing practitioner — we make sure the work
                behind them is right.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
