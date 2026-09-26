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
