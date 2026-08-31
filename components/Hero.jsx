import CaseFileStack from "./hero/CaseFileStack";
import { ButtonLink } from "./ui/Button";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-ink-50">
      {/* Backdrop pared back to one focal point. The three drifting aurora
          blobs were fine when the hero had no subject, but with the case-file
          stack in the right column they were a second ambient system competing
          with it. The ledger lines stay — they are the brand's register motif —
          plus one slow wash behind the stack for depth. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="animate-drift-a absolute -right-24 top-4 h-[34rem] w-[34rem] rounded-full bg-primary-200/30 blur-3xl" />
        <div className="absolute inset-0 bg-ledger-lines opacity-50" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink-50" />
      </div>

      <div className="container-page relative z-10 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="file-tag mb-5">Operations &amp; Compliance Support</p>
            <h1 className="text-display-2xl font-semibold text-heading">
              The back office UK firms trust to get it{" "}
              <span className="text-primary-600">right</span>, not just done.
            </h1>
            <p className="mt-6 font-display text-lg font-semibold text-brand sm:text-xl">
              Minimize Costs. Maximize Reserves.
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Bench Strength handles the case administration, compliance auditing, and
              regulatory admin that insolvency practitioners, legal teams, and advisory
              firms can&apos;t afford to get wrong — delivered by experienced professionals,
              not a generic outsourcing agency.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" lift>
                Book a Consultation
              </ButtonLink>
              <ButtonLink href="/services" variant="outlined">
                Explore Services
              </ButtonLink>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink-500">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-confirm-500" />
                PIP-certified case support
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-confirm-500" />
                Audit-ready documentation
              </span>
            </div>
          </div>

          <CaseFileStack />
        </div>
      </div>
    </section>
  );
}
