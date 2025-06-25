# Backend - Sistema de Envío de Correos

Este backend maneja el envío automático de correos cuando alguien completa el formulario de contacto.

## Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Gmail OAuth2

Para enviar correos desde `contacto@benjamincorrea.com`, necesitas configurar OAuth2 en Google Cloud Console:

#### Paso 1: Crear proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Gmail

#### Paso 2: Configurar OAuth2

1. Ve a "APIs & Services" > "Credentials"
2. Haz clic en "Create Credentials" > "OAuth 2.0 Client IDs"
3. Selecciona "Web application"
4. Agrega `https://developers.google.com/oauthplayground` en "Authorized redirect URIs"
5. Guarda el Client ID y Client Secret

#### Paso 3: Obtener Refresh Token

1. Ve a [Google OAuth Playground](https://developers.google.com/oauthplayground/)
2. En la configuración (ícono de engranaje), marca "Use your own OAuth credentials"
3. Ingresa tu Client ID y Client Secret
4. En la lista de APIs, busca "Gmail API v1" y selecciona:
   - `https://mail.google.com/`
5. Haz clic en "Authorize APIs"
6. Inicia sesión con tu cuenta `contacto@benjamincorrea.com`
7. Haz clic en "Exchange authorization code for tokens"
8. Copia el "Refresh token"

### 3. Configurar variables de entorno

Crea un archivo `.env` en la carpeta `backend` con el siguiente contenido:

```env
GMAIL_CLIENT_ID=tu_client_id_aqui
GMAIL_CLIENT_SECRET=tu_client_secret_aqui
GMAIL_REDIRECT_URI=https://developers.google.com/oauthplayground
GMAIL_REFRESH_TOKEN=tu_refresh_token_aqui
PORT=5000
```

### 4. Ejecutar el servidor

```bash
# Desarrollo (con nodemon)
npm run dev

# Producción
npm start
```

## Endpoints

### POST /api/contact

Envía correos automáticos tanto al propietario como al remitente.

**Body:**

```json
{
  "name": "Nombre del remitente",
  "email": "email@ejemplo.com",
  "subject": "Asunto del mensaje",
  "message": "Contenido del mensaje"
}
```

**Respuesta exitosa:**

```json
{
  "success": true,
  "message": "Mensaje enviado exitosamente"
}
```

### GET /api/health

Endpoint de prueba para verificar que el servidor esté funcionando.

## Funcionalidad

Cuando alguien completa el formulario de contacto:

1. **Correo al propietario**: Se envía un correo a `contacto@benjamincorrea.com` con los detalles del mensaje
2. **Correo de confirmación**: Se envía un correo automático al remitente confirmando que se recibió su mensaje

## Notas importantes

- Asegúrate de que la cuenta `contacto@benjamincorrea.com` tenga habilitada la verificación en dos pasos
- Los tokens de OAuth2 tienen una duración limitada, pero el refresh token se renueva automáticamente
- En producción, considera usar variables de entorno seguras y no compartir las credenciales
