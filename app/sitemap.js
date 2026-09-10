import { SITE_URL } from "../lib/site";
import { SERVICES } from "./services/servicesData";

/* Generates /sitemap.xml. Static routes plus one entry per service register.
   /type is intentionally omitted (noindex + disallowed in robots.txt). */
export default function sitemap() {
  const lastModified = new Date();

  const staticRoutes = [
    { path: "", changeFrequency: "monthly", priority: 1 },
    { path: "/services", changeFrequency: "monthly", priority: 0.9 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  ];

  const serviceRoutes = SERVICES.map((service) => ({
    path: `/services/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes].map(
    ({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    }),
  );
}
