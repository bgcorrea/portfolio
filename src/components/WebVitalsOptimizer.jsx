import React, { useEffect } from "react";
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

const WebVitalsOptimizer = () => {
  useEffect(() => {
    // Medir Core Web Vitals
    const measureWebVitals = () => {
      getCLS(() => {});
      getFID(() => {});
      getFCP(() => {});
      getLCP(() => {});
      getTTFB(() => {});
    };

    // Optimizar LCP - precargar la imagen más grande
    const optimizeLCP = () => {
      const heroImage = document.querySelector('img[alt*="Automatizaciones"]');
      if (heroImage && !heroImage.complete) {
        heroImage.loading = "eager";
        heroImage.fetchPriority = "high";
      }
    };

    // Optimizar FCP - reducir el tiempo de renderizado inicial
    const optimizeFCP = () => {
      // Remover estilos no críticos del renderizado inicial
      const nonCriticalStyles = document.querySelectorAll(
        'link[rel="stylesheet"]:not([data-critical])'
      );
      nonCriticalStyles.forEach((link) => {
        link.media = "print";
        link.onload = () => {
          link.media = "all";
        };
      });
    };

    // Aplicar optimizaciones
    optimizeLCP();
    optimizeFCP();

    // Medir métricas después de un pequeño delay
    setTimeout(measureWebVitals, 1000);

    // Optimizar scroll performance
    const optimizeScroll = () => {
      // Usar transform en lugar de cambiar propiedades que causan reflow
      const animatedElements = document.querySelectorAll('[class*="animate-"]');
      animatedElements.forEach((el) => {
        el.style.willChange = "transform";
      });
    };

    optimizeScroll();

    // Cleanup
    return () => {
      const animatedElements = document.querySelectorAll('[class*="animate-"]');
      animatedElements.forEach((el) => {
        el.style.willChange = "auto";
      });
    };
  }, []);

  return null; // Este componente no renderiza nada
};

export default WebVitalsOptimizer;
