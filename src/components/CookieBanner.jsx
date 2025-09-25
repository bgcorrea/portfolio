import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCookies } from "../hooks/useCookies";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [localPreferences, setLocalPreferences] = useState({
    essential: true,
    analytics: false,
    functional: false,
    marketing: false,
  });
  const { preferences, hasConsent, updatePreferences } = useCookies();

  useEffect(() => {
    // Solo mostrar banner si no hay consentimiento previo
    if (!hasConsent) {
      setShowBanner(true);
    }
  }, [hasConsent]);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      functional: true,
      marketing: true,
    };
    updatePreferences(allAccepted);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      functional: false,
      marketing: false,
    };
    updatePreferences(onlyEssential);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    updatePreferences(localPreferences);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handlePreferenceChange = (type) => {
    if (type === "essential") return; // No se puede desactivar
    setLocalPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
      >
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          {!showPreferences ? (
            // Banner principal
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  🍪 Uso de Cookies
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Utilizamos cookies para mejorar tu experiencia, analizar el
                  tráfico y personalizar contenido. Puedes gestionar tus
                  preferencias en cualquier momento.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <button
                  onClick={() => setShowPreferences(true)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Personalizar
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Solo Esenciales
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                >
                  Aceptar Todas
                </button>
              </div>
            </div>
          ) : (
            // Panel de preferencias
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Preferencias de Cookies
                </h3>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {/* Cookies Esenciales */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      Cookies Esenciales
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Necesarias para el funcionamiento básico del sitio web
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-3">
                      Siempre activo
                    </span>
                    <div className="w-12 h-6 bg-indigo-600 rounded-full flex items-center justify-end pr-1">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Cookies Analíticas */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      Cookies Analíticas
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Google Analytics, análisis de uso (2 años)
                    </p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange("analytics")}
                    className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                      localPreferences.analytics
                        ? "bg-indigo-600 justify-end pr-1"
                        : "bg-gray-300 justify-start pl-1"
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>

                {/* Cookies Funcionales */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      Cookies Funcionales
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Recordar preferencias del usuario (1 año)
                    </p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange("functional")}
                    className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                      localPreferences.functional
                        ? "bg-indigo-600 justify-end pr-1"
                        : "bg-gray-300 justify-start pl-1"
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>

                {/* Cookies Marketing */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      Cookies de Marketing
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Meta Pixel, publicidad personalizada (1 año)
                    </p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange("marketing")}
                    className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                      localPreferences.marketing
                        ? "bg-indigo-600 justify-end pr-1"
                        : "bg-gray-300 justify-start pl-1"
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowPreferences(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                >
                  Guardar Preferencias
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieBanner;
