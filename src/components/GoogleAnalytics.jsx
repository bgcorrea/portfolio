import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Solo cargar en producción
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    // Cargar Google Analytics de forma asíncrona
    const loadGoogleAnalytics = () => {
      // Crear script de Google Analytics
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      // Configurar gtag
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", process.env.REACT_APP_GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: false, // Lo manejaremos manualmente
      });
    };

    // Cargar después de un pequeño delay para no bloquear el renderizado
    const timer = setTimeout(loadGoogleAnalytics, 100);

    return () => clearTimeout(timer);
  }, []);

  // Track page views cuando cambia la ruta
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && window.gtag) {
      window.gtag("config", process.env.REACT_APP_GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [location]);

  return null; // Este componente no renderiza nada
};

export default GoogleAnalytics;
