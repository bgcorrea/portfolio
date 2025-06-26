# Configuración de Google Sheets

Este documento te guía para configurar la integración con Google Sheets.

## Paso 1: Crear la hoja de cálculo

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nombra la primera hoja como **"Contactos"**
4. Agrega los siguientes encabezados en la primera fila:
   - **A1**: Fecha y Hora
   - **B1**: Nombre
   - **C1**: Email
   - **D1**: Asunto
   - **E1**: Mensaje

## Paso 2: Obtener el ID de la hoja

1. En tu hoja de cálculo, mira la URL:
   ```
   https://docs.google.com/spreadsheets/d/TU_ID_AQUI/edit#gid=0
   ```
2. Copia el ID (la parte entre `/d/` y `/edit`)
3. Este ID lo usarás como `GOOGLE_SHEET_ID`

## Paso 3: Configurar Google Cloud Console

### 3.1 Crear proyecto

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **Google Sheets API**

### 3.2 Crear credenciales

1. Ve a **"APIs & Services" > "Credentials"**
2. Haz clic en **"Create Credentials" > "Service Account"**
3. Completa la información:
   - **Name**: `portfolio-contact-form`
   - **Description**: `Service account for portfolio contact form`
4. Haz clic en **"Create and Continue"**
5. En **"Grant this service account access to project"**, selecciona **"Editor"**
6. Haz clic en **"Done"**

### 3.3 Descargar credenciales

1. En la lista de service accounts, haz clic en el que acabas de crear
2. Ve a la pestaña **"Keys"**
3. Haz clic en **"Add Key" > "Create new key"**
4. Selecciona **"JSON"**
5. Descarga el archivo y renómbralo como `credentials.json`
6. Coloca este archivo en la carpeta `backend/`

## Paso 4: Compartir la hoja de cálculo

1. En tu hoja de cálculo de Google Sheets
2. Haz clic en **"Share"** (Compartir)
3. Agrega el email del service account (está en el archivo `credentials.json`)
4. Dale permisos de **"Editor"**

## Paso 5: Configurar variables de entorno

En Railway, agrega estas variables:

- `GOOGLE_SHEET_ID`: El ID de tu hoja de cálculo
- `GOOGLE_APPLICATION_CREDENTIALS`: `credentials.json`

## Paso 6: Subir el archivo de credenciales

1. Sube el archivo `credentials.json` a Railway
2. O configura las credenciales como variables de entorno

## Estructura de la hoja

Tu hoja debería verse así:

| Fecha y Hora        | Nombre     | Email            | Asunto   | Mensaje              |
| ------------------- | ---------- | ---------------- | -------- | -------------------- |
| 25/06/2025 20:01:30 | Juan Pérez | juan@ejemplo.com | Consulta | Hola, me interesa... |

## Notas importantes

- El archivo `credentials.json` contiene información sensible, no lo subas a GitHub
- La hoja se actualiza automáticamente cada vez que alguien completa el formulario
- Los datos se agregan con fecha y hora en zona horaria de Chile
- Si hay un error con Google Sheets, el envío de correos sigue funcionando
