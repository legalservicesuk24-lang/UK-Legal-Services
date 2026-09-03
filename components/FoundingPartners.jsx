import Image from "next/image";

const PARTNERS = [
  {
    name: "Syed Ali Zar Naqvi",
    image: "/alizar.jpg",
    // Low-angle photo, small face high in frame — zoom in and pull the crop up
    imageClass: "scale-150 object-[50%_68%]",
    role: "Founder",
    summary:
      "Case Administration & Compliance. PIP1-qualified (Merit), accredited by the Money and Pensions Service (MaPS), with five years in insolvency, compliance, and process improvement.",
    engagements: [
      {
        client: "Anchorage Chambers",
        detail:
          "Worked alongside an established insolvency practice on complex cases, end-to-end financial assessments, case administration, and resolution strategy.",
      },
      {
        client: "Kenwood Travel",
        detail:
          "Brought the company back from drowning and fear of liquidation, and helped them not only sustain their position in the market but set up an offshore office for administration in Pakistan.",
      },
    ],
  },
  {
    name: "Hamad Shah Hashmi",
    image: "/hamadshah.jpg",
    // Tight headshot — anchor to the top so the hairline isn't clipped
    imageClass: "scale-105 object-top",
    role: "Co-founder",
    summary:
      "Operations & Client Systems. Background in insolvency casework, creditor liaison, and CRM operations.",
    engagements: [
      {
        client: "Anchorage Chambers",
        detail:
          "Worked alongside an established insolvency practice on complex cases, end-to-end financial assessments, case administration, and resolution strategy.",
      },
      {
        client: "Locum Units",
        detail:
          "Led NHS recruitment after COVID hit the UK public sector, onboarding 400 people.",
      },
      {
        client: "Kenwood Travel",
        detail:
          "Brought the company back from drowning and fear of liquidation, and helped them not only sustain their position in the market but set up an offshore office for administration in Pakistan.",
      },
    ],
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
                <span className="relative block h-16 w-16 flex-shrink-0 overflow-hidden rounded-full ring-4 ring-primary-100">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    sizes="64px"
                    className={`object-cover ${partner.imageClass}`}
                  />
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

              <div className="mt-8 border-t border-ink-100 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-400">
                  Selected engagements
                </p>
                <ul className="mt-5 space-y-5">
                  {partner.engagements.map((engagement) => (
                    <li key={engagement.client}>
                      <p className="text-sm font-semibold text-ink-900">
                        {engagement.client}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                        {engagement.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
