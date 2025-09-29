import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_TO = process.env.CONTACT_TO || "contacto@benjamincorrea.com";
const CONTACT_FROM = process.env.CONTACT_FROM || "contacto@benjamincorrea.com";
const CAL_LINK =
  process.env.CAL_LINK ||
  "https://cal.com/benjamin-correa-8pbfpd/diagnostico-30min";

// Socials (mismos del Home; ajusta si están centralizados en otro módulo)
const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/soybenjacorrea" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/benja-correa" },
  { label: "Instagram", href: "https://www.instagram.com/soybenjacorrea" },
  { label: "TikTok", href: "https://www.tiktok.com/@soybenjacorrea" },
  { label: "YouTube", href: "https://www.youtube.com/@soybenjacorrea" },
  { label: "Email", href: "mailto:contacto@benjamincorrea.com" },
];

function baseWrap(inner) {
  return `<!DOCTYPE html><html lang="es" style="margin:0;padding:0;background:#F5F7FE;">
  <head><meta charset="utf-8" /><title>Checklist de Automatizaciones</title></head>
  <body style="margin:0;padding:24px;background:#F5F7FE;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center">
        <table role="presentation" width="640" cellpadding="0" cellspacing="0"
          style="background:#fff;border:1px solid #E5E7EB;border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(17,24,39,0.06);">
          ${inner}
          <tr><td style="padding:18px 32px;background:#F5F7FE;border-top:1px solid #E5E7EB;">
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6B7280;margin-bottom:10px;">
              Enviado por <a style="color:#7B7AE6;text-decoration:none;" href="https://benjamincorrea.com">benjamincorrea.com</a>
            </div>
            <div>
              ${SOCIAL_LINKS.map(
                (s) => `
                <a href="${s.href}" target="_blank"
                  style="display:inline-block;margin:0 8px 8px 0;padding:8px 12px;border:1px solid #7B7AE6;border-radius:999px;color:#7B7AE6;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;">
                  ${s.label}
                </a>
              `
              ).join("")}
            </div>
          </td></tr>
        </table>
        <div style="height:24px;"></div>
      </td></tr>
    </table>
  </body></html>`;
}

function header(title, subtitle) {
  return `<tr><td style="padding:28px 32px;background:linear-gradient(180deg,#F5F7FE 0%,#ffffff 100%);">
    <div style="font-family:Arial,Helvetica,sans-serif;color:#111827;font-weight:800;font-size:22px;">Benjamín Correa</div>
    <div style="font-family:Arial,Helvetica,sans-serif;color:#4B5563;font-size:13px;">Desarrollador Full Stack &amp; Especialista en Automatizaciones</div>
    <div style="height:10px"></div>
    <div style="font-family:Arial,Helvetica,sans-serif;color:#111827;font-weight:800;font-size:18px;">${title}</div>
    <div style="font-family:Arial,Helvetica,sans-serif;color:#6B7280;font-size:13px;">${subtitle}</div>
  </td></tr>`;
}

function escapeHtml(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function renderClientLeadMagnet({ name, downloadUrl }) {
  const body = `
    ${header(
      "¡Tu guía está lista!",
      "Guía práctica: 5 procesos que todo negocio digital debería automatizar"
    )}
    <tr><td style="padding:20px 32px;font-family:Arial,Helvetica,sans-serif;color:#111827;">
      <p style="margin:0 0 14px 0;color:#6B7280;font-size:14px;">Hola ${escapeHtml(
        name || ""
      )}, gracias por descargar mi guía de automatización.</p>

      <a href="${downloadUrl}" target="_blank"
         style="display:inline-block;background:#7B7AE6;color:#fff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 18px;border-radius:12px;">
        Descargar guía (PDF)
      </a>

      <div style="height:16px;"></div>
      <ul style="padding-left:18px;margin:0 0 16px 0;color:#374151;font-size:13px;line-height:1.7;">
        <li>Checklist accionable (ventas/leads, soporte, reportes, facturación, admin)</li>
        <li>Ejemplos en n8n/Make listos para replicar</li>
        <li>Estimaciones de ahorro por proceso</li>
        <li>Plantilla de priorización (impacto vs. esfuerzo)</li>
      </ul>

      <div style="margin:18px 0 16px 0;padding:14px;border:1px solid #E5E7EB;border-radius:12px;background:#F9FAFB;">
        <div style="font-size:13px;color:#6B7280;margin-bottom:6px;">¿Quieres ayuda para implementarlo?</div>
        <a href="${CAL_LINK}" target="_blank"
           style="display:inline-block;background:#7B7AE6;color:#fff;text-decoration:none;font-weight:700;font-size:14px;padding:10px 16px;border-radius:10px;">
          Agendar diagnóstico 30 min
        </a>
      </div>
    </td></tr>
  `;
  return baseWrap(body);
}

export function renderInternalLeadMagnet({ name, email, page }) {
  const body = `
    ${header("Nuevo lead magnet descargado", "Checklist 5 procesos")}
    <tr><td style="padding:20px 32px;font-family:Arial,Helvetica,sans-serif;color:#111827;">
      <p style="margin:0 0 8px 0;"><b>Nombre:</b> ${escapeHtml(name || "")}</p>
      <p style="margin:0 0 12px 0;"><b>Email:</b> <a style="color:#7B7AE6;text-decoration:none;" href="mailto:${escapeHtml(
        email || ""
      )}">${escapeHtml(email || "")}</a></p>
      <p style="margin:0 0 16px 0;color:#6B7280;font-size:14px;">Fuente: lead-magnet · Página: ${escapeHtml(
        page || "/automatizaciones"
      )}</p>
      <a href="${CAL_LINK}" target="_blank"
         style="display:inline-block;background:#7B7AE6;color:#fff;text-decoration:none;font-weight:700;font-size:14px;padding:10px 16px;border-radius:10px;">
        Abrir agenda (Cal.com)
      </a>
    </td></tr>
  `;
  return baseWrap(body);
}

export async function sendLeadMagnetClient({ name, email, downloadUrl }) {
  const html = renderClientLeadMagnet({ name, downloadUrl });
  const text = [
    `Hola ${name || ""}, gracias por descargar la guía de automatización.`,
    `Descarga: ${downloadUrl}`,
    "",
    "Si quieres apoyo para implementarlo, agenda acá (30 min):",
    CAL_LINK,
  ].join("\n");

  const { error } = await resend.emails.send({
    from: `Benjamín Correa <${CONTACT_FROM}>`,
    to: [email],
    subject: "Tu guía de automatizaciones (PDF)",
    html,
    text,
    reply_to: CONTACT_FROM,
  });
  if (error) throw error;
}

export async function sendLeadMagnetInternal({ name, email, page }) {
  const html = renderInternalLeadMagnet({ name, email, page });
  const text = [
    "Nuevo lead magnet descargado:",
    `Nombre: ${name || ""}`,
    `Email: ${email || ""}`,
    `Página: ${page || "/automatizaciones"}`,
  ].join("\n");

  const { error } = await resend.emails.send({
    from: `Portafolio <${CONTACT_FROM}>`,
    to: [CONTACT_TO],
    subject: "Nuevo lead magnet — benjamincorrea.com",
    html,
    text,
    reply_to: email,
  });
  if (error) throw error;
}
