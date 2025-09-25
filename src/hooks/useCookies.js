import { useState, useEffect } from "react";

export const useCookies = () => {
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    functional: false,
    marketing: false,
  });

  const [hasConsent, setHasConsent] = useState(() => {
    // Leer directamente del localStorage en la inicialización
    if (typeof window !== "undefined") {
      return localStorage.getItem("cookieConsent") === "true";
    }
    return false;
  });

  useEffect(() => {
    // Solo cargar scripts si ya hay consentimiento
    if (hasConsent) {
      const savedPreferences = localStorage.getItem("cookiePreferences");
      if (savedPreferences) {
        const prefs = JSON.parse(savedPreferences);
        setPreferences(prefs);

        // Cargar scripts según las preferencias guardadas de forma asíncrona
        setTimeout(() => {
          if (prefs.analytics) {
            loadGoogleAnalytics();
          }
          if (prefs.marketing) {
            loadMetaPixel();
          }
        }, 500);
      }
    }
  }, [hasConsent]);

  const updatePreferences = (newPreferences) => {
    const oldPreferences = preferences;
    setPreferences(newPreferences);
    localStorage.setItem("cookieConsent", "true");
    localStorage.setItem("cookiePreferences", JSON.stringify(newPreferences));

    // Cargar scripts según las nuevas preferencias
    if (newPreferences.analytics && !oldPreferences.analytics) {
      loadGoogleAnalytics();
    }
    if (newPreferences.marketing && !oldPreferences.marketing) {
      loadMetaPixel();
    }

    // Limpiar cookies si se desactivaron
    if (!newPreferences.analytics && oldPreferences.analytics) {
      clearAnalyticsCookies();
    }
    if (!newPreferences.marketing && oldPreferences.marketing) {
      clearMarketingCookies();
    }
  };

  const resetConsent = () => {
    localStorage.removeItem("cookieConsent");
    localStorage.removeItem("cookiePreferences");
    setHasConsent(false);
    setPreferences({
      essential: true,
      analytics: false,
      functional: false,
      marketing: false,
    });
  };

  return {
    preferences,
    hasConsent,
    updatePreferences,
    resetConsent,
  };
};

// Funciones para cargar scripts de terceros
const loadGoogleAnalytics = () => {
  // Cargar Google Analytics
  if (typeof window !== "undefined" && !window.gtag) {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID";
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", "GA_MEASUREMENT_ID");
  }
};

const loadMetaPixel = () => {
  // Solo cargar Meta Pixel si hay un ID válido configurado
  const pixelId = "META_PIXEL_ID";
  if (!pixelId || pixelId === "META_PIXEL_ID") {
    // No hay ID válido, crear función mock
    window.fbq = function () {};
    return;
  }

  if (typeof window !== "undefined" && !window.fbq) {
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
      t.onerror = function () {
        window.fbq = function () {};
      };
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    };

    try {
      loadPixel(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js"
      );
      // Inicializar con el ID válido
      window.fbq("init", pixelId);
      window.fbq("track", "PageView");
    } catch (error) {
      window.fbq = function () {};
    }
  }
};

// Funciones para limpiar cookies
const clearAnalyticsCookies = () => {
  if (typeof window !== "undefined") {
    // Limpiar Google Analytics
    if (window.gtag) {
      window.gtag("config", "GA_MEASUREMENT_ID", {
        send_page_view: false,
      });
    }
  }
};

const clearMarketingCookies = () => {
  if (typeof window !== "undefined") {
    // Limpiar Meta Pixel
    if (window.fbq) {
      window.fbq("consent", "revoke");
    }
  }
};
