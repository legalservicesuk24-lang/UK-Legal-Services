/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ---------------------------------------------------------------
           Bench Strength design system
           Primary brand   — Deep Navy      #0B1F33  (ink-900)
           Secondary brand — Professional Teal #159A9C (primary-600)
           Accent / CTA    — Light Teal     #42C6C8  (primary-400 / accent-400)
           Page background — Soft White     #F7F9FA  (ink-50)
           Main text       — Charcoal       #172B3A  (ink-800)
           Secondary text  — Slate Grey     #667085  (ink-500)

           ink-500 → ink-800 steps in even ~10-point L* increments so the
           four text weights (metadata / supporting / body / emphasis) are
           actually distinguishable; every one clears WCAG AA on ink-50.
        --------------------------------------------------------------- */

        // Professional teal — icons, accents, borders, links, focus rings
        primary: {
          50: "#EAF6F6",
          100: "#CFEAEA",
          200: "#B4E2E3",
          300: "#7FD4D5",
          400: "#42C6C8", // light teal
          500: "#22ABAD",
          600: "#159A9C", // core teal
          700: "#0F7C7E",
          800: "#0C6163",
          900: "#0A4B4D",
          950: "#052F30",
        },

        // Light-teal call-to-action ramp (buttons on dark surfaces, hovers)
        accent: {
          50: "#ECFAFA",
          100: "#D3F2F3",
          200: "#AEE7E8",
          300: "#7FDDDE",
          400: "#42C6C8",
          500: "#2BB4B6",
          600: "#1E9C9E",
          700: "#177C7E",
        },

        // Success / "audit-ready" signifiers — kept on-palette (teal)
        confirm: {
          50: "#EAF6F6",
          100: "#CFEAEA",
          400: "#42C6C8",
          500: "#159A9C",
          600: "#0F7C7E",
          700: "#0C6163",
        },

        // Neutral "ink" ramp — navy → charcoal → slate → soft white
        ink: {
          50: "#F7F9FA", // soft white — page & section background
          100: "#EDF1F3", // faint surface / hairline divider
          200: "#E1E7EA", // subtle border
          300: "#CBD3D9", // input border / light text on navy
          400: "#98A2B3", // metadata / muted
          500: "#667085", // slate grey — muted labels & metadata
          600: "#4B586B", // descriptions & supporting copy
          700: "#314152", // body copy on light surfaces
          800: "#172B3A", // charcoal — default body text & emphasis
          900: "#0B1F33", // deep navy — headings, navbar, footer, dark sections
          950: "#081826", // deepest navy
        },
      },

      /* ---------------------------------------------------------------
         SEMANTIC ALIASES
         Components should reach for these, not raw ramp steps, so a
         palette change is a one-line edit here instead of a grep across
         every file. Ramp steps stay available for one-off cases.
         Contrast figures are measured against `surface` (#F7F9FA).
      --------------------------------------------------------------- */
      textColor: {
        heading: "#0B1F33", // ink-900  — 15.81:1
        body: "#172B3A", // ink-800  — 13.78:1
        muted: "#314152", // ink-700  —  9.90:1
        subtle: "#4B586B", // ink-600  —  6.84:1
        faint: "#667085", // ink-500  —  4.71:1  (AA floor; don't go lighter)
        brand: "#159A9C", // primary-600
        "on-dark": "#F7F9FA", // ink-50 on navy — 15.81:1
      },
      backgroundColor: {
        surface: "#F7F9FA", // ink-50  — page ground
        raised: "#FFFFFF", // card / panel
        sunken: "#EDF1F3", // ink-100 — inset wells
        inverse: "#0B1F33", // ink-900 — full-bleed dark sections
      },
      borderColor: {
        hairline: "#EDF1F3", // ink-100 — dividers inside a card
        subtle: "#E1E7EA", // ink-200 — card edges
        // Interactive field border. #CBD3D9 is 1.43:1 on surface and fails
        // WCAG 1.4.11 (needs 3:1); ink-500 clears it at 4.71:1.
        field: "#667085", // ink-500
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        body: [
          "var(--font-body)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tightish: "-0.015em",
      },
      maxWidth: {
        "8xl": "90rem",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(11 31 51 / 0.04), 0 1px 3px 0 rgb(11 31 51 / 0.06)",
        "card-hover":
          "0 8px 24px -4px rgb(11 31 51 / 0.12), 0 3px 8px -3px rgb(11 31 51 / 0.07)",
      },
      backgroundImage: {
        "ledger-lines":
          "repeating-linear-gradient(to bottom, transparent, transparent 27px, rgb(225 231 234 / 0.6) 27px, rgb(225 231 234 / 0.6) 28px)",
      },
      keyframes: {
        /* Slow, organic drift for the hero's soft teal "aurora" shapes.
           Transform + opacity only, so it stays on the GPU compositor. */
        "drift-a": {
          "0%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(7%, -5%, 0) scale(1.18)" },
          "100%": { transform: "translate3d(-5%, 4%, 0) scale(0.92)" },
        },
        "drift-b": {
          "0%": { transform: "translate3d(0, 0, 0) scale(1.05)" },
          "50%": { transform: "translate3d(-8%, 6%, 0) scale(0.9)" },
          "100%": { transform: "translate3d(6%, -4%, 0) scale(1.12)" },
        },
        "drift-c": {
          "0%": { transform: "translate3d(0, 0, 0) scale(0.95)" },
          "50%": { transform: "translate3d(5%, 7%, 0) scale(1.1)" },
          "100%": { transform: "translate3d(-6%, -5%, 0) scale(1)" },
        },
      },
      animation: {
        "drift-a": "drift-a 24s ease-in-out infinite alternate",
        "drift-b": "drift-b 30s ease-in-out infinite alternate",
        "drift-c": "drift-c 38s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-react-aria-components")],
};
