// Utilidades para tracking de cookies y analytics
export const CookieManager = {
  // Crear cookie
  set: (name, value, days = 30) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  },

  // Obtener cookie
  get: (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },

  // Obtener todas las cookies
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

  // Eliminar cookie
  delete: (name) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  },

  // Limpiar cookies de analytics
  clearAnalytics: () => {
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
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ];

    analyticsCookies.forEach((cookie) => {
      document.cookie = `${cookie}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    });

    // Limpiar localStorage
    localStorage.removeItem("tracked_events");
    localStorage.removeItem("user_analytics_data");
  },
};

// Generar ID único para usuario
export const getOrCreateUserId = () => {
  let userId = CookieManager.get("user_id");
  if (!userId) {
    userId =
      "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    CookieManager.set("user_id", userId, 365); // 1 año
  }
  return userId;
};

// Tracking de sesión
export const trackSession = () => {
  const sessionId =
    sessionStorage.getItem("session_id") || "session_" + Date.now();
  sessionStorage.setItem("session_id", sessionId);
  sessionStorage.setItem("session_start", new Date().toISOString());

  // Incrementar contador de visitas
  const visitCount = parseInt(CookieManager.get("visit_count") || "0") + 1;
  CookieManager.set("visit_count", visitCount.toString(), 365);

  return sessionId;
};

// Función centralizada para tracking de eventos
export const trackEvent = (eventName, parameters = {}) => {
  // Verificar si analytics está habilitado
  if (CookieManager.get("analytics_enabled") !== "true") {
    return;
  }

  const eventData = {
    event: eventName,
    timestamp: new Date().toISOString(),
    page: window.location.pathname,
    userId: CookieManager.get("user_id"),
    sessionId: sessionStorage.getItem("session_id"),
    ...parameters,
  };

  // Almacenar en localStorage para análisis posterior (solo eventos importantes)
  if (
    eventName.includes("form_submit") ||
    eventName.includes("lead_magnet") ||
    eventName.includes("lp_auto")
  ) {
    const events = JSON.parse(localStorage.getItem("tracked_events") || "[]");
    events.push(eventData);
    // Mantener solo los últimos 50 eventos importantes
    localStorage.setItem("tracked_events", JSON.stringify(events.slice(-50)));
  }

  // Enviar a Google Analytics si está disponible
  if (window.gtag) {
    window.gtag("event", eventName, {
      event_category: parameters.event_category || "general",
      event_label: parameters.event_label || eventName,
      value: parameters.value || 1,
      ...parameters,
    });
  }

  // Sin logs de consola para ser menos invasivo
};

// Tracking de tiempo en página
export const trackTimeOnPage = () => {
  const startTime = Date.now();
  const pageKey = "time_on_page_" + window.location.pathname;

  // Limpiar evento anterior si existe
  window.removeEventListener("beforeunload", window.trackTimeOnPageUnload);

  window.trackTimeOnPageUnload = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    CookieManager.set(pageKey, timeSpent.toString(), 30);

    // Actualizar tiempo total en sitio
    const totalTime =
      parseInt(CookieManager.get("total_time_on_site") || "0") + timeSpent;
    CookieManager.set("total_time_on_site", totalTime.toString(), 365);

    // Solo trackear si el tiempo es significativo (más de 30 segundos)
    if (timeSpent > 30) {
      trackEvent("page_time_spent", {
        event_category: "engagement",
        event_label: window.location.pathname,
        value: timeSpent,
      });
    }
  };

  window.addEventListener("beforeunload", window.trackTimeOnPageUnload);
};

// Tracking de scroll depth
export const trackScrollDepth = () => {
  let maxScroll = 0;
  const pageKey = "scroll_depth_" + window.location.pathname;

  const handleScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );

    if (scrollPercent > maxScroll && scrollPercent <= 100) {
      maxScroll = scrollPercent;
      CookieManager.set(pageKey, maxScroll.toString(), 30);

      // Tracking de milestones de scroll (solo hitos importantes)
      if (maxScroll >= 50 && maxScroll < 75) {
        trackEvent("scroll_50_percent", {
          event_category: "engagement",
          event_label: window.location.pathname,
        });
      } else if (maxScroll >= 90) {
        trackEvent("scroll_90_percent", {
          event_category: "engagement",
          event_label: window.location.pathname,
        });
      }
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  // Limpiar event listener al cambiar de página
  return () => window.removeEventListener("scroll", handleScroll);
};

// Tracking de clicks en elementos específicos
export const trackElementClicks = (selector, eventName) => {
  const handleClick = (e) => {
    if (e.target.matches(selector)) {
      const clickCount = parseInt(CookieManager.get(eventName) || "0") + 1;
      CookieManager.set(eventName, clickCount.toString(), 30);

      trackEvent(eventName, {
        event_category: "engagement",
        event_label: e.target.textContent?.trim() || e.target.href || selector,
        value: clickCount,
      });
    }
  };

  document.addEventListener("click", handleClick);

  return () => document.removeEventListener("click", handleClick);
};

// Tracking de formularios
export const trackFormSubmission = (formSelector, formName) => {
  const handleSubmit = (e) => {
    if (e.target.matches(formSelector)) {
      const submissionCount =
        parseInt(CookieManager.get(formName + "_submissions") || "0") + 1;
      CookieManager.set(
        formName + "_submissions",
        submissionCount.toString(),
        365
      );

      // Marcar como lead convertido
      CookieManager.set("is_converted_lead", "true", 365);

      trackEvent("form_submit", {
        event_category: "conversion",
        event_label: formName,
        value: submissionCount,
      });
    }
  };

  document.addEventListener("submit", handleSubmit);

  return () => document.removeEventListener("submit", handleSubmit);
};

// Tracking de descargas de lead magnets
export const trackLeadMagnetDownload = () => {
  const handleClick = (e) => {
    if (
      e.target.textContent.includes("Descargar") ||
      e.target.textContent.includes("checklist") ||
      e.target.textContent.includes("regalo") ||
      e.target.href?.includes("download") ||
      e.target.href?.includes("checklist")
    ) {
      CookieManager.set("lead_magnet_downloaded", "true", 365);

      trackEvent("lead_magnet_download", {
        event_category: "conversion",
        event_label: "checklist_automatizaciones",
        value: 1,
      });
    }
  };

  document.addEventListener("click", handleClick);

  return () => document.removeEventListener("click", handleClick);
};

// Identificar tipo de usuario
export const identifyUserType = () => {
  const visitCount = parseInt(CookieManager.get("visit_count") || "0");
  const timeOnSite = parseInt(CookieManager.get("total_time_on_site") || "0");
  const isConverted = CookieManager.get("is_converted_lead") === "true";

  let userType = "new_visitor";
  if (isConverted) {
    userType = "converted_lead";
  } else if (visitCount > 3) {
    userType = "returning_visitor";
  } else if (timeOnSite > 300) {
    // 5 minutos
    userType = "engaged_visitor";
  }

  CookieManager.set("user_type", userType, 365);
  return userType;
};

// Tracking de etapas del funnel
export const trackFunnelStage = (stage, additionalData = {}) => {
  CookieManager.set("current_funnel_stage", stage, 30);

  trackEvent("funnel_progression", {
    event_category: "funnel",
    event_label: stage,
    custom_parameter_1: CookieManager.get("user_id"),
    ...additionalData,
  });
};

// Configuración de tracking específico por página
export const setupPageTracking = (pagePath) => {
  const pageConfigs = {
    "/": () => {
      trackFunnelStage("awareness", {
        page_type: "homepage",
        entry_point: "organic",
      });
    },
    "/automatizaciones": () => {
      trackFunnelStage("interest", {
        page_type: "landing_page",
        service: "automatization",
      });

      // Tracking de tiempo en hero section
      setTimeout(() => {
        if (document.querySelector(".hero-section, .pt-24")) {
          trackEvent("hero_section_viewed", {
            event_category: "engagement",
            time_on_hero: 5,
          });
        }
      }, 5000);
    },
  };

  if (pageConfigs[pagePath]) {
    pageConfigs[pagePath]();
  }
};

// Inicialización completa del sistema de tracking
export const initializeAnalytics = () => {
  // Verificar consentimiento
  const consent = CookieManager.get("cookie_consent");
  if (consent !== "accepted") {
    return;
  }

  // Configurar analytics como habilitado
  CookieManager.set("analytics_enabled", "true", 365);

  // Inicializar tracking básico
  getOrCreateUserId();
  trackSession();
  const userType = identifyUserType();

  // Configurar tracking de comportamiento
  trackTimeOnPage();
  const scrollCleanup = trackScrollDepth();

  // Función para tracking de botones por texto
  const trackButtonByText = (text, eventName) => {
    const handleClick = (e) => {
      if (
        e.target.textContent &&
        e.target.textContent.toLowerCase().includes(text.toLowerCase())
      ) {
        const clickCount = parseInt(CookieManager.get(eventName) || "0") + 1;
        CookieManager.set(eventName, clickCount.toString(), 30);

        trackEvent(eventName, {
          event_category: "engagement",
          event_label: e.target.textContent.trim(),
          value: clickCount,
        });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  };

  // Configurar tracking de eventos específicos
  const clickCleanups = [
    trackElementClicks('a[href*="automatizaciones"]', "lp_auto_agendar"),
    trackElementClicks('a[href="#lead-magnet"]', "lp_auto_checklist"),
    trackButtonByText("Agendar", "cta_agendar_click"),
  ];

  const formCleanup = trackFormSubmission(
    "#contact-form, .contact-form",
    "contact_form"
  );
  const leadMagnetCleanup = trackLeadMagnetDownload();

  // Configurar tracking específico por página
  setupPageTracking(window.location.pathname);

  // Tracking inicial
  trackEvent("page_view", {
    event_category: "navigation",
    event_label: window.location.pathname,
    user_type: userType,
    visit_count: CookieManager.get("visit_count"),
  });

  // Función de limpieza
  return () => {
    scrollCleanup();
    clickCleanups.forEach((cleanup) => cleanup());
    formCleanup();
    leadMagnetCleanup();
  };
};

// Banner de consentimiento de cookies mejorado
export const showCookieConsent = () => {
  // Verificar si ya hay consentimiento (aceptado o rechazado)
  const consent = CookieManager.get("cookie_consent");
  if (consent === "accepted" || consent === "rejected") {
    return; // Ya se ha mostrado y el usuario decidió
  }

  // Verificar si ya existe el banner para evitar duplicados
  if (document.getElementById("cookie-consent-banner")) {
    return;
  }

  const banner = document.createElement("div");
  banner.id = "cookie-consent-banner";
  banner.innerHTML = `
    <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #ffffff; border-top: 1px solid #e5e7eb; padding: 20px; z-index: 1000; box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);">
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 280px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
              <span style="font-size: 24px;">🍪</span>
              <h3 style="margin: 0; font-size: 18px; font-weight: 600; color: #1f2937;">Gestionar Cookies</h3>
            </div>
            <p style="margin: 0 0 12px 0; font-size: 14px; line-height: 1.5; color: #6b7280;">
              Utilizamos cookies esenciales para el funcionamiento del sitio y cookies opcionales para análisis y personalización.
            </p>
            <a href="/cookies" style="color: #3b82f6; text-decoration: underline; font-size: 14px;">
              Ver política de cookies
            </a>
          </div>
          <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
            <button id="accept-essential-cookies" style="background: transparent; color: #6b7280; border: 1px solid #d1d5db; padding: 10px 16px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s;">
              Solo Esenciales
            </button>
            <button id="accept-all-cookies" style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s;">
              Aceptar Todas
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(banner);

  // Event listeners
  document
    .getElementById("accept-all-cookies")
    .addEventListener("click", () => {
      CookieManager.set("cookie_consent", "accepted", 365);
      CookieManager.set("analytics_enabled", "true", 365);
      CookieManager.set("marketing_enabled", "true", 365);
      CookieManager.set("functional_enabled", "true", 365);
      banner.remove();
      initializeAnalytics();
    });

  document
    .getElementById("accept-essential-cookies")
    .addEventListener("click", () => {
      CookieManager.set("cookie_consent", "essential_only", 365);
      CookieManager.set("analytics_enabled", "false", 365);
      CookieManager.set("marketing_enabled", "false", 365);
      CookieManager.set("functional_enabled", "false", 365);
      banner.remove();
      // No inicializar analytics, solo cookies esenciales
    });
};

// Exportar datos para análisis
export const exportAnalyticsData = () => {
  const cookies = CookieManager.getAll();
  const events = JSON.parse(localStorage.getItem("tracked_events") || "[]");

  const exportData = {
    cookies,
    events,
    sessionData: {
      sessionId: sessionStorage.getItem("session_id"),
      sessionStart: sessionStorage.getItem("session_start"),
      currentPage: window.location.pathname,
      userAgent: navigator.userAgent,
      referrer: document.referrer,
    },
    timestamp: new Date().toISOString(),
  };

  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `analytics-export-${
    new Date().toISOString().split("T")[0]
  }.json`;
  link.click();

  URL.revokeObjectURL(url);

  return exportData;
};
