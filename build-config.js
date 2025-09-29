// Configuración para optimización de build y CDN
const path = require("path");

module.exports = {
  // Configuración para assets estáticos
  staticAssets: {
    // Rutas que deben servirse desde CDN
    cdnPaths: [
      "/static/css/",
      "/static/js/",
      "/static/media/",
      "/img/",
      "/icons/",
    ],

    // Headers para cache
    cacheHeaders: {
      css: "public, max-age=31536000, immutable",
      js: "public, max-age=31536000, immutable",
      images: "public, max-age=31536000, immutable",
      fonts: "public, max-age=31536000, immutable",
    },
  },

  // Configuración para S3 + CloudFront
  s3CloudFront: {
    // Bucket de S3
    bucket: process.env.S3_BUCKET || "your-bucket-name",

    // Distribución de CloudFront
    distributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID,

    // Configuración de cache
    cacheBehaviors: {
      // CSS y JS con cache largo
      "static/css/*": {
        ttl: 31536000, // 1 año
        headers: ["Cache-Control", "Expires"],
      },
      "static/js/*": {
        ttl: 31536000,
        headers: ["Cache-Control", "Expires"],
      },
      // Imágenes con cache largo
      "img/*": {
        ttl: 31536000,
        headers: ["Cache-Control", "Expires"],
      },
      // HTML con cache corto
      "*.html": {
        ttl: 3600, // 1 hora
        headers: ["Cache-Control", "Expires"],
      },
    },
  },

  // Scripts de build
  buildScripts: {
    // Script para subir a S3
    deploy: `
      aws s3 sync build/ s3://\${S3_BUCKET} --delete \\
        --cache-control "public, max-age=31536000" \\
        --exclude "*.html" \\
        --exclude "*.xml" \\
        --exclude "*.txt"
      
      aws s3 sync build/ s3://\${S3_BUCKET} --delete \\
        --cache-control "public, max-age=3600" \\
        --include "*.html" \\
        --include "*.xml" \\
        --include "*.txt"
    `,

    // Script para invalidar CloudFront
    invalidate: `
      aws cloudfront create-invalidation \\
        --distribution-id \${CLOUDFRONT_DISTRIBUTION_ID} \\
        --paths "/*"
    `,
  },
};
