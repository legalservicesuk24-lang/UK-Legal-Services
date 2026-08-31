import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink-900">
      <div className="container-page py-12">
        <Link
          href="/"
          className="flex w-fit items-center gap-2 font-display text-base font-semibold text-white"
        >
          <svg width="26" height="26" viewBox="0 0 30 30" fill="none" aria-hidden="true">
            <rect width="30" height="30" rx="8" className="fill-primary-500" />
            <path
              d="M8 15.5L13 20.5L22 9.5"
              stroke="white"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Bench Strength
        </Link>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-400">
          Operations, compliance, and case administration support for UK
          insolvency, legal, and advisory firms.
        </p>
      </div>

      <div className="border-t border-ink-800">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Bench Strength. All rights reserved.</p>
          <p className="max-w-xl leading-relaxed">
            Bench Strength provides administrative, compliance-support, and case-management
            services. We do not provide regulated legal, insolvency, or financial
            advice; all statutory decisions remain the responsibility of the
            instructing licensed practitioner or firm.
          </p>
        </div>
      </div>
    </footer>
  );
}
