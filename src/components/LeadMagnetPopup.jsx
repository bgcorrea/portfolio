import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LeadMagnetPopup = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar si el usuario ya cerró el popup anteriormente
    const hasSeenPopup = localStorage.getItem("leadMagnetPopupSeen");

    if (!hasSeenPopup) {
      // Mostrar popup después de 10 segundos solo si no lo ha visto antes
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    // Marcar que el usuario ya vio el popup
    localStorage.setItem("leadMagnetPopupSeen", "true");

    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Esperar a que termine la animación
  };

  const handleDownload = () => {
    // Marcar que el usuario ya vio el popup
    localStorage.setItem("leadMagnetPopupSeen", "true");

    // Redirigir a la página de automatizaciones con el lead magnet
    window.location.href = "/automatizaciones#lead-magnet";
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón de cerrar */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                aria-label="Cerrar popup"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Contenido */}
              <div className="p-6">
                {/* Imagen del lead magnet */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <img
                      src="/img/leadmagnetimg.png"
                      alt="Guía de Automatización"
                      className="w-48 h-auto mx-auto rounded-lg shadow-lg"
                    />
                    {/* Efecto de brillo */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Título */}
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">
                  ¡Regalo especial! 🎁
                </h3>

                {/* Descripción */}
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  Descarga gratis mi{" "}
                  <strong>guía completa de automatización</strong> para
                  identificar en 5 minutos dónde estás perdiendo tiempo y
                  dinero.
                </p>

                {/* Lista de beneficios */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600 text-lg">✓</span>
                    <span className="text-sm text-gray-700">
                      Guía accionable con ejemplos reales
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600 text-lg">✓</span>
                    <span className="text-sm text-gray-700">
                      Plantilla de priorización
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600 text-lg">✓</span>
                    <span className="text-sm text-gray-700">
                      Estimaciones de ahorro
                    </span>
                  </div>
                </div>

                {/* Botones */}
                <div className="space-y-3">
                  <button
                    onClick={handleDownload}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                  >
                    Descargar Guía Gratis
                  </button>

                  <button
                    onClick={handleClose}
                    className="w-full text-gray-500 hover:text-gray-700 text-sm transition-colors"
                  >
                    No, gracias
                  </button>
                </div>

                {/* Texto de confianza */}
                <p className="text-xs text-gray-400 text-center mt-4">
                  Sin spam. Solo contenido de valor.
                </p>
              </div>

              {/* Efecto de gradiente en el borde */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none"></div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LeadMagnetPopup;
