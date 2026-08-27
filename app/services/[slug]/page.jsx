import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { ICONS } from "../../../components/serviceIcons";
import { SERVICES, getService } from "../servicesData";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const title = `${service.detail.title} — Bench Strength`;
  const description = service.summary;
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const { detail } = service;
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      <Navbar />

      <main>
        {/* Header — mirrors the homepage hero surface for visual continuity */}
        <section className="relative border-b border-ink-200 bg-ink-50">
          <div className="container-page pt-14 pb-16 sm:pt-20 sm:pb-20">
            <Link
              href="/#services"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition-colors hover:text-primary-700"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M13 8H3M3 8L7.5 3.5M3 8L7.5 12.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              All services
            </Link>

            <div className="mt-8 flex items-start gap-5">
              <div className="hidden h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white sm:flex">
                {ICONS[service.icon]}
              </div>
              <div>
                <p className="file-tag mb-4">Service File / {service.ref}</p>
                <h1 className="text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem]">
                  {detail.title}
                </h1>
              </div>
            </div>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-700">
              {detail.overview}
            </p>
          </div>
        </section>

        {/* Key features */}
        <section className="border-b border-ink-200 bg-white">
          <div className="container-page grid grid-cols-1 gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <p className="file-tag mb-5">{detail.featuresTitle}</p>
              <h2 className="text-2xl font-semibold leading-tight text-ink-900 sm:text-3xl">
                What the engagement covers.
              </h2>
            </div>

            <div className="lg:col-span-8">
              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {detail.features.map((feature) => (
                  <div
                    key={feature.name}
                    className="group rounded-xl border border-ink-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-card-hover"
                  >
                    <dt className="flex items-start gap-2.5 font-display text-sm font-semibold text-ink-900">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary-400 transition-colors group-hover:bg-primary-600" />
                      {feature.name}
                    </dt>
                    {feature.body ? (
                      <dd className="mt-2.5 pl-[18px] text-sm leading-relaxed text-ink-600">
                        {feature.body}
                      </dd>
                    ) : null}
                  </div>
                ))}
              </dl>

              {detail.note ? (
                <div className="mt-8 rounded-xl border-l-2 border-primary-600 bg-ink-50 px-5 py-4">
                  <p className="text-sm leading-relaxed text-ink-600">
                    <span className="font-semibold text-ink-800">Note:</span>{" "}
                    {detail.note}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* CTA — full deep-navy band */}
        <section className="bg-ink-900">
          <div className="container-page py-16 sm:py-20">
            <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
              <div>
                <p className="file-tag mb-3 text-primary-400">Get started</p>
                <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                  Need this covered?
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-300">
                  Tell us where your team is stretched and we&apos;ll come back
                  with a clear, practical plan — usually within one business day.
                </p>
              </div>
              <Link
                href="/contact"
                className="flex-shrink-0 rounded-lg bg-accent-400 px-6 py-3 text-sm font-semibold text-ink-900 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-300 hover:shadow-card-hover"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </section>

        {/* Cross-links to the other registers */}
        <section className="border-t border-ink-200 bg-ink-50">
          <div className="container-page py-16 sm:py-20">
            <p className="file-tag mb-5">Other services</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {otherServices.map((other) => (
                <Link
                  key={other.slug}
                  href={`/services/${other.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-ink-200 bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-card-hover"
                >
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-white">
                    {ICONS[other.icon]}
                  </span>
                  <span className="text-sm font-medium leading-snug text-ink-700 transition-colors group-hover:text-primary-700">
                    {other.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
