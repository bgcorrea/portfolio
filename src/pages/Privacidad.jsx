import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Privacidad = () => {
  // SEO y meta tags
  useEffect(() => {
    document.title = "Política de Privacidad | Benjamín Correa";

    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Política de privacidad y protección de datos personales. Conoce cómo protegemos tu información y garantizamos un uso responsable de tus datos."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Política de privacidad y protección de datos personales. Conoce cómo protegemos tu información y garantizamos un uso responsable de tus datos.";
      document.head.appendChild(meta);
    }

    // Canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", "https://benjamincorrea.com/privacidad");
    } else {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = "https://benjamincorrea.com/privacidad";
      document.head.appendChild(link);
    }

    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute(
        "content",
        "Política de Privacidad | Benjamín Correa"
      );
    } else {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:title");
      meta.content = "Política de Privacidad | Benjamín Correa";
      document.head.appendChild(meta);
    }

    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    if (ogDescription) {
      ogDescription.setAttribute(
        "content",
        "Política de privacidad y protección de datos personales. Conoce cómo protegemos tu información."
      );
    } else {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:description");
      meta.content =
        "Política de privacidad y protección de datos personales. Conoce cómo protegemos tu información.";
      document.head.appendChild(meta);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute("content", "https://benjamincorrea.com/privacidad");
    } else {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:url");
      meta.content = "https://benjamincorrea.com/privacidad";
      document.head.appendChild(meta);
    }

    // JSON-LD
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Política de Privacidad",
      description:
        "Política de privacidad y protección de datos personales conforme a la legislación chilena y RGPD",
      url: "https://benjamincorrea.com/privacidad",
      datePublished: "2025-01-15",
      dateModified: "2025-01-15",
      version: "v1.1",
      mainEntity: {
        "@type": "Person",
        name: "Benjamín Correa",
        email: "contacto@benjamincorrea.com",
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(script);
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
            Política de Privacidad
          </motion.h1>
          <motion.p
            className="text-gray-600"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            transition={{ delay: 0.2 }}
          >
            Última actualización: 25 de septiembre de 2025 | Versión v1.1
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
          {/* Índice */}
          <nav className="mb-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Índice</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#introduccion"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  1. Introducción
                </a>
              </li>
              <li>
                <a
                  href="#controlador"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  2. Controlador de Datos
                </a>
              </li>
              <li>
                <a
                  href="#ambito"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  3. Ámbito y Normativa
                </a>
              </li>
              <li>
                <a
                  href="#informacion"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  4. Información que Recopilamos
                </a>
              </li>
              <li>
                <a
                  href="#base-legal"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  5. Base Legal del Tratamiento
                </a>
              </li>
              <li>
                <a
                  href="#finalidades"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  6. Finalidades del Tratamiento
                </a>
              </li>
              <li>
                <a
                  href="#cookies"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  7. Cookies y Terceros
                </a>
              </li>
              <li>
                <a
                  href="#encargados"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  8. Encargados de Tratamiento
                </a>
              </li>
              <li>
                <a
                  href="#transferencias"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  9. Transferencias Internacionales
                </a>
              </li>
              <li>
                <a
                  href="#conservacion"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  10. Plazos de Conservación
                </a>
              </li>
              <li>
                <a
                  href="#derechos"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  11. Sus Derechos
                </a>
              </li>
              <li>
                <a
                  href="#menores"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  12. Menores de Edad
                </a>
              </li>
              <li>
                <a
                  href="#seguridad"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  13. Medidas de Seguridad
                </a>
              </li>
              <li>
                <a
                  href="#reclamaciones"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  14. Reclamaciones
                </a>
              </li>
              <li>
                <a
                  href="#cambios"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  15. Modificaciones
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  16. Contacto
                </a>
              </li>
            </ul>
          </nav>

          {/* Introducción */}
          <section id="introduccion" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              1. Introducción
            </h2>
            <div className="bg-gray-50 border-l-4 border-gray-400 pl-6 py-4">
              <p className="text-gray-700 leading-relaxed">
                <strong>Benjamín Correa</strong> ("nosotros", "nuestro" o "la
                empresa") se compromete a proteger y respetar su privacidad.
                Esta Política de Privacidad explica cómo recopilamos,
                utilizamos, divulgamos y protegemos su información personal
                cuando utiliza nuestros servicios o visita nuestro sitio web.
              </p>
            </div>
          </section>

          {/* Controlador de Datos */}
          <section id="controlador" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              2. Controlador de Datos
            </h2>
            <p className="text-gray-700 mb-4">
              El responsable del tratamiento de sus datos personales es:
            </p>
            <div className="bg-gray-50 border-l-4 border-indigo-400 pl-6 py-4">
              <p className="text-gray-700">
                <strong>Benjamín Correa</strong>
                <br />
                Email:{" "}
                <a
                  href="mailto:contacto@benjamincorrea.com"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  contacto@benjamincorrea.com
                </a>
                <br />
                Sitio web: benjamincorrea.com
              </p>
            </div>
          </section>

          {/* Ámbito y Normativa */}
          <section id="ambito" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              3. Ámbito y Normativa
            </h2>
            <p className="text-gray-700 mb-4">
              Esta política se rige por la legislación chilena (Ley 19.628 sobre
              Protección de la Vida Privada y sus normas complementarias).
            </p>
            <p className="text-gray-700 mb-4">
              Cuando corresponda (por ejemplo, si el/la titular reside en el
              Espacio Económico Europeo - EEE), también se aplicarán las
              disposiciones del Reglamento General de Protección de Datos (RGPD)
              de la Unión Europea.
            </p>
          </section>

          {/* Información que recopilamos */}
          <section id="informacion" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              4. Información que Recopilamos
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              4.1 Información Personal
            </h3>
            <p className="text-gray-700 mb-4">
              Recopilamos información personal que usted nos proporciona
              voluntariamente, incluyendo:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Nombre completo y apellidos</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono (cuando sea proporcionado)</li>
              <li>Información sobre su empresa u organización</li>
              <li>Detalles específicos sobre proyectos de automatización</li>
              <li>
                Cualquier otra información que nos proporcione a través de
                formularios de contacto
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              4.2 Información Técnica
            </h3>
            <p className="text-gray-700 mb-4">
              Automáticamente recopilamos cierta información técnica cuando
              visita nuestro sitio web:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Dirección IP y ubicación geográfica aproximada</li>
              <li>Tipo de navegador y sistema operativo</li>
              <li>Páginas visitadas y tiempo de permanencia</li>
              <li>Referrer (sitio web desde el cual llegó a nuestro sitio)</li>
              <li>Información de cookies y tecnologías similares</li>
            </ul>
          </section>

          {/* Base Legal del Tratamiento */}
          <section id="base-legal" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              5. Base Legal del Tratamiento
            </h2>
            <p className="text-gray-700 mb-6">
              El tratamiento de sus datos personales se basa en las siguientes
              bases legales:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              5.1 Ejecución de Contrato y Medidas Precontractuales
            </h3>
            <p className="text-gray-700 mb-4">
              Para la prestación de servicios de automatización, consultoría
              técnica y soporte.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              5.2 Interés Legítimo
            </h3>
            <p className="text-gray-700 mb-4">
              Para la mejora del servicio, prevención de fraude, análisis
              estadísticos y desarrollo de nuevos servicios.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              5.3 Consentimiento
            </h3>
            <p className="text-gray-700 mb-4">
              Para comunicaciones comerciales, cookies de marketing y
              finalidades específicas que requieren su autorización expresa.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              5.4 Cumplimiento de Obligaciones Legales
            </h3>
            <p className="text-gray-700">
              Para el cumplimiento de obligaciones fiscales, contables y de
              reporte según la legislación aplicable.
            </p>
          </section>

          {/* Finalidades del Tratamiento */}
          <section id="finalidades" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              6. Finalidades del Tratamiento
            </h2>

            <p className="text-gray-700 mb-6">
              Utilizamos su información personal para las siguientes finalidades
              legítimas:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              6.1 Prestación de Servicios
            </h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Responder a consultas y solicitudes de información</li>
              <li>
                Proporcionar servicios de automatización y consultoría técnica
              </li>
              <li>Implementar y mantener soluciones de automatización</li>
              <li>Ofrecer soporte técnico y seguimiento de proyectos</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              6.2 Comunicación Comercial
            </h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Enviar propuestas comerciales y cotizaciones</li>
              <li>Comunicar actualizaciones sobre proyectos en curso</li>
              <li>
                Proporcionar información sobre nuevos servicios (con su
                consentimiento)
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              6.3 Mejora de Servicios
            </h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                Analizar el uso del sitio web para mejorar la experiencia del
                usuario
              </li>
              <li>
                Desarrollar nuevos servicios basados en las necesidades
                identificadas
              </li>
              <li>Realizar estudios estadísticos anónimos</li>
            </ul>
          </section>

          {/* Cookies y Terceros */}
          <section id="cookies" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              7. Cookies y Terceros
            </h2>

            <p className="text-gray-700 mb-6">
              Nuestro sitio web utiliza cookies y tecnologías similares para
              mejorar su experiencia de navegación y analizar el uso del sitio.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              7.1 Tipos de Cookies
            </h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>
                <strong>Cookies Esenciales:</strong> Necesarias para el
                funcionamiento básico del sitio web
              </li>
              <li>
                <strong>Cookies Analíticas:</strong> Google Analytics, análisis
                de uso
              </li>
              <li>
                <strong>Cookies Funcionales:</strong> Mejoran la funcionalidad
                del sitio web
              </li>
              <li>
                <strong>Cookies de Marketing:</strong> Meta Pixel, publicidad
                personalizada
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              7.2 Gestión de Cookies
            </h3>
            <p className="text-gray-700 mb-4">
              Puede gestionar o revocar su consentimiento en cualquier momento
              desde el centro de preferencias de cookies.
            </p>
            <p className="text-gray-700 mb-4">
              Para más información detallada, consulte nuestra{" "}
              <Link
                to="/cookies"
                className="text-indigo-600 hover:text-indigo-800 underline"
              >
                Política de Cookies
              </Link>
              .
            </p>
          </section>

          {/* Encargados de Tratamiento */}
          <section id="encargados" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              8. Encargados de Tratamiento
            </h2>

            <p className="text-gray-700 mb-6">
              Podemos compartir información con proveedores de servicios que
              operan bajo contratos de encargado de tratamiento (DPA):
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              8.1 Proveedores de Servicios
            </h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>
                <strong>Hosting:</strong> Vercel, Netlify (infraestructura web)
              </li>
              <li>
                <strong>Analítica:</strong> Google Analytics (análisis de
                tráfico)
              </li>
              <li>
                <strong>CRM/Soporte:</strong> Calendly (programación de citas)
              </li>
              <li>
                <strong>Email:</strong> Servicios de correo electrónico seguros
              </li>
            </ul>

            <p className="text-gray-700">
              Todos estos proveedores operan bajo acuerdos estrictos de
              confidencialidad y cumplen con las normativas de protección de
              datos aplicables.
            </p>
          </section>

          {/* Transferencias Internacionales */}
          <section id="transferencias" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              9. Transferencias Internacionales
            </h2>

            <p className="text-gray-700 mb-6">
              Algunos de nuestros proveedores de servicios pueden estar ubicados
              fuera de Chile o del Espacio Económico Europeo.
            </p>

            <p className="text-gray-700 mb-4">
              Cuando corresponda (si aplica RGPD), utilizamos cláusulas
              contractuales tipo (SCCs) u otras salvaguardas apropiadas para
              garantizar un nivel adecuado de protección de sus datos
              personales.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 pl-6 py-4">
              <p className="text-blue-800">
                <strong>Información adicional:</strong> Puede solicitar
                información específica sobre las transferencias internacionales
                contactándonos.
              </p>
            </div>
          </section>

          {/* Plazos de Conservación */}
          <section id="conservacion" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              10. Plazos de Conservación
            </h2>

            <p className="text-gray-700 mb-6">
              Conservamos su información personal durante el tiempo necesario
              para cumplir con las finalidades para las que fue recopilada, por
              exigencias legales, contables o de defensa de reclamaciones.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              10.1 Criterios de Conservación
            </h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>
                <strong>Información de contacto:</strong> Hasta que solicite su
                eliminación o retire su consentimiento
              </li>
              <li>
                <strong>Datos de proyectos:</strong> Durante la duración del
                proyecto y hasta 7 años después de su finalización
              </li>
              <li>
                <strong>Datos analíticos:</strong> Se conservan de forma anónima
                y agregada
              </li>
              <li>
                <strong>Datos legales:</strong> Según los requisitos legales
                aplicables
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              10.2 Eliminación de Datos
            </h3>
            <p className="text-gray-700">
              Una vez que expire el período de conservación, eliminaremos de
              forma segura su información personal de nuestros sistemas, salvo
              que la ley requiera su conservación.
            </p>
          </section>

          {/* Sus Derechos */}
          <section id="derechos" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              11. Sus Derechos
            </h2>

            <p className="text-gray-700 mb-6">
              Como titular de datos personales, usted tiene los siguientes
              derechos reconocidos por la legislación aplicable:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              11.1 Derecho de Acceso
            </h3>
            <p className="text-gray-700 mb-4">
              Puede solicitar información sobre qué datos personales tenemos
              sobre usted, incluyendo las finalidades del tratamiento y los
              destinatarios de los datos.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              11.2 Derecho de Rectificación
            </h3>
            <p className="text-gray-700 mb-4">
              Tiene derecho a solicitar la corrección de datos inexactos o
              incompletos.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              11.3 Derecho de Supresión
            </h3>
            <p className="text-gray-700 mb-4">
              Puede solicitar la eliminación de sus datos personales cuando ya
              no sean necesarios para las finalidades para las que fueron
              recopilados.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              11.4 Derecho de Oposición
            </h3>
            <p className="text-gray-700 mb-4">
              Puede oponerse al tratamiento de sus datos personales para
              finalidades específicas, incluyendo el marketing directo.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              11.5 Derecho de Limitación
            </h3>
            <p className="text-gray-700 mb-4">
              Puede solicitar la limitación del tratamiento de sus datos en
              determinadas circunstancias.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              11.6 Derecho de Portabilidad
            </h3>
            <p className="text-gray-700 mb-4">
              Tiene derecho a recibir sus datos personales en un formato
              estructurado y de uso común, y a transmitirlos a otro responsable
              del tratamiento.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              11.7 Retiro del Consentimiento
            </h3>
            <p className="text-gray-700 mb-6">
              Puede retirar su consentimiento en cualquier momento para el
              tratamiento basado en consentimiento.
            </p>

            <div className="bg-gray-50 border-l-4 border-gray-400 pl-6 py-4">
              <p className="text-gray-700">
                <strong>Ejercicio de derechos:</strong> Para ejercer cualquiera
                de estos derechos, puede contactarnos en{" "}
                <a
                  href="mailto:contacto@benjamincorrea.com"
                  className="text-indigo-600 hover:text-indigo-800 underline"
                >
                  contacto@benjamincorrea.com
                </a>
                . Responderemos a su solicitud en un plazo máximo de 30 días
                hábiles.
              </p>
            </div>
          </section>

          {/* Menores de Edad */}
          <section id="menores" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              12. Menores de Edad
            </h2>

            <p className="text-gray-700 mb-6">
              Nuestros servicios no están dirigidos a menores de edad. No
              recopilamos intencionalmente información personal de menores.
            </p>

            <p className="text-gray-700 mb-4">
              Si aplica RGPD, el umbral de edad es de 16 años (o la edad mínima
              establecida por la legislación local).
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-400 pl-6 py-4">
              <p className="text-amber-800">
                <strong>Importante:</strong> Si descubrimos que hemos recopilado
                información de un menor sin el consentimiento parental
                apropiado, eliminaremos dicha información inmediatamente.
              </p>
            </div>
          </section>

          {/* Medidas de Seguridad */}
          <section id="seguridad" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              13. Medidas de Seguridad
            </h2>

            <p className="text-gray-700 mb-6">
              Implementamos medidas técnicas y organizativas apropiadas para
              proteger su información personal contra acceso no autorizado,
              alteración, divulgación o destrucción.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              13.1 Medidas Técnicas
            </h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Encriptación SSL/TLS para todas las comunicaciones</li>
              <li>Servidores seguros con certificaciones de seguridad</li>
              <li>Controles de acceso basados en roles</li>
              <li>Sistemas de copia de seguridad regulares y seguros</li>
              <li>Monitoreo continuo de sistemas y redes</li>
              <li>Evaluaciones periódicas de seguridad</li>
              <li>Registro de incidentes de seguridad</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              13.2 Medidas Organizativas
            </h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Políticas de confidencialidad para todo el personal</li>
              <li>Capacitación regular en seguridad de datos</li>
              <li>Controles de acceso físico a sistemas</li>
              <li>Auditorías periódicas de seguridad</li>
              <li>Procedimientos de respuesta a incidentes</li>
            </ul>
          </section>

          {/* Reclamaciones */}
          <section id="reclamaciones" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              14. Reclamaciones
            </h2>

            <p className="text-gray-700 mb-6">
              Si no queda conforme con nuestra respuesta, puede presentar un
              reclamo ante las autoridades o tribunales competentes.
            </p>

            <p className="text-gray-700 mb-4">
              Si reside en el Espacio Económico Europeo, puede dirigirse a su
              autoridad de control local.
            </p>

            <div className="bg-red-50 border-l-4 border-red-400 pl-6 py-4">
              <p className="text-red-800">
                <strong>Nota:</strong> Le recomendamos contactarnos primero para
                intentar resolver cualquier inquietud de manera amigable.
              </p>
            </div>
          </section>

          {/* Modificaciones */}
          <section id="cambios" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              15. Modificaciones de la Política
            </h2>

            <p className="text-gray-700 mb-6">
              Nos reservamos el derecho de actualizar esta Política de
              Privacidad ocasionalmente para reflejar cambios en nuestras
              prácticas comerciales, requisitos legales o mejoras en nuestros
              servicios.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              15.1 Notificación de Cambios
            </h3>
            <p className="text-gray-700 mb-6">
              Cuando realicemos cambios significativos en esta política, le
              notificaremos mediante un aviso prominente en nuestro sitio web o
              por correo electrónico. Le recomendamos revisar esta política
              periódicamente para mantenerse informado sobre cómo protegemos su
              información.
            </p>

            <div className="bg-gray-50 border-l-4 border-gray-400 pl-6 py-4">
              <p className="text-gray-700">
                <strong>Última actualización:</strong> 25 de septiembre de 2025
                | Versión v1.1
              </p>
            </div>
          </section>

          {/* Contacto */}
          <section id="contacto" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              16. Contacto y Ejercicio de Derechos
            </h2>

            <p className="text-gray-700 mb-6">
              Si tiene preguntas sobre esta Política de Privacidad, desea
              ejercer sus derechos o tiene inquietudes sobre el tratamiento de
              sus datos personales, puede contactarnos:
            </p>

            <div className="bg-gray-50 border-l-4 border-gray-400 pl-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Información de Contacto
              </h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:contacto@benjamincorrea.com"
                    className="text-indigo-600 hover:text-indigo-800 underline"
                  >
                    contacto@benjamincorrea.com
                  </a>
                </p>
                <p className="text-gray-700">
                  <strong>Sitio web:</strong> benjamincorrea.com
                </p>
                <p className="text-gray-700">
                  <strong>Tiempo de respuesta:</strong> Máximo 30 días hábiles
                </p>
              </div>
            </div>
          </section>
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Privacidad;
