# Backend - Sistema de Envío de Correos

Este backend maneja el envío automático de correos cuando alguien completa el formulario de contacto usando GoDaddy.

## Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar GoDaddy - Contraseña de Correo

Para enviar correos desde `contacto@benjamincorrea.com` (GoDaddy), necesitas usar la contraseña de tu cuenta de correo:

#### Paso 1: Acceder a tu cuenta de GoDaddy

1. Ve a [https://www.godaddy.com/](https://www.godaddy.com/)
2. Inicia sesión con tu cuenta de GoDaddy
3. Ve a **"Mis Productos" > "Correo electrónico"**

#### Paso 2: Obtener la contraseña

1. Busca tu cuenta de correo `contacto@benjamincorrea.com`
2. Haz clic en **"Administrar"**
3. Ve a **"Configuración" > "Contraseña"**
4. **Usa tu contraseña actual** o cambia la contraseña si es necesario

### 3. Configurar variables de entorno

Crea un archivo `.env` en la carpeta `backend` con el siguiente contenido:

```env
GODADDY_PASSWORD=tu_contraseña_de_correo_godaddy_aqui
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

- **IMPORTANTE**: Usa la contraseña de tu cuenta de correo de GoDaddy
- El servidor SMTP de GoDaddy es `smtpout.secureserver.net`
- En producción, asegúrate de que las variables de entorno estén configuradas correctamente
- Si tienes problemas, verifica que la contraseña sea correcta

## Solución de problemas

### Error de autenticación

- Verifica que la contraseña de tu cuenta de correo sea correcta
- Asegúrate de que la cuenta de correo esté activa en GoDaddy
- Si cambiaste la contraseña recientemente, actualiza la variable de entorno

### Error de conexión

- Verifica que el puerto 587 esté disponible
- Algunos proveedores de hosting pueden bloquear el puerto SMTP
- El servidor SMTP de GoDaddy puede tener límites de envío

### Límites de GoDaddy

- GoDaddy tiene límites en el número de correos que puedes enviar por día
- Verifica los límites de tu plan de correo en GoDaddy
