import Reveal from "./ui/Reveal";
import ScrollTrack from "./ui/ScrollTrack";

/* ---------------------------------------------------------------------------
   Process — how an engagement actually runs.

   This fills a real gap rather than adding decoration: the site claimed every
   engagement is "scoped, documented, and reported on from first assessment to
   closure" without ever showing what that means. Prospective clients in a
   regulated sector want to see the shape of the work before they enquire.

   Laid out as a horizontal rule-and-marker timeline on desktop and a vertical
   one on mobile, so it reads differently from every card grid on the site —
   part of breaking the uniform section rhythm.

   The rule is scroll-linked: it draws left to right as the section crosses the
   viewport and each marker lights as the line reaches it. A process that runs
   from first assessment to closure is genuinely a progression, so tying it to
   scroll carries meaning rather than being motion for its own sake. Scroll is
   read, never hijacked — see ScrollTrack.
--------------------------------------------------------------------------- */

const STEPS = [
  {
    ref: "01",
    title: "Scope",
    body: "We agree exactly what sits with us and what stays with your team, in writing, before anything opens.",
  },
  {
    ref: "02",
    title: "Assessment",
    body: "Financial assessments, asset verification, and the statutory documentation the file needs to stand up.",
  },
  {
    ref: "03",
    title: "Progression",
    body: "Case administration and creditor liaison, tracked at every stage with clear escalation paths.",
  },
  {
    ref: "04",
    title: "Audit & closure",
    body: "The file is audited against its regulatory requirements, reported on, and closed — audit-ready.",
  },
];

export default function Process() {
  return (
    <section id="process" className="border-t border-subtle bg-raised">
      <div className="container-page py-24 sm:py-32">
        {/* Asymmetric header — left-aligned and offset, against the centered
            eyebrow/heading stack used elsewhere. */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="file-tag mb-5">How it runs</p>
            <h2 className="font-serif text-display-xl text-heading">
              From first assessment to closure.
            </h2>
          </Reveal>
          <Reveal delay={90} className="lg:col-span-5 lg:pt-4">
            <p className="text-lg leading-relaxed text-muted">
              Each engagement is its own tracked file. You always know which
              stage it is at, and what is waiting on a practitioner signature.
            </p>
          </Reveal>
        </div>

        <ScrollTrack>
          <ol className="mt-16 grid grid-cols-1 gap-10 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((step, i) => (
              <li
                key={step.ref}
                className="relative pt-8"
                /* Where this step sits along the section, so its rule and
                   marker activate as the scroll progress passes it. */
                style={{ "--step": (i / STEPS.length).toFixed(3) }}
              >
                {/* Base rule, then the teal rule that draws over it. */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-px w-full bg-subtle"
                />
                <span
                  aria-hidden
                  className="track-rule absolute left-0 top-0 h-px w-full after:absolute after:inset-0 after:bg-primary-600 after:content-['']"
                />
                <span
                  aria-hidden
                  className="track-marker absolute -top-[3px] left-0 h-[7px] w-[7px] rounded-full bg-primary-600"
                />

                <p className="file-tag">{step.ref}</p>
                <h3 className="mt-3 font-display text-lg font-semibold text-heading">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-subtle">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </ScrollTrack>
      </div>
    </section>
  );
}
