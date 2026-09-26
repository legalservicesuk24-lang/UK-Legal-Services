import Chapter from "./globe/Chapter";
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

/* Chapter 2 of the globe homepage. Copy sits in the right column, opposite
   the hero's, as the globe starts to grow and sink behind it. */
export default function AboutIntro() {
  return (
    <Chapter id="about" label="Who we are">
      <div className="chapter-wrap" data-scrim="inner">
        <div className="chapter-scrim ml-auto flex max-w-xl flex-col items-start text-left">
          <p className="file-tag fx mb-5 !text-accent-400" data-fx="0">
            About Bench Strength
          </p>
          <h2
            className="fx font-display text-display-lg font-bold text-on-dark"
            data-fx="1"
          >
            Who we are
          </h2>
          <p
            className="fx mt-6 max-w-md text-lg leading-relaxed text-ink-300"
            data-fx="2"
          >
            A specialist operations, compliance and case-administration
            partner for UK insolvency, legal and advisory firms — scaled to
            what your firm can carry right now, without the overhead of a
            permanent hire.
          </p>
          <div className="fx mt-10 flex w-full justify-start" data-fx="3">
            <ButtonLink href="/about" color="onDark" variant="outlined">
              Read More
              {ARROW}
            </ButtonLink>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
