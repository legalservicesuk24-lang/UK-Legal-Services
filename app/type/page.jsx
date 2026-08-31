import {
  Bricolage_Grotesque,
  DM_Serif_Display,
  Fraunces,
  Instrument_Serif,
  Newsreader,
} from "next/font/google";

/* ---------------------------------------------------------------------------
   /type — a throwaway comparison page for choosing the display face.

   Deciding a typeface from a description is guesswork; the only useful test is
   the real headline, at the real size, on the real background. So this renders
   the actual hero copy in each candidate on the hero's own near-black ground,
   at the same fluid clamp the site uses.

   Not linked from the nav, and noindex. Delete the route once a face is
   chosen — or keep it, it costs nothing until visited.
--------------------------------------------------------------------------- */

export const metadata = {
  title: "Typeface comparison — Bench Strength",
  robots: { index: false, follow: false },
};

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
});

const CANDIDATES = [
  {
    name: "Instrument Serif",
    font: instrument,
    note: "Current. High contrast, light, editorial. Elegant at size — the risk is that it reads delicate rather than authoritative for a compliance firm.",
    weight: 400,
  },
  {
    name: "Fraunces",
    font: fraunces,
    note: "Variable serif with real character in the terminals. More warmth and more voice; the most 'designed' of these without becoming decorative.",
    weight: 500,
  },
  {
    name: "Newsreader",
    font: newsreader,
    note: "Editorial workhorse. Lower contrast, sturdier, reads like a broadsheet. The safest serif here and the most obviously credible.",
    weight: 500,
  },
  {
    name: "DM Serif Display",
    font: dmSerif,
    note: "High contrast like Instrument but with noticeably more weight. Similar register, more presence, slightly less refined.",
    weight: 400,
  },
  {
    name: "Bricolage Grotesque",
    font: bricolage,
    note: "The sans option, if a serif feels too traditional. Distinctive without being quirky — quietly contemporary rather than editorial.",
    weight: 600,
  },
];

const HEADLINE_PRE = "The back office UK firms trust to get it ";
const HEADLINE_ACCENT = "right";
const HEADLINE_POST = ", not just done.";

export default function TypePage() {
  return (
    <main className="min-h-screen bg-ink-950 px-6 py-16 sm:px-10 lg:px-16">
      <header className="mx-auto max-w-5xl border-b border-white/10 pb-10">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-400">
          Display typeface — comparison
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-on-dark">
          Same headline, same size, same background.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-400">
          Rendered at the site&apos;s own{" "}
          <code className="font-mono text-ink-300">
            clamp(3rem, 6.4vw, 6rem)
          </code>{" "}
          on the hero ground. Resize the window to check how each behaves as it
          scales — that is where they differ most.
        </p>
      </header>

      <div className="mx-auto max-w-5xl">
        {CANDIDATES.map((c, i) => (
          <section
            key={c.name}
            className="border-b border-white/10 py-14 last:border-0"
          >
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="font-display text-lg font-semibold text-on-dark">
                {c.name}
              </h2>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-400">
              {c.note}
            </p>

            <p
              className={`${c.font.className} mt-8 text-display-2xl text-on-dark`}
              style={{ fontWeight: c.weight }}
            >
              {HEADLINE_PRE}
              <em className="italic text-accent-400">{HEADLINE_ACCENT}</em>
              {HEADLINE_POST}
            </p>

            {/* Section-heading size too: the face has to work at both, and
                some of these hold up far better at 96px than at 60px. */}
            <p
              className={`${c.font.className} mt-8 text-display-xl text-ink-300`}
              style={{ fontWeight: c.weight }}
            >
              Five registers. One accountable team.
            </p>
          </section>
        ))}
      </div>
    </main>
  );
}
