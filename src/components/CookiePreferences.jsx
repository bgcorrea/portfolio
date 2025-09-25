import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCookies } from "../hooks/useCookies";

const CookiePreferences = () => {
  const { preferences, updatePreferences } = useCookies();
  const [showModal, setShowModal] = useState(false);

  const handlePreferenceChange = (type) => {
    if (type === "essential") return; // No se puede desactivar

    const newPreferences = {
      ...preferences,
      [type]: !preferences[type],
    };
    updatePreferences(newPreferences);
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      functional: true,
      marketing: true,
    };
    updatePreferences(allAccepted);
    setShowModal(false);
  };

  const handleRejectAll = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      functional: false,
      marketing: false,
    };
    updatePreferences(onlyEssential);
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-sm text-gray-500 hover:text-gray-700 underline"
      >
        Gestionar Cookies
      </button>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Preferencias de Cookies
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Cookies Esenciales */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        Cookies Esenciales
                      </h3>
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
                      <h3 className="font-medium text-gray-900">
                        Cookies Analíticas
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Google Analytics, análisis de uso (2 años)
                      </p>
                    </div>
                    <button
                      onClick={() => handlePreferenceChange("analytics")}
                      className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                        preferences.analytics
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
                      <h3 className="font-medium text-gray-900">
                        Cookies Funcionales
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Recordar preferencias del usuario (1 año)
                      </p>
                    </div>
                    <button
                      onClick={() => handlePreferenceChange("functional")}
                      className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                        preferences.functional
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
                      <h3 className="font-medium text-gray-900">
                        Cookies de Marketing
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Meta Pixel, publicidad personalizada (1 año)
                      </p>
                    </div>
                    <button
                      onClick={() => handlePreferenceChange("marketing")}
                      className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                        preferences.marketing
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
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancelar
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookiePreferences;
