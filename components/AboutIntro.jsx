import Image from "next/image";

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
        {/* Two narrow portrait crops of the team, then the section copy in a
            wide right-hand column. Photos pair up on sm; everything stacks on
            mobile. */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[minmax(0,17rem)_minmax(0,17rem)_1fr] lg:gap-8">
          {/* Column 1 — founder. Held at its natural vertical position. */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-ink-200 shadow-card">
            <Image
              src="/boy1.jpg"
              alt="Bench Strength founder working at a laptop"
              fill
              sizes="(min-width: 1024px) 17rem, (min-width: 640px) 45vw, 100vw"
              className="object-cover object-center"
            />
          </div>

          {/* Column 2 — co-founder. Nudged down on desktop for a staggered
              pairing, and the crop biased lower so the subject and laptop fill
              the frame rather than empty backdrop. */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-ink-200 shadow-card lg:mt-12">
            <Image
              src="/boy2.jpg"
              alt="Bench Strength co-founder working at a laptop"
              fill
              sizes="(min-width: 1024px) 17rem, (min-width: 640px) 45vw, 100vw"
              className="object-cover object-[center_82%]"
            />
          </div>

          {/* Column 3 — copy, aligned to the left of the column. */}
          <div className="flex flex-col items-start text-left sm:col-span-2 lg:col-span-1">
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
            <div className="mt-10 flex w-full justify-start lg:mt-auto lg:pt-10">
              <ButtonLink href="/about" variant="outlined">
                Read More
                {ARROW}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
