const NOT = ["A law firm", "An insolvency practitioner", "A financial adviser"];

export default function WhatWeDontDo() {
  return (
    <section id="what-we-dont-do" className="bg-ink-900">
      <div className="container-page py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
            What we don&apos;t do
          </h2>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 sm:p-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-400">
                  What we are
                </p>
                <p className="mt-3 text-base leading-relaxed text-ink-300">
                  An operations, compliance-support, and case-administration
                  partner.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-400">
                  What we&apos;re not
                </p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {NOT.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/15 px-3 py-1 text-sm font-medium text-ink-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-8">
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-ink-300">
                We don&apos;t provide regulated legal, insolvency, or financial
                advice, and every statutory decision remains the responsibility of
                the instructing licensed practitioner or firm.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white">
                <span className="font-semibold">Our job:</span> make sure the
                admin, documentation, and process work behind those decisions is
                done properly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
