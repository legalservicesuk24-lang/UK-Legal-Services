import { ICONS } from "./serviceIcons";

const PIP1_COVERS = [
  "Managing a personal caseload end-to-end",
  "Providing specialist money and debt legal advice",
  "Negotiating on behalf of clients",
  "Supporting other practitioners",
];

export default function Practitioners() {
  return (
    <section id="practitioners" className="border-b border-ink-200 bg-ink-50">
      <div className="container-page grid grid-cols-1 gap-14 py-24 sm:py-32 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl">
            Practitioners, not ticket-takers
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-700">
            Every case that comes through Bench Strength is handled by someone
            qualified to understand what they&apos;re looking at — not a
            generalist agent working from a script.
          </p>
        </div>

        <div className="lg:col-span-7">
          <article className="h-full rounded-2xl border border-ink-200 bg-white p-8 shadow-card sm:p-10">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                {ICONS.scale}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink-900">
                  PIP1 — Personal Insolvency Practical
                </h3>
                <p className="mt-1 text-sm text-ink-500">
                  Awarded with Merit · Accredited by the Money and Pensions
                  Service (MaPS)
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-ink-600">
              Held by our lead case administrator. The qualification covers:
            </p>
            <ul className="mt-4 space-y-3 border-t border-ink-100 pt-6">
              {PIP1_COVERS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-ink-700"
                >
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary-400" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-6 rounded-xl border-l-2 border-primary-600 bg-ink-50 px-5 py-4 text-sm leading-relaxed text-ink-600">
              It&apos;s a standard built specifically for this work — not a
              generic customer-service credential.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
