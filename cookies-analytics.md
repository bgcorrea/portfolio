# 🍪 Guía Completa: Cookies para Análisis de Métricas Web

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Tipos de Cookies para Analytics](#tipos-de-cookies-para-analytics)
3. [Implementación Práctica](#implementación-práctica)
4. [Métricas Clave a Rastrear](#métricas-clave-a-rastrear)
5. [Configuración de Google Analytics 4](#configuración-de-google-analytics-4)
6. [Eventos Personalizados](#eventos-personalizados)
7. [Cumplimiento Legal (GDPR/LGPD)](#cumplimiento-legal-gdprlgpd)
8. [Optimización de Conversiones](#optimización-de-conversiones)
9. [Herramientas Adicionales](#herramientas-adicionales)
10. [Ejemplos de Código](#ejemplos-de-código)

---

## 🎯 Introducción

Las cookies son archivos de texto pequeños que se almacenan en el navegador del usuario y permiten recopilar datos valiosos sobre el comportamiento, preferencias y patrones de navegación. Para tu sitio web de automatizaciones, esto es crucial para entender cómo los usuarios interactúan con tu contenido y optimizar la conversión.

### Beneficios para tu Negocio:

- **Análisis de comportamiento**: Entender qué páginas visitan más
- **Seguimiento de conversiones**: Medir efectividad de CTAs y formularios
- **Personalización**: Mostrar contenido relevante basado en intereses
- **Optimización**: Identificar puntos de fricción en el funnel

---

## 🍪 Tipos de Cookies para Analytics

### 1. **Cookies de Sesión**

```javascript
// Se eliminan al cerrar el navegador
sessionStorage.setItem("session_id", generateId());
sessionStorage.setItem("page_views", "1");
```

### 2. **Cookies Persistentes**

```javascript
// Permanecen por un tiempo determinado
document.cookie =
  "user_id=12345; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/";
document.cookie = "utm_source=google; max-age=2592000; path=/"; // 30 días
```

### 3. **Cookies de Primera Parte** (Tus dominios)

- Control total sobre los datos
- Mejor para privacidad
- Cumplimiento más fácil

### 4. **Cookies de Terceros** (Servicios externos)

- Google Analytics
- Facebook Pixel
- Hotjar
- Intercom

---

## 🛠 Implementación Práctica

### Configuración Básica de Cookies

```javascript
// Utilidades para manejo de cookies
const CookieManager = {
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

  // Eliminar cookie
  delete: (name) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  },
};
```

### Tracking de Usuario Único

```javascript
// Generar ID único para cada visitante
const getOrCreateUserId = () => {
  let userId = CookieManager.get("user_id");
  if (!userId) {
    userId =
      "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    CookieManager.set("user_id", userId, 365); // 1 año
  }
  return userId;
};

// Tracking de sesión
const trackSession = () => {
  const sessionId =
    sessionStorage.getItem("session_id") || "session_" + Date.now();
  sessionStorage.setItem("session_id", sessionId);

  // Incrementar contador de visitas
  const visitCount = parseInt(CookieManager.get("visit_count") || "0") + 1;
  CookieManager.set("visit_count", visitCount.toString(), 365);

  return sessionId;
};
```

---

## 📊 Métricas Clave a Rastrear

### 1. **Métricas de Comportamiento**

```javascript
// Tiempo en página
const trackTimeOnPage = () => {
  const startTime = Date.now();
  window.addEventListener("beforeunload", () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    CookieManager.set(
      "time_on_page_" + window.location.pathname,
      timeSpent.toString(),
      30
    );
  });
};

// Scroll depth
const trackScrollDepth = () => {
  let maxScroll = 0;
  window.addEventListener("scroll", () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      CookieManager.set(
        "scroll_depth_" + window.location.pathname,
        maxScroll.toString(),
        30
      );
    }
  });
};

// Clicks en elementos específicos
const trackElementClicks = (selector, eventName) => {
  document.addEventListener("click", (e) => {
    if (e.target.matches(selector)) {
      const clickCount = parseInt(CookieManager.get(eventName) || "0") + 1;
      CookieManager.set(eventName, clickCount.toString(), 30);

      // Enviar a Google Analytics
      if (window.gtag) {
        window.gtag("event", eventName, {
          event_category: "engagement",
          event_label: e.target.textContent || e.target.href,
        });
      }
    }
  });
};
```

### 2. **Métricas de Conversión**

```javascript
// Tracking de formularios
const trackFormSubmission = (formSelector, formName) => {
  document.addEventListener("submit", (e) => {
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

      // Tracking para Google Analytics
      if (window.gtag) {
        window.gtag("event", "form_submit", {
          event_category: "conversion",
          event_label: formName,
          value: 1,
        });
      }
    }
  });
};

// Tracking de descargas de lead magnets
const trackLeadMagnetDownload = () => {
  document.addEventListener("click", (e) => {
    if (
      e.target.textContent.includes("Descargar") ||
      e.target.textContent.includes("checklist")
    ) {
      CookieManager.set("lead_magnet_downloaded", "true", 365);

      if (window.gtag) {
        window.gtag("event", "download", {
          event_category: "lead_magnet",
          event_label: "checklist_automatizaciones",
        });
      }
    }
  });
};
```

---

## 📈 Configuración de Google Analytics 4

### Implementación Básica

```html
<!-- Google Analytics 4 -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID", {
    // Configuraciones personalizadas
    custom_map: {
      custom_parameter_1: "user_type",
      custom_parameter_2: "lead_stage",
    },
  });
</script>
```

### Eventos Personalizados para tu Sitio

```javascript
// Función centralizada para tracking
const trackEvent = (eventName, parameters = {}) => {
  // Guardar en cookies para análisis local
  const eventData = {
    event: eventName,
    timestamp: new Date().toISOString(),
    page: window.location.pathname,
    ...parameters,
  };

  // Almacenar en localStorage para análisis posterior
  const events = JSON.parse(localStorage.getItem("tracked_events") || "[]");
  events.push(eventData);
  localStorage.setItem("tracked_events", JSON.stringify(events.slice(-100))); // Últimos 100 eventos

  // Enviar a Google Analytics
  if (window.gtag) {
    window.gtag("event", eventName, parameters);
  }
};

// Eventos específicos para tu landing page de automatizaciones
const setupAutomationTracking = () => {
  // Botón "Agendar Consulta"
  trackElementClicks('a[href*="automatizaciones"]', "lp_auto_agendar");

  // Botón "Descargar checklist"
  trackElementClicks('a[href="#lead-magnet"]', "lp_auto_checklist");

  // Formulario de contacto
  trackFormSubmission("#contact-form", "contact_form");

  // Tiempo en página
  trackTimeOnPage();

  // Scroll depth
  trackScrollDepth();
};
```

---

## 🎯 Eventos Personalizados

### Eventos para tu Funnel de Conversión

```javascript
// Definir etapas del funnel
const funnelStages = {
  AWARENESS: "awareness",
  INTEREST: "interest",
  CONSIDERATION: "consideration",
  INTENT: "intent",
  PURCHASE: "purchase",
};

// Tracking del progreso en el funnel
const trackFunnelStage = (stage, additionalData = {}) => {
  CookieManager.set("current_funnel_stage", stage, 30);

  trackEvent("funnel_progression", {
    event_category: "funnel",
    event_label: stage,
    custom_parameter_1: CookieManager.get("user_id"),
    ...additionalData,
  });
};

// Eventos específicos por página
const pageSpecificTracking = {
  "/automatizaciones": () => {
    trackFunnelStage(funnelStages.INTEREST, {
      page_type: "landing_page",
      service: "automatization",
    });

    // Tracking de tiempo en hero section
    setTimeout(() => {
      if (document.querySelector(".hero-section")) {
        trackEvent("hero_section_viewed", {
          event_category: "engagement",
          time_on_hero: 5,
        });
      }
    }, 5000);
  },

  "/": () => {
    trackFunnelStage(funnelStages.AWARENESS, {
      page_type: "homepage",
      entry_point: "organic",
    });
  },
};
```

---

## ⚖️ Cumplimiento Legal (GDPR/LGPD)

### Banner de Cookies

```javascript
const CookieConsent = {
  showBanner: () => {
    if (!CookieManager.get("cookie_consent")) {
      const banner = document.createElement("div");
      banner.id = "cookie-banner";
      banner.innerHTML = `
        <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #1f2937; color: white; padding: 20px; z-index: 1000;">
          <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
            <p style="margin: 0;">Utilizamos cookies para mejorar tu experiencia y analizar el tráfico del sitio. 
            <a href="/privacidad" style="color: #60a5fa;">Más información</a></p>
            <div>
              <button id="accept-cookies" style="background: #3b82f6; color: white; border: none; padding: 8px 16px; margin-right: 10px; border-radius: 4px;">Aceptar</button>
              <button id="reject-cookies" style="background: transparent; color: white; border: 1px solid white; padding: 8px 16px; border-radius: 4px;">Rechazar</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(banner);

      // Event listeners
      document
        .getElementById("accept-cookies")
        .addEventListener("click", () => {
          CookieManager.set("cookie_consent", "accepted", 365);
          CookieManager.set("analytics_enabled", "true", 365);
          banner.remove();
          initializeAnalytics();
        });

      document
        .getElementById("reject-cookies")
        .addEventListener("click", () => {
          CookieManager.set("cookie_consent", "rejected", 365);
          CookieManager.set("analytics_enabled", "false", 365);
          banner.remove();
        });
    } else if (CookieManager.get("cookie_consent") === "accepted") {
      initializeAnalytics();
    }
  },
};

// Inicializar analytics solo si está permitido
const initializeAnalytics = () => {
  if (CookieManager.get("analytics_enabled") === "true") {
    setupAutomationTracking();
    pageSpecificTracking[window.location.pathname]?.();
  }
};
```

---

## 🚀 Optimización de Conversiones

### A/B Testing con Cookies

```javascript
const ABTesting = {
  // Asignar variante al usuario
  assignVariant: (testName, variants) => {
    let variant = CookieManager.get(testName + "_variant");
    if (!variant) {
      const randomIndex = Math.floor(Math.random() * variants.length);
      variant = variants[randomIndex];
      CookieManager.set(testName + "_variant", variant, 30);
    }
    return variant;
  },

  // Tracking de conversión por variante
  trackConversion: (testName, conversionType) => {
    const variant = CookieManager.get(testName + "_variant");
    trackEvent("ab_test_conversion", {
      event_category: "ab_testing",
      event_label: testName + "_" + variant + "_" + conversionType,
      test_name: testName,
      variant: variant,
      conversion_type: conversionType,
    });
  },
};

// Ejemplo: Test de botón CTA
const runCTATest = () => {
  const variant = ABTesting.assignVariant("cta_button", [
    "original",
    "new_version",
  ]);

  if (variant === "new_version") {
    document.querySelector(".cta-button").textContent =
      "¡Agenda tu consulta GRATIS!";
    document.querySelector(".cta-button").style.background = "#10b981";
  }

  // Tracking de clics
  document.querySelector(".cta-button").addEventListener("click", () => {
    ABTesting.trackConversion("cta_button", "click");
  });
};
```

### Segmentación de Usuarios

```javascript
const UserSegmentation = {
  // Identificar tipo de usuario
  identifyUserType: () => {
    const visitCount = parseInt(CookieManager.get("visit_count") || "0");
    const timeOnSite = parseInt(CookieManager.get("total_time_on_site") || "0");
    const isConverted = CookieManager.get("is_converted_lead") === "true";

    let userType = "new_visitor";
    if (visitCount > 3) userType = "returning_visitor";
    if (timeOnSite > 300) userType = "engaged_visitor"; // 5 minutos
    if (isConverted) userType = "converted_lead";

    CookieManager.set("user_type", userType, 365);
    return userType;
  },

  // Personalizar experiencia
  personalizeExperience: (userType) => {
    switch (userType) {
      case "new_visitor":
        // Mostrar mensaje de bienvenida
        document.querySelector(".hero-message").textContent =
          "¡Bienvenido! Descubre cómo automatizar tu negocio";
        break;
      case "returning_visitor":
        // Mostrar contenido más avanzado
        document.querySelector(".hero-message").textContent =
          "¡Hola de nuevo! ¿Listo para el siguiente paso?";
        break;
      case "converted_lead":
        // Mostrar ofertas especiales
        document.querySelector(".hero-message").textContent =
          "¡Gracias por tu interés! Aquí tienes recursos exclusivos";
        break;
    }
  },
};
```

---

## 🔧 Herramientas Adicionales

### Dashboard de Métricas en Tiempo Real

```javascript
const MetricsDashboard = {
  // Recopilar métricas actuales
  collectMetrics: () => {
    const metrics = {
      pageViews: parseInt(CookieManager.get("page_views") || "0"),
      visitCount: parseInt(CookieManager.get("visit_count") || "0"),
      timeOnSite: parseInt(CookieManager.get("total_time_on_site") || "0"),
      leadMagnetDownloads:
        CookieManager.get("lead_magnet_downloaded") === "true" ? 1 : 0,
      formSubmissions: parseInt(
        CookieManager.get("contact_form_submissions") || "0"
      ),
      userType: CookieManager.get("user_type") || "unknown",
      currentFunnelStage:
        CookieManager.get("current_funnel_stage") || "awareness",
    };

    return metrics;
  },

  // Enviar métricas al backend (opcional)
  sendMetrics: async (metrics) => {
    try {
      await fetch("/api/metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...metrics,
          userId: CookieManager.get("user_id"),
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer,
        }),
      });
    } catch (error) {
      console.log("Error sending metrics:", error);
    }
  },
};
```

---

## 💻 Ejemplos de Código Completo

### Inicialización Completa para tu Sitio

```javascript
// analytics.js - Archivo principal de tracking
document.addEventListener("DOMContentLoaded", () => {
  // 1. Mostrar banner de cookies
  CookieConsent.showBanner();

  // 2. Inicializar tracking básico
  const userId = getOrCreateUserId();
  const sessionId = trackSession();

  // 3. Configurar tracking de tiempo
  trackTimeOnPage();
  trackScrollDepth();

  // 4. Identificar tipo de usuario
  const userType = UserSegmentation.identifyUserType();
  UserSegmentation.personalizeExperience(userType);

  // 5. Configurar tracking específico por página
  const currentPage = window.location.pathname;
  if (pageSpecificTracking[currentPage]) {
    pageSpecificTracking[currentPage]();
  }

  // 6. Configurar A/B tests
  runCTATest();

  // 7. Tracking de eventos específicos
  trackElementClicks('a[href*="automatizaciones"]', "lp_auto_agendar");
  trackElementClicks('a[href="#lead-magnet"]', "lp_auto_checklist");
  trackFormSubmission("#contact-form", "contact_form");
  trackLeadMagnetDownload();

  // 8. Enviar métricas iniciales
  setTimeout(() => {
    const metrics = MetricsDashboard.collectMetrics();
    MetricsDashboard.sendMetrics(metrics);
  }, 5000);
});

// Función para exportar datos (para análisis posterior)
const exportUserData = () => {
  const userData = {
    userId: CookieManager.get("user_id"),
    visitCount: CookieManager.get("visit_count"),
    userType: CookieManager.get("user_type"),
    events: JSON.parse(localStorage.getItem("tracked_events") || "[]"),
    timestamp: new Date().toISOString(),
  };

  const dataStr = JSON.stringify(userData, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "user-analytics-data.json";
  link.click();
};
```

---

## 📋 Checklist de Implementación

### Fase 1: Configuración Básica

- [ ] Implementar CookieManager
- [ ] Configurar Google Analytics 4
- [ ] Crear banner de consentimiento
- [ ] Implementar tracking de usuario único

### Fase 2: Eventos Específicos

- [ ] Tracking de formularios
- [ ] Tracking de botones CTA
- [ ] Tracking de tiempo en página
- [ ] Tracking de scroll depth

### Fase 3: Optimización

- [ ] Implementar A/B testing
- [ ] Configurar segmentación de usuarios
- [ ] Crear dashboard de métricas
- [ ] Configurar alertas de conversión

### Fase 4: Análisis Avanzado

- [ ] Implementar funnel tracking
- [ ] Configurar eventos personalizados
- [ ] Crear reportes automáticos
- [ ] Integrar con CRM

---

## 🎯 Métricas Clave para tu Negocio

### KPIs de Conversión

1. **Tasa de conversión de lead magnet**: Descargas / Visitas únicas
2. **Tasa de conversión de formulario**: Envíos / Visitas únicas
3. **Tiempo hasta conversión**: Tiempo promedio desde primera visita
4. **Tasa de retorno**: Visitantes que regresan
5. **Engagement rate**: Tiempo en sitio / Páginas vistas

### Métricas de Comportamiento

1. **Páginas más visitadas**
2. **Rutas de navegación más comunes**
3. **Puntos de salida principales**
4. **Elementos más clickeados**
5. **Dispositivos y navegadores más usados**

---

## 🚨 Consideraciones Importantes

### Privacidad y Ética

- Siempre informar sobre el uso de cookies
- Permitir opt-out fácil
- Minimizar datos recopilados
- Seguir GDPR/LGPD

### Rendimiento

- Cargar scripts de analytics de forma asíncrona
- Limitar frecuencia de eventos
- Optimizar tamaño de cookies
- Usar localStorage para datos temporales

### Mantenimiento

- Revisar métricas regularmente
- Actualizar eventos según cambios en el sitio
- Limpiar datos antiguos
- Monitorear errores de tracking

---

## 📞 Próximos Pasos

1. **Implementar la configuración básica** siguiendo los ejemplos de código
2. **Configurar Google Analytics 4** con eventos personalizados
3. **Probar el tracking** en diferentes navegadores y dispositivos
4. **Analizar datos iniciales** y ajustar según necesidades
5. **Implementar optimizaciones** basadas en insights

¿Necesitas ayuda implementando alguna parte específica o tienes preguntas sobre el análisis de datos?
