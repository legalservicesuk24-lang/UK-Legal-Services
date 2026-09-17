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
      backgroundImage: {
        "ledger-lines":
          "repeating-linear-gradient(to bottom, transparent, transparent 27px, rgb(230 211 189 / 0.6) 27px, rgb(230 211 189 / 0.6) 28px)",
      },
      keyframes: {
        /* Masked word reveal for display headlines — each word rides up from
           behind a clipping parent, so it reads as type being set rather than
           text fading in. */
        "rise-in": {
          from: { transform: "translate3d(0, 110%, 0) rotate(2deg)" },
          to: { transform: "translate3d(0, 0, 0) rotate(0deg)" },
        },
        /* Register ticker. Translates exactly -50% across a duplicated track,
           so the loop point is seamless. */
        marquee: {
          from: { transform: "translate3d(0, 0, 0)" },
          to: { transform: "translate3d(-50%, 0, 0)" },
        },
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
        /* Case-file stack entrance (StackFallback). Each sheet carries its own
           resting transform as CSS custom properties (--to-x/--to-y/--to-rot,
           set inline per sheet); this keyframe only defines the shared "from"
           pose relative to that, scattered wider and rotated further so the
           sheets read as arriving rather than fading in place. Pure CSS so it
           plays the instant the fallback paints — no bundle to wait for. */
        "sheet-settle": {
          from: {
            opacity: "0",
            transform:
              "translate3d(calc(var(--to-x) * 5), calc(var(--to-y) * 5 - 26px), 0) rotate(calc(var(--to-rot) * 4 - 5deg))",
          },
          to: {
            opacity: "1",
            transform:
              "translate3d(var(--to-x), var(--to-y), 0) rotate(var(--to-rot))",
          },
        },
      },
      animation: {
        "rise-in": "rise-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
        marquee: "marquee 38s linear infinite",
        "drift-a": "drift-a 24s ease-in-out infinite alternate",
        "drift-b": "drift-b 30s ease-in-out infinite alternate",
        "drift-c": "drift-c 38s ease-in-out infinite alternate",
        "sheet-settle": "sheet-settle 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [require("tailwindcss-react-aria-components")],
};
