import { ImageResponse } from "next/og";

/* Site-wide Open Graph / Twitter card image, generated at build time.

   Next wires the output into <meta property="og:image"> for every route (and
   the Twitter card inherits it, since no route sets `twitter.images`). A route
   segment can override this by adding its own `opengraph-image` file.

   Kept to ASCII text and explicit `display: flex` on every multi-child node —
   the Satori renderer behind `next/og` requires both (non-ASCII glyphs trigger
   a network font fetch that fails during an offline build). */

export const alt =
  "Bench Strength — operations, compliance, and case-administration support for UK firms";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK_950 = "#081826";
const INK_900 = "#0B1F33";
const ACCENT = "#42C6C8";
const MUTED = "#98A2B3";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: `linear-gradient(135deg, ${INK_950} 0%, ${INK_900} 100%)`,
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: ACCENT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: INK_900,
              fontSize: "26px",
              fontWeight: 700,
            }}
          >
            BS
          </div>
          <div
            style={{ fontSize: "30px", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            Bench Strength
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "76px",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            <div style={{ display: "flex" }}>Minimize Costs.</div>
            <div style={{ display: "flex", gap: "0.28em" }}>
              <span>Maximize</span>
              <span style={{ color: ACCENT }}>Reserves.</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "30px",
              color: MUTED,
              lineHeight: 1.35,
              maxWidth: "900px",
            }}
          >
            Operations, compliance, and case-administration support for UK
            insolvency, legal, and advisory firms.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "24px",
            color: ACCENT,
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          benchstrength.uk
        </div>
      </div>
    ),
    { ...size },
  );
}
