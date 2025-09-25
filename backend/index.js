import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { google } from "googleapis";
import {
  sendClientAutoReply,
  sendInternalNotification,
} from "./src/lib/email/resend.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

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

// Endpoint de prueba
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Servidor funcionando correctamente" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
