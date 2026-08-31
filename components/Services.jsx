import Link from "next/link";
import { SERVICES } from "../app/services/servicesData";
import { ICONS } from "./serviceIcons";

function ServiceCard({ service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col rounded-2xl border border-ink-200 bg-white p-8 shadow-card transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-primary-200 hover:shadow-card-hover data-[focus-visible]:ring-2 data-[focus-visible]:ring-primary-400 data-[focus-visible]:ring-offset-2"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-white">
          {ICONS[service.icon]}
        </div>
        <span className="file-tag pt-1.5">Service / {service.ref}</span>
      </div>

      <h3 className="mt-6 font-display text-lg font-semibold text-ink-900">
        {service.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-600 sm:min-h-[3.75rem]">
        {service.summary}
      </p>

      {/* Flexible spacer so the divider + list + CTA sit on a consistent
          baseline across cards regardless of summary length */}
      <div className="grow" />

      <ul className="mt-6 space-y-3 border-t border-ink-100 pt-6">
        {service.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-ink-600">
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary-400" />
            {item}
          </li>
        ))}
      </ul>

      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 transition-colors group-hover:text-primary-800">
        View details
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        >
          <path
            d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}

export default function Services() {
  return (
    <section id="services" className="container-page py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="file-tag mb-5">Our Services</p>
        <h2 className="text-3xl font-semibold text-ink-900 sm:text-4xl">
          Five registers. One accountable team.
        </h2>
        <p className="mt-5 text-base leading-relaxed text-ink-600">
          Each engagement runs as its own tracked file — scoped, documented, and
          reported on, from first assessment to closure.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </section>
  );
}
