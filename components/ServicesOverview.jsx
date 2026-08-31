import Link from "next/link";
import { SERVICES } from "../app/services/servicesData";
import { ICONS } from "./serviceIcons";
import { ButtonLink } from "./ui/Button";

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

export default function ServicesOverview() {
  return (
    <section id="services" className="border-t border-ink-200 bg-ink-50">
      <div className="container-page py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="file-tag mb-5">What We Do</p>
          <h2 className="text-3xl font-semibold text-ink-900 sm:text-4xl">
            Five registers. One accountable team.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-600">
            Each engagement runs as its own tracked file — scoped, documented, and
            reported on from first assessment to closure.
          </p>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-4">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex w-full items-center gap-3.5 rounded-xl border border-ink-200 bg-white p-5 shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary-200 hover:shadow-card-hover data-[focus-visible]:ring-2 data-[focus-visible]:ring-primary-400 data-[focus-visible]:ring-offset-2 sm:w-[340px]"
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-white">
                {ICONS[service.icon]}
              </span>
              <span className="font-display text-sm font-semibold leading-snug text-ink-900 transition-colors group-hover:text-primary-700">
                {service.title}
              </span>
              <span className="ml-auto text-primary-500 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100">
                {ARROW}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <ButtonLink href="/services" lift>
            View all services
            {ARROW}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
