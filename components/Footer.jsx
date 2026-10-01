import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink-900">
      <div className="container-page py-12">
        <Link href="/" aria-label="Bench Strength — home" className="flex w-fit items-center">
          <Image
            src="/benchstrength-logo-dark-compact-transparent.png"
            alt="Bench Strength"
            width={1699}
            height={321}
            className="h-20 w-auto object-contain"
          />
        </Link>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-400">
          Operations, compliance, and case administration support for UK
          insolvency, legal, and advisory firms.
        </p>
        <a
          href="https://www.linkedin.com/company/bench-strength-uk/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Bench Strength on LinkedIn"
          className="mt-6 inline-flex items-center gap-2 text-sm text-ink-400 transition-colors hover:text-on-dark"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
          </svg>
          LinkedIn
        </a>
      </div>

      <div className="border-t border-ink-800">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 leading-relaxed">
            <p>© {new Date().getFullYear()} Bench Strength. All rights reserved.</p>
            <p>
              Bench Strength is a trading name of BENCH STRENGTH CONSULTING LIMITED.
              Registered in England &amp; Wales.
            </p>
            <p>
              Company Registration Number:{" "}
              <a
                href="https://find-and-update.company-information.service.gov.uk/company/17489800"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-colors hover:text-on-dark"
              >
                17489800
              </a>
            </p>
          </div>
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
