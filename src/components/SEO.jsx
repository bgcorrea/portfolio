import { Helmet } from "react-helmet-async";

export default function SEO({
  title,
  description,
  canonical,
  ogImage,
  jsonLd,
  keywords = "automatización, procesos empresariales, tecnología, eficiencia, digitalización",
  author = "Benjamín Correa",
  publishedTime,
  modifiedTime,
}) {
  const json = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  // Asegurar que la descripción tenga entre 150-160 caracteres
  const optimizedDescription =
    description.length > 160
      ? description.substring(0, 157) + "..."
      : description.length < 150
      ? description + " | Automatizaciones para tu negocio digital."
      : description;

  return (
    <>
      <Helmet>
        <html lang="es" />
        <title>{title}</title>
        <link rel="canonical" href={canonical} />
        <meta name="description" content={optimizedDescription} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        {/* Open Graph - Optimizado */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={optimizedDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta
          property="og:site_name"
          content="Benjamín Correa - Automatizaciones"
        />
        <meta property="og:locale" content="es_ES" />
        {ogImage && (
          <>
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={title} />
          </>
        )}
        {publishedTime && (
          <meta property="article:published_time" content={publishedTime} />
        )}
        {modifiedTime && (
          <meta property="article:modified_time" content={modifiedTime} />
        )}

        {/* Twitter - Optimizado */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@bgcorrea" />
        <meta name="twitter:creator" content="@bgcorrea" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={optimizedDescription} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}

        {/* Hreflang y alternativas */}
        <link rel="alternate" hrefLang="es" href={canonical} />
        <link rel="alternate" hrefLang="x-default" href={canonical} />

        {/* Meta adicionales para SEO */}
        <meta name="geo.region" content="CL" />
        <meta name="geo.country" content="Chile" />
        <meta name="geo.placename" content="Chile" />
        <meta name="language" content="Spanish" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
      </Helmet>

      {json.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
