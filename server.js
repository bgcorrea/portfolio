import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import fetch from "node-fetch";
import { google } from "googleapis";
import path from "path";
import { fileURLToPath } from "url";
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
const PORT = process.env.PORT || 3000;

// Para manejar __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Trust proxy para Railway
app.set("trust proxy", 1);

const ALLOWED_ORIGINS = ["https://www.benjamincorrea.com"];

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204, // por si algún proxy/navegador es quisquilloso
};

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1) Aplica CORS a todas las rutas (incluye /api/...)
app.use(cors(corsOptions));

// 2) Manejo de preflight SIN comodines inválidos
//    Usa un patrón válido en Express 5: /.*/ para cualquier ruta
app.options(/.*/, cors(corsOptions));

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
      "https://benjamincorrea.com/lead-magnet/guia-automatizacion-benjamin-correa.pdf";

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

// Endpoint para obtener videos de TikTok
app.get("/api/tiktok-videos", async (req, res) => {
  try {
    // Por ahora retornamos videos estáticos
    // En el futuro se puede integrar con la API oficial de TikTok
    const videos = [
      {
        id: "1",
        title: "Automatización en 60 segundos",
        thumbnail: "https://benjamincorrea.com/img/tiktok-thumb-1.jpg",
        likes: "2.1K",
        shares: "156",
        publishedAt: new Date(
          Date.now() - 2 * 24 * 60 * 60 * 1000
        ).toISOString(), // 2 días atrás
        videoUrl: "https://www.tiktok.com/@bgcorrea/video/1234567890",
      },
      {
        id: "2",
        title: "Low-code vs Full Stack",
        thumbnail: "https://benjamincorrea.com/img/tiktok-thumb-2.jpg",
        likes: "1.8K",
        shares: "89",
        publishedAt: new Date(
          Date.now() - 5 * 24 * 60 * 60 * 1000
        ).toISOString(), // 5 días atrás
        videoUrl: "https://www.tiktok.com/@bgcorrea/video/1234567891",
      },
      {
        id: "3",
        title: "APIs en 30 segundos",
        thumbnail: "https://benjamincorrea.com/img/tiktok-thumb-3.jpg",
        likes: "3.2K",
        shares: "234",
        publishedAt: new Date(
          Date.now() - 7 * 24 * 60 * 60 * 1000
        ).toISOString(), // 1 semana atrás
        videoUrl: "https://www.tiktok.com/@bgcorrea/video/1234567892",
      },
    ];

    res.json({ videos });
  } catch (error) {
    console.error("Error fetching TikTok videos:", error);
    res.status(500).json({ error: "Error al obtener videos de TikTok" });
  }
});

// Rutas de TikTok OAuth
app.get("/api/tiktok/auth", (req, res) => {
  const params = new URLSearchParams({
    client_key: "awjrv5cvmzlo4dd3",
    scope: "user.info.basic,video.list",
    response_type: "code",
    redirect_uri: "https://benjamincorrea.com/api/tiktok/callback",
    state: Math.random().toString(36).substring(7),
  });
  const authUrl = `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;
  res.redirect(authUrl);
});

app.get("/api/tiktok/callback", async (req, res) => {
  const { code, error } = req.query;

  const base = "https://benjamincorrea.com";
  if (error)
    return res.redirect(
      `${base}/tiktok-demo?error=${encodeURIComponent(error)}`
    );
  if (!code) return res.redirect(`${base}/tiktok-demo?error=missing_code`);

  try {
    const tokenRes = await fetch(
      "https://open.tiktokapis.com/v2/oauth/token/",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_key: "awjrv5cvmzlo4dd3",
          client_secret: "1Mk3DxIJZoZBGNrXRbN9pYESVDgwRwLk",
          code,
          grant_type: "authorization_code",
          redirect_uri: "https://benjamincorrea.com/api/tiktok/callback",
        }),
      }
    );

    const tokenJson = await tokenRes.json();
    if (!tokenRes.ok || tokenJson.error) {
      return res.redirect(`${base}/tiktok-demo?error=token_exchange_failed`);
    }

    const data = tokenJson.data;

    // Guardar en cookies
    res.cookie("tk_open_id", data.open_id, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    res.cookie("tk_access_token", data.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    res.cookie("tk_refresh_token", data.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    res.cookie("tk_exp", String(Date.now() + data.expires_in * 1000), {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    res.redirect(`${base}/tiktok-demo?connected=1`);
  } catch (error) {
    console.error("TikTok OAuth error:", error);
    res.redirect(`${base}/tiktok-demo?error=oauth_failed`);
  }
});

app.get("/api/tiktok/profile", async (req, res) => {
  try {
    const accessToken = req.cookies.tk_access_token;
    if (!accessToken) {
      return res.status(401).json({ error: "No access token" });
    }

    const profileRes = await fetch(
      "https://open.tiktokapis.com/v2/user/info/?fields=open_id,avatar_url,display_name",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const profileJson = await profileRes.json();
    if (!profileRes.ok || profileJson.error?.code !== "ok") {
      throw new Error(profileJson.error?.message || "TikTok profile error");
    }

    res.json({ user: profileJson.data.user });
  } catch (error) {
    console.error("TikTok profile error:", error);
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/tiktok/videos", async (req, res) => {
  try {
    const accessToken = req.cookies.tk_access_token;
    if (!accessToken) {
      return res.status(401).json({ error: "No access token" });
    }

    const videosRes = await fetch(
      "https://open.tiktokapis.com/v2/video/list/?fields=id,title,video_description,duration,cover_image_url,embed_link",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ max_count: 12 }),
      }
    );

    const videosJson = await videosRes.json();
    if (!videosRes.ok || videosJson.error?.code !== "ok") {
      throw new Error(videosJson.error?.message || "TikTok API error");
    }

    res.json({ videos: videosJson.data.videos });
  } catch (error) {
    console.error("TikTok videos error:", error);
    res.status(400).json({ error: error.message });
  }
});

// Servir archivos estáticos desde el build de React
app.use(express.static(path.join(__dirname, "build")));

// Catch-all handler: enviar React app para cualquier ruta no-API
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
