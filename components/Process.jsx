import Chapter from "./globe/Chapter";

/* ---------------------------------------------------------------------------
   Process — how an engagement actually runs.

   This fills a real gap rather than adding decoration: the site claimed every
   engagement is "scoped, documented, and reported on from first assessment to
   closure" without ever showing what that means. Prospective clients in a
   regulated sector want to see the shape of the work before they enquire.

   Laid out as a horizontal rule-and-marker timeline on desktop and a vertical
   one on mobile, so it reads differently from every card grid on the site —
   part of breaking the uniform section rhythm.

   The rule is scroll-linked: it draws left to right as the page moves through
   this chapter's hold, and each marker lights as the line reaches it. This is
   the last globe chapter, so it holds over the globe's horizon and never
   fades out. ChapterDirector writes `--progress` on the `.scroll-track`.
--------------------------------------------------------------------------- */

const STEPS = [
  {
    ref: "01",
    title: "Scope & Alignment",
    body: "Defined in writing before anything opens: establishing parameters, objectives, and responsibilities for what sits with us and what stays with your team.",
  },
  {
    ref: "02",
    title: "Execution & Integration",
    body: "Systematic handling of your files, audits, databases, or workflows, managed through rigorous tracking and standardized documentation.",
  },
  {
    ref: "03",
    title: "Progression & Review",
    body: "Ongoing administration, data cleanup, or compliance monitoring handled with clear escalation paths and regular milestone tracking.",
  },
  {
    ref: "04",
    title: "Sign-off & Handover",
    body: "Audited against all regulatory or internal requirements, fully reported on, and delivered ready for final approval.",
  },
];

export default function Process() {
  return (
    <Chapter id="process" label="How it runs">
      <div className="chapter-wrap">
        {/* Asymmetric header — left-aligned and held to a column. */}
        <div className="max-w-2xl">
          <p className="file-tag fx mb-5 !text-accent-400" data-fx="0">
            How it runs
          </p>
          <h2
            className="fx font-display text-display-xl font-bold text-on-dark"
            data-fx="1"
          >
            From first assessment to closure.
          </h2>
        </div>

        <div className="scroll-track">
          <ol className="mt-16 grid grid-cols-1 gap-10 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((step, i) => (
              <li
                key={step.ref}
                className="fx relative pt-8"
                data-fx={i + 2}
                /* Where this step sits along the chapter, so its rule and
                   marker activate as the scroll progress passes it. */
                style={{ "--step": (i / STEPS.length).toFixed(3) }}
              >
                {/* Base rule, then the clay rule that draws over it. */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-px w-full bg-white/15"
                />
                <span
                  aria-hidden
                  className="track-rule absolute left-0 top-0 h-px w-full after:absolute after:inset-0 after:bg-accent-400 after:content-['']"
                />
                <span
                  aria-hidden
                  className="track-marker absolute -top-[3px] left-0 h-[7px] w-[7px] rounded-full bg-accent-400"
                />

                <p className="file-tag !text-accent-400">{step.ref}</p>
                <h3 className="mt-3 font-display text-lg font-semibold text-on-dark">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-300">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Chapter>
  );
}
