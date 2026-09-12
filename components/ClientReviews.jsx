"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

/* ---------------------------------------------------------------------------
   ClientReviews — full-bleed navy testimonial band.

   A 2-column track carousel: each slide pairs one Alizar review with one
   Hamad review, and the track advances/retreats a full slide at a time with
   a translateX transition. Wraps at both ends rather than disabling the
   arrows, since three slides is short enough that a hard stop feels broken.
--------------------------------------------------------------------------- */

const SLIDES = [
  [
    {
      quote:
        "Alizar’s oversight in legal audits and risk compliance was crucial for our claims operations. He handles complex due diligence across energy and housing disrepair cases with exceptional precision and attention to detail.",
      author: "Director of Legal Operations",
      company: "Intuitive Legal",
      tag: "Syed Ali Zar Naqvi",
    },
    {
      quote:
        "Hammad brought strategic clarity to our insolvency practice. His end-to-end financial assessments and case administration skills significantly streamlined our resolution strategies on complex cases.",
      author: "Senior Partner",
      company: "Anchorage Chambers",
      tag: "Hamad Shah Hashmi",
    },
  ],
  [
    {
      quote:
        "Anchorage Chambers would like to congratulate Syed Ali Zar Naqvi for not just clearing, but excelling in their PIP Exam with distinction. Your dedication, hard work, and commitment to excellence have truly paid off, showcasing the depth of your knowledge and skills.",
      author: "Practice Management",
      company: "Anchorage Chambers",
      tag: "Syed Ali Zar Naqvi",
    },
    {
      quote:
        "During a critical post-COVID period for the NHS, Hammad led our recruitment drive flawlessly—successfully onboarding over 400 healthcare professionals with remarkable speed and compliance.",
      author: "Head of Talent Acquisition",
      company: "Locum Units",
      tag: "Hamad Shah Hashmi",
    },
  ],
  [
    {
      quote:
        "Alizar played a key role in managing our live contract databases and inventory accuracy under tight deadlines. His work during the setup of our offshore administration office in Pakistan was seamless and invaluable.",
      author: "Head of Commercial Operations",
      company: "Kenwood Travel",
      tag: "Syed Ali Zar Naqvi",
    },
    {
      quote:
        "Hammad reliably kept our day-to-day operational systems and inventory running smoothly. His leadership in setting up our offshore administrative hub in Pakistan transformed our back-office efficiency.",
      author: "Operations Director",
      company: "Kenwood Travel",
      tag: "Hamad Shah Hashmi",
    },
  ],
];

function ReviewCard({ review }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-7">
      <p className="text-sm leading-relaxed text-ink-300">
        “{review.quote}”
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/10 pt-5">
        <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
          {review.company}
        </span>
        <span className="inline-flex items-center rounded-full border border-primary-400/30 bg-primary-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-400">
          {review.tag}
        </span>
      </div>
      <p className="mt-3 text-xs font-medium text-ink-400">{review.author}</p>
    </article>
  );
}

export default function ClientReviews() {
  const [index, setIndex] = useState(0);
  const lastIndex = SLIDES.length - 1;

  const goPrev = () => setIndex((current) => (current === 0 ? lastIndex : current - 1));
  const goNext = () => setIndex((current) => (current === lastIndex ? 0 : current + 1));

  return (
    <section
      id="reviews"
      aria-label="Client reviews and endorsements"
      className="relative overflow-hidden border-t border-white/10 bg-ink-950"
    >
      <Image
        src="/reviews.jpg"
        alt=""
        fill
        aria-hidden="true"
        sizes="100vw"
        quality={70}
        className="object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-ink-950/70" aria-hidden="true" />

      <div className="container-page relative py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="file-tag !text-accent-400">Client reviews</p>
            <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
              Endorsements from the firms we&apos;ve worked with.
            </h2>
            <div className="mt-3 flex gap-1" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Star
                  key={starIndex}
                  className="h-4 w-4 fill-accent-400 text-accent-400"
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Show previous reviews"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-primary-400/40 hover:bg-white/10 hover:text-accent-400"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Show next reviews"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-primary-400/40 hover:bg-white/10 hover:text-accent-400"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative mt-10 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {SLIDES.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                className="grid w-full flex-shrink-0 grid-cols-1 gap-5 sm:grid-cols-2"
                aria-hidden={slideIndex !== index}
              >
                {slide.map((review) => (
                  <ReviewCard key={`${slideIndex}-${review.tag}`} review={review} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {SLIDES.map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              onClick={() => setIndex(dotIndex)}
              aria-label={`Go to slide ${dotIndex + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                dotIndex === index ? "w-6 bg-accent-400" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
