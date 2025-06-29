require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

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

// Crear transportador de correo para GoDaddy
const createTransporter = async () => {
  try {
    return nodemailer.createTransport({
      host: "smtpout.secureserver.net", // Servidor SMTP de GoDaddy
      port: 587,
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: "contacto@benjamincorrea.com",
        pass: process.env.GODADDY_PASSWORD, // Contraseña de tu cuenta de correo
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  } catch (error) {
    console.error("Error creando transportador:", error);
    throw error;
  }
};

// Endpoint para enviar correo de contacto
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validar datos requeridos
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son requeridos",
      });
    }

    const formData = { name, email, subject, message };

    // Agregar datos a Google Sheets (en paralelo con el envío de correos)
    addToGoogleSheets(formData);

    const transporter = await createTransporter();

    // Correo para el propietario (contacto@benjamincorrea.com)
    const ownerMailOptions = {
      from: "contacto@benjamincorrea.com",
      to: "contacto@benjamincorrea.com",
      subject: `Nuevo mensaje de contacto: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #92400e;">Nuevo Mensaje de Contacto</h2>
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Asunto:</strong> ${subject}</p>
            <p><strong>Mensaje:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <p style="color: #666; font-size: 14px;">
            Este mensaje fue enviado desde el formulario de contacto de tu portfolio.
          </p>
        </div>
      `,
    };

    // Correo de confirmación para el remitente
    const senderMailOptions = {
      from: "contacto@benjamincorrea.com",
      to: email,
      subject: "Confirmación de mensaje enviado - Benjamin Correa",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #92400e;">¡Gracias por contactarme!</h2>
          <p>Hola ${name},</p>
          <p>He recibido tu mensaje y te responderé lo antes posible.</p>
          
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Detalles de tu mensaje:</h3>
            <p><strong>Asunto:</strong> ${subject}</p>
            <p><strong>Mensaje:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          
          <p>Mientras tanto, puedes revisar mi <a href="https://benjamincorrea.com/projects" style="color: #92400e;">portfolio</a> para conocer más sobre mi trabajo.</p>
          
          <p>Saludos,<br>
          <strong>Benjamin Correa</strong></p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 12px;">
            Este es un correo automático. Por favor, no respondas a este mensaje.
          </p>
        </div>
      `,
    };

    // Enviar ambos correos
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(senderMailOptions);

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
