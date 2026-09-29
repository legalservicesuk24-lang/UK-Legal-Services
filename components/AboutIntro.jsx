import Chapter from "./globe/Chapter";
import StatsBand from "./StatsBand";
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

/* Chapter 2 of the globe homepage. Copy sits centred over the globe as it
   starts to grow and sink behind it. The track-record
   figures run along the bottom of the same chapter instead of taking a screen
   of their own. */
export default function AboutIntro() {
  return (
    <Chapter id="about" label="Who we are">
      <div className="chapter-wrap" data-scrim="inner">
        <div className="chapter-scrim mx-auto flex max-w-xl flex-col items-center text-center">
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
            className="fx mt-6 mx-auto max-w-md text-lg leading-relaxed text-ink-300"
            data-fx="2"
          >
            A specialist operations, compliance and case-administration
            partner for UK insolvency, legal and advisory firms — scaled to
            what your firm can carry right now, without the overhead of a
            permanent hire.
          </p>
          <div className="fx mt-10 flex w-full justify-center" data-fx="3">
            <ButtonLink href="/about" color="onDark" variant="outlined">
              Read More
              {ARROW}
            </ButtonLink>
          </div>
        </div>

        <StatsBand
          fxStart={4}
          className="chapter-scrim mt-14 border-t border-white/10 pt-8 sm:mt-16"
        />
      </div>
    </Chapter>
  );
}
