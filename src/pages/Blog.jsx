import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import ScrollAnimatedSection from "../components/ScrollAnimatedSection";

const Blog = () => {
  // SEO y JSON-LD
  const canonical = "https://www.benjamincorrea.com/blog";
  const title = "Blog | Benjamín Correa - Automatizaciones";
  const description =
    "Artículos sobre automatización de procesos empresariales, herramientas low-code y mejores prácticas para optimizar tu negocio.";
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Blog de Benjamín Correa",
      description: description,
      url: canonical,
      author: {
        "@type": "Person",
        name: "Benjamín Correa",
        url: "https://www.benjamincorrea.com/",
      },
    },
  ];

  // Artículos del blog
  const articles = [
    {
      id: 1,
      title: "5 Procesos que Deberías Automatizar Primero",
      excerpt:
        "Descubre cuáles son los procesos más impactantes para automatizar en tu negocio y por dónde empezar sin complicaciones.",
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
      date: "2024-09-21",
      readTime: "5 min",
      tags: ["Automatización", "Procesos", "Productividad"],
      slug: "5-procesos-automatizar-primero",
      route: "/blog/5-procesos-automatizar-primero",
    },
    {
      id: 2,
      title: "Cómo Elegir la Herramienta de Automatización Correcta",
      excerpt:
        "n8n, Make, Zapier... ¿Cuál elegir? Te explico las diferencias y cuándo usar cada una según tu caso específico.",
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
      date: "2024-09-14",
      readTime: "7 min",
      tags: ["Herramientas", "n8n", "Make", "Zapier"],
      slug: "elegir-herramienta-automatizacion",
      route: "/blog/elegir-herramienta-automatizacion",
    },
    {
      id: 3,
      title: "Errores Comunes al Implementar Automatizaciones",
      excerpt:
        "Los 5 errores que más veo cuando las empresas intentan automatizar por su cuenta. Aprende de ellos para no repetirlos.",
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
      date: "2024-09-07",
      readTime: "6 min",
      tags: ["Errores", "Implementación", "Mejores Prácticas"],
      slug: "errores-comunes-automatizaciones",
      route: "/blog/errores-comunes-automatizaciones",
    },
  ];

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

      {/* Estilos para line-clamp */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
        <ScrollAnimatedSection className="max-w-4xl mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
              variants={staggerItem}
            >
              Blog sobre Automatizaciones
            </motion.h1>
            <motion.p
              className="text-xl text-slate-700 max-w-3xl"
              variants={staggerItem}
            >
              Artículos prácticos sobre automatización de procesos
              empresariales, herramientas low-code y mejores prácticas para
              optimizar tu negocio.
            </motion.p>
          </motion.div>
        </ScrollAnimatedSection>
      </section>

      {/* Artículos */}
      <section className="py-16">
        <ScrollAnimatedSection className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                className="group rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                variants={staggerItem}
              >
                {/* Header de la card */}
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {article.title}
                  </h2>

                  <p className="text-slate-700 text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                {/* Tags */}
                <div className="px-6 pb-4">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer con CTA */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                  <Link
                    to={article.route}
                    className="w-full text-left text-indigo-600 font-medium text-sm hover:text-indigo-700 transition-colors group-hover:underline block"
                  >
                    Leer artículo completo →
                  </Link>
                </div>
              </motion.article>
            ))}
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

export default Blog;
