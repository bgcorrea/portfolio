import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import Cal, { getCalApi } from "@calcom/embed-react";

// Hook para configurar Cal.com
function useCalEmbed() {
  useEffect(() => {
    // Suprimir warnings específicos de Cal.com
    const originalWarn = console.warn;
    const originalLog = console.log;

    console.warn = function (...args) {
      const message = args.join(" ");
      // Filtrar warnings específicos de Cal.com
      if (
        message.includes("markdownToSafeHTML") ||
        message.includes("createWithEqualityFn") ||
        message.includes("react-i18next") ||
        message.includes("QuickAvailabilityCheck")
      ) {
        return; // No mostrar estos warnings
      }
      originalWarn.apply(console, args);
    };

    console.log = function (...args) {
      const message = args.join(" ");
      // Filtrar logs específicos de Cal.com
      if (message.includes("QuickAvailabilityCheck feature enabled")) {
        return; // No mostrar estos logs
      }
      originalLog.apply(console, args);
    };

    (async function () {
      const cal = await getCalApi({ namespace: "diagnostico-45min" });
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();

    // Restaurar console cuando el componente se desmonte
    return () => {
      console.warn = originalWarn;
      console.log = originalLog;
    };
  }, []);
}

const Automatizaciones = () => {
  useCalEmbed();

  // Variantes de animación
  // const fadeUpVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: { duration: 0.6, ease: "easeOut" },
  //   },
  // };

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

  // const slideInLeft = {
  //   hidden: { opacity: 0, x: -50 },
  //   visible: {
  //     opacity: 1,
  //     x: 0,
  //     transition: { duration: 0.6, ease: "easeOut" },
  //   },
  // };

  // const slideInRight = {
  //   hidden: { opacity: 0, x: 50 },
  //   visible: {
  //     opacity: 1,
  //     x: 0,
  //     transition: { duration: 0.6, ease: "easeOut" },
  //   },
  // };

  // const scaleIn = {
  //   hidden: { opacity: 0, scale: 0.9 },
  //   visible: {
  //     opacity: 1,
  //     scale: 1,
  //     transition: { duration: 0.5, ease: "easeOut" },
  //   },
  // };

  // SEO y meta tags
  useEffect(() => {
    document.title =
      "Automatizaciones para escalar tu negocio | Benjamín Correa";

    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Automatiza procesos repetitivos en menos de 30 días y escala sin contratar más personal. Implementación low-code + full stack con soporte y garantía total."
      );
    } else {
      const newMetaDescription = document.createElement("meta");
      newMetaDescription.name = "description";
      newMetaDescription.content =
        "Automatiza procesos repetitivos en menos de 30 días y escala sin contratar más personal. Implementación low-code + full stack con soporte y garantía total.";
      document.head.appendChild(newMetaDescription);
    }

    // Canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute(
        "href",
        "https://benjamincorrea.com/automatizaciones"
      );
    } else {
      const newCanonical = document.createElement("link");
      newCanonical.rel = "canonical";
      newCanonical.href = "https://benjamincorrea.com/automatizaciones";
      document.head.appendChild(newCanonical);
    }

    // JSON-LD Structured Data
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Benjamín Correa - Automatizaciones",
      url: "https://benjamincorrea.com/automatizaciones",
      email: "contacto@benjamincorrea.com",
      areaServed: "Global",
      sameAs: [
        "https://linkedin.com/in/benjamincorrea",
        "https://github.com/benjamincorrea",
      ],
      description:
        "Automatizo procesos repetitivos en menos de 30 días y escala sin contratar más personal. Implementación low-code + full stack con soporte y garantía total.",
      provider: {
        "@type": "Person",
        name: "Benjamín Correa",
        email: "contacto@benjamincorrea.com",
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Effect para manejar el scroll cuando se viene con hash desde otra página
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;

      if (hash === "#diagnostico-gratuito") {
        setTimeout(() => {
          const element = document.getElementById("diagnostico-gratuito");
          if (element) {
            const elementPosition = element.offsetTop - 60; // 4cm arriba
            window.scrollTo({
              top: elementPosition,
              behavior: "smooth",
            });
          }
        }, 100);
      } else if (hash === "#lead-magnet") {
        setTimeout(() => {
          const element = document.getElementById("lead-magnet");
          if (element) {
            const elementPosition = element.offsetTop - 80; // Más espacio arriba para el lead magnet
            window.scrollTo({
              top: elementPosition,
              behavior: "smooth",
            });
          }
        }, 100);
      }
    };

    // Ejecutar al cargar la página
    handleHashScroll();

    // Escuchar cambios en el hash
    window.addEventListener("hashchange", handleHashScroll);

    return () => {
      window.removeEventListener("hashchange", handleHashScroll);
    };
  }, []);

  // Tracking function
  const trackEvent = (eventName, label) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, {
        event_category: "Landing Page",
        event_label: label,
        value: 1,
      });
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 pb-20 sm:pb-0">
      <Helmet>
        <title>Automatizaciones | Benjamín Correa</title>
        <meta
          name="description"
          content="Servicios de automatización empresarial - Optimiza procesos, reduce costos y aumenta la eficiencia de tu negocio"
        />
      </Helmet>
      {/* Navbar Flotante */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Botón Home */}
            <a
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md px-3 py-2"
              onClick={() => trackEvent("lp_auto_home", "Navbar")}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="font-medium">Inicio</span>
            </a>

            {/* CTA Principal */}
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm"
              onClick={() => {
                trackEvent("lp_auto_agendar", "Navbar");
                const element = document.getElementById("diagnostico-gratuito");
                if (element) {
                  const elementPosition = element.offsetTop - 60; // 4cm arriba
                  window.scrollTo({
                    top: elementPosition,
                    behavior: "smooth",
                  });
                }
              }}
            >
              Agendar reunión
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        className="relative pt-24 px-4 py-20 md:pt-28 md:py-24 overflow-hidden"
        style={{
          backgroundImage: "url(/img/hero-automation-coherent.svg)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundColor: "#f8fafc",
        }}
      >
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Escala tu negocio digital sin contratar más personal
          </motion.h1>

          <motion.p
            className="mt-6 text-gray-700 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Automatizo tus procesos repetitivos en{" "}
            <strong>menos de 30 días</strong> para que recuperes tiempo,
            reduzcas costos y elimines errores.
          </motion.p>
          <motion.p
            className="mt-4 text-lg text-gray-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Low-code + full stack · <strong>Soporte 30 días</strong> ·{" "}
            <strong>Garantía 100%</strong>
          </motion.p>

          <motion.div
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {/* CTA primario: abre popup de Cal */}
            <button
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-white font-medium hover:bg-indigo-700 transition-colors"
              onClick={() => {
                trackEvent("lp_auto_agendar", "Hero Primary");
                const element = document.getElementById("diagnostico-gratuito");
                if (element) {
                  const elementPosition = element.offsetTop - 60; // 4cm arriba
                  window.scrollTo({
                    top: elementPosition,
                    behavior: "smooth",
                  });
                }
              }}
            >
              Agendar diagnóstico gratuito
            </button>

            {/* CTA secundario: ancla a lead magnet */}
            <motion.a
              href="#lead-magnet"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-5 py-3 font-medium hover:bg-gray-50 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                trackEvent("lp_auto_checklist", "Hero Secondary");
                document
                  .getElementById("lead-magnet")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Descargar checklist
            </motion.a>
          </motion.div>

          <motion.div
            className="mt-4 text-sm text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            ⚡ <strong>Resultados en 30 días</strong> ·{" "}
            <strong>Flujos documentados y monitoreados</strong>
          </motion.div>
        </div>
      </section>

      {/* LEAD MAGNET */}
      <section
        id="lead-magnet"
        className="relative px-4 py-8 md:py-12 overflow-hidden"
      >
        {/* Gradiente de fondo para toda la sección */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100"></div>

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div
              className="relative mb-6"
              variants={staggerItem}
              style={{ zIndex: 10 }}
            >
              {/* Fondo con transparencia */}
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl"></div>

              <motion.h2
                className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-1 relative z-10 px-4 py-2"
                style={{ lineHeight: "1.2" }}
              >
                <motion.span
                  className="text-4xl md:text-5xl"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  🎁
                </motion.span>
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #ec4899 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  ¡Tengo un regalo para ti!
                </span>
              </motion.h2>
            </motion.div>
            <motion.p
              className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto"
              variants={staggerItem}
            >
              Descarga gratis mi checklist completo para identificar en 5
              minutos dónde estás perdiendo tiempo y dinero. Incluye ejemplos
              reales y una plantilla para priorizar.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Ilustración con efectos mejorados */}
            <motion.div
              className="flex items-center justify-center order-2 md:order-1 relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
            >
              {/* Gradiente de fondo detrás del libro - más sutil */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-200/30 via-purple-200/20 to-pink-200/30 rounded-3xl transform rotate-2 scale-105 opacity-40 blur-lg"></div>

              {/* Cinta decorativa de regalo */}
              <div className="absolute -top-2 -right-2 z-20">
                <motion.div
                  className="relative"
                  animate={{
                    rotate: [0, 3, -3, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* Cinta inferior (fondo) */}
                  <div className="absolute top-1 -left-1 bg-gradient-to-r from-red-400 to-pink-400 w-full h-full transform -rotate-6 opacity-60 z-0"></div>
                  {/* Cinta doblada (medio) */}
                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-pink-600 w-full h-full transform rotate-12 opacity-80 z-10"></div>
                  {/* Cinta principal (frente) */}
                  <div className="relative bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 text-sm font-bold shadow-lg transform rotate-12 z-20">
                    GRATIS
                  </div>
                </motion.div>
              </div>

              {/* Contenedor del libro con efectos 3D */}
              <motion.div
                className="relative"
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 2,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                {/* Sombra más sutil */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-400/15 to-purple-400/10 rounded-2xl blur-lg transform translate-y-2 scale-105"></div>

                {/* Reflejo sutil */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/15 to-transparent rounded-t-2xl"></div>

                {/* Efecto de brillo dorado para regalo */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-200/20 via-transparent to-orange-200/20 opacity-60"></div>

                <img
                  src="/img/leadmagnetimg.png"
                  alt="Checklist de automatizaciones conectado a código y sistemas"
                  className="w-full h-auto max-w-md relative z-10 rounded-2xl"
                  style={{
                    filter: "drop-shadow(0 8px 25px rgba(0, 0, 0, 0.08))",
                    transform: "rotateY(-3deg) rotateX(1deg)",
                  }}
                  loading="lazy"
                />

                {/* Efecto de partículas doradas */}
                <motion.div
                  className="absolute -top-2 -left-2 w-3 h-3 bg-yellow-400 rounded-full opacity-70"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0,
                  }}
                />
                <motion.div
                  className="absolute -bottom-1 -right-1 w-2 h-2 bg-orange-400 rounded-full opacity-60"
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
                <motion.div
                  className="absolute top-1/2 -left-3 w-2 h-2 bg-yellow-300 rounded-full opacity-50"
                  animate={{
                    y: [0, -6, 0],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Contenido */}
            <motion.div
              className="order-1 md:order-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
                },
              }}
            >
              <motion.ul
                className="mt-4 space-y-2 text-gray-800 mb-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.li
                  className="flex items-start space-x-3"
                  variants={staggerItem}
                >
                  <motion.span
                    className="text-green-600 text-lg mt-1"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
                  >
                    ✓
                  </motion.span>
                  <span>
                    Checklist accionable (ventas/leads, soporte, reportes,
                    facturación, admin)
                  </span>
                </motion.li>
                <motion.li
                  className="flex items-start space-x-3"
                  variants={staggerItem}
                >
                  <motion.span
                    className="text-green-600 text-lg mt-1"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, type: "spring", stiffness: 500 }}
                  >
                    ✓
                  </motion.span>
                  <span>Ejemplos en n8n/Make listos para replicar</span>
                </motion.li>
                <motion.li
                  className="flex items-start space-x-3"
                  variants={staggerItem}
                >
                  <motion.span
                    className="text-green-600 text-lg mt-1"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9, type: "spring", stiffness: 500 }}
                  >
                    ✓
                  </motion.span>
                  <span>Estimaciones de ahorro por proceso</span>
                </motion.li>
                <motion.li
                  className="flex items-start space-x-3"
                  variants={staggerItem}
                >
                  <motion.span
                    className="text-green-600 text-lg mt-1"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.1, type: "spring", stiffness: 500 }}
                  >
                    ✓
                  </motion.span>
                  <span>Plantilla de priorización (impacto vs esfuerzo)</span>
                </motion.li>
              </motion.ul>

              <motion.div
                className="relative rounded-3xl bg-white/95 backdrop-blur-sm p-8 md:p-10 border border-gray-200/50"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
                style={{
                  boxShadow:
                    "0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.8)",
                }}
              >
                {/* Efecto de brillo sutil en el borde */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-50"></div>

                {/* Contenido del formulario */}
                <div className="relative z-10">
                  <ContactForm
                    defaultSubject="Lead Magnet: Checklist 5 procesos"
                    successMessage="¡Listo! Te envié el checklist a tu correo."
                    tags={[
                      "lead-magnet",
                      "automatizaciones",
                      "LP_Automatizaciones",
                    ]}
                    extraFields={{
                      lead_source: "LP_Automatizaciones",
                      lead_magnet: "Checklist_5_procesos",
                      utm_campaign: "automatizaciones_lp",
                    }}
                    hideFields={["subject", "message"]}
                    buttonText="Descargar checklist gratis"
                    showPrivacyCheckbox={true}
                    privacyText="Acepto recibir recursos y actualizaciones"
                    privacyLink="/privacidad"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CALENDARIO EMBEBIDO */}
      <section id="diagnostico-gratuito" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8"
              variants={staggerItem}
            >
              Agenda tu diagnóstico gratuito
            </motion.h2>
            <motion.p
              className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto"
              variants={staggerItem}
            >
              Reserva 30 minutos para analizar tus procesos y definir una
              estrategia de automatización personalizada.
            </motion.p>
            <motion.div
              className="rounded-2xl bg-gray-50 p-6 shadow-sm border border-gray-100"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Cal
                namespace="diagnostico-45min"
                calLink="benjamin-correa-8pbfpd/diagnostico-45min"
                style={{ width: "100%", height: "600px", overflow: "scroll" }}
                config={{ layout: "month_view", theme: "light" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Automatizaciones;
