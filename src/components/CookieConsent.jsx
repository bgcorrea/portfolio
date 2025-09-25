import { useEffect } from "react";
import {
  showCookieConsent,
  initializeAnalytics,
} from "../utils/cookieAnalytics";

const CookieConsent = () => {
  useEffect(() => {
    // Mostrar banner de cookies solo si no hay consentimiento previo
    showCookieConsent();

    // Inicializar analytics si ya hay consentimiento aceptado (no essential_only)
    if (document.cookie.includes("cookie_consent=accepted")) {
      initializeAnalytics();
    }
  }, []);

  // Este componente no renderiza nada, solo maneja la lógica de cookies
  return null;
};

export default CookieConsent;
