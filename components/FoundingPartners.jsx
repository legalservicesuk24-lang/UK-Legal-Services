import Image from "next/image";

const PARTNERS = [
  {
    name: "Syed Ali Zar Naqvi",
    image: "/alizarr.jpeg",
    // Studio headshot on a portrait crop — pull the framing back so the head,
    // tie and shoulders all sit centred in the circle. Bias the crop down so
    // the suit and tie read rather than empty backdrop above the head.
    imageClass: "scale-110 object-[center_65%]",
    role: "Founder",
    summary:
      "Case Administration & Compliance. PIP1-qualified (Merit), accredited by the Money and Pensions Service (MaPS), with five years in insolvency, compliance, and process improvement.",
    engagements: [
      {
        client: "Intuitive Legal",
        detail:
          "Compliance Analyst overseeing legal audits, due diligence, and risk compliance across business energy, financial misselling, and housing disrepair claims.",
      },
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
    // Widened canvas (matching-grey padding added to the sides + top of the
    // original, no pixels resampled) so object-cover sits the subject smaller
    // in the circle — same framing weight as Alizar's photo.
    image: "/hamadshah-wide.jpg",
    imageClass: "object-[center_35%]",
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
              <div className="flex items-center gap-5">
                <span className="relative block h-24 w-24 flex-shrink-0 overflow-hidden rounded-full ring-4 ring-primary-100 sm:h-28 sm:w-28">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    sizes="(min-width: 640px) 112px, 96px"
                    quality={90}
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

              {/* Reserve a consistent height on the two-column layout so the
                  divider below lines up across both cards regardless of how
                  many lines each bio wraps to. */}
              <p className="mt-6 text-sm leading-relaxed text-ink-600 lg:min-h-[5.5rem]">
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
