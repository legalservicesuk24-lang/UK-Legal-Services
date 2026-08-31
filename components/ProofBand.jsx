import { ICONS } from "./serviceIcons";
import { ButtonLink } from "./ui/Button";
import CountUp from "./ui/CountUp";
import Reveal from "./ui/Reveal";

/* ---------------------------------------------------------------------------
   ProofBand — the full-bleed navy section directly under the hero.

   Three jobs:
     1. Give the page its one dark beat. Every other section is ink-50 or
        white, so the palette's best colour was previously doing nothing but
        navbar and footer duty.
     2. Put the differentiator where it can actually be seen. The PIP1 Merit /
        MaPS accreditation and the two metrics were small grey text before.
     3. Break the section rhythm — this one is asymmetric and has no centered
        eyebrow-over-heading stack.

   All text is ink-50 or ink-300 on ink-900: 15.8:1 and 11.0:1 respectively.
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
      className="relative overflow-hidden bg-inverse text-on-dark"
    >
      {/* A single soft teal wash, low and off-centre. Deliberately one shape
          rather than the hero's three: this section's job is contrast, and
          competing ambient light would flatten it. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-primary-600/20 blur-3xl" />
      </div>

      <div className="container-page relative z-10 py-20 sm:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          {/* ── Credential ───────────────────────────────────────────── */}
          <Reveal className="lg:col-span-5">
            <p className="file-tag mb-5 text-accent-400">Qualified, not generic</p>
            <h2 className="text-display-lg font-semibold text-on-dark">
              Handled by someone qualified to know what they&apos;re looking at.
            </h2>

            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent-400/15 text-accent-400">
                {ICONS.scale}
              </span>
              <div>
                <p className="font-display text-base font-semibold text-on-dark">
                  PIP1 — awarded with Merit
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-300">
                  Personal Insolvency Practical, accredited by the Money and
                  Pensions Service. A standard built for this work — not a
                  generic customer-service credential.
                </p>
              </div>
            </div>

            <ButtonLink
              href="/about"
              color="onDark"
              variant="outlined"
              className="mt-8"
            >
              How we work
            </ButtonLink>
          </Reveal>

          {/* ── Metrics ──────────────────────────────────────────────── */}
          <div className="lg:col-span-7 lg:pl-8">
            <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2">
              {STATS.map((stat, i) => (
                <Reveal
                  key={stat.label}
                  delay={i * 90}
                  className="bg-ink-900 p-8 sm:p-10"
                >
                  {/* The unit is set well below the figure so the number
                      carries the emphasis — a "hrs" at 88px competes with the
                      24 it is qualifying. */}
                  <dd className="text-stat font-display font-semibold text-on-dark">
                    <CountUp to={stat.value} prefix={stat.prefix ?? ""} />
                    <span className="ml-0.5 text-[0.34em] font-semibold tracking-normal text-accent-400">
                      {stat.suffix}
                    </span>
                  </dd>
                  <dt className="mt-4 font-display text-base font-semibold text-accent-400">
                    {stat.label}
                  </dt>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">
                    {stat.note}
                  </p>
                </Reveal>
              ))}
            </dl>

            <Reveal
              delay={180}
              className="mt-px rounded-2xl border border-white/10 px-8 py-6 sm:px-10"
            >
              <p className="text-sm leading-relaxed text-ink-300">
                Every engagement runs as its own tracked file — scoped,
                documented, and reported on from first assessment to closure.
                Statutory decisions always remain with the instructing
                practitioner; our job is making sure the work behind them is
                right.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
