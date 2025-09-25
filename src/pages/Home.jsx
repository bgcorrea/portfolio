import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaExternalLinkAlt,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Verificar si es la primera visita
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedHome");

    if (!hasVisited) {
      // Primera visita - mostrar loading
      setIsLoading(true);
      setShowContent(false);
      localStorage.setItem("hasVisitedHome", "true");

      // Simular tiempo de carga
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => {
          setShowContent(true);
        }, 500);
      }, 3000);
    } else {
      // Ya visitó antes - mostrar contenido directamente
      setIsLoading(false);
      setShowContent(true);
    }
  }, []);

  const socialLinks = {
    github: "https://github.com/bgcorrea",
    linkedin: "https://www.linkedin.com/in/benjamin-correa-penaloza/",
    email: "mailto:contacto@benjamincorrea.com",
    instagram: "https://www.instagram.com/soybenjacorrea",
    tiktok: "https://www.tiktok.com/@bgcorrea",
    youtube: "https://www.youtube.com/@bgcorrea",
  };

  const projects = [
    {
      id: 1,
      title: "Alquitones",
      description:
        "Plataforma web para la gestión y visualización de datos de alquitones, implementando soluciones cloud y análisis de datos.",
      technologies: ["React", "Java", "Spring Boot", "AWS"],
      images: [
        "/img/alquitones1.png",
        "/img/alquitones2.png",
        "/img/alquitones3.png",
      ],
      link: "https://alquitones.online",
    },
    {
      id: 2,
      title: "VitaHue",
      description:
        "Landing page corporativa para una empresa de arriendo de maquinaria pesada, diseñada para captar clientes y mostrar sus servicios de forma clara y visual.",
      technologies: ["React"],
      images: ["/img/vitahue1.png", "/img/vitahue2.png"],
      link: "https://vitahue-landing.vercel.app/",
    },
    {
      id: 3,
      title: "OdontoApp",
      description:
        "Aplicación web para la gestión de citas y pacientes en clínicas dentales, con interfaz intuitiva y sistema de recordatorios automáticos.",
      technologies: ["React", "Node.js", "MongoDB"],
      images: ["/img/odonto1.png", "/img/odonto2.png"],
      link: "https://ctd-esp-fe3-final-sandy-iota.vercel.app/",
    },
    {
      id: 4,
      title: "SportIt",
      description:
        "Plataforma de gestión deportiva que conecta atletas, entrenadores y organizadores de eventos deportivos.",
      technologies: ["React", "Node.js", "PostgreSQL"],
      images: ["/img/sportit1.png", "/img/sportit2.png"],
      link: "https://trabajo-final-frontend1.vercel.app/",
    },
  ];

  const handleMouseEnter = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    if (project.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => ({
          ...prev,
          [projectId]: ((prev[projectId] || 0) + 1) % project.images.length,
        }));
      }, 2000);
      return () => clearInterval(interval);
    }
  };

  const handleMouseLeave = (projectId) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectId]: 0,
    }));
  };

  // Componente de Loading
  const LoadingScreen = () => (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-8">
          <img
            src="/img/hero-automation-coherent.svg"
            alt="Benjamín Correa - Automatizaciones"
            className="w-32 h-32 mx-auto animate-pulse"
          />
        </div>
        <div className="text-gray-900">
          <h2 className="text-2xl font-bold mb-2">Benjamín Correa</h2>
          <p className="text-gray-600">Cargando automatizaciones...</p>
        </div>
        <div className="mt-8">
          <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full animate-pulse"
              style={{
                animation: "loading-bar 3s ease-in-out",
              }}
            ></div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
          }
          30% {
            width: 25%;
          }
          60% {
            width: 60%;
          }
          85% {
            width: 85%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen />}

      {/* Main Content */}
      {showContent && (
        <div
          className={`transition-opacity duration-500 ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Hero Section */}
          <section className="pt-24 px-4 py-16 md:pt-28 md:py-24 bg-gradient-to-br from-indigo-50 to-white">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-indigo-200 shadow-xl">
                    <img
                      src="/img/profile.jpeg"
                      alt="Benjamín Correa"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="text-center lg:text-left flex-1">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                    Benjamín Correa
                  </h1>
                  <h2 className="text-xl md:text-2xl lg:text-3xl text-indigo-600 mb-6">
                    Desarrollador Full Stack & Especialista en Automatizaciones
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 max-w-2xl">
                    Transformo procesos empresariales mediante automatización
                    inteligente, desarrollo web moderno y análisis de datos.
                    Ayudo a empresas a escalar sin contratar más personal.
                  </p>
                  <div className="flex justify-center lg:justify-start gap-4 mb-8 flex-wrap">
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      <FaGithub size={28} />
                    </a>
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      <FaLinkedin size={28} />
                    </a>
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      <FaInstagram size={28} />
                    </a>
                    <a
                      href={socialLinks.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      <FaTiktok size={28} />
                    </a>
                    <a
                      href={socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      <FaYoutube size={28} />
                    </a>
                    <a
                      href={socialLinks.email}
                      className="text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      <FaEnvelope size={28} />
                    </a>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link
                      to="/automatizaciones"
                      className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
                    >
                      Ver Automatizaciones
                    </Link>
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Contacto
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="py-16 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Sobre Mí
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Especialista en automatización de procesos empresariales con
                  más de 3 años de experiencia en desarrollo full stack y
                  análisis de datos.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Mi Enfoque
                  </h3>
                  <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                      Creo que la tecnología debe estar al servicio de las
                      personas, no al revés. Desde hace más de 3 años ayudo a
                      empresas y emprendedores a{" "}
                      <strong>simplificar sus procesos</strong>, reducir el
                      trabajo manual y liberar tiempo valioso.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      Me gusta escuchar, entender la forma en que cada negocio
                      funciona y luego <strong>diseñar soluciones</strong> que
                      hagan que todo fluya de manera más simple. La
                      automatización, el desarrollo web y el análisis de datos
                      son mis herramientas, pero lo que realmente me motiva es
                      ver cómo las personas ganan libertad para enfocarse en lo
                      que más les importa.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                    <h4 className="font-semibold text-indigo-900 mb-2">
                      Automatización
                    </h4>
                    <p className="text-indigo-700 text-sm">
                      n8n, Make, Zapier, APIs
                    </p>
                  </div>
                  <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                    <h4 className="font-semibold text-indigo-900 mb-2">
                      Desarrollo Web
                    </h4>
                    <p className="text-indigo-700 text-sm">
                      React, Node.js, Java, Spring Boot
                    </p>
                  </div>
                  <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                    <h4 className="font-semibold text-indigo-900 mb-2">
                      Cloud & DevOps
                    </h4>
                    <p className="text-indigo-700 text-sm">
                      AWS, Docker, CI/CD
                    </p>
                  </div>
                  <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                    <h4 className="font-semibold text-indigo-900 mb-2">
                      Análisis de Datos
                    </h4>
                    <p className="text-indigo-700 text-sm">
                      Python, SQL, Visualización
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Proyectos Destacados
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Soluciones tecnológicas que han transformado procesos
                  empresariales y mejorado la eficiencia operacional.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                    onMouseEnter={() => handleMouseEnter(project.id)}
                    onMouseLeave={() => handleMouseLeave(project.id)}
                  >
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                      <img
                        src={project.images[currentImageIndex[project.id] || 0]}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-lg transition-colors"
                      >
                        <FaExternalLinkAlt size={16} />
                      </a>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-16 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Contacto
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  ¿Tienes un proceso que quieres automatizar? Hablemos sobre
                  cómo puedo ayudarte a escalar tu negocio.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Información de Contacto
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <FaEnvelope className="text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Email</h4>
                        <a
                          href="mailto:contacto@benjamincorrea.com"
                          className="text-indigo-600 hover:text-indigo-700 transition-colors"
                        >
                          contacto@benjamincorrea.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <FaGithub className="text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">GitHub</h4>
                        <a
                          href="https://github.com/bgcorrea"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-700 transition-colors"
                        >
                          github.com/bgcorrea
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <FaLinkedin className="text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          LinkedIn
                        </h4>
                        <a
                          href="https://www.linkedin.com/in/benjamin-correa-penaloza/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-700 transition-colors"
                        >
                          benjamin-correa-penaloza
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-indigo-50 rounded-xl border border-indigo-100">
                    <h4 className="font-semibold text-indigo-900 mb-2">
                      ¿Necesitas automatizar procesos?
                    </h4>
                    <p className="text-indigo-700 text-sm mb-4">
                      Agenda una consulta gratuita de 30 minutos para analizar
                      tus procesos y definir una estrategia de automatización
                      personalizada.
                    </p>
                    <Link
                      to="/automatizaciones#diagnostico-gratuito"
                      className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Agendar Consulta
                    </Link>
                  </div>
                </div>

                {/* Contact Form */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Envíame un Mensaje
                  </h3>
                  <ContactForm />
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Home;
