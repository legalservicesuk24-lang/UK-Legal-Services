"use client";

import { useRef } from "react";

import CaseFileStack from "./hero/CaseFileStack";
import StackFallback from "./hero/StackFallback";
import { ButtonLink } from "./ui/Button";
import CursorRing from "./ui/CursorRing";
import TextReveal from "./ui/TextReveal";

/* ---------------------------------------------------------------------------
   Hero — full-bleed dark, with the case-file stack as the subject.

   This is the Hubtown play: one confident object in a dark environment, given
   room. The previous light hero put a ~450px object politely in a column on an
   off-white ground, and scale plus environment turned out to be most of the
   perceived impact — the object itself barely changed.

   The stack now spans the full section behind the copy on large screens rather
   than sitting beside it, which is what lets it be big. Copy sits in the left
   half with a gradient scrim behind it so text contrast never depends on what
   the canvas happens to be rendering underneath.

   Client component only because CursorRing needs a ref to this element. The
   headline itself is server-rendered markup with a CSS animation — no JS.
--------------------------------------------------------------------------- */

export default function Hero() {
  const hostRef = useRef(null);
  /* Pointer position is tracked here, on the whole section, rather than inside
     the scene. The canvas wrapper is `pointer-events-none` because it is
     decorative, which meant the scene's own pointer handler never received a
     single event and the parallax silently did nothing. Tracking at section
     level also behaves better: moving the mouse anywhere across the hero
     nudges the stack, instead of only when the pointer is over the canvas. */
  const pointer = useRef({ x: 0, y: 0 });

  const onPointerMove = (e) => {
    const box = e.currentTarget.getBoundingClientRect();
    pointer.current.x = ((e.clientX - box.left) / box.width) * 2 - 1;
    pointer.current.y = ((e.clientY - box.top) / box.height) * 2 - 1;
  };

  const onPointerLeave = () => {
    pointer.current.x = 0;
    pointer.current.y = 0;
  };

  return (
    <section
      id="home"
      ref={hostRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
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

      {/* The object. Behind the copy and full-height from lg up, so it can be
          large; stacked underneath on small screens where overlaying text on a
          canvas would be a contrast problem. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[68%] lg:block"
      >
        <CaseFileStack pointerRef={pointer} />
      </div>

      {/* Scrim: guarantees the copy's contrast regardless of what the canvas
          renders behind it. Left-to-right so the object stays readable. */}
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
            accentClassName="text-accent-400"
            className="font-serif text-display-2xl text-on-dark"
          />

          <p className="mt-7 font-display text-lg font-semibold text-accent-400 sm:text-xl">
            Minimize Costs. Maximize Reserves.
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-300">
            Bench Strength handles the case administration, compliance
            auditing, and regulatory admin that insolvency practitioners, legal
            teams, and advisory firms can&apos;t afford to get wrong —
            delivered by experienced professionals, not a generic outsourcing
            agency.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" color="onDark" lift>
              Book a Consultation
            </ButtonLink>
            <ButtonLink href="/services" color="onDark" variant="outlined">
              Explore Services
            </ButtonLink>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink-400">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
              PIP-certified case support
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
              Audit-ready documentation
            </span>
          </div>
        </div>

        {/* Small screens get the CSS stack in flow, not a second CaseFileStack.
            Below 768px `sceneIsWorthIt` declines WebGL anyway, so mounting the
            full wrapper here would only ever resolve to this same fallback —
            while risking a second canvas in the md..lg band. */}
        <div className="mt-16 lg:hidden">
          <StackFallback dark />
        </div>
      </div>
    </section>
  );
}
