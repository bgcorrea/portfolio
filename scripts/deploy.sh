#!/bin/bash

# Script de deployment para S3 + CloudFront
# Uso: ./scripts/deploy.sh

set -e

# Variables de entorno (configurar en tu CI/CD o localmente)
S3_BUCKET=${S3_BUCKET:-"your-bucket-name"}
CLOUDFRONT_DISTRIBUTION_ID=${CLOUDFRONT_DISTRIBUTION_ID:-"your-distribution-id"}
AWS_REGION=${AWS_REGION:-"us-east-1"}

echo "🚀 Iniciando deployment..."

# 1. Build del proyecto
echo "📦 Construyendo el proyecto..."
npm run build

# 2. Subir assets estáticos con cache largo
echo "📤 Subiendo assets estáticos..."
aws s3 sync build/ s3://$S3_BUCKET \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "*.html" \
  --exclude "*.xml" \
  --exclude "*.txt" \
  --exclude "*.json" \
  --region $AWS_REGION

# 3. Subir archivos HTML con cache corto
echo "📤 Subiendo archivos HTML..."
aws s3 sync build/ s3://$S3_BUCKET \
  --delete \
  --cache-control "public, max-age=3600" \
  --include "*.html" \
  --include "*.xml" \
  --include "*.txt" \
  --include "*.json" \
  --region $AWS_REGION

# 4. Configurar headers específicos para diferentes tipos de archivos
echo "⚙️ Configurando headers de cache..."

# CSS y JS con cache largo
aws s3 cp build/static/css/ s3://$S3_BUCKET/static/css/ \
  --recursive \
  --cache-control "public, max-age=31536000, immutable" \
  --content-type "text/css" \
  --region $AWS_REGION

aws s3 cp build/static/js/ s3://$S3_BUCKET/static/js/ \
  --recursive \
  --cache-control "public, max-age=31536000, immutable" \
  --content-type "application/javascript" \
  --region $AWS_REGION

# Imágenes con cache largo
aws s3 cp build/img/ s3://$S3_BUCKET/img/ \
  --recursive \
  --cache-control "public, max-age=31536000, immutable" \
  --region $AWS_REGION

# 5. Invalidar CloudFront
if [ ! -z "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
  echo "🔄 Invalidando CloudFront..."
  aws cloudfront create-invalidation \
    --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
    --paths "/*" \
    --region $AWS_REGION
fi

echo "✅ Deployment completado!"
echo "🌐 Tu sitio está disponible en: https://$S3_BUCKET.s3-website-$AWS_REGION.amazonaws.com"
