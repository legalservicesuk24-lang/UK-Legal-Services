import { SERVICES } from "../app/services/servicesData";

/* ---------------------------------------------------------------------------
   RegisterMarquee — a slow ticker of the six register names, sitting between
   the dark hero and the light page below it as a transition band.

   A marquee is unashamedly a gimmick, but it is a defensible one here: the
   content is the actual service list rather than filler, and a register that
   scrolls past is a reasonable visual for a running caseload. It also does
   real structural work, giving the eye a narrow dark strip to cross between
   two very different sections.

   Two things keep it from being an accessibility problem:

     - The track is duplicated, and the second copy is `aria-hidden`, so the
       list is announced once rather than twice.
     - The strip is kept running deliberately (see the `.register-marquee`
       rules in globals.css, which re-enable it under `prefers-reduced-motion`).
       WCAG 2.2.2 asks for a way to stop motion that runs longer than five
       seconds — hovering the bar pauses it, via `animation-play-state`.

   `animate-marquee` is referenced as a utility class on purpose: that is what
   makes Tailwind emit the @keyframes.
--------------------------------------------------------------------------- */

const DOT = (
  <span
    aria-hidden
    className="mx-8 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-accent-400/70 align-middle"
  />
);

function Track({ hidden = false }) {
  return (
    <ol
      aria-hidden={hidden || undefined}
      className="flex flex-shrink-0 items-center"
    >
      {SERVICES.map((service) => (
        <li key={service.slug} className="flex items-center whitespace-nowrap">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-300">
            <span className="text-accent-400">{service.ref}</span>{" "}
            {service.title}
          </span>
          {DOT}
        </li>
      ))}
    </ol>
  );
}

export default function RegisterMarquee() {
  return (
    <section
      aria-label="Service registers"
      className="register-marquee relative overflow-hidden border-y border-white/10 bg-ink-950 py-3.5"
    >
      {/* Fade the ends so names enter and leave rather than being cut off. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent"
      />

      {/* The track is exactly two copies wide and translates -50%, so the loop
          point lands where the second copy's first item sits under the first
          copy's — seamless. */}
      <div className="register-marquee__track animate-marquee flex w-max">
        <Track />
        <Track hidden />
      </div>
    </section>
  );
}
