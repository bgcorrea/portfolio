import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { FaHome, FaArrowLeft, FaSearch } from "react-icons/fa";

const NotFound = () => {
  const canonical = "https://www.benjamincorrea.com/404";
  const title = "Página no encontrada | Benjamín Correa";
  const description =
    "La página que buscas no existe. Regresa al inicio para encontrar automatizaciones para tu negocio digital.";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        ogImage="https://www.benjamincorrea.com/og-image.jpg"
      />

      <div className="max-w-2xl mx-auto text-center">
        {/* Ilustración 404 */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-violet-100 mb-4">404</div>
          <div className="w-32 h-32 mx-auto mb-6 bg-violet-50 rounded-full flex items-center justify-center">
            <FaSearch className="text-4xl text-violet-400" />
          </div>
        </div>

        {/* Contenido principal */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Página no encontrada
        </h1>

        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          Lo sentimos, la página que buscas no existe o ha sido movida. Pero no
          te preocupes, podemos ayudarte a encontrar lo que necesitas.
        </p>

        {/* Enlaces de navegación */}
        <div className="space-y-4 mb-8">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-violet-700 transition-colors"
          >
            <FaHome />
            Ir al inicio
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 ml-4 border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors"
          >
            <FaArrowLeft />
            Volver atrás
          </button>
        </div>

        {/* Enlaces útiles */}
        <div className="border-t border-slate-200 pt-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Enlaces útiles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <Link
              to="/home"
              className="block p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <h3 className="font-medium text-slate-900 mb-1">Inicio</h3>
              <p className="text-sm text-slate-600">
                Conoce mis servicios de automatización
              </p>
            </Link>

            <Link
              to="/home#sobre-mi"
              className="block p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <h3 className="font-medium text-slate-900 mb-1">Sobre mí</h3>
              <p className="text-sm text-slate-600">
                Mi experiencia y filosofía
              </p>
            </Link>

            <Link
              to="/home#proyectos"
              className="block p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <h3 className="font-medium text-slate-900 mb-1">Proyectos</h3>
              <p className="text-sm text-slate-600">
                Casos de éxito y soluciones
              </p>
            </Link>

            <Link
              to="/home#contacto"
              className="block p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <h3 className="font-medium text-slate-900 mb-1">Contacto</h3>
              <p className="text-sm text-slate-600">
                Hablemos sobre tu proyecto
              </p>
            </Link>
          </div>
        </div>

        {/* Mensaje de ayuda */}
        <div className="mt-8 p-6 bg-violet-50 rounded-lg">
          <h3 className="font-medium text-violet-900 mb-2">
            ¿Necesitas ayuda?
          </h3>
          <p className="text-violet-700 text-sm">
            Si crees que esto es un error, puedes contactarme directamente en{" "}
            <a
              href="mailto:contacto@benjamincorrea.com"
              className="text-violet-600 hover:text-violet-800 underline"
            >
              contacto@benjamincorrea.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
