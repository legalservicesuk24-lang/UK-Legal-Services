/* Single source of truth for the service registers.
   - `Services.jsx` renders the homepage grid from this list.
   - `app/services/[slug]/page.jsx` renders a dedicated page per entry.
   `icon` is a key into components/serviceIcons.jsx (kept as a string so this
   stays a plain data module). */

export const SERVICES = [
  {
    slug: "personal-insolvency-case-support",
    ref: "01",
    icon: "fileCheck",
    title: "Personal Insolvency Case Support",
    summary:
      "PIP-certified case administration for insolvency practitioners and debt advisory firms needing reliable overflow capacity.",
    includes: [
      "Case administration & financial assessments",
      "Creditor liaison & credit control",
      "Post-appointment reporting & statutory documentation",
      "Case progression tracking",
    ],
    detail: {
      title: "Personal Insolvency Case Support",
      overview:
        "PIP-certified case administration for insolvency practitioners and debt advisory firms needing reliable overflow capacity. When your caseload outpaces your team — whether from seasonal spikes, staff absence, or growth — we provide fully compliant, PIP-qualified case support that scales with your pipeline.",
      featuresTitle: "Key Features",
      features: [
        {
          name: "Case Administration & Financial Assessments",
          body: "Standard Financial Statement (SFS) preparation, income and expenditure reviews, asset verification, and full case file management from appointment through to closure.",
        },
        {
          name: "Creditor Liaison & Credit Control",
          body: "Routine and disputed correspondence, claims verification, payment arrangement negotiation, and creditor query handling.",
        },
        {
          name: "Post-Appointment Reporting & Statutory Documentation",
          body: "Preparation and submission of statutory forms and reports, including annual reports, and other regulatory filings.",
        },
        {
          name: "Case Progression Tracking",
          body: "Full visibility into case status at every stage, with clear escalation paths for anything requiring practitioner sign-off.",
        },
      ],
      note: "Handled under strict confidentiality and data security protocols appropriate to sensitive financial information.",
    },
  },
  {
    slug: "legal-compliance-auditing",
    ref: "02",
    icon: "scale",
    title: "Legal & Compliance Auditing",
    summary:
      "Regulatory compliance and legal audit support grounded in real litigation-claims audit experience (BEC, PCP, HDR).",
    includes: [
      "Legal audits for risk mitigation",
      "Due diligence assessments on third parties & clients",
      "Contract reviews & legal file audits",
      "Client & firm onboarding into compliance systems",
    ],
    detail: {
      title: "Legal & Compliance Auditing",
      overview:
        "Regulatory compliance and legal audit support grounded in real litigation-claims audit experience across BEC, PCP, and HDR portfolios. We help firms find and close compliance gaps before a regulator, insurer, or opposing party does — with findings documented to a standard that holds up under scrutiny.",
      featuresTitle: "Key Features",
      features: [
        {
          name: "Legal Audits for Risk Mitigation",
          body: "Structured file reviews that surface procedural gaps, missing authorisations, and documentation weaknesses, delivered with a prioritised remediation list.",
        },
        {
          name: "Due Diligence Assessments",
          body: "Background and integrity checks on third parties, introducers, and clients, recorded to a consistent, defensible format.",
        },
        {
          name: "Contract Reviews & Legal File Audits",
          body: "Clause-level review against your agreed positions, with issues flagged, tracked, and re-checked on close-out.",
        },
        {
          name: "Onboarding into Compliance Systems",
          body: "Clean migration of client and matter records into your compliance framework, mapped to the correct risk categories from day one.",
        },
      ],
      note: "All findings are advisory. Final regulatory and legal decisions remain the responsibility of the instructing firm.",
    },
  },
  {
    slug: "contract-database-lifecycle-admin",
    ref: "03",
    icon: "fileClock",
    title: "Contract Database & Lifecycle Admin",
    summary:
      "Building and maintaining organized contract registers to eliminate missed renewal dates and lapsed terms.",
    includes: [
      "Logging existing contracts",
      "Tracking renewal, expiry & review dates",
      "Flagging upcoming deadlines",
      "Validating contract data against agreed standards",
    ],
    detail: {
      title: "Contract Database & Lifecycle Admin",
      overview:
        "Building and maintaining organised contract registers so renewal dates, review points, and lapsed terms never slip through unnoticed. We turn a scattered set of agreements into a single, reliable source of truth your team can act on.",
      featuresTitle: "Key Features",
      features: [
        {
          name: "Contract Logging & Register Setup",
          body: "Capturing existing agreements into a structured register with consistent metadata, ownership, and value fields.",
        },
        {
          name: "Renewal, Expiry & Review Tracking",
          body: "Every key date recorded and monitored, with a rolling forward view of what needs attention and when.",
        },
        {
          name: "Deadline Flagging & Escalation",
          body: "Early notice of upcoming renewals and break clauses, routed to the right owner with clear lead times.",
        },
        {
          name: "Data Validation Against Standards",
          body: "Ongoing checks that contract records match agreed formatting, naming, and completeness rules.",
        },
      ],
      note: "We work within your existing document and contract systems — no migration to a new platform required.",
    },
  },
  {
    slug: "crm-data-management-cleanup",
    ref: "04",
    icon: "database",
    title: "CRM Data Management & Cleanup",
    summary: "Keeping CRM databases accurate, standardized, and audit-ready.",
    includes: [
      "Ongoing data entry & record updates",
      "Duplicate detection & cleanup",
      "Field standardization",
      "Monthly accuracy reporting",
    ],
    detail: {
      title: "CRM Data Management & Cleanup",
      overview:
        "Keeping CRM databases accurate, standardized, and audit ready for firms that rely on clean data to run their operations.",
      featuresTitle: "Key Features",
      features: [
        {
          name: "Ongoing Data Entry & Record Updates",
          body: "Consistent, accurate entry and maintenance of new and existing records, so your CRM reflects reality rather than falling behind it.",
        },
        {
          name: "Duplicate Detection & Cleanup",
          body: "Identifying and resolving duplicate records that fragment client history, skew reporting, and create confusion across your team.",
        },
        {
          name: "Field Standardization",
          body: "Bringing inconsistent data — mismatched formats, abbreviations, and free-text entries — into a single, standardized structure your whole team can rely on.",
        },
        {
          name: "Monthly Accuracy Reporting",
          body: "Regular reporting on database health, flagging recurring data issues and giving you visibility into how clean your CRM actually is.",
        },
      ],
      note: "Every database is handled under strict confidentiality and data security protocols appropriate to sensitive client and business records.",
    },
  },
  {
    slug: "operations-process-support",
    ref: "05",
    icon: "workflow",
    title: "Operations & Process Support",
    summary:
      "Back-office administration, workflow optimisation, KPI monitoring and process improvement.",
    includes: [
      "Back-office administration",
      "Workflow optimisation",
      "KPI monitoring & reporting",
      "Process improvement & documentation",
    ],
    detail: {
      title: "Operations & Process Support",
      overview:
        "Hands-on back-office support for firms that need their day-to-day operations to run tighter without adding headcount. We take on the recurring administrative load, map how work actually moves through your team, and remove the friction that quietly costs hours every week — so you minimise cost and free up reserve capacity.",
      featuresTitle: "Key Features",
      features: [
        {
          name: "Back-Office Administration",
          body: "Ownership of recurring administrative tasks — document and inbox handling, data entry, scheduling, and internal coordination — delivered to a consistent, documented standard.",
        },
        {
          name: "Workflow Optimisation",
          body: "Mapping current processes end to end, identifying bottlenecks and duplicated effort, and redesigning steps for a cleaner handoff between people and systems.",
        },
        {
          name: "KPI Monitoring & Reporting",
          body: "Defining the handful of metrics that matter, building straightforward dashboards, and delivering regular reporting so performance stays visible.",
        },
        {
          name: "Process Improvement & Documentation",
          body: "Turning ad-hoc knowledge into written procedures and checklists, so the process survives staff changes and scales as the firm grows.",
        },
      ],
      note: "We operate inside your existing tools and processes. The goal is to reduce cost and reclaim reserve capacity — not to impose a new system.",
    },
  },
  {
    slug: "end-to-end-software-development",
    ref: "06",
    icon: "code",
    title: "End-to-End Software Development",
    summary:
      "Custom portal, CRM, and web development for HR companies and professional firms that need software built around how they actually work.",
    includes: [
      "Portal & internal tool development",
      "CRM design & custom builds",
      "Web application development",
      "Discovery, delivery & handover",
    ],
    detail: {
      title: "End-to-End Software Development",
      overview:
        "Custom software delivery for HR companies and professional firms — portals, CRMs, and web applications built from first scope through to deployment and handover. When an off-the-shelf tool does not fit the way your team works, we design and build the system around your process rather than the other way round.",
      featuresTitle: "Key Features",
      features: [
        {
          name: "Portal & Internal Tool Development",
          body: "Client, candidate, and staff portals that consolidate the workflows currently spread across spreadsheets, email, and disconnected tools.",
        },
        {
          name: "CRM Design & Custom Builds",
          body: "Bespoke CRM systems — or tailored extensions to an existing one — modelled on your pipeline, records, and reporting rather than a generic template.",
        },
        {
          name: "Web Development",
          body: "Marketing sites, web applications, and customer-facing tools, built responsive, accessible, and straightforward to maintain.",
        },
        {
          name: "Discovery, Delivery & Handover",
          body: "Scoped requirements, staged delivery with regular review points, and a clean handover with documentation and full source access.",
        },
      ],
      note: "Scope, stack, and hosting are agreed in writing before build starts. You retain full ownership of the code and data.",
    },
  },
];

export function getService(slug) {
  return SERVICES.find((s) => s.slug === slug);
}
