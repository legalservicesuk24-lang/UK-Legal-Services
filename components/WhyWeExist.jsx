import Image from "next/image";

import ScrollTrack from "./ui/ScrollTrack";

const NON_FEE_WORK = [
  "Case files",
  "Compliance audits",
  "Contract renewals",
  "CRM records",
  "Process admin",
];

/* Each photo stands for one strand of the non-fee-earning work described
   above, laid out as a connected timeline — the line draws through and each
   frame reveals in turn as the section scrolls past. */
const EVIDENCE = [
  { src: "/files.jpg", alt: "Stacked case files and statutory paperwork" },
  { src: "/sign.jpg", alt: "A contract being signed" },
  { src: "/laptop.jpg", alt: "Working at a laptop on records and process admin" },
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

        {/* The same work, shown — a scroll-linked timeline of three small
            frames connected by a drawing rule. Each frame fades in on its own
            as the scroll progress reaches it. */}
        <ScrollTrack>
          <ol className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-3 sm:gap-5">
            {EVIDENCE.map((shot, i) => (
              <li
                key={shot.src}
                className="relative pt-7"
                style={{ "--step": (i / EVIDENCE.length).toFixed(3) }}
              >
                {/* Base rule, then the teal rule that draws over it, then the
                    marker that lights as the line reaches it. */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-px w-full bg-ink-200"
                />
                <span
                  aria-hidden
                  className="track-rule absolute left-0 top-0 h-px w-full after:absolute after:inset-0 after:bg-primary-600 after:content-['']"
                />
                <span
                  aria-hidden
                  className="track-marker absolute -top-[3px] left-0 h-[7px] w-[7px] rounded-full bg-primary-600"
                />

                <figure className="track-reveal relative aspect-square overflow-hidden rounded-xl border border-ink-200 bg-white shadow-card">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(min-width: 640px) 12rem, 90vw"
                    className="object-cover"
                  />
                </figure>
              </li>
            ))}
          </ol>
        </ScrollTrack>

        {/* The options */}
        <p className="mt-16 max-w-2xl text-base leading-relaxed text-ink-600">
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
