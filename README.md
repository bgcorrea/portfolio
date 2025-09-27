# Portfolio - Benjamín Correa

## Integración TikTok

### Configuración Backend (Railway)

El backend Express corre en Railway con las siguientes configuraciones:

- **CORS**: Configurado para `https://www.benjamincorrea.com`
- **Cookies**: Cross-site con `sameSite: "none"` y `secure: true`
- **Proxy Trust**: Configurado para Railway

### Variables de Entorno (Railway)

```env
TIKTOK_CLIENT_KEY=awjrv5cvmzlo4dd3
TIKTOK_CLIENT_SECRET=1Mk3DxIJZoZBGNrXRbN9pYESVDgwRwLk
TIKTOK_REDIRECT_URI=https://www.benjamincorrea.com/api/tiktok/callback
TIKTOK_SCOPES=user.info.basic,video.list
NODE_ENV=production
```

### Pruebas CORS

#### Verificar Preflight OPTIONS
```bash
curl -i -X OPTIONS \
  -H "Origin: https://www.benjamincorrea.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: content-type" \
  https://portfolio-production-acab.up.railway.app/api/tiktok/videos
```

**Esperado:**
```
Access-Control-Allow-Origin: https://www.benjamincorrea.com
Access-Control-Allow-Credentials: true
```

#### Test GET con Credenciales
```bash
curl -i \
  -H "Origin: https://www.benjamincorrea.com" \
  https://portfolio-production-acab.up.railway.app/api/tiktok/profile
```

### Frontend (Vercel)

El frontend React corre en Vercel con fetch configurado para credenciales:

```javascript
// Perfil
await fetch("https://portfolio-production-acab.up.railway.app/api/tiktok/profile", {
  method: "GET",
  credentials: "include"
});

// Videos
await fetch("https://portfolio-production-acab.up.railway.app/api/tiktok/videos", {
  method: "GET",
  credentials: "include"
});
```

### URLs de Prueba

- **Demo TikTok**: https://www.benjamincorrea.com/tiktok-demo
- **Términos**: https://www.benjamincorrea.com/terminos
- **Privacidad**: https://www.benjamincorrea.com/privacidad

### Deployment

1. **Backend**: Se despliega automáticamente en Railway al hacer push
2. **Frontend**: Se despliega automáticamente en Vercel al hacer push

### Estructura del Proyecto

```
portfolio/
├── backend/           # Express API (Railway)
│   ├── index.js      # Servidor principal
│   └── package.json  # Dependencias backend
├── src/              # React Frontend (Vercel)
│   ├── components/   # Componentes React
│   └── pages/        # Páginas React
└── public/           # Assets estáticos
```

### Dependencias Backend

```json
{
  "dependencies": {
    "express": "^5.1.0",
    "cors": "^2.8.5",
    "cookie-parser": "^1.4.6",
    "node-fetch": "^3.3.2"
  }
}
```