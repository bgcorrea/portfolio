import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import { google } from "googleapis";
import {
  sendClientAutoReply,
  sendInternalNotification,
} from "./src/lib/email/resend.js";
import {
  sendLeadMagnetClient,
  sendLeadMagnetInternal,
} from "./src/lib/email/resendLeadMagnet.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      "https://benjamincorrea.com",
      "https://www.benjamincorrea.com",
      "http://localhost:5173",
    ],
    methods: ["POST", "GET", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json());

// Rate limiting para lead magnet
app.use(
  "/api/lead-magnet",
  rateLimit({
    windowMs: 60_000, // 1 minuto
    max: 20, // máximo 20 requests por minuto
    message: "Demasiadas solicitudes, intenta más tarde",
  })
);

// Configuración de Google Sheets
const auth = new google.auth.GoogleAuth({
  credentials: process.env.GOOGLE_CREDENTIALS_JSON
    ? JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON)
    : undefined,
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS || "credentials.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

// Función para agregar datos a Google Sheets
const addToGoogleSheets = async (formData) => {
  try {
    const timestamp = new Date().toLocaleString("es-CL", {
      timeZone: "America/Santiago",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const values = [
      [
        timestamp, // Fecha y hora
        formData.name, // Nombre
        formData.email, // Email
        formData.subject, // Asunto
        formData.message, // Mensaje
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Contactos!A:E", // Rango donde agregar datos
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: values,
      },
    });

    console.log("Datos agregados a Google Sheets exitosamente");
  } catch (error) {
    console.error("Error agregando datos a Google Sheets:", error);
    // No lanzamos el error para no interrumpir el envío de correos
  }
};

// Función para agregar lead magnet a Google Sheets
const addLeadMagnetToSheets = async (leadData) => {
  try {
    const timestamp = new Date().toLocaleString("es-CL", {
      timeZone: "America/Santiago",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const values = [
      [
        timestamp, // Fecha y hora
        leadData.name, // Nombre
        leadData.email, // Email
        leadData.source || "lead-magnet", // Fuente
        leadData.page || "/automatizaciones", // Página
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "LeadMagnet!A:E", // Rango donde agregar datos
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: values,
      },
    });

    console.log("Lead magnet agregado a Google Sheets exitosamente");
  } catch (error) {
    console.error("Error agregando lead magnet a Google Sheets:", error);
    // No lanzamos el error para no interrumpir el envío de correos
  }
};

// Función para validar email
function isEmail(s = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

// Endpoint para enviar correo de contacto
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validar datos requeridos
    if (!name || !email || !subject || !message || !isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Campos inválidos",
      });
    }

    const formData = { name, email, subject, message };

    // Agregar datos a Google Sheets (en paralelo con el envío de correos)
    addToGoogleSheets(formData);

    // Enviar correos con Resend (sin bloquear la respuesta)
    sendClientAutoReply({ name, email, message }).catch((err) =>
      console.error("CLIENT AUTO REPLY ERROR:", err)
    );

    sendInternalNotification({ name, email, message }).catch((err) =>
      console.error("INTERNAL NOTIFICATION ERROR:", err)
    );

    res.json({
      success: true,
      message: "Mensaje enviado exitosamente",
    });
  } catch (error) {
    console.error("Error enviando correo:", error);
    res.status(500).json({
      success: false,
      message: "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
    });
  }
});

// Endpoint para lead magnet
app.post("/api/lead-magnet", async (req, res) => {
  try {
    const { name, email, website } = req.body || {}; // website = honeypot
    const page = "/automatizaciones";
    const downloadUrl =
      "https://benjamincorrea.com/lead-magnet/checklist-5-procesos.pdf";

    // anti-spam (honeypot)
    if (website) return res.status(200).json({ ok: true }); // bot atrapado

    if (!name || !email || !isEmail(email)) {
      return res.status(400).json({ error: "Campos inválidos" });
    }

    const leadData = { name, email, source: "lead-magnet", page };

    // Guardar en Google Sheets
    addLeadMagnetToSheets(leadData);

    // Disparar emails en paralelo (no bloquear)
    Promise.allSettled([
      sendLeadMagnetInternal({ name, email, page }),
      sendLeadMagnetClient({ name, email, downloadUrl }),
    ]).catch((err) => console.error("LEADMAGNET EMAILS ERROR:", err));

    // Responder con link de descarga para UX inmediata
    return res.status(200).json({ ok: true, downloadUrl });
  } catch (err) {
    console.error("LEADMAGNET ERROR:", err);
    return res.status(500).json({ error: "Internal error" });
  }
});

// Endpoint de prueba
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Servidor funcionando correctamente" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
