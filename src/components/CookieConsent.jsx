import { useEffect } from "react";

const CookieConsent = () => {
  useEffect(() => {
    // Verificar si ya hay consentimiento (aceptado o rechazado)
    const consent = document.cookie.includes("cookie_consent=");
    if (consent) {
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
        document.cookie =
          "cookie_consent=accepted; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/";
        banner.remove();
      });

    document
      .getElementById("accept-essential-cookies")
      .addEventListener("click", () => {
        document.cookie =
          "cookie_consent=essential_only; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/";
        banner.remove();
      });
  }, []);

  // Este componente no renderiza nada, solo maneja la lógica de cookies
  return null;
};

export default CookieConsent;
