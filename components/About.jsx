export default function About() {
  return (
    <section id="about" className="border-b border-ink-200 bg-ink-50">
      <div className="container-page py-20 sm:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="file-tag mb-5">About Bench Strength</p>
            <h1 className="max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem]">
              Specialist capacity — without the permanent hire.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-700">
              Caseloads don&apos;t slow down just because budgets do. Firms under
              pressure with too much work, not enough headcount, and no room for
              another salary on the books are exactly who Bench Strength was built
              for. We step in as the specialist capacity you need without the overhead
              of a permanent hire: qualified case support, compliance work, and admin
              handled properly, scaled to exactly what your firm can carry right now.
            </p>
          </div>

          {/* Ambient clip of the team at work. Muted + looping so it plays
              inline without sound; poster paints immediately while the file
              streams in. */}
          <figure className="relative overflow-hidden rounded-2xl border border-ink-200 shadow-card-hover">
            <video
              className="aspect-video h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/laptop.jpg"
            >
              <source src="/person-working.mp4" type="video/mp4" />
            </video>
          </figure>
        </div>
      </div>
    </section>
  );
}
