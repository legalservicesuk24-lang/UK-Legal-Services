import Chapter from "./globe/Chapter";
import { ButtonLink } from "./ui/Button";
import Pill from "./ui/Pill";

/* ---------------------------------------------------------------------------
   Hero — chapter 1 of the globe homepage.

   The globe (GlobeBackground) is the subject now: bright, centred and facing
   the viewer on first paint. The copy sits in the left column over its own
   scrim (see `.chapter-pin > *::before`), so contrast never depends on what
   the canvas is rendering underneath.

   Everything here rises in with a CSS animation on load, staggered by
   `data-fx`, then hands over to the scroll reveal. Server-rendered, no JS.
--------------------------------------------------------------------------- */

export default function Hero() {
  return (
    <Chapter id="home-hero" label="Overview">
      <div className="chapter-wrap" data-scrim="inner">
        <div className="chapter-scrim max-w-2xl">
          <h1
            className="fx font-display text-display-2xl font-normal text-on-dark"
            data-fx="0"
          >
            The back office UK firms trust to get it{" "}
            <span className="text-accent-400">right,</span> not just done.
          </h1>

          <p
            className="fx mt-7 font-display text-lg font-semibold text-accent-400 sm:text-xl"
            data-fx="1"
          >
            Minimize Costs. Maximize Reserves.
          </p>
          <p
            className="fx mt-5 max-w-lg text-lg leading-relaxed text-ink-300"
            data-fx="2"
          >
            Specialist back-office capacity for UK insolvency, legal and
            advisory firms. Qualified people, not a generic outsourcer.
          </p>

          <ul className="fx mt-7 flex flex-wrap gap-2" data-fx="3">
            {[
              "Case administration",
              "Compliance auditing",
              "Regulatory admin",
              "On demand",
            ].map((item) => (
              <li key={item}>
                <Pill tone="dark">{item}</Pill>
              </li>
            ))}
          </ul>

          <div className="fx mt-10 flex flex-col gap-3 sm:flex-row" data-fx="4">
            <ButtonLink href="/contact" color="onDark" lift>
              Book a Consultation
            </ButtonLink>
            <ButtonLink href="/services" color="onDark" variant="outlined">
              Explore Services
            </ButtonLink>
          </div>
        </div>
      </div>
      <div aria-hidden className="chapter-hint file-tag !text-[10px] !text-ink-300/60">
        <span>Scroll</span>
        <b />
      </div>
    </Chapter>
  );
}
