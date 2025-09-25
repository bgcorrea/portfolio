import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import CookiePreferences from "./CookiePreferences";

const Footer = () => {
  const socialLinks = {
    github: "https://github.com/bgcorrea",
    linkedin: "https://www.linkedin.com/in/benjamin-correa-penaloza/",
    email: "mailto:contacto@benjamincorrea.com",
    instagram: "https://www.instagram.com/soybenjacorrea",
    tiktok: "https://www.tiktok.com/@bgcorrea",
    youtube: "https://www.youtube.com/@bgcorrea",
  };

  return (
    <footer className="py-12 px-4 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Redes Sociales */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Sígueme
            </h3>
            <div className="flex gap-4 flex-wrap">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={24} />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href={socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                aria-label="TikTok"
              >
                <FaTiktok size={24} />
              </a>
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube size={24} />
              </a>
              <a
                href={socialLinks.email}
                className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                aria-label="Email"
              >
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>

          {/* Enlaces de Navegación */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Navegación
            </h3>
            <div className="space-y-2">
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="block text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
              >
                Inicio
              </Link>
              <Link
                to="/automatizaciones"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="block text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
              >
                Automatizaciones
              </Link>
              <Link
                to="/privacidad"
                className="block text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
              >
                Privacidad
              </Link>
              <Link
                to="/cookies"
                className="block text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
              >
                Cookies
              </Link>
              <Link
                to="/redes"
                className="block text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
              >
                Redes
              </Link>
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contacto
            </h3>
            <div className="space-y-2">
              <a
                href="mailto:contacto@benjamincorrea.com"
                className="block text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
              >
                contacto@benjamincorrea.com
              </a>
            </div>
          </div>
        </div>

        {/* Línea divisoria y copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 dark:text-gray-400 text-center md:text-left">
              © 2025 Benjamín Correa. Todos los derechos reservados.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/privacidad"
                className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors underline"
              >
                Política de Privacidad
              </Link>
              <CookiePreferences />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
