import { useState, useEffect } from "react";

export const useCookies = () => {
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    functional: false,
    marketing: false,
  });

  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Cargar preferencias desde localStorage
    const consent = localStorage.getItem("cookieConsent");
    const savedPreferences = localStorage.getItem("cookiePreferences");

    if (consent === "true") {
      setHasConsent(true);
      if (savedPreferences) {
        const prefs = JSON.parse(savedPreferences);
        setPreferences(prefs);

        // Cargar scripts según las preferencias guardadas
        if (prefs.analytics) {
          loadGoogleAnalytics();
        }
        if (prefs.marketing) {
          loadMetaPixel();
        }
      }
    }
  }, []);

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
  // Cargar Meta Pixel
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
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    };

    loadPixel(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );
    window.fbq("init", "META_PIXEL_ID");
    window.fbq("track", "PageView");
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
    console.log("Cookies de analytics limpiadas");
  }
};

const clearMarketingCookies = () => {
  if (typeof window !== "undefined") {
    // Limpiar Meta Pixel
    if (window.fbq) {
      window.fbq("consent", "revoke");
    }
    console.log("Cookies de marketing limpiadas");
  }
};
