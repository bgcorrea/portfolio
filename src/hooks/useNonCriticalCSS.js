import { useEffect } from "react";

const useNonCriticalCSS = () => {
  useEffect(() => {
    // Cargar CSS no crítico después de que la página se haya cargado
    const loadNonCriticalCSS = () => {
      // Cargar Tailwind CSS de forma diferida
      const tailwindLink = document.createElement("link");
      tailwindLink.rel = "stylesheet";
      tailwindLink.href = "/static/css/main.css"; // Ruta después del build
      tailwindLink.media = "print";
      tailwindLink.onload = () => {
        tailwindLink.media = "all";
      };
      document.head.appendChild(tailwindLink);
    };

    // Cargar inmediatamente si la página ya está cargada
    if (document.readyState === "complete") {
      loadNonCriticalCSS();
    } else {
      // Cargar cuando la página esté completamente cargada
      window.addEventListener("load", loadNonCriticalCSS);

      return () => {
        window.removeEventListener("load", loadNonCriticalCSS);
      };
    }
  }, []);
};

export default useNonCriticalCSS;
