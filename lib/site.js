/* Canonical origin for the deployed site, used by metadata, the sitemap, and
   robots.txt to build absolute URLs.

   Override per-environment with NEXT_PUBLIC_SITE_URL (no trailing slash) — e.g.
   a preview deployment. The default is the production domain so a plain
   `next build` still emits correct absolute URLs without any env wiring. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://benchstrength.uk"
).replace(/\/$/, "");

export const SITE_NAME = "Bench Strength";
