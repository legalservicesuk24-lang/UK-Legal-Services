import Link from "next/link";
import { SERVICES } from "../app/services/servicesData";
import { ICONS } from "./serviceIcons";
import { ButtonLink } from "./ui/Button";
import Chapter from "./globe/Chapter";
import Pill from "./ui/Pill";

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

/* The first register is the flagship — it's the one the PIP1 qualification
   backs — so it gets a card with real weight instead of being one of six
   identical tiles. Equal visual weight across six cards gives the eye
   nowhere to land, which was a large part of why the page read as flat. */
const [featured, ...rest] = SERVICES;

function FeaturedCard({ service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col rounded-2xl border border-sand-400 bg-sand-300 p-8 shadow-card transition-all duration-300 ease-out hovered:-translate-y-1 hovered:border-primary-400 hovered:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 sm:p-10"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-primary-600/10 text-primary-700 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-white">
          {ICONS[service.icon]}
        </span>
        <span className="file-tag pt-2 !text-primary-700">Register / {service.ref}</span>
      </div>

      <h3 className="mt-8 font-display text-3xl font-bold leading-tight text-heading transition-colors group-hover:text-primary-700 sm:text-4xl">
        {service.title}
      </h3>
      <p className="mt-4 text-base leading-relaxed text-ink-700">
        {service.summary}
      </p>

      <div className="grow" />

      {/* Pills rather than a bulleted list: four short phrases read faster
          side by side than stacked, and it stops the card being a wall of
          left-aligned text. */}
      <ul className="mt-8 flex flex-wrap gap-2 border-t border-ink-900/10 pt-7">
        {service.includes.map((item) => (
          <li key={item}>
            <Pill tone="sand">{item}</Pill>
          </li>
        ))}
      </ul>

      <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 transition-colors group-hover:text-primary-800">
        View details
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">
          {ARROW}
        </span>
      </span>
    </Link>
  );
}

function CompactCard({ service }) {
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

      {/* These cards share their row height with the featured card, which is
          twice as tall. Icon and title alone left most of that empty, so the
          summary earns its place here rather than being held back for the
          detail page. */}
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

/* Chapter 4 of the globe homepage. Taller than a viewport on most screens,
   so ChapterDirector gives its pin a negative sticky top: it scrolls through
   to the last card, then holds while the globe forms its horizon. */
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

        <div className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3">
          <div
            className="fx flex lg:col-span-2 lg:row-span-2 [&>*]:w-full"
            data-fx="3"
          >
            <FeaturedCard service={featured} />
          </div>
          {rest.map((service, i) => (
            <div
              key={service.slug}
              className="fx flex [&>*]:w-full"
              data-fx={i + 4}
            >
              <CompactCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </Chapter>
  );
}
