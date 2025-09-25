import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CookieAnalyticsDashboard = () => {
  const [metrics, setMetrics] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(5000); // 5 segundos por defecto
  const [activeTab, setActiveTab] = useState("overview");

  // Utilidades para manejo de cookies
  const CookieManager = {
    get: (name) => {
      const nameEQ = name + "=";
      const ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
          return c.substring(nameEQ.length, c.length);
      }
      return null;
    },
    getAll: () => {
      const cookies = {};
      document.cookie.split(";").forEach((cookie) => {
        const [name, value] = cookie.trim().split("=");
        if (name && value) {
          cookies[name] = decodeURIComponent(value);
        }
      });
      return cookies;
    },
  };

  // Recopilar todas las métricas
  const collectMetrics = useCallback(() => {
    const cookies = CookieManager.getAll();
    const events = JSON.parse(localStorage.getItem("tracked_events") || "[]");

    return {
      // Métricas básicas
      userId: cookies.user_id || "No asignado",
      visitCount: parseInt(cookies.visit_count || "0"),
      userType: cookies.user_type || "new_visitor",
      currentFunnelStage: cookies.current_funnel_stage || "awareness",
      isConvertedLead: cookies.is_converted_lead === "true",
      leadMagnetDownloaded: cookies.lead_magnet_downloaded === "true",

      // Métricas de tiempo
      totalTimeOnSite: parseInt(cookies.total_time_on_site || "0"),
      sessionStart:
        sessionStorage.getItem("session_start") || new Date().toISOString(),

      // Métricas de engagement
      contactFormSubmissions: parseInt(cookies.contact_form_submissions || "0"),
      lpAutoAgendarClicks: parseInt(cookies.lp_auto_agendar || "0"),
      lpAutoChecklistClicks: parseInt(cookies.lp_auto_checklist || "0"),

      // Métricas de páginas
      pageViews: parseInt(cookies.page_views || "0"),
      timeOnCurrentPage: parseInt(
        cookies["time_on_page_" + window.location.pathname] || "0"
      ),
      scrollDepth: parseInt(
        cookies["scroll_depth_" + window.location.pathname] || "0"
      ),

      // Eventos recientes
      recentEvents: events.slice(-10).reverse(),

      // Cookies técnicas
      cookieConsent: cookies.cookie_consent || "pending",
      analyticsEnabled: cookies.analytics_enabled === "true",

      // Información del navegador
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      currentPage: window.location.pathname,
      timestamp: new Date().toISOString(),
    };
  }, []);

  // Actualizar métricas
  const updateMetrics = useCallback(() => {
    const newMetrics = collectMetrics();
    setMetrics(newMetrics);
  }, [collectMetrics]);

  // Inicializar y configurar intervalo de actualización
  useEffect(() => {
    updateMetrics();
    const interval = setInterval(updateMetrics, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval, updateMetrics]);

  // Tracking de tiempo en tiempo real
  useEffect(() => {
    const startTime = Date.now();

    const updateTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      const currentMetrics = collectMetrics();
      setMetrics((prev) => ({
        ...prev,
        realTimeOnPage: timeSpent,
        sessionDuration: Math.round(
          (Date.now() - new Date(currentMetrics.sessionStart).getTime()) / 1000
        ),
      }));
    };

    const timeInterval = setInterval(updateTimeOnPage, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  // Formatear tiempo
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Obtener color según el tipo de usuario
  const getUserTypeColor = (userType) => {
    switch (userType) {
      case "converted_lead":
        return "text-green-600 bg-green-100";
      case "engaged_visitor":
        return "text-blue-600 bg-blue-100";
      case "returning_visitor":
        return "text-purple-600 bg-purple-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Obtener color según etapa del funnel
  const getFunnelStageColor = (stage) => {
    switch (stage) {
      case "purchase":
        return "text-green-600 bg-green-100";
      case "intent":
        return "text-orange-600 bg-orange-100";
      case "consideration":
        return "text-yellow-600 bg-yellow-100";
      case "interest":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Exportar datos
  const exportData = () => {
    const dataStr = JSON.stringify(metrics, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `analytics-${new Date().toISOString().split("T")[0]}.json`;
    link.click();

    URL.revokeObjectURL(url);
  };

  // Limpiar datos
  const clearData = () => {
    if (
      window.confirm(
        "¿Estás seguro de que quieres limpiar todos los datos de analytics?"
      )
    ) {
      // Limpiar cookies de analytics
      const analyticsCookies = [
        "user_id",
        "visit_count",
        "user_type",
        "current_funnel_stage",
        "is_converted_lead",
        "lead_magnet_downloaded",
        "total_time_on_site",
        "contact_form_submissions",
        "lp_auto_agendar",
        "lp_auto_checklist",
        "page_views",
        "cookie_consent",
        "analytics_enabled",
      ];

      analyticsCookies.forEach((cookie) => {
        document.cookie = `${cookie}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
      });

      // Limpiar localStorage
      localStorage.removeItem("tracked_events");
      sessionStorage.clear();

      // Actualizar métricas
      updateMetrics();
    }
  };

  // Componente de tarjeta de métrica
  const MetricCard = ({ title, value, subtitle, color = "indigo", icon }) => (
    <motion.div
      className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {icon && (
          <div className={`p-3 rounded-lg bg-${color}-100`}>
            <div className={`text-${color}-600`}>{icon}</div>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Botón flotante para mostrar/ocultar dashboard - Solo visible si hay consentimiento */}
      {(metrics.cookieConsent === "accepted" ||
        metrics.cookieConsent === "essential_only") && (
        <motion.button
          className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
          onClick={() => setIsVisible(!isVisible)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2 }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </motion.button>
      )}

      {/* Dashboard */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVisible(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">
                      Dashboard de Analytics
                    </h2>
                    <p className="text-indigo-100 mt-1">
                      Métricas en tiempo real
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Actualizar cada:</span>
                      <select
                        value={refreshInterval}
                        onChange={(e) =>
                          setRefreshInterval(parseInt(e.target.value))
                        }
                        className="bg-white text-gray-900 rounded px-2 py-1 text-sm"
                      >
                        <option value={1000}>1s</option>
                        <option value={5000}>5s</option>
                        <option value={10000}>10s</option>
                        <option value={30000}>30s</option>
                      </select>
                    </div>
                    <button
                      onClick={exportData}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded text-sm transition-colors"
                    >
                      Exportar
                    </button>
                    <button
                      onClick={clearData}
                      className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm transition-colors"
                    >
                      Limpiar
                    </button>
                    <button
                      onClick={() => setIsVisible(false)}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: "overview", label: "Resumen" },
                    { id: "behavior", label: "Comportamiento" },
                    { id: "conversion", label: "Conversiones" },
                    { id: "events", label: "Eventos" },
                    { id: "technical", label: "Técnico" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? "border-indigo-500 text-indigo-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Contenido */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <MetricCard
                        title="Usuario ID"
                        value={metrics.userId?.substring(0, 12) + "..."}
                        subtitle="ID único del visitante"
                        color="blue"
                        icon="👤"
                      />
                      <MetricCard
                        title="Visitas"
                        value={metrics.visitCount}
                        subtitle="Total de visitas"
                        color="green"
                        icon="📊"
                      />
                      <MetricCard
                        title="Tiempo en sitio"
                        value={formatTime(metrics.sessionDuration || 0)}
                        subtitle="Duración de la sesión"
                        color="purple"
                        icon="⏱️"
                      />
                      <MetricCard
                        title="Página actual"
                        value={metrics.timeOnCurrentPage || 0}
                        subtitle="segundos en esta página"
                        color="orange"
                        icon="📍"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Tipo de Usuario
                        </h3>
                        <div className="flex items-center space-x-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getUserTypeColor(
                              metrics.userType
                            )}`}
                          >
                            {metrics.userType?.replace("_", " ")}
                          </span>
                          {metrics.isConvertedLead && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              ✓ Lead Convertido
                            </span>
                          )}
                          {metrics.leadMagnetDownloaded && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              📥 Lead Magnet
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Etapa del Funnel
                        </h3>
                        <div className="flex items-center space-x-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getFunnelStageColor(
                              metrics.currentFunnelStage
                            )}`}
                          >
                            {metrics.currentFunnelStage}
                          </span>
                        </div>
                        <div className="mt-3 text-sm text-gray-600">
                          <p>Página: {metrics.currentPage}</p>
                          <p>Referrer: {metrics.referrer || "Directo"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "behavior" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <MetricCard
                        title="Scroll Depth"
                        value={`${metrics.scrollDepth || 0}%`}
                        subtitle="Profundidad de scroll"
                        color="blue"
                        icon="📜"
                      />
                      <MetricCard
                        title="Tiempo Real"
                        value={formatTime(metrics.realTimeOnPage || 0)}
                        subtitle="Tiempo en página actual"
                        color="green"
                        icon="⚡"
                      />
                      <MetricCard
                        title="Páginas Vistas"
                        value={metrics.pageViews || 0}
                        subtitle="Total de páginas vistas"
                        color="purple"
                        icon="👁️"
                      />
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Información del Navegador
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-700">
                            User Agent:
                          </p>
                          <p className="text-gray-600 break-all">
                            {metrics.userAgent}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Referrer:</p>
                          <p className="text-gray-600">
                            {metrics.referrer || "Ninguno (tráfico directo)"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "conversion" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <MetricCard
                        title="Formularios Enviados"
                        value={metrics.contactFormSubmissions || 0}
                        subtitle="Contact form submissions"
                        color="green"
                        icon="📝"
                      />
                      <MetricCard
                        title="Clicks Agendar"
                        value={metrics.lpAutoAgendarClicks || 0}
                        subtitle="Clicks en botón agendar"
                        color="blue"
                        icon="📅"
                      />
                      <MetricCard
                        title="Clicks Checklist"
                        value={metrics.lpAutoChecklistClicks || 0}
                        subtitle="Clicks en descargar checklist"
                        color="purple"
                        icon="📋"
                      />
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Estado de Conversión
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-4 h-4 rounded-full ${
                              metrics.isConvertedLead
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          ></div>
                          <span className="text-sm">
                            Lead Convertido:{" "}
                            {metrics.isConvertedLead ? "Sí" : "No"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-4 h-4 rounded-full ${
                              metrics.leadMagnetDownloaded
                                ? "bg-blue-500"
                                : "bg-gray-300"
                            }`}
                          ></div>
                          <span className="text-sm">
                            Lead Magnet Descargado:{" "}
                            {metrics.leadMagnetDownloaded ? "Sí" : "No"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "events" && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Eventos Recientes
                      </h3>
                      {metrics.recentEvents &&
                      metrics.recentEvents.length > 0 ? (
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                          {metrics.recentEvents.map((event, index) => (
                            <div
                              key={index}
                              className="bg-white rounded-lg p-3 border border-gray-200"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {event.event}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Página: {event.page}
                                  </p>
                                  {event.event_category && (
                                    <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded mt-1">
                                      {event.event_category}
                                    </span>
                                  )}
                                </div>
                                <div className="text-right">
                                  <p className="text-xs text-gray-500">
                                    {new Date(
                                      event.timestamp
                                    ).toLocaleTimeString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-8">
                          No hay eventos registrados
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "technical" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Configuración de Cookies
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Consentimiento:
                            </span>
                            <span
                              className={`font-medium ${
                                metrics.cookieConsent === "accepted"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {metrics.cookieConsent}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Analytics:</span>
                            <span
                              className={`font-medium ${
                                metrics.analyticsEnabled
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {metrics.analyticsEnabled
                                ? "Habilitado"
                                : "Deshabilitado"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Información de Sesión
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Inicio de sesión:
                            </span>
                            <span className="font-medium">
                              {new Date(
                                metrics.sessionStart
                              ).toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duración:</span>
                            <span className="font-medium">
                              {formatTime(metrics.sessionDuration || 0)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Todas las Cookies
                      </h3>
                      <div className="bg-white rounded-lg p-4 max-h-48 overflow-y-auto">
                        <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                          {JSON.stringify(CookieManager.getAll(), null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>
                    Última actualización:{" "}
                    {new Date(metrics.timestamp).toLocaleTimeString()}
                  </span>
                  <span>Dashboard v1.0 - Para uso interno</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieAnalyticsDashboard;
