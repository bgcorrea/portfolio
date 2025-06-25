# Portfolio - Benjamin Correa

Portfolio personal desarrollado con React y Tailwind CSS, con sistema de envío automático de correos.

## Características

- **Frontend**: React con Tailwind CSS
- **Backend**: Node.js con Express
- **Sistema de correos**: Envío automático usando Gmail API
- **Responsive**: Diseño adaptativo para todos los dispositivos
- **Modo oscuro**: Soporte para tema claro y oscuro

## Sistema de Envío de Correos

Cuando alguien completa el formulario de contacto:

1. **Correo al propietario**: Se envía automáticamente a `contacto@benjamincorrea.com` con los detalles del mensaje
2. **Correo de confirmación**: Se envía automáticamente al remitente confirmando que se recibió su mensaje

### Configuración del Backend

Sigue las instrucciones detalladas en [backend/README.md](backend/README.md) para configurar el envío de correos.

## Instalación y Uso

### Frontend

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start

# Construir para producción
npm run build
```

### Backend

```bash
# Navegar al directorio del backend
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno (ver backend/README.md)
# Crear archivo .env con las credenciales de Gmail

# Ejecutar en desarrollo
npm run dev

# Ejecutar en producción
npm start
```

## Estructura del Proyecto

```
portfolio/
├── src/                    # Código fuente del frontend
│   ├── components/         # Componentes reutilizables
│   ├── pages/             # Páginas de la aplicación
│   └── config.js          # Configuración del backend
├── backend/               # Servidor Node.js
│   ├── index.js           # Servidor principal
│   ├── package.json       # Dependencias del backend
│   └── README.md          # Instrucciones del backend
└── public/                # Archivos estáticos
```

## Tecnologías Utilizadas

- **Frontend**: React, Tailwind CSS, JavaScript
- **Backend**: Node.js, Express, Nodemailer, Google APIs
- **Despliegue**: Vercel (frontend), Render/Railway (backend)

## Contacto

- **Email**: contacto@benjamincorrea.com
- **Teléfono**: +56 9 7856 6046
- **Ubicación**: Santiago, Chile
