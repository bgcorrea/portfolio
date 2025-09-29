import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import ScrollAnimatedSection from "../../components/ScrollAnimatedSection";

const ArticuloErroresComunes = () => {
  // SEO y JSON-LD
  const canonical =
    "https://www.benjamincorrea.com/blog/errores-comunes-automatizaciones";
  const title =
    "Errores Comunes al Implementar Automatizaciones | Blog - Benjamín Correa";
  const description =
    "Los 5 errores que más veo cuando las empresas intentan automatizar por su cuenta. Aprende de ellos para no repetirlos.";
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: description,
      url: canonical,
      datePublished: "2024-09-07",
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
    title: "Errores Comunes al Implementar Automatizaciones",
    date: "2024-09-07",
    readTime: "6 min",
    tags: ["Errores", "Implementación", "Mejores Prácticas"],
    content: `En mis 3 años automatizando procesos, he visto los mismos errores una y otra vez. Empresas que invierten tiempo y dinero en automatizaciones que terminan siendo más problemáticas que útiles.

Hoy te comparto los 5 errores más comunes y cómo evitarlos:

## 1. Automatizar Todo de Una Vez

**El error:** "Vamos a automatizar todos nuestros procesos este mes"

**Por qué falla:** Cada proceso tiene sus particularidades. Intentar automatizar todo junto genera caos.

**La solución:** Prioriza. Elige UN proceso que te cause más dolor y automatízalo completamente antes de pasar al siguiente.

**Mi regla:** 1 proceso por mes máximo.

## 2. No Documentar el Proceso Actual

**El error:** "Ya sabemos cómo funciona, no necesitamos documentarlo"

**Por qué falla:** Los procesos "obvios" tienen detalles que solo conoce quien los ejecuta diariamente.

**La solución:** Mapea el proceso paso a paso ANTES de automatizar. Incluye:
- Quién hace qué
- Cuándo se hace
- Qué información se necesita
- Qué puede salir mal

**Resultado:** Automatizaciones 3x más efectivas.

## 3. No Considerar las Excepciones

**El error:** "El 90% de los casos son iguales, automatizamos esos"

**Por qué falla:** El 10% de excepciones puede romper toda la automatización.

**La solución:** Identifica las excepciones ANTES de automatizar. Decide:
- ¿Se manejan automáticamente?
- ¿Se envían a revisión manual?
- ¿Se pausan hasta resolución?

## 4. No Medir el Impacto

**El error:** "Automatizamos y ya está"

**Por qué falla:** Sin métricas, no sabes si realmente estás ahorrando tiempo o dinero.

**La solución:** Establece métricas ANTES de automatizar:
- Tiempo ahorrado por proceso
- Errores reducidos
- Satisfacción del equipo
- ROI de la inversión

## 5. No Capacitar al Equipo

**El error:** "La automatización es intuitiva, no necesitan capacitación"

**Por qué falla:** El equipo no sabe qué hacer cuando algo sale mal.

**La solución:** Invierte en capacitación:
- Cómo funciona la automatización
- Qué hacer cuando falla
- Cómo hacer ajustes menores
- A quién contactar para problemas

## Mi Proceso Probado

### Fase 1: Mapeo (1 semana)
- Documenta el proceso actual
- Identifica excepciones
- Define métricas de éxito

### Fase 2: Diseño (1 semana)
- Diseña la automatización
- Planifica manejo de excepciones
- Prepara capacitación

### Fase 3: Implementación (1-2 semanas)
- Desarrolla la automatización
- Prueba exhaustivamente
- Capacita al equipo

### Fase 4: Optimización (1 semana)
- Mide resultados
- Ajusta según feedback
- Documenta lecciones aprendidas

## El Error Más Costoso

El error más caro que he visto: automatizar un proceso que debería eliminarse.

**Pregúntate:** ¿Este proceso realmente agrega valor? A veces la mejor automatización es eliminar el proceso por completo.

## Mi Consejo Final

Empieza pequeño, mide todo, y no tengas miedo de deshacer una automatización si no funciona. Es mejor tener 3 automatizaciones perfectas que 10 que causan problemas.

¿Has cometido alguno de estos errores? Te ayudo a corregirlos y crear automatizaciones que realmente funcionen.`,
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

export default ArticuloErroresComunes;
