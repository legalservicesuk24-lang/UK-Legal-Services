/* ---------------------------------------------------------------------------
   Chapter — one pinned panel of the globe homepage.

   The section is one screen tall (its scroll budget; the homepage snaps
   chapter to chapter); the inner `.chapter-pin` is sticky and at least one
   viewport tall. ChapterDirector drives the reveal of every `.fx`
   descendant (use `data-fx` for the stagger index) and names the rail tick
   after `label`.

   The pin's first child is the "copy block": the reveal is keyed to its rect,
   and it carries the local scrim that keeps text legible over the globe. So
   keep exactly one element directly inside a Chapter.
--------------------------------------------------------------------------- */

export default function Chapter({ id, label, className = "", children }) {
  return (
    <section
      id={id}
      data-label={label}
      aria-label={label}
      className={`chapter ${className}`}
    >
      <div className="chapter-pin">{children}</div>
    </section>
  );
}
