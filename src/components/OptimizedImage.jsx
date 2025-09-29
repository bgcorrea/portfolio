import React, { useState } from "react";
import { getCDNUrl, getOptimizedImageUrl } from "../utils/cdnUtils";

const OptimizedImage = ({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  ...props
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Generar srcset para diferentes tamaños usando CDN
  const generateSrcSet = (baseSrc) => {
    const basePath = baseSrc.replace(/\.[^/.]+$/, "");
    const extension = baseSrc.split(".").pop();

    return [
      `${getCDNUrl(basePath)}.${extension} 1x`,
      `${getCDNUrl(basePath)}@2x.${extension} 2x`,
      `${getCDNUrl(basePath)}@3x.${extension} 3x`,
    ].join(", ");
  };

  // Intentar cargar WebP primero, fallback a formato original
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  // Si hay error, mostrar imagen de fallback
  if (imageError) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${className} bg-gray-200`}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        {...props}
      />
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div
          className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`}
          style={{ width, height }}
        />
      )}
      <picture>
        {/* WebP format for modern browsers */}
        <source
          srcSet={generateSrcSet(src.replace(/\.[^/.]+$/, ".webp"))}
          type="image/webp"
          sizes={sizes}
        />
        {/* AVIF format for even better compression */}
        <source
          srcSet={generateSrcSet(src.replace(/\.[^/.]+$/, ".avif"))}
          type="image/avif"
          sizes={sizes}
        />
        {/* Fallback to original format */}
        <img
          src={getCDNUrl(src)}
          alt={alt}
          className={`${className} ${
            isLoading ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleImageLoad}
          onError={handleImageError}
          sizes={sizes}
          {...props}
        />
      </picture>
    </div>
  );
};

export default OptimizedImage;
