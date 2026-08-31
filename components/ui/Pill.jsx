import { tv } from "tailwind-variants";

/* ---------------------------------------------------------------------------
   Pill — a small capability tag.

   Exists to replace prose. Several sections were carrying a paragraph where
   the reader only wanted the list: "we do A, B and C, delivered by X, without
   Y" is four pills, and four pills are scanned in about a second where the
   sentence takes ten.

   Same colour/variant split as Button — `tone` sets custom properties,
   nothing else. Contrast measured against the surface each tone targets.
--------------------------------------------------------------------------- */

export const pillStyles = tv({
  base: [
    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
    "text-xs font-medium leading-none",
    "border-[var(--pill-border)] bg-[var(--pill-bg)] text-[var(--pill-fg)]",
  ],
  variants: {
    tone: {
      /* On light surfaces. ink-700 on primary-50 = 8.6:1. */
      light: [
        "[--pill-bg:theme(colors.primary.50)]",
        "[--pill-border:theme(colors.primary.100)]",
        "[--pill-fg:theme(colors.ink.700)]",
      ],
      /* Neutral, for secondary lists on light surfaces. */
      quiet: [
        "[--pill-bg:theme(colors.ink.100)]",
        "[--pill-border:theme(colors.ink.200)]",
        "[--pill-fg:theme(colors.ink.700)]",
      ],
      /* On the near-black hero. The border is the only thing giving each pill
         a boundary, and at the 20% white first used it measured 1.86:1 against
         the ground — invisible, so the pills ran together into one grey blur.
         34% resolves to #5C6770 = 3.10:1, clearing the 3:1 WCAG asks of
         non-text contrast. Label is ink-200 at 11.3:1 on the 9% wash. */
      dark: [
        "[--pill-bg:rgb(255_255_255_/_0.09)]",
        "[--pill-border:rgb(255_255_255_/_0.34)]",
        "[--pill-fg:theme(colors.ink.200)]",
      ],
    },
  },
  defaultVariants: { tone: "light" },
});

export default function Pill({ tone, className, children, ...props }) {
  return (
    <span className={pillStyles({ tone, className })} {...props}>
      {children}
    </span>
  );
}

/** A dot-led pill, for lists where the dot does the "checked" work. */
export function DotPill({ tone, className, children, ...props }) {
  return (
    <Pill tone={tone} className={className} {...props}>
      <span
        aria-hidden
        className="h-1 w-1 flex-shrink-0 rounded-full bg-primary-600"
      />
      {children}
    </Pill>
  );
}
