# Usar Node.js 20 como base
FROM node:20-alpine

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias primero para aprovechar cache de Docker
COPY package*.json pnpm-lock.yaml ./
COPY backend/package*.json backend/pnpm-lock.yaml ./backend/

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar el resto del código (excluyendo node_modules por .dockerignore)
COPY . .

# Construir la aplicación frontend
RUN pnpm run build

# Exponer puerto
EXPOSE 3000

# Comando de inicio
CMD ["pnpm", "run", "start"]
