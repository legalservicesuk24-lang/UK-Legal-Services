const POINTS = [
  {
    title: "Practitioners, not ticket-takers",
    body: "Every case is handled by people who understand insolvency, compliance, and contract law in practice — not a rotating queue of generalist agents.",
  },
  {
    title: "Built for overflow capacity",
    body: "Plug us in when caseloads spike. We slot into your existing process instead of asking you to adapt to ours.",
  },
  {
    title: "Audit-ready by default",
    body: "Documentation, record-keeping, and reporting are structured to hold up under regulatory scrutiny — not assembled after the fact.",
  },
];

export default function About() {
  return (
    <section id="about" className="border-y border-ink-200 bg-white">
      <div className="container-page grid grid-cols-1 gap-14 py-24 sm:py-32 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="file-tag mb-5">About Bench Strength</p>
          <h2 className="text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl">
            Operations support, done properly.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-700">
            Bench Strength was built on a simple observation: UK firms don&apos;t need
            another call-centre-style outsourcer — they need admin, compliance, and
            case support handled by people who&apos;ve actually worked the files. We bring
            hands-on experience in insolvency case administration and litigation
            audit into the day-to-day operations work most firms struggle to keep
            on top of.
          </p>
        </div>

        <div className="lg:col-span-7">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {POINTS.map((point) => (
              <div
                key={point.title}
                className="group rounded-xl border-t-2 border-primary-600 bg-ink-50/0 px-1 pt-5 transition-all duration-300 hover:bg-ink-50 hover:px-4 hover:pb-4"
              >
                <dt className="font-display text-sm font-semibold text-ink-900">
                  {point.title}
                </dt>
                <dd className="mt-2.5 text-sm leading-relaxed text-ink-600">
                  {point.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
