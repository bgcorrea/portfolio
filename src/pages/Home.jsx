import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaExternalLinkAlt,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaUsers,
  FaHeadset,
  FaChartLine,
  FaFileInvoice,
  FaClock,
  FaShieldAlt,
  FaRocket,
} from "react-icons/fa";
import React from "react";
import SEO from "../components/SEO";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import ScrollAnimatedSection from "../components/ScrollAnimatedSection";

const Home = () => {
  const socialLinks = {
    github: "https://github.com/soybenjacorrea",
    linkedin: "https://www.linkedin.com/in/benjamincorrea",
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

  // SEO y JSON-LD
  const canonical = "https://www.benjamincorrea.com/";
  const title = "Benjamín Correa | Automatizaciones";
  const description =
    "Especialista en automatizaciones para negocios digitales. Reduzco trabajo manual, errores y costos para que tu equipo gane tiempo real.";
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: "https://www.benjamincorrea.com/",
      name: "Benjamín Correa",
      inLanguage: "es",
      publisher: { "@type": "Person", name: "Benjamín Correa" },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Benjamín Correa",
      url: "https://www.benjamincorrea.com/",
      jobTitle: "Especialista en Automatizaciones",
      sameAs: [
        "https://www.linkedin.com/in/benjamincorrea",
        "https://github.com/soybenjacorrea",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: "https://www.benjamincorrea.com/",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        ogImage="https://www.benjamincorrea.com/og-image.jpg"
        jsonLd={jsonLd}
      />

      {/* Estilos para animaciones de cadenas */}
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 20s linear infinite;
        }

        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Main Content */}
      <div>
        {/* Hero Section */}
        <section
          className="
            relative overflow-x-clip
            pt-[calc(var(--nav-h,64px)+env(safe-area-inset-top))]
            pb-[calc(16px+env(safe-area-inset-bottom))]
            min-h-[calc(100dvh-var(--nav-h,64px))]
            md:pt-20 md:pb-20 md:min-h-screen md:flex md:items-center
          "
        >
          {/* Fondo: gradiente + pattern */}
          <div className="absolute inset-0 -z-10 bg-white">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(124,58,237,0.08),transparent_60%)]" />
            <div className="absolute inset-0 -z-10 [-webkit-mask-image:radial-gradient(black,transparent_75%)] [mask-image:radial-gradient(black,transparent_75%)] bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
          </div>

          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-6 overflow-x-clip">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 md:items-center">
              <div className="col-span-12 md:col-span-7 order-2 md:order-1 w-full">
                <h1 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight break-words">
                  Automatizaciones para negocios digitales
                </h1>
                <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-xl lg:text-2xl text-slate-700 max-w-3xl leading-relaxed break-words">
                  Implemento automatizaciones end-to-end para reducir tiempos,
                  eliminar tareas repetitivas y minimizar errores operativos.
                  Conecto tus sistemas (CRM, correo, bases de datos,
                  formularios, e-commerce) con lógica de negocio real para que
                  tu equipo gane tiempo real y tu empresa escale sin contratar
                  más personal.
                </p>
                <div className="mt-8 md:mt-10 flex flex-col gap-6 w-full">
                  <a
                    href="/automatizaciones"
                    className="inline-flex items-center justify-center rounded-xl bg-violet-600 text-white px-8 py-5 font-medium hover:bg-violet-700 transition text-lg w-full sm:w-auto"
                  >
                    Ver servicios de automatización
                  </a>
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <a
                      href="/#contacto"
                      className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-8 py-5 font-medium hover:bg-slate-50 transition text-lg flex-1 w-full sm:w-auto"
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
                    <a
                      href="/automatizaciones#diagnostico-gratuito"
                      className="inline-flex items-center justify-center rounded-xl bg-slate-900 text-white px-8 py-5 font-medium hover:bg-slate-800 transition text-lg flex-1 w-full sm:w-auto"
                    >
                      Agendar reunión
                    </a>
                  </div>
                </div>

                {/* Redes sociales */}
                <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-6">
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-violet-600 transition-colors p-2"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin size={20} className="sm:w-6 sm:h-6" />
                  </a>
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-violet-600 transition-colors p-2"
                    aria-label="GitHub"
                  >
                    <FaGithub size={20} className="sm:w-6 sm:h-6" />
                  </a>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-violet-600 transition-colors p-2"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <a
                    href={socialLinks.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-violet-600 transition-colors p-2"
                    aria-label="TikTok"
                  >
                    <FaTiktok size={20} className="sm:w-6 sm:h-6" />
                  </a>
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-violet-600 transition-colors p-2"
                    aria-label="YouTube"
                  >
                    <FaYoutube size={20} className="sm:w-6 sm:h-6" />
                  </a>
                  <a
                    href={socialLinks.email}
                    className="text-slate-600 hover:text-violet-600 transition-colors p-2"
                    aria-label="Email"
                  >
                    <FaEnvelope size={20} className="sm:w-6 sm:h-6" />
                  </a>
                </div>

                {/* Tecnologías en cadenas animadas */}
                <div className="mt-8 md:mt-12 space-y-4 w-full">
                  {/* Primera cadena */}
                  <div className="flex items-center gap-2 overflow-hidden w-full">
                    <div className="flex gap-2 animate-scroll-left min-w-max">
                      {[
                        "n8n",
                        "Make",
                        "Zapier",
                        "AWS",
                        "n8n",
                        "Make",
                        "Zapier",
                        "AWS",
                      ].map((tech, index) => (
                        <span
                          key={`chain1-${index}`}
                          className="text-xs md:text-sm text-slate-700/90 border border-white/60 bg-white/40 backdrop-blur rounded-full px-3 py-1.5 md:px-4 md:py-2 shadow-sm whitespace-nowrap flex-shrink-0"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Segunda cadena */}
                  <div className="flex items-center gap-2 overflow-hidden w-full">
                    <div className="flex gap-2 animate-scroll-right min-w-max">
                      {[
                        "React",
                        "Node.js",
                        "Python",
                        "SQL",
                        "React",
                        "Node.js",
                        "Python",
                        "SQL",
                      ].map((tech, index) => (
                        <span
                          key={`chain2-${index}`}
                          className="text-xs md:text-sm text-slate-700/90 border border-white/60 bg-white/40 backdrop-blur rounded-full px-3 py-1.5 md:px-4 md:py-2 shadow-sm whitespace-nowrap flex-shrink-0"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual: hero automation coherent */}
              <div className="col-span-12 md:col-span-5 order-1 md:order-2 w-full flex justify-center">
                <div className="w-full h-auto max-h-[50svh] md:max-h-[80svh] flex items-center justify-center mb-6 md:mb-0">
                  <img
                    src="/img/hero-automation-coherent.svg"
                    alt="Automatizaciones para negocios digitales"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr className="border-gray-200 my-12" />

        {/* ¿Qué automatizo? Section */}
        <section className="py-8 md:py-16">
          <ScrollAnimatedSection
            className="max-w-7xl mx-auto px-4 md:px-6"
            delay={200}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
              ¿Qué automatizo?
            </h2>
            <p className="mt-3 md:mt-4 text-base sm:text-lg text-slate-700 max-w-3xl">
              Ventas/leads, soporte, reportes, facturación y administración. Mis
              automatizaciones conectan tus sistemas (CRM, correo, bases de
              datos, formularios, e-commerce) con lógica de negocio real para
              optimizar procesos y reducir costos operativos.
            </p>

            <div className="mt-6 md:mt-8 grid sm:grid-cols-2 gap-4 md:gap-6">
              {[
                {
                  t: "Leads & Enriquecimiento",
                  d: "Captura, cualificación y ruteo inteligente.",
                  icon: FaUsers,
                },
                {
                  t: "Soporte & SLAs",
                  d: "Tickets con respuestas asistidas y métricas.",
                  icon: FaHeadset,
                },
                {
                  t: "Reportes & KPIs",
                  d: "Dashboards y alertas automáticas.",
                  icon: FaChartLine,
                },
                {
                  t: "Facturación & Backoffice",
                  d: "Integración y conciliaciones sin fricción.",
                  icon: FaFileInvoice,
                },
              ].map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.t}
                    className="flex gap-3 md:gap-4 rounded-2xl border border-slate-200 p-4 md:p-5 shadow-sm hover:shadow-md transition"
                  >
                    <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-4 w-4 md:h-5 md:w-5 text-violet-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base md:text-lg font-semibold text-slate-900">
                        {item.t}
                      </h3>
                      <p className="text-sm md:text-base text-slate-700 mt-1">
                        {item.d}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollAnimatedSection>
        </section>

        {/* Beneficios clave Section */}
        <section className="py-8 md:py-12">
          <ScrollAnimatedSection
            className="max-w-7xl mx-auto px-4 md:px-6"
            delay={400}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
              Beneficios clave
            </h2>
            <div className="mt-6 md:mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  t: "Menos trabajo y costo",
                  d: "Elimina tareas repetitivas y libera horas del equipo.",
                  icon: FaClock,
                },
                {
                  t: "Datos confiables",
                  d: "Procesos trazables y documentados end-to-end.",
                  icon: FaShieldAlt,
                },
                {
                  t: "Implementación rápida",
                  d: "Resultados en 7–30 días según el alcance.",
                  icon: FaRocket,
                },
              ].map((b) => {
                const IconComponent = b.icon;
                return (
                  <article
                    key={b.t}
                    className="group rounded-2xl border border-slate-200 p-4 md:p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition transform-gpu"
                  >
                    <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-violet-100 mb-3 flex items-center justify-center">
                      <IconComponent className="h-4 w-4 md:h-5 md:w-5 text-violet-600" />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-slate-900">
                      {b.t}
                    </h3>
                    <p className="mt-2 text-sm md:text-base text-slate-700">
                      {b.d}
                    </p>
                  </article>
                );
              })}
            </div>
          </ScrollAnimatedSection>
        </section>

        {/* Sobre Mí Section */}
        <section
          id="sobre-mi"
          className="py-8 md:py-16 scroll-mt-[var(--nav-h,64px)]"
        >
          <ScrollAnimatedSection
            className="max-w-7xl mx-auto px-4 md:px-6"
            delay={500}
          >
            <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-center">
              <div className="md:col-span-7 order-2 md:order-1">
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-4 md:mb-6">
                  Sobre Mí
                </h2>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4 md:mb-6">
                  Especialista en automatización de procesos empresariales con
                  más de 3 años de experiencia en desarrollo full stack y
                  análisis de datos.
                </p>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                  Creo que la tecnología debe estar al servicio de las personas,
                  no al revés. Desde hace más de 3 años ayudo a empresas y
                  emprendedores a simplificar sus procesos, reducir el trabajo
                  manual y liberar tiempo valioso.
                </p>
              </div>
              <div className="md:col-span-5 order-1 md:order-2">
                <div className="w-full h-64 sm:h-72 md:h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src="/img/profile.png"
                        alt="Benjamín Correa"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 md:mt-12 grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="rounded-2xl border border-slate-200 p-4 md:p-6 shadow-sm">
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-3 md:mb-4">
                  Mi Experiencia
                </h3>
                <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-slate-700">
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-violet-600 mt-2 flex-shrink-0" />
                    <span>Más de 3 años en desarrollo full stack</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-violet-600 mt-2 flex-shrink-0" />
                    <span>Especialización en automatización de procesos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-violet-600 mt-2 flex-shrink-0" />
                    <span>Análisis de datos y optimización</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-violet-600 mt-2 flex-shrink-0" />
                    <span>Experiencia con múltiples industrias</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4 md:p-6 shadow-sm">
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-3 md:mb-4">
                  Mi Filosofía
                </h3>
                <p className="text-sm md:text-base text-slate-700">
                  La tecnología debe ser invisible y funcional. Mi objetivo es
                  crear soluciones que funcionen tan bien que las personas
                  puedan olvidarse de que existen, enfocándose en lo que
                  realmente importa para su negocio.
                </p>
              </div>
            </div>
          </ScrollAnimatedSection>
        </section>

        {/* Projects Section */}
        <section
          id="proyectos"
          className="py-8 md:py-16 scroll-mt-[var(--nav-h,64px)]"
        >
          <ScrollAnimatedSection
            className="max-w-7xl mx-auto px-4 md:px-6"
            delay={600}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
              Proyectos
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-700 max-w-3xl">
              Soluciones tecnológicas que han transformado procesos
              empresariales y mejorado la eficiencia operacional.
            </p>
            <div className="mt-6 md:mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {projects.map((p) => (
                <article
                  key={p.id}
                  className="group rounded-2xl border border-slate-200 p-4 md:p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition transform-gpu"
                >
                  <div className="relative h-40 sm:h-48 bg-slate-100 overflow-hidden rounded-xl mb-3 md:mb-4">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 right-3 bg-white/90 hover:bg-white text-slate-700 p-1.5 md:p-2 rounded-lg transition-colors"
                    >
                      <FaExternalLinkAlt size={14} className="md:w-4 md:h-4" />
                    </a>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-slate-900">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-slate-700">
                    {p.description}
                  </p>
                  <div className="mt-3 md:mt-4 flex flex-wrap gap-1.5 md:gap-2">
                    {p.technologies.map((s) => (
                      <span
                        key={s}
                        className="text-xs text-slate-600 border border-slate-200 rounded-full px-2 md:px-2.5 py-0.5 md:py-1"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 md:mt-4 inline-flex items-center text-sm md:text-base text-violet-600 font-medium hover:text-violet-700"
                  >
                    Ver proyecto →
                  </a>
                </article>
              ))}
            </div>
          </ScrollAnimatedSection>
        </section>

        {/* Contact Section */}
        <section
          id="contacto"
          className="py-8 md:py-16 scroll-mt-[var(--nav-h,64px)]"
        >
          <ScrollAnimatedSection
            className="max-w-7xl mx-auto px-4 md:px-6"
            delay={800}
          >
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                ¿Necesitas automatizar procesos?
              </h2>
              <p className="mt-3 md:mt-4 text-base sm:text-lg text-slate-700 max-w-2xl mx-auto">
                Completa el formulario y me pondré en contacto contigo para
                evaluar tus necesidades y diseñar una solución personalizada.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </ScrollAnimatedSection>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
