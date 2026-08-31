/* ---------------------------------------------------------------------------
   TextReveal — sets a headline word by word, each word rising from behind a
   clipping mask.

   Deliberately a *server* component with no JavaScript at all. The headline is
   always above the fold, so the animation should run on load — which a plain
   CSS animation does, with better failure behaviour than anything JS-driven:

     - no JS            -> animation still runs; it is pure CSS
     - reduced motion   -> globals.css zeroes the duration and `both` fill
                           lands it on the final frame instantly
     - crawlers / a11y  -> the text is ordinary markup in reading order

   `animate-rise-in` is referenced as a real utility class, which is what makes
   Tailwind emit the @keyframes at all. Naming a keyframe only from hand-written
   CSS gets it tree-shaken — that mistake blanked three whole sections earlier
   in this project.

   The mask needs vertical slack or descenders get clipped, hence the
   padding/negative-margin pair on each word.
--------------------------------------------------------------------------- */

export default function TextReveal({
  text,
  accent = [],
  as: Tag = "span",
  className = "",
  delay = 0,
  stagger = 60,
  /* Caller decides, because the right accent depends on the ground: the
     `text-brand` token is tuned for light surfaces, and the hero is near-black
     (where `text-accent-400` is the legible teal).
     `not-italic` because <em> defaults to italic, which read as deliberate on
     the serif but reads as a slanted sans now — colour alone carries it. */
  accentClassName = "not-italic text-brand",
  ...props
}) {
  const words = text.split(" ");
  const accents = new Set(accent.map((w) => w.toLowerCase()));

  return (
    <Tag className={className} {...props}>
      {words.map((word, i) => {
        // Strip punctuation before matching so "right," still highlights.
        const bare = word.replace(/[^a-z]/gi, "").toLowerCase();
        return (
          <span
            key={`${word}-${i}`}
            /* Word gaps come from a margin, not a space character: a space
               inside an overflow-hidden inline-flex collapses away, and JSX
               strips the whitespace between adjacent elements. */
            className={`inline-flex overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom ${
              i < words.length - 1 ? "mr-[0.26em]" : ""
            }`}
          >
            <span
              className="animate-rise-in inline-block"
              style={{ animationDelay: `${delay + i * stagger}ms` }}
            >
              {accents.has(bare) ? (
                <em className={accentClassName}>{word}</em>
              ) : (
                word
              )}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
