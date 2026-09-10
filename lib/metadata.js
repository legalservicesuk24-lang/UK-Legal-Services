import { SITE_NAME } from "./site";

/* Builds a complete Metadata object for a route.

   Next.js merges `metadata` shallowly: a page that sets its own `openGraph` or
   `alternates` REPLACES the parent's entirely rather than merging keys. So each
   page has to restate the full block — this helper keeps `canonical`,
   `openGraph` (type/url/siteName/locale/…) and the Twitter card consistent
   across every route from one place.

   `path` is the route's own path with a leading slash ("/about"), or "" for the
   homepage. It is resolved to an absolute URL against `metadataBase` (set in
   the root layout). */
export function pageMetadata({ title, description, path = "" }) {
  const canonical = path || "/";
  /* `title` is the bare page name (e.g. "About"); the root layout's
     `title.template` turns the <title> into "About | Bench Strength". OG/Twitter
     titles have no template, so spell the full form out for them. */
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_GB",
      title: fullTitle,
      description,
      /* Restated because a page-level `openGraph` replaces the parent's whole
         block — including the `images` entry the root `app/opengraph-image.js`
         file convention injects. Points at that same generated route. */
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}
