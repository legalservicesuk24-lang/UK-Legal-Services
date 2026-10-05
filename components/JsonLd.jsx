/* Renders a JSON-LD structured-data block. `<` is escaped to `<` so a
   value can never break out of the <script> element (the sanitisation step
   the Next.js JSON-LD guide calls for). */
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
