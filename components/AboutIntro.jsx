import { ButtonLink } from "./ui/Button";

const ARROW = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function AboutIntro() {
  return (
    <section id="about" className="border-t border-ink-200 bg-white">
      <div className="container-page py-24 sm:py-32">
        {/* Copy only, aligned to the left of the section. */}
        <div className="flex max-w-xl flex-col items-start text-left">
          <p className="file-tag mb-5">About Bench Strength</p>
          <h2 className="font-display text-display-lg font-bold text-heading">
            Who we are
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            A specialist operations, compliance and case-administration
            partner for UK insolvency, legal and advisory firms — scaled to
            what your firm can carry right now, without the overhead of a
            permanent hire.
          </p>

          {/* CTA — same outlined treatment as the "What we do" section. */}
          <div className="mt-10 flex w-full justify-start">
            <ButtonLink href="/about" variant="outlined">
              Read More
              {ARROW}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
