// Utilidades para manejo de CDN
export const getCDNUrl = (path) => {
  // En desarrollo, usar rutas locales
  if (process.env.NODE_ENV === "development") {
    return path;
  }

  // En producción, usar CDN si está configurado
  const cdnUrl = process.env.REACT_APP_CDN_URL;
  if (cdnUrl) {
    // Remover slash inicial si existe
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `${cdnUrl}/${cleanPath}`;
  }

  return path;
};

// Optimizar imágenes para CDN
export const getOptimizedImageUrl = (src, options = {}) => {
  const { width, height, quality = 80, format = "webp" } = options;

  // Si es un CDN que soporta transformaciones (como Cloudinary, ImageKit, etc.)
  const cdnUrl = process.env.REACT_APP_CDN_URL;
  if (cdnUrl && cdnUrl.includes("cloudinary")) {
    const transformations = [];

    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    if (quality) transformations.push(`q_${quality}`);
    if (format) transformations.push(`f_${format}`);

    const cleanSrc = src.startsWith("/") ? src.slice(1) : src;
    return `${cdnUrl}/image/upload/${transformations.join(",")}/${cleanSrc}`;
  }

  // Fallback a URL normal
  return getCDNUrl(src);
};

// Preload recursos críticos
export const preloadCriticalResources = () => {
  const criticalResources = [
    "/img/hero-automation-coherent.svg",
    "/img/profile.png",
    "/static/css/main.css",
  ];

  criticalResources.forEach((resource) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = getCDNUrl(resource);

    if (resource.endsWith(".css")) {
      link.as = "style";
    } else if (resource.endsWith(".js")) {
      link.as = "script";
    } else if (resource.match(/\.(png|jpg|jpeg|webp|avif|svg)$/)) {
      link.as = "image";
    }

    document.head.appendChild(link);
  });
};

// Configurar headers para assets estáticos
export const getAssetHeaders = () => {
  return {
    "Cache-Control": "public, max-age=31536000, immutable",
    Expires: new Date(Date.now() + 31536000 * 1000).toUTCString(),
  };
};
