import React, { useState, useEffect, useRef } from "react";

const LazySection = ({
  children,
  className = "",
  threshold = 0.1,
  rootMargin = "50px",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          // Desconectar el observer después de la primera carga
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [threshold, rootMargin, hasLoaded]);

  return (
    <div
      ref={sectionRef}
      className={`transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      {isVisible && children}
    </div>
  );
};

export default LazySection;
