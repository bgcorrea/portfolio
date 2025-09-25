# 🎯 Configuración del Lead Magnet

## Variables de Entorno Necesarias

### Backend (Railway)

```bash
RESEND_API_KEY=tu_api_key_de_resend
CONTACT_FROM=contacto@benjamincorrea.com
CONTACT_TO=contacto@benjamincorrea.com
CAL_LINK=https://cal.com/benjamin-correa-8pbfpd/diagnostico-30min
```

### Frontend (Vercel)

```bash
REACT_APP_CAL_LINK=https://cal.com/benjamin-correa-8pbfpd/diagnostico-30min
```

## Archivos Creados

### Backend

- `backend/src/lib/email/resendLeadMagnet.js` - Módulo de emails para lead magnet
- `backend/index.js` - Endpoint POST /api/lead-magnet agregado

### Frontend

- `src/components/LeadMagnetForm.jsx` - Formulario del lead magnet
- `public/lead-magnet/checklist-5-procesos.txt` - Archivo del lead magnet (reemplazar por PDF)

### Páginas Modificadas

- `src/pages/Automatizaciones.jsx` - Reemplazado ContactForm por LeadMagnetForm

## Funcionalidades Implementadas

✅ **Endpoint POST /api/lead-magnet**

- Rate limiting (20 requests/minuto)
- CORS configurado
- Validación de campos
- Honeypot anti-spam
- Guardado en Google Sheets (opcional)

✅ **Emails Automáticos**

- Email al prospecto con descarga + CTA a Cal.com
- Email interno con datos del lead
- Templates HTML responsivos

✅ **Frontend**

- Formulario con validación
- Estado de éxito con descarga inmediata
- Honeypot anti-spam
- Integración con Cal.com

## Próximos Pasos

1. **Reemplazar archivo PDF**: Cambiar `checklist-5-procesos.txt` por un PDF real
2. **Configurar variables**: Agregar las variables de entorno en Railway y Vercel
3. **Configurar Google Sheets**: Crear hoja "LeadMagnet" con columnas A-E
4. **Probar funcionalidad**: Verificar que todo funcione correctamente

## Estructura de Google Sheets

Crear una hoja llamada "LeadMagnet" con estas columnas:

- A: Fecha y hora
- B: Nombre
- C: Email
- D: Fuente (lead-magnet)
- E: Página (/automatizaciones)
