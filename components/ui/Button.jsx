"use client";

import Link from "next/link";
import { Button as AriaButton } from "react-aria-components";
import { tv } from "tailwind-variants";

/* ---------------------------------------------------------------------------
   Button — single source of truth for every button-shaped thing on the site.

   `color` sets CSS custom properties; `variant` only ever consumes them. That
   keeps the matrix additive rather than multiplicative: 3 variants + 3 colors
   is 6 definitions instead of 9 hand-written class strings, and adding a new
   color is one block that automatically works across all three variants.

   Interactive states use the `tailwindcss-react-aria-components` variants
   (`hovered:`, `pressed:`, `focus-visible:`, `disabled:`). The plugin emits a
   dual selector for the native-overlapping ones — `[data-rac][data-hovered]`
   for React Aria components and `:not([data-rac]):hover` for everything else —
   so the same class string works on both <AriaButton> and a plain <a>.
   `pressed:` is React Aria-only, so ButtonLink pairs it with `active:`.

   Contrast is measured against the surface each color is intended to sit on.
--------------------------------------------------------------------------- */

export const buttonStyles = tv({
  base: [
    "relative inline-flex cursor-pointer items-center justify-center gap-2",
    "rounded-lg border font-semibold",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-200",
    // Focus ring is drawn from --btn-ring so it stays legible on both light
    // and navy surfaces (globals.css supplies the site-wide fallback ring).
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--btn-ring)] focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none",
    "[&>svg]:shrink-0",
  ],
  variants: {
    color: {
      /* Navy — the primary CTA. Inverts to light teal on hover, which is the
         established brand behaviour, so it needs a hover foreground too.
         white on ink-900 = 15.8:1 · ink-900 on accent-400 = 8.9:1 */
      navy: [
        "[--solid-bg:theme(colors.ink.900)] [--solid-bg-hover:theme(colors.accent.400)]",
        "[--solid-fg:#ffffff] [--solid-fg-hover:theme(colors.ink.900)]",
        "[--outline-bg:#ffffff] [--outline-border:theme(colors.ink.300)] [--outline-border-hover:theme(colors.primary.300)]",
        "[--outline-fg:theme(colors.ink.700)] [--outline-fg-hover:theme(colors.primary.700)]",
        "[--plain-fg:theme(colors.ink.700)] [--plain-fg-hover:theme(colors.primary.700)]",
        "[--plain-bg-hover:theme(colors.ink.100)]",
        "[--btn-ring:theme(colors.primary.400)]",
      ],
      /* Teal — secondary emphasis on light surfaces.
         white on primary-600 = 3.6:1, so solid teal is for large text only;
         primary-700 text on white = 5.4:1 for the outlined/plain variants. */
      brand: [
        "[--solid-bg:theme(colors.primary.600)] [--solid-bg-hover:theme(colors.primary.700)]",
        "[--solid-fg:#ffffff] [--solid-fg-hover:#ffffff]",
        "[--outline-bg:#ffffff] [--outline-border:theme(colors.primary.300)] [--outline-border-hover:theme(colors.primary.500)]",
        "[--outline-fg:theme(colors.primary.700)] [--outline-fg-hover:theme(colors.primary.800)]",
        "[--plain-fg:theme(colors.primary.700)] [--plain-fg-hover:theme(colors.primary.800)]",
        "[--plain-bg-hover:theme(colors.primary.50)]",
        "[--btn-ring:theme(colors.primary.500)]",
      ],
      /* On-dark — for the full-bleed navy sections. Light teal fill with navy
         text (8.9:1); the outlined form uses ink-300 border on navy (7.7:1),
         which clears WCAG 1.4.11 for non-text contrast. */
      onDark: [
        "[--solid-bg:theme(colors.accent.400)] [--solid-bg-hover:theme(colors.accent.300)]",
        "[--solid-fg:theme(colors.ink.900)] [--solid-fg-hover:theme(colors.ink.900)]",
        "[--outline-bg:transparent] [--outline-border:theme(colors.ink.300)] [--outline-border-hover:theme(colors.accent.400)]",
        "[--outline-fg:theme(colors.ink.50)] [--outline-fg-hover:theme(colors.accent.400)]",
        "[--plain-fg:theme(colors.ink.300)] [--plain-fg-hover:theme(colors.ink.50)]",
        "[--plain-bg-hover:rgb(255_255_255_/_0.08)]",
        "[--btn-ring:theme(colors.accent.400)]",
      ],
    },
    variant: {
      solid: [
        "border-transparent bg-[var(--solid-bg)] text-[var(--solid-fg)]",
        "hovered:bg-[var(--solid-bg-hover)] hovered:text-[var(--solid-fg-hover)]",
        "disabled:bg-ink-200 disabled:text-ink-500",
      ],
      outlined: [
        "border-[var(--outline-border)] bg-[var(--outline-bg)] text-[var(--outline-fg)]",
        "hovered:border-[var(--outline-border-hover)] hovered:text-[var(--outline-fg-hover)]",
      ],
      plain: [
        "border-transparent bg-transparent text-[var(--plain-fg)]",
        "hovered:bg-[var(--plain-bg-hover)] hovered:text-[var(--plain-fg-hover)]",
      ],
    },
    size: {
      sm: "px-4 py-2 text-sm [&>svg]:size-4",
      md: "px-6 py-3 text-sm [&>svg]:size-4",
      lg: "px-7 py-3.5 text-base [&>svg]:size-5",
    },
    /* Opt-in elevation. Deliberately off by default: a lift reads as wrong in
       a sticky header, and the Navbar CTA is the reason this is a flag. */
    lift: {
      true: [
        "shadow-card hovered:-translate-y-0.5 hovered:shadow-card-hover",
        "pressed:translate-y-0 active:translate-y-0",
      ],
    },
    fullWidth: {
      true: "w-full",
    },
  },
  compoundVariants: [
    // Pressed feedback only makes sense where there's a fill to darken.
    {
      variant: "solid",
      color: "navy",
      class: "pressed:bg-accent-500 active:bg-accent-500",
    },
    {
      variant: "solid",
      color: "brand",
      class: "pressed:bg-primary-800 active:bg-primary-800",
    },
    {
      variant: "solid",
      color: "onDark",
      class: "pressed:bg-accent-200 active:bg-accent-200",
    },
  ],
  defaultVariants: {
    color: "navy",
    variant: "solid",
    size: "md",
  },
});

/**
 * Action button — anything that does something rather than navigates.
 * Wraps React Aria's Button, so it gets `onPress` (pointer + keyboard + touch
 * parity) rather than a bare onClick.
 */
export function Button({
  color,
  variant,
  size,
  lift,
  fullWidth,
  className,
  ...props
}) {
  return (
    <AriaButton
      className={buttonStyles({
        color,
        variant,
        size,
        lift,
        fullWidth,
        className,
      })}
      {...props}
    />
  );
}

/**
 * Navigation button — looks identical, but renders a real <a> via next/link so
 * it keeps prefetching, middle-click, and "open in new tab". Use this instead
 * of a Button with router.push: a link that behaves like a link is the whole
 * point of the affordance.
 */
export function ButtonLink({
  color,
  variant,
  size,
  lift,
  fullWidth,
  className,
  ...props
}) {
  return (
    <Link
      className={buttonStyles({
        color,
        variant,
        size,
        lift,
        fullWidth,
        className,
      })}
      {...props}
    />
  );
}
