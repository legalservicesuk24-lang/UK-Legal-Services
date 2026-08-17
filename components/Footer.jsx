const FOOTER_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Our Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-ink-900">
      <div className="container-page flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <a href="#home" className="flex items-center gap-2 font-display text-base font-semibold text-white">
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
            StyleHive
          </a>
          <p className="mt-4 text-sm leading-relaxed text-ink-400">
            Operations, compliance, and case administration support for UK
            insolvency, legal, and advisory firms.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t border-ink-800">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} StyleHive. All rights reserved.</p>
          <p className="max-w-xl leading-relaxed">
            StyleHive provides administrative, compliance-support, and case-management
            services. We do not provide regulated legal, insolvency, or financial
            advice; all statutory decisions remain the responsibility of the
            instructing licensed practitioner or firm.
          </p>
        </div>
      </div>
    </footer>
  );
}
