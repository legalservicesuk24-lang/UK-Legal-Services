import { SITE_URL } from "../lib/site";

/* Generates /robots.txt. Everything is crawlable except /type, which is the
   throwaway typeface-comparison route (also noindex in its own metadata). */
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/type"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
