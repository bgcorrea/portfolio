import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  const socialLinks = {
    github: "https://github.com/bgcorrea",
    linkedin: "https://www.linkedin.com/in/benjamin-correa-penaloza/",
    email: "mailto:bgcorrea@uc.cl",
  };

  return (
    <section className="min-h-screen p-4 sm:p-8 md:p-16">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-8 md:mb-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8">
          <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-amber-100 dark:border-amber-900 shadow-lg">
            <img
              src="/img/profile.jpeg"
              alt="Benjamín Correa"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-amber-900 dark:text-amber-50">
              Benjamín Correa Peñaloza
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-amber-800 dark:text-amber-200 mb-6 md:mb-8">
              Desarrollador Full Stack & Analista de Datos
            </h2>
            <div className="flex justify-center md:justify-start gap-6">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-900 dark:text-amber-50 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
              >
                <FaGithub size={28} />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-900 dark:text-amber-50 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
              >
                <FaLinkedin size={28} />
              </a>
              <a
                href={socialLinks.email}
                className="text-amber-900 dark:text-amber-50 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
              >
                <FaEnvelope size={28} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        <div className="space-y-4 md:space-y-6">
          <h3 className="text-xl md:text-2xl font-semibold text-amber-900 dark:text-amber-50 mb-4">
            Sobre Mí
          </h3>
          <p className="text-amber-800 dark:text-amber-200 leading-relaxed text-sm md:text-base">
            Ayudo a empresas a transformar sus operaciones mediante soluciones
            tecnológicas efectivas. Como desarrollador web, analista de datos y
            profesional certificado en nube por AWS, ofrezco servicios que
            integran automatización, eficiencia y escalabilidad en áreas clave
            del negocio.
          </p>
          <p className="text-amber-800 dark:text-amber-200 leading-relaxed text-sm md:text-base">
            Desarrollo plataformas digitales a medida con tecnologías modernas
            como React y Spring Boot, implemento análisis de datos que
            convierten información en decisiones estratégicas, y despliego
            infraestructuras escalables y seguras en la nube. Mi objetivo es
            entregar soluciones concretas que optimicen procesos, reduzcan
            costos y generen valor real para tu organización.
          </p>
        </div>
        <div className="space-y-4 md:space-y-6">
          <h3 className="text-xl md:text-2xl font-semibold text-amber-900 dark:text-amber-50 mb-4">
            Habilidades Clave
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg border border-amber-100 dark:border-gray-700 shadow-lg">
              <h4 className="font-semibold text-amber-900 dark:text-amber-50 mb-2">
                Desarrollo Web
              </h4>
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                React, Node.js, Java, Spring Boot
              </p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg border border-amber-100 dark:border-gray-700 shadow-lg">
              <h4 className="font-semibold text-amber-900 dark:text-amber-50 mb-2">
                Cloud & DevOps
              </h4>
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                AWS, Docker, CI/CD
              </p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg border border-amber-100 dark:border-gray-700 shadow-lg">
              <h4 className="font-semibold text-amber-900 dark:text-amber-50 mb-2">
                Análisis de Datos
              </h4>
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                Python, R, SQL, Visualización
              </p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg border border-amber-100 dark:border-gray-700 shadow-lg">
              <h4 className="font-semibold text-amber-900 dark:text-amber-50 mb-2">
                Metodologías
              </h4>
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                Agile, Scrum, Design Thinking
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto mt-8 md:mt-16 text-center">
        <Link
          to="/contact"
          className="inline-block bg-amber-900 dark:bg-amber-800 text-amber-50 px-6 md:px-8 py-2 md:py-3 rounded-lg hover:bg-amber-800 dark:hover:bg-amber-700 transition-colors text-sm md:text-base"
        >
          Contáctame
        </Link>
      </div>
    </section>
  );
};

export default Home;
