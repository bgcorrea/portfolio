import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import ScrollAnimatedSection from "../../components/ScrollAnimatedSection";

const Articulo5Procesos = () => {
  // SEO y JSON-LD
  const canonical =
    "https://www.benjamincorrea.com/blog/5-procesos-automatizar-primero";
  const title =
    "5 Procesos que Deberías Automatizar Primero | Blog - Benjamín Correa";
  const description =
    "Descubre cuáles son los procesos más impactantes para automatizar en tu negocio y por dónde empezar sin complicaciones.";
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: description,
      url: canonical,
      datePublished: "2024-09-21",
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
    title: "5 Procesos que Deberías Automatizar Primero",
    date: "2024-09-21",
    readTime: "5 min",
    tags: ["Automatización", "Procesos", "Productividad"],
    content: `Cuando empecé a automatizar procesos hace más de 3 años, cometí el error de intentar automatizar todo de una vez. El resultado: frustración y proyectos que nunca terminaban.

Después de trabajar con decenas de empresas, he identificado los 5 procesos que siempre deberían ser tu prioridad:

## 1. Gestión de Leads y Prospectos

**¿Por qué empezar aquí?** Porque es donde más tiempo se pierde manualmente.

**Lo que automatizo:**
- Captura automática de formularios web
- Enriquecimiento de datos con APIs
- Clasificación por score de calidad
- Distribución automática al comercial correcto

**Resultado típico:** 4 horas diarias ahorradas y 30% más conversiones.

## 2. Recordatorios y Seguimientos

**El problema:** Los comerciales olvidan hacer seguimiento a sus leads.

**La solución:** Flujos automáticos que envían recordatorios basados en el comportamiento del lead.

**Ejemplo real:** Un cliente pasó de 15% a 45% de tasa de seguimiento en 2 semanas.

## 3. Reportes y Dashboards

**Antes:** 2 horas diarias creando reportes manuales.
**Después:** Dashboards que se actualizan solos cada hora.

**Lo que incluyo:**
- KPIs de ventas en tiempo real
- Alertas automáticas cuando algo va mal
- Reportes ejecutivos que se envían solos

## 4. Facturación y Cobranza

**El dolor:** Conciliar pagos, enviar recordatorios, gestionar vencimientos.

**La automatización:**
- Conciliación automática con bancos
- Recordatorios de pago personalizados
- Alertas de riesgo de mora
- Generación automática de facturas

## 5. Soporte al Cliente

**El objetivo:** Respuestas más rápidas y consistentes.

**Lo que automatizo:**
- Clasificación automática de tickets
- Respuestas automáticas para consultas frecuentes
- Escalamiento inteligente según urgencia
- Métricas de satisfacción en tiempo real

## Mi Recomendación

Empieza con **uno solo** de estos procesos. El que más dolor te cause actualmente. Una vez que veas los resultados, el resto será más fácil.

¿Cuál de estos procesos te está quitando más tiempo? Te ayudo a automatizarlo en menos de 30 días.`,
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
                } else if (
                  paragraph.startsWith("**") &&
                  (paragraph.endsWith(":**") || paragraph.endsWith(":"))
                ) {
                  return (
                    <h3
                      key={pIndex}
                      className="text-xl font-semibold text-slate-800 mt-8 mb-4"
                    >
                      {paragraph.replace(/\*\*/g, "")}
                    </h3>
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

export default Articulo5Procesos;
