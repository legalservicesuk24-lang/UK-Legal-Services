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
           StyleHive brand system
           Primary brand   — Dark        #1E1815  (ink-900)
           Primary accent  — Clay        #9C482B  (primary-600)
           Secondary accent— Ochre       #C8823B  (accent-400)
           Light text/surf — Cream       #FAF6F0  (ink-50)

           Ramps below are generated from those four anchors (clay at
           primary-600, ochre at accent-400, cream at ink-50, dark at
           ink-900) by interpolating lightness while holding each anchor's
           hue/saturation — same shape as the previous palette, so every
           semantic alias and component keeps working unchanged.
        --------------------------------------------------------------- */

        // Clay — icons, accents, borders, links, focus rings
        primary: {
          50: "#FAF6F5",
          100: "#F2EBE8",
          200: "#E8D1CA",
          300: "#D9B3A6",
          400: "#D78A6F",
          500: "#CC6947",
          600: "#9C482B", // core clay
          700: "#7C3922",
          800: "#602C1A",
          900: "#482114",
          950: "#2E140B",
        },

        // Ochre call-to-action ramp (buttons on dark surfaces, hovers)
        accent: {
          50: "#F9F7F4",
          100: "#F2EDE7",
          200: "#E7D8C9",
          300: "#E3BF9B",
          400: "#C8823B", // core ochre
          500: "#A2682E",
          600: "#835425",
          700: "#67421D",
        },

        // Sand — the pale circle in the logo lockup. Card surface on the
        // dark globe homepage. ink-900 on sand-300 = 13.1:1.
        sand: {
          100: "#F8EDD3",
          200: "#F4E5C1",
          300: "#F0DCAC", // logo circle
          400: "#E3C98E",
          500: "#CFB06E",
        },

        // Success / "audit-ready" signifiers — kept on-palette (ochre)
        confirm: {
          50: "#F9F7F4",
          100: "#F2EDE7",
          400: "#C8823B",
          500: "#A2682E",
          600: "#835425",
          700: "#67421D",
        },

        // Neutral "ink" ramp — dark → warm brown → cream
        ink: {
          50: "#FAF6F0", // cream — page & section background
          100: "#F3EADD", // faint surface / hairline divider
          200: "#E6D3BD", // subtle border
          300: "#D3B697", // input border / light text on dark
          400: "#BA936E", // metadata / muted
          500: "#8B674B", // muted labels & metadata
          600: "#6E5240", // descriptions & supporting copy
          700: "#523F33", // body copy on light surfaces
          800: "#372B24", // default body text & emphasis
          900: "#1E1815", // dark — headings, navbar, footer, dark sections
          950: "#120E0D", // deepest dark
        },
      },

      /* ---------------------------------------------------------------
         SEMANTIC ALIASES
         Components should reach for these, not raw ramp steps, so a
         palette change is a one-line edit here instead of a grep across
         every file. Ramp steps stay available for one-off cases.
         Contrast figures are measured against `surface` (#FAF6F0).
      --------------------------------------------------------------- */
      textColor: {
        heading: "#1E1815", // ink-900  — 16.30:1
        body: "#372B24", // ink-800  — 12.72:1
        muted: "#523F33", // ink-700  —  9.21:1
        subtle: "#6E5240", // ink-600  —  6.63:1
        faint: "#8B674B", // ink-500  —  4.71:1  (AA floor; don't go lighter)
        /* primary-700, not the core primary-600. primary-600 on `surface`
           measures 5.78:1, which clears AA for body/UI text, but primary-700
           (7.91:1) keeps more margin and matches the deeper "clay" the brand
           mark uses for its wordmark stroke. On dark surfaces use
           `text-accent-400` (6.13:1 on ink-950) instead; this token is a
           light-surface colour. */
        brand: "#7C3922", // primary-700 — 7.91:1
        "on-dark": "#FAF6F0", // ink-50 on dark — 16.30:1
      },
      backgroundColor: {
        surface: "#FAF6F0", // ink-50  — page ground
        raised: "#FFFFFF", // card / panel
        sunken: "#F3EADD", // ink-100 — inset wells
        inverse: "#1E1815", // ink-900 — full-bleed dark sections
      },
      borderColor: {
        hairline: "#F3EADD", // ink-100 — dividers inside a card
        subtle: "#E6D3BD", // ink-200 — card edges
        // Interactive field border. Needs 3:1 against `surface` per WCAG
        // 1.4.11; ink-500 clears it at 4.71:1.
        field: "#8B674B", // ink-500
      },
      fontFamily: {
        /* All three point at the same variable family. `display` and `body`
           are kept as distinct names so component intent stays readable and a
           future second family is a one-line change here rather than a grep. */
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tightish: "-0.015em",
      },

      /* ---------------------------------------------------------------
         DISPLAY SCALE
         Fluid clamps so the big type scales with the viewport instead of
         stepping at breakpoints. Tracking tightens as size grows, which is
         what keeps large headings from reading loose and amateurish.
         These emit font-size + line-height + letter-spacing together, and
         sit in the utilities layer, so they override the h1-h4 defaults in
         globals.css without needing !important.
      --------------------------------------------------------------- */
      fontSize: {
        "display-2xl": [
          "clamp(3rem, 6.4vw, 6rem)", // 48px -> 96px
          { lineHeight: "1.02", letterSpacing: "-0.032em" },
        ],
        "display-xl": [
          "clamp(2.25rem, 4.4vw, 3.75rem)", // 36px -> 60px
          { lineHeight: "1.07", letterSpacing: "-0.026em" },
        ],
        "display-lg": [
          "clamp(1.875rem, 3.2vw, 2.625rem)", // 30px -> 42px
          { lineHeight: "1.13", letterSpacing: "-0.022em" },
        ],
        // The oversized proof numbers in the navy band.
        stat: [
          "clamp(3rem, 7.5vw, 5.5rem)", // 48px -> 88px
          { lineHeight: "0.94", letterSpacing: "-0.04em" },
        ],
      },
      maxWidth: {
        "8xl": "90rem",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(30 24 21 / 0.04), 0 1px 3px 0 rgb(30 24 21 / 0.06)",
        "card-hover":
          "0 8px 24px -4px rgb(30 24 21 / 0.12), 0 3px 8px -3px rgb(30 24 21 / 0.07)",
      },
    },
  },
  plugins: [require("tailwindcss-react-aria-components")],
};
