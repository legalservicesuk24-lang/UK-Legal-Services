const CHECK = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
    className="mt-0.5 flex-shrink-0 text-primary-500"
  >
    <path
      d="M2.5 7.2L5.5 10L11.5 3.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PARTNERS = [
  {
    name: "Syed Ali Zar Naqvi",
    initials: "SN",
    role: "Founding Partner — Case Administration & Compliance",
    summary:
      "Operations and compliance professional with 5+ years across insolvency, regulatory compliance, contract management, and CRM operations.",
    points: [
      "PIP1 qualification (Merit), accredited by MaPS",
      "Grew from insolvency case administration into operations management",
      "Senior compliance analyst — regulatory audits and due diligence",
      "Ran live contract databases and CRM operations to KPI standards",
    ],
    leads: "Case administration, compliance, and contract lifecycle management.",
  },
  {
    name: "Hamad Shah Hashmi",
    initials: "HH",
    role: "Founding Partner — Operations & Client Systems",
    summary:
      "Operations specialist across insolvency casework, creditor liaison, and cross-agency disputes.",
    points: [
      "Cross-agency disputes with the DWP, HMRC, and HMLR",
      "Led corporate operations managing CRM platforms and systems",
      "Delivered a large-scale recruitment programme for a major public-sector body",
    ],
    leads: "Operations, CRM systems, and client process support.",
  },
];

export default function FoundingPartners() {
  return (
    <section id="team" className="border-t border-ink-200 bg-white">
      <div className="container-page py-24 sm:py-32">
        <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl">
          Founder &amp; co-founder
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {PARTNERS.map((partner) => (
            <article
              key={partner.name}
              className="flex flex-col rounded-2xl border border-ink-200 bg-white p-8 shadow-card transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-primary-200 hover:shadow-card-hover sm:p-10"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-ink-900 font-display text-base font-semibold tracking-wide text-white ring-4 ring-primary-100">
                  {partner.initials}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink-900">
                    {partner.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary-600">
                    {partner.role}
                  </p>
                </div>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-ink-600">
                {partner.summary}
              </p>

              <ul className="mt-5 space-y-2.5 border-t border-ink-100 pt-5">
                {partner.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-700"
                  >
                    {CHECK}
                    {point}
                  </li>
                ))}
              </ul>

              <p className="mt-auto pt-6">
                <span className="block rounded-xl bg-ink-50 px-4 py-3 text-sm leading-relaxed text-ink-700">
                  <span className="font-semibold text-ink-900">
                    At Bench Strength —{" "}
                  </span>
                  {partner.leads}
                </span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
