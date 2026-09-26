import Link from "next/link";
import { SERVICES } from "../app/services/servicesData";
import { ICONS } from "./serviceIcons";
import { ButtonLink } from "./ui/Button";
import Chapter from "./globe/Chapter";

const ARROW = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function ServiceCard({ service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col rounded-xl border border-sand-400 bg-sand-300 p-6 shadow-card transition-all duration-300 ease-out hovered:-translate-y-1 hovered:border-primary-400 hovered:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-600/10 text-primary-700 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-white">
          {ICONS[service.icon]}
        </span>
        <span className="file-tag !text-primary-700">{service.ref}</span>
      </div>

      <h3 className="mt-5 font-display text-base font-semibold leading-snug text-heading transition-colors group-hover:text-primary-700">
        {service.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-ink-700">
        {service.summary}
      </p>

      <div className="grow" />

      <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100">
        View details
        {ARROW}
      </span>
    </Link>
  );
}

/* Chapter 3 of the globe homepage. Can be taller than a viewport, in which
   case ChapterDirector gives its pin a negative sticky top and it scrolls
   through to the last card before the next chapter snaps in. */
export default function ServicesOverview() {
  return (
    <Chapter id="services" label="What we do">
      <div className="chapter-wrap">
        {/* Header runs left with the CTA opposite, rather than the centered
            eyebrow-over-heading stack used by the other sections. */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="file-tag fx mb-5 !text-accent-400" data-fx="0">
              What we do
            </p>
            <h2
              className="fx font-display text-display-xl font-bold text-on-dark"
              data-fx="1"
            >
              Six registers. One accountable team.
            </h2>
            <p
              className="fx mt-5 text-lg leading-relaxed text-ink-300"
              data-fx="2"
            >
              Each one runs as its own tracked file, from first assessment to
              closure.
            </p>
          </div>
          <div className="fx flex-shrink-0" data-fx="2">
            <ButtonLink href="/services" color="onDark" variant="outlined">
              View all services
              {ARROW}
            </ButtonLink>
          </div>
        </div>

        {/* Three equal columns, two cards in each: all six registers carry the
            same weight. Rows stretch so every card in a row matches height. */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <div
              key={service.slug}
              className="fx flex [&>*]:w-full"
              data-fx={i + 3}
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </Chapter>
  );
}
