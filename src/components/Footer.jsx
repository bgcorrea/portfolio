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
    github: "https://github.com/soybenjacorrea",
    linkedin: "https://www.linkedin.com/in/benjamincorrea",
    email: "mailto:contacto@benjamincorrea.com",
    instagram: "https://www.instagram.com/soybenjacorrea",
    tiktok: "https://www.tiktok.com/@bgcorrea",
    youtube: "https://www.youtube.com/@bgcorrea",
  };

  return (
    <footer className="py-8 px-4 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Enlaces de navegación */}
          <div className="flex flex-wrap gap-6 text-sm">
            <Link
              to="/home"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Inicio
            </Link>
            <Link
              to="/automatizaciones"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Automatizaciones
            </Link>
            <a
              href="/home#proyectos"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("proyectos")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Proyectos
            </a>
            <a
              href="/home#sobre-mi"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("sobre-mi")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Sobre mí
            </a>
            <Link
              to="/blog"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Blog
            </Link>
            <a
              href="/home#contacto"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contacto")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Contacto
            </a>
          </div>

          {/* Redes sociales */}
          <div className="flex gap-4">
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href={socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="TikTok"
            >
              <FaTiktok size={20} />
            </a>
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="YouTube"
            >
              <FaYoutube size={20} />
            </a>
            <a
              href={socialLinks.email}
              className="text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="Email"
            >
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>

        {/* Línea divisoria y copyright */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-slate-600 text-center md:text-left">
              © 2025 Benjamín Correa. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/privacidad"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors underline"
              >
                Privacidad
              </Link>
              <Link
                to="/cookies"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors underline"
              >
                Cookies
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
