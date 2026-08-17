const ICONS = {
  fileCheck: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M6 2.5H12L15.5 6V16.5C15.5 17.05 15.05 17.5 14.5 17.5H6C5.45 17.5 5 17.05 5 16.5V3.5C5 2.95 5.45 2.5 6 2.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 2.5V6H15.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path
        d="M7.5 11.5L9 13L12.5 9.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  scale: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 3V17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5.5 17H14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 3L4.5 5.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 3L15.5 5.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M2.5 8.8C2.5 8.8 3.3 10.8 4.5 10.8C5.7 10.8 6.5 8.8 6.5 8.8L4.5 4.9L2.5 8.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 8.8C13.5 8.8 14.3 10.8 15.5 10.8C16.7 10.8 17.5 8.8 17.5 8.8L15.5 4.9L13.5 8.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  fileClock: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M6 2.5H11L14.5 6V9.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 2.5C5.45 2.5 5 2.95 5 3.5V16.5C5 17.05 5.45 17.5 6 17.5H9.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M11 2.5V6H14.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="13.5" cy="14" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M13.5 12.2V14L14.7 14.9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  database: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <ellipse cx="10" cy="5" rx="6" ry="2.3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4 5V15C4 16.27 6.69 17.3 10 17.3C13.31 17.3 16 16.27 16 15V5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M4 10C4 11.27 6.69 12.3 10 12.3C13.31 12.3 16 11.27 16 10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  shieldCheck: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 2L16.5 4.3V9.3C16.5 13.2 13.7 16.6 10 18C6.3 16.6 3.5 13.2 3.5 9.3V4.3L10 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M7.2 10L9.2 12L13 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const SERVICES = [
  {
    ref: "01",
    icon: ICONS.fileCheck,
    title: "Personal Insolvency Case Support",
    summary:
      "PIP1-certified case administration for insolvency practitioners and debt advisory firms needing reliable overflow capacity.",
    includes: [
      "Case administration & financial assessments",
      "Creditor liaison & credit control",
      "Post-appointment reporting & statutory documentation",
      "Case progression tracking",
    ],
  },
  {
    ref: "02",
    icon: ICONS.scale,
    title: "Legal & Compliance Auditing",
    summary:
      "Regulatory compliance and legal audit support grounded in real litigation-claims audit experience (BEC, PCP, HDR).",
    includes: [
      "Legal audits for risk mitigation",
      "Due diligence assessments on third parties & clients",
      "Contract reviews & legal file audits",
      "Client & firm onboarding into compliance systems",
    ],
  },
  {
    ref: "03",
    icon: ICONS.fileClock,
    title: "Contract Database & Lifecycle Admin",
    summary:
      "Building and maintaining organized contract registers to eliminate missed renewal dates and lapsed terms.",
    includes: [
      "Logging existing contracts",
      "Tracking renewal, expiry & review dates",
      "Flagging upcoming deadlines",
      "Validating contract data against agreed standards",
    ],
  },
  {
    ref: "04",
    icon: ICONS.database,
    title: "CRM Data Management & Cleanup",
    summary: "Keeping CRM databases accurate, standardized, and audit-ready.",
    includes: [
      "Ongoing data entry & record updates",
      "Duplicate detection & cleanup",
      "Field standardization",
      "Monthly accuracy reporting",
    ],
  },
  {
    ref: "05",
    icon: ICONS.shieldCheck,
    title: "GDPR & AML Compliance Support",
    summary: "Maintaining data handling and recordkeeping aligned with GDPR and AML expectations.",
    includes: [
      "Data processes aligned with GDPR",
      "AML/KYC-adjacent documentation & filing",
      "Audit trail organization & record confidentiality",
      "Ongoing compliance record maintenance",
    ],
  },
];

function ServiceCard({ service }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-ink-200 bg-white p-8 shadow-card transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-primary-200 hover:shadow-card-hover">
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-white">
          {service.icon}
        </div>
        <span className="file-tag pt-1.5">File / {service.ref}</span>
      </div>

      <h3 className="mt-6 font-display text-lg font-semibold text-ink-900">
        {service.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-600">{service.summary}</p>

      <ul className="mt-6 space-y-3 border-t border-ink-100 pt-6">
        {service.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-ink-600">
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary-400" />
            {item}
          </li>
        ))}
      </ul>
    </article>
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
          <ServiceCard key={service.ref} service={service} />
        ))}
      </div>
    </section>
  );
}
