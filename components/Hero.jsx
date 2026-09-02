"use client";

import { useRef } from "react";

import OperationsCard from "./hero/OperationsCard";
import { ButtonLink } from "./ui/Button";
import Pill from "./ui/Pill";
import CursorRing from "./ui/CursorRing";
import TextReveal from "./ui/TextReveal";

/* ---------------------------------------------------------------------------
   Hero — full-bleed dark, with the copy carrying the weight and a compact
   operations card alongside it.

   The earlier version put a large WebGL case-file stack behind the copy. That
   has been replaced by OperationsCard: a smaller supporting graphic that
   sketches how an engagement runs, ringed by the service names. It is CSS
   only, so there is no lazy WebGL bundle, no error boundary, and no reduced-
   motion carve-out beyond the global one.

   Client component only because CursorRing needs a ref to this element. The
   headline itself is server-rendered markup with a CSS animation — no JS.
--------------------------------------------------------------------------- */

export default function Hero() {
  const hostRef = useRef(null);

  return (
    <section
      id="home"
      ref={hostRef}
      /* Pulls the section up under the sticky header so the dark ground runs
         behind it — otherwise a transparent header reveals the light body
         colour above the hero. The +1px matters: the header occupies 4.5rem of
         content *plus* its 1px bottom border, so pulling up only 4.5rem left a
         1px light line across the top of the page. */
      className="relative isolate -mt-[calc(4.5rem_+_1px)] overflow-hidden bg-ink-950"
    >
      {/* Environment. A single low teal wash and the ledger motif, both very
          faint — on a dark ground the object is the focal point and ambient
          light only has to suggest depth. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="animate-drift-a absolute -right-40 top-0 h-[42rem] w-[42rem] rounded-full bg-primary-700/25 blur-3xl" />
        <div className="animate-drift-c absolute -bottom-64 -left-32 h-[36rem] w-[36rem] rounded-full bg-primary-900/40 blur-3xl" />
        <div className="absolute inset-0 bg-ledger-lines opacity-[0.06]" />
        {/* Film grain. The single cheapest thing that stops a dark gradient
            reading as flat CSS — an inline SVG turbulence, so no asset. */}
        <div
          className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* The supporting card, sitting in the right half from lg up. Above the
          scrim (z-10) so its floating tags stay legible; the copy is z-20 and
          keeps priority where they meet. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[54%] items-center justify-center px-6 lg:flex xl:w-[48%] xl:px-10"
      >
        <OperationsCard />
      </div>

      {/* Scrim: guarantees the copy's contrast regardless of what sits behind
          it. Left-to-right so the card stays readable. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-ink-950 via-ink-950/85 to-transparent lg:block"
      />

      <CursorRing containerRef={hostRef} />

      <div className="container-page relative z-20 pb-24 pt-[8.5rem] sm:pb-32 sm:pt-[10rem] lg:min-h-[46rem] lg:pb-36 lg:pt-[12.5rem]">
        <div className="max-w-2xl">
          <p className="file-tag mb-6 text-accent-400">
            Operations &amp; Compliance Support
          </p>

          <TextReveal
            as="h1"
            text="The back office UK firms trust to get it right, not just done."
            accent={["right"]}
            accentClassName="not-italic text-accent-400"
            className="font-display text-display-2xl text-on-dark"
          />

          <p className="mt-7 font-display text-lg font-semibold text-accent-400 sm:text-xl">
            Minimize Costs. Maximize Reserves.
          </p>
          {/* Was a five-line paragraph listing services, clients and a
              differentiator. The list is now pills — scanned in a second where
              the sentence took ten — leaving one short line to carry the
              claim. */}
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-300">
            Specialist back-office capacity for UK insolvency, legal and
            advisory firms. Qualified people, not a generic outsourcer.
          </p>

          <ul className="mt-7 flex flex-wrap gap-2">
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

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" color="onDark" lift>
              Book a Consultation
            </ButtonLink>
            <ButtonLink href="/services" color="onDark" variant="outlined">
              Explore Services
            </ButtonLink>
          </div>
        </div>

        {/* Small screens get the card in flow, below the copy. Extra vertical
            margin leaves room for the tags that float above and below it. */}
        <div className="mb-16 mt-28 lg:hidden">
          <OperationsCard />
        </div>
      </div>
    </section>
  );
}
