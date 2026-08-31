import Link from "next/link";
import { SERVICES } from "../app/services/servicesData";
import { ICONS } from "./serviceIcons";
import { ButtonLink } from "./ui/Button";
import Reveal from "./ui/Reveal";

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
   backs — so it gets a card with real weight instead of being one of five
   identical tiles. Equal visual weight across five cards gives the eye
   nowhere to land, which was a large part of why the page read as flat. */
const [featured, ...rest] = SERVICES;

function FeaturedCard({ service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col rounded-2xl border border-subtle bg-raised p-8 shadow-card transition-all duration-300 ease-out hovered:-translate-y-1 hovered:border-primary-200 hovered:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 sm:p-10"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-white">
          {ICONS[service.icon]}
        </span>
        <span className="file-tag pt-2">Register / {service.ref}</span>
      </div>

      <h3 className="mt-8 font-display text-2xl font-semibold leading-snug text-heading transition-colors group-hover:text-primary-700 sm:text-3xl">
        {service.title}
      </h3>
      <p className="mt-4 text-base leading-relaxed text-subtle">
        {service.summary}
      </p>

      <div className="grow" />

      <ul className="mt-8 space-y-3 border-t border-hairline pt-7">
        {service.includes.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm leading-relaxed text-subtle"
          >
            <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-primary-400 transition-colors group-hover:bg-primary-600" />
            {item}
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
      className="group flex flex-col rounded-xl border border-subtle bg-raised p-6 shadow-card transition-all duration-300 ease-out hovered:-translate-y-1 hovered:border-primary-200 hovered:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-white">
          {ICONS[service.icon]}
        </span>
        <span className="file-tag">{service.ref}</span>
      </div>

      <h3 className="mt-5 font-display text-base font-semibold leading-snug text-heading transition-colors group-hover:text-primary-700">
        {service.title}
      </h3>

      {/* These cards share their row height with the featured card, which is
          twice as tall. Icon and title alone left most of that empty, so the
          summary earns its place here rather than being held back for the
          detail page. */}
      <p className="mt-3 text-sm leading-relaxed text-subtle">
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

export default function ServicesOverview() {
  return (
    <section id="services" className="border-t border-subtle bg-surface">
      <div className="container-page py-24 sm:py-32">
        {/* Header runs left with the CTA opposite, rather than the centered
            eyebrow-over-heading stack used by the other sections. */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="max-w-2xl">
            <p className="file-tag mb-5">What we do</p>
            <h2 className="text-display-xl font-semibold text-heading">
              Five registers. One accountable team.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Each engagement runs as its own tracked file — scoped,
              documented, and reported on from first assessment to closure.
            </p>
          </Reveal>

          <Reveal delay={90} className="flex-shrink-0">
            <ButtonLink href="/services" variant="outlined">
              View all services
              {ARROW}
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          <Reveal className="flex lg:row-span-2 [&>*]:w-full">
            <FeaturedCard service={featured} />
          </Reveal>

          {rest.map((service, i) => (
            <Reveal
              key={service.slug}
              delay={(i + 1) * 70}
              className="flex [&>*]:w-full"
            >
              <CompactCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
