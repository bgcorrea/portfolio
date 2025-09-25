import { useEffect, useRef, useState } from 'react';

/**
 * Hook para animaciones de scroll desde la derecha
 * @param {number} threshold - Porcentaje de visibilidad para activar animación (0-1)
 * @param {number} delay - Delay en ms antes de activar la animación
 * @returns {object} - { ref, isVisible }
 */
export const useScrollAnimation = (threshold = 0.1, delay = 0) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Aplicar delay si se especifica
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // Activar un poco antes de que sea completamente visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, delay]);

  return { ref, isVisible };
};

/**
 * Hook para animaciones escalonadas (stagger) de múltiples elementos
 * @param {number} itemCount - Número de elementos
 * @param {number} staggerDelay - Delay entre elementos en ms
 * @param {number} threshold - Porcentaje de visibilidad
 * @returns {Array} - Array de objetos { ref, isVisible } para cada elemento
 */
export const useStaggeredScrollAnimation = (itemCount, staggerDelay = 100, threshold = 0.1) => {
  const [visibleItems, setVisibleItems] = useState(new Array(itemCount).fill(false));
  const refs = useRef([]);

  useEffect(() => {
    const observers = refs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Aplicar delay escalonado
            setTimeout(() => {
              setVisibleItems(prev => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }, index * staggerDelay);
          }
        },
        {
          threshold,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => {
        if (observer) observer.disconnect();
      });
    };
  }, [itemCount, staggerDelay, threshold]);

  return refs.current.map((_, index) => ({
    ref: (el) => {
      refs.current[index] = el;
    },
    isVisible: visibleItems[index],
  }));
};
