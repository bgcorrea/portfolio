import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import ScrollAnimatedSection from "../../components/ScrollAnimatedSection";

const ArticuloElegirHerramienta = () => {
  // SEO y JSON-LD
  const canonical =
    "https://www.benjamincorrea.com/blog/elegir-herramienta-automatizacion";
  const title =
    "Cómo Elegir la Herramienta de Automatización Correcta | Blog - Benjamín Correa";
  const description =
    "n8n, Make, Zapier... ¿Cuál elegir? Te explico las diferencias y cuándo usar cada una según tu caso específico.";
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: description,
      url: canonical,
      datePublished: "2024-09-14",
      author: {
        "@type": "Person",
        name: "Benjamín Correa",
        url: "https://www.benjamincorrea.com/",
      },
      publisher: {
        "@type": "Person",
        name: "Benjamín Correa",
      },
    },
  ];

  const article = {
    title: "Cómo Elegir la Herramienta de Automatización Correcta",
    date: "2024-09-14",
    readTime: "7 min",
    tags: ["Herramientas", "n8n", "Make", "Zapier"],
    content: `Después de implementar más de 50 automatizaciones diferentes, he aprendido que no existe una herramienta perfecta para todo. La clave está en elegir la correcta para cada caso.

## Las 3 Herramientas que Más Uso

### 1. n8n (Mi Favorita)

**Cuándo usarla:**
- Procesos complejos con múltiples pasos
- Necesitas lógica condicional avanzada
- Quieres control total sobre tus datos
- Presupuesto limitado (es open source)

**Ventajas:**
- Gratuita y self-hosted
- Extremadamente flexible
- Excelente para integraciones personalizadas
- Comunidad activa

**Desventajas:**
- Curva de aprendizaje más alta
- Requiere servidor propio

### 2. Make (ex-Integromat)

**Cuándo usarla:**
- Procesos de mediana complejidad
- Necesitas conectores específicos
- Quieres algo más visual que n8n
- Presupuesto medio

**Ventajas:**
- Interfaz muy intuitiva
- Excelentes conectores
- Buena para procesos de marketing
- Plan gratuito generoso

**Desventajas:**
- Más cara que n8n
- Menos flexible para casos complejos

### 3. Zapier

**Cuándo usarla:**
- Procesos simples y directos
- Necesitas conectores muy específicos
- Quieres la opción más fácil
- Presupuesto alto

**Ventajas:**
- La más fácil de usar
- Mayor cantidad de conectores
- Muy estable y confiable
- Excelente soporte

**Desventajas:**
- La más cara
- Limitada para procesos complejos
- Menos control sobre los datos

## Mi Framework de Decisión

### Paso 1: Evalúa la Complejidad
- **Simple:** 1-3 pasos → Zapier
- **Media:** 4-8 pasos → Make
- **Compleja:** 8+ pasos → n8n

### Paso 2: Considera el Presupuesto
- **$0-50/mes:** n8n
- **$50-200/mes:** Make
- **$200+/mes:** Zapier

### Paso 3: Analiza los Conectores
¿Necesitas conectores muy específicos? Zapier probablemente los tenga.

¿Quieres máxima flexibilidad? n8n es tu opción.

## Mi Recomendación Personal

**Para empezar:** Make. Es el punto dulce entre facilidad y flexibilidad.

**Para crecer:** n8n. Una vez que domines Make, n8n te dará superpoderes.

**Para casos específicos:** Zapier. Cuando necesites conectores que no existen en las otras.

## Un Consejo Importante

No te cases con una herramienta. En mis proyectos más exitosos, uso las 3 según lo que necesite cada proceso.

¿Qué herramienta estás considerando? Te ayudo a elegir la correcta para tu caso específico.`,
  };

  // Variantes de animación
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <main className="min-h-screen bg-white">
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        ogImage="https://www.benjamincorrea.com/og-blog.jpg"
        jsonLd={jsonLd}
      />

      {/* Hero del Artículo */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
        <ScrollAnimatedSection className="max-w-4xl mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Breadcrumb */}
            <motion.div className="mb-6" variants={staggerItem}>
              <Link
                to="/blog"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                ← Volver al Blog
              </Link>
            </motion.div>

            {/* Meta del artículo */}
            <motion.div
              className="flex items-center gap-4 text-sm text-slate-600 mb-6"
              variants={staggerItem}
            >
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>•</span>
              <span>{article.readTime} de lectura</span>
            </motion.div>

            {/* Título */}
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
              variants={staggerItem}
            >
              {article.title}
            </motion.h1>

            {/* Tags */}
            <motion.div className="flex flex-wrap gap-2" variants={staggerItem}>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </ScrollAnimatedSection>
      </section>

      {/* Contenido del Artículo */}
      <section className="py-16">
        <ScrollAnimatedSection className="max-w-4xl mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.article
              className="prose prose-slate max-w-none"
              variants={staggerItem}
            >
              {article.content.split("\n\n").map((paragraph, pIndex) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2
                      key={pIndex}
                      className="text-3xl font-bold text-slate-900 mt-12 mb-6"
                    >
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                } else if (paragraph.startsWith("### ")) {
                  return (
                    <h3
                      key={pIndex}
                      className="text-2xl font-semibold text-slate-800 mt-10 mb-4"
                    >
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                } else if (
                  paragraph.startsWith("**") &&
                  (paragraph.endsWith(":**") || paragraph.endsWith(":"))
                ) {
                  return (
                    <h4
                      key={pIndex}
                      className="text-xl font-semibold text-slate-800 mt-8 mb-4"
                    >
                      {paragraph.replace(/\*\*/g, "")}
                    </h4>
                  );
                } else if (paragraph.startsWith("- ")) {
                  const items = paragraph
                    .split("\n")
                    .filter((line) => line.startsWith("- "))
                    .map((line) => line.replace("- ", ""));
                  return (
                    <ul
                      key={pIndex}
                      className="list-disc list-inside mb-6 space-y-3"
                    >
                      {items.map((item, itemIndex) => {
                        // Convertir asteriscos a negrita en los items de la lista
                        const formattedItem = item.replace(
                          /\*\*(.*?)\*\*/g,
                          "<strong>$1</strong>"
                        );
                        return (
                          <li
                            key={itemIndex}
                            className="text-slate-700 text-lg"
                            dangerouslySetInnerHTML={{ __html: formattedItem }}
                          />
                        );
                      })}
                    </ul>
                  );
                } else if (paragraph.trim()) {
                  // Convertir asteriscos a negrita
                  const formattedParagraph = paragraph.replace(
                    /\*\*(.*?)\*\*/g,
                    "<strong>$1</strong>"
                  );
                  return (
                    <p
                      key={pIndex}
                      className="text-slate-700 mb-6 leading-relaxed text-lg"
                      dangerouslySetInnerHTML={{ __html: formattedParagraph }}
                    />
                  );
                }
                return null;
              })}
            </motion.article>
          </motion.div>
        </ScrollAnimatedSection>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-50">
        <ScrollAnimatedSection className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-3xl font-bold text-slate-900 mb-4"
              variants={staggerItem}
            >
              ¿Listo para Automatizar tu Negocio?
            </motion.h2>
            <motion.p
              className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto"
              variants={staggerItem}
            >
              Aplica estos consejos en tu empresa. Te ayudo a implementar
              automatizaciones que realmente funcionen.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={staggerItem}
            >
              <a
                href="/automatizaciones#diagnostico-gratuito"
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700 transition-colors"
              >
                Agendar diagnóstico gratuito
              </a>
              <a
                href="/#contacto"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 font-medium hover:bg-slate-50 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contacto")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                Contáctame
              </a>
            </motion.div>
          </motion.div>
        </ScrollAnimatedSection>
      </section>
    </main>
  );
};

export default ArticuloElegirHerramienta;
