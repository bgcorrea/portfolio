import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaExternalLinkAlt,
  FaArrowDown,
  FaCode,
  FaRocket,
  FaHeart,
} from "react-icons/fa";
import Footer from "../components/Footer";

const Redes = () => {
  // SEO y meta tags
  useEffect(() => {
    document.title =
      "Benjamín Correa | Desarrollador Full Stack & Automatizaciones";

    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Meta description optimizada para RRSS
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "🚀 Desarrollador Full Stack especializado en automatizaciones. Automatizo procesos empresariales en menos de 30 días. ¡Conecta conmigo!"
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "🚀 Desarrollador Full Stack especializado en automatizaciones. Automatizo procesos empresariales en menos de 30 días. ¡Conecta conmigo!";
      document.head.appendChild(meta);
    }

    // JSON-LD optimizado para RRSS
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Benjamín Correa",
      jobTitle: "Desarrollador Full Stack & Especialista en Automatizaciones",
      url: "https://benjamincorrea.com/redes",
      image: "https://benjamincorrea.com/img/profile.jpeg",
      description:
        "Desarrollador Full Stack especializado en automatizaciones empresariales",
      sameAs: [
        "https://github.com/bgcorrea",
        "https://www.linkedin.com/in/benjamin-correa-penaloza/",
        "https://www.instagram.com/soybenjacorrea",
        "https://www.tiktok.com/@bgcorrea",
        "https://www.youtube.com/@bgcorrea",
        "https://sectormorado.cl",
      ],
      worksFor: {
        "@type": "Organization",
        name: "Freelance",
      },
      knowsAbout: [
        "Desarrollo Web",
        "Automatización de Procesos",
        "React",
        "Node.js",
        "Python",
        "Análisis de Datos",
      ],
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

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
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: FaGithub,
      url: "https://github.com/bgcorrea",
      description: "Código y proyectos",
      color: "hover:text-gray-800",
      bgColor: "bg-gray-50 hover:bg-gray-100",
      emoji: "💻",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/benjamin-correa-penaloza/",
      description: "Perfil profesional",
      color: "hover:text-blue-600",
      bgColor: "bg-blue-50 hover:bg-blue-100",
      emoji: "💼",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      url: "https://www.instagram.com/soybenjacorrea",
      description: "Contenido personal",
      color: "hover:text-pink-600",
      bgColor: "bg-pink-50 hover:bg-pink-100",
      emoji: "📸",
    },
    {
      name: "TikTok",
      icon: FaTiktok,
      url: "https://www.tiktok.com/@bgcorrea",
      description: "Videos tech",
      color: "hover:text-black",
      bgColor: "bg-gray-50 hover:bg-gray-100",
      emoji: "🎥",
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      url: "https://www.youtube.com/@bgcorrea",
      description: "Tutoriales",
      color: "hover:text-red-600",
      bgColor: "bg-red-50 hover:bg-red-100",
      emoji: "📺",
    },
    {
      name: "Email",
      icon: FaEnvelope,
      url: "mailto:contacto@benjamincorrea.com",
      description: "Contacto directo",
      color: "hover:text-indigo-600",
      bgColor: "bg-indigo-50 hover:bg-indigo-100",
      emoji: "✉️",
    },
  ];

  const services = [
    {
      icon: FaCode,
      title: "Desarrollo Web",
      description: "React, Node.js, Python",
      color: "text-blue-600",
    },
    {
      icon: FaRocket,
      title: "Automatizaciones",
      description: "Procesos en 30 días",
      color: "text-green-600",
    },
    {
      icon: FaHeart,
      title: "Consultoría",
      description: "Estrategias tech",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section - Optimizado para móvil */}
      <section className="relative pt-20 pb-12 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Profile Image */}
          <motion.div
            className="mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-indigo-200 shadow-xl">
              <img
                src="/img/profile.jpeg"
                alt="Benjamín Correa"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              variants={staggerItem}
            >
              Hola, soy{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Benjamín
              </span>
            </motion.h1>

            <motion.h2
              className="text-xl sm:text-2xl text-indigo-600 font-semibold mb-4"
              variants={staggerItem}
            >
              🚀 Desarrollador Full Stack & Automatizaciones
            </motion.h2>

            <motion.p
              className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={staggerItem}
            >
              Automatizo procesos empresariales en{" "}
              <strong className="text-indigo-600">menos de 30 días</strong> para
              que puedas escalar sin contratar más personal.
            </motion.p>

            {/* Services Pills */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 mb-8"
              variants={staggerItem}
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100"
                >
                  <service.icon className={`w-4 h-4 ${service.color}`} />
                  <span className="text-sm font-medium text-gray-700">
                    {service.title}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div className="mb-8" variants={staggerItem}>
              <a
                href="/automatizaciones"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <FaRocket className="mr-2" />
                Ver mi Trabajo
              </a>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="flex flex-col items-center text-gray-400"
              variants={staggerItem}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span className="text-sm mb-2">Conecta conmigo</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaArrowDown className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8"
              variants={staggerItem}
            >
              📱 Conecta Conmigo
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block p-6 rounded-2xl ${social.bgColor} transition-all duration-300 hover:shadow-lg group border border-gray-100`}
                  variants={staggerItem}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <span className="text-2xl">{social.emoji}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-800">
                        {social.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {social.description}
                      </p>
                    </div>
                    <FaExternalLinkAlt
                      size={16}
                      className="text-gray-400 group-hover:text-gray-600 transition-colors"
                    />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>

            <div className="relative">
              <motion.h3
                className="text-2xl sm:text-3xl font-bold mb-4"
                variants={staggerItem}
              >
                🎁 ¡Tengo un regalo para ti!
              </motion.h3>
              <motion.p
                className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto"
                variants={staggerItem}
              >
                Descarga gratis mi checklist de "5 procesos que todo negocio
                digital debería automatizar" y descubre cómo puedes ahorrar
                tiempo y dinero desde hoy.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={staggerItem}
              >
                <a
                  href="/automatizaciones#lead-magnet"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-600 font-semibold rounded-full hover:bg-gray-50 transition-colors shadow-lg"
                >
                  <FaRocket className="mr-2" />
                  Descargar Regalo Gratis
                </a>
                <a
                  href="mailto:contacto@benjamincorrea.com"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-indigo-600 transition-colors"
                >
                  <FaEnvelope className="mr-2" />
                  Contactar Directamente
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Redes;
