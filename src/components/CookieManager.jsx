import { useEffect } from "react";
import { useCookies } from "../hooks/useCookies";

const CookieManager = () => {
  const { preferences, hasConsent } = useCookies();

  useEffect(() => {
    if (!hasConsent) return;

    // Cargar Google Analytics si está habilitado
    if (preferences.analytics) {
      loadGoogleAnalytics();
    }

    // Cargar Meta Pixel si está habilitado
    if (preferences.marketing) {
      loadMetaPixel();
    }

    // Cargar cookies funcionales si está habilitado
    if (preferences.functional) {
      loadFunctionalCookies();
    }
  }, [preferences, hasConsent]);

  return null; // Este componente no renderiza nada
};

// Función para cargar Google Analytics
const loadGoogleAnalytics = () => {
  if (typeof window !== "undefined" && !window.gtag) {
    // Crear script de Google Analytics
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID";
    document.head.appendChild(script);

    // Inicializar gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", "GA_MEASUREMENT_ID", {
      anonymize_ip: true,
      cookie_flags: "SameSite=None;Secure",
    });

    console.log("Google Analytics cargado");
  }
};

// Función para cargar Meta Pixel
const loadMetaPixel = () => {
  if (typeof window !== "undefined" && !window.fbq) {
    // Script de Meta Pixel
    const loadPixel = function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    };

    loadPixel(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );

    // Inicializar Meta Pixel
    window.fbq("init", "META_PIXEL_ID");
    window.fbq("track", "PageView");

    console.log("Meta Pixel cargado");
  }
};

// Función para cargar cookies funcionales
const loadFunctionalCookies = () => {
  // Aquí puedes agregar lógica para cookies funcionales
  // Por ejemplo, recordar preferencias del usuario
  console.log("Cookies funcionales cargadas");

  // Ejemplo: cargar preferencias de tema
  const savedTheme = localStorage.getItem("darkMode");
  if (savedTheme) {
    document.documentElement.classList.toggle("dark", JSON.parse(savedTheme));
  }
};

// Función para limpiar cookies cuando se desactivan
export const clearAnalyticsCookies = () => {
  if (typeof window !== "undefined") {
    // Limpiar Google Analytics
    if (window.gtag) {
      window.gtag("config", "GA_MEASUREMENT_ID", {
        send_page_view: false,
      });
    }

    // Limpiar Meta Pixel
    if (window.fbq) {
      window.fbq("consent", "revoke");
    }

    console.log("Cookies de analytics limpiadas");
  }
};

export const clearMarketingCookies = () => {
  if (typeof window !== "undefined") {
    // Limpiar Meta Pixel
    if (window.fbq) {
      window.fbq("consent", "revoke");
    }

    console.log("Cookies de marketing limpiadas");
  }
};

export default CookieManager;
