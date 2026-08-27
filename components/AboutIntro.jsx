import Link from "next/link";

export default function AboutIntro() {
  return (
    <section id="about" className="border-t border-ink-200 bg-white">
      <div className="container-page py-24 sm:py-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="file-tag mb-5">About Bench Strength</p>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl">
              Who we are
            </h2>
          </div>

          <div className="lg:col-span-8">
            <p className="text-lg leading-relaxed text-ink-700">
              Bench Strength is a specialist operations, compliance, and
              case-administration partner for UK insolvency, legal, and advisory
              firms. We handle qualified case support, compliance auditing, and
              back-office admin on demand — scaled to exactly what your firm can
              carry right now, without the overhead of a permanent hire.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 transition-colors hover:text-primary-800"
            >
              More about how we work
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
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
