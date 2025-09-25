import { useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const Cookies = () => {
  // SEO y meta tags
  useEffect(() => {
    document.title = "Política de Cookies | Benjamín Correa";

    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Política de cookies y tecnologías de seguimiento. Conoce qué cookies utilizamos y cómo gestionarlas."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Política de cookies y tecnologías de seguimiento. Conoce qué cookies utilizamos y cómo gestionarlas.";
      document.head.appendChild(meta);
    }

    // JSON-LD
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Política de Cookies",
      description: "Política de cookies y tecnologías de seguimiento",
      url: "https://benjamincorrea.com/cookies",
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-br from-indigo-50 to-white py-12 pt-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-2 text-gray-900"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            Política de Cookies
          </motion.h1>
          <motion.p
            className="text-gray-600"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            transition={{ delay: 0.2 }}
          >
            Última actualización: 15 de enero de 2025
          </motion.p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          className="prose prose-lg max-w-none"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          transition={{ delay: 0.4 }}
        >
          {/* Introducción */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              ¿Qué son las cookies?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Las cookies son pequeños archivos de texto que se almacenan en su
              dispositivo cuando visita nuestro sitio web. Nos ayudan a mejorar
              su experiencia de navegación y a entender cómo utiliza nuestro
              sitio.
            </p>
          </section>

          {/* Tipos de cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Tipos de Cookies que Utilizamos
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 mb-6">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Tipo
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Propósito
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Duración
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Obligatorio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">
                      Esenciales
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Funcionamiento básico del sitio
                    </td>
                    <td className="border border-gray-300 px-4 py-3">Sesión</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      ✓
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">
                      Analíticas
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Google Analytics, análisis de uso
                    </td>
                    <td className="border border-gray-300 px-4 py-3">2 años</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      ✗
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">
                      Funcionales
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Recordar preferencias del usuario
                    </td>
                    <td className="border border-gray-300 px-4 py-3">1 año</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      ✗
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">
                      Marketing
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      Meta Pixel, publicidad personalizada
                    </td>
                    <td className="border border-gray-300 px-4 py-3">1 año</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      ✗
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Gestión de cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Cómo Gestionar las Cookies
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Centro de Preferencias
            </h3>
            <p className="text-gray-700 mb-4">
              Puede gestionar o revocar su consentimiento en cualquier momento
              desde el centro de preferencias de cookies que aparece en su
              primera visita al sitio.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Configuración del Navegador
            </h3>
            <p className="text-gray-700 mb-4">
              También puede controlar las cookies a través de la configuración
              de su navegador:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>
                <strong>Chrome:</strong> Configuración → Privacidad y seguridad
                → Cookies
              </li>
              <li>
                <strong>Firefox:</strong> Opciones → Privacidad y seguridad →
                Cookies
              </li>
              <li>
                <strong>Safari:</strong> Preferencias → Privacidad → Cookies
              </li>
              <li>
                <strong>Edge:</strong> Configuración → Cookies y permisos del
                sitio
              </li>
            </ul>

            <div className="bg-amber-50 border-l-4 border-amber-400 pl-6 py-4">
              <p className="text-amber-800">
                <strong>Nota:</strong> Deshabilitar ciertas cookies puede
                afectar la funcionalidad del sitio web y su experiencia de
                navegación.
              </p>
            </div>
          </section>

          {/* Cookies de terceros */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Cookies de Terceros
            </h2>
            <p className="text-gray-700 mb-6">
              Nuestro sitio puede incluir cookies de terceros para servicios
              como:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>
                <strong>Google Analytics:</strong> Para análisis de tráfico web
              </li>
              <li>
                <strong>Meta Pixel:</strong> Para seguimiento de conversiones
              </li>
              <li>
                <strong>Calendly:</strong> Para programación de citas
              </li>
              <li>
                <strong>Vercel:</strong> Para análisis de rendimiento
              </li>
            </ul>
          </section>

          {/* Contacto */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contacto</h2>
            <p className="text-gray-700 mb-6">
              Si tiene preguntas sobre nuestra política de cookies, puede
              contactarnos:
            </p>
            <div className="bg-gray-50 border-l-4 border-gray-400 pl-6 py-4">
              <p className="text-gray-700">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:contacto@benjamincorrea.com"
                  className="text-indigo-600 hover:text-indigo-800 underline"
                >
                  contacto@benjamincorrea.com
                </a>
              </p>
            </div>
          </section>
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Cookies;
