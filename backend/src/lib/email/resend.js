import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_TO = process.env.CONTACT_TO || "contacto@benjamincorrea.com";
const CONTACT_FROM = process.env.CONTACT_FROM || "contacto@benjamincorrea.com";

// ✅ Nueva agenda (30 min)
const CAL_LINK = "https://cal.com/benjamin-correa-8pbfpd/diagnostico-30min";

/**
 * Enlaces de redes sociales extraídos del Home.jsx
 */
const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/bgcorrea" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/benjamin-correa-penaloza/",
  },
  { label: "Instagram", href: "https://www.instagram.com/soybenjacorrea" },
  { label: "TikTok", href: "https://www.tiktok.com/@bgcorrea" },
  { label: "YouTube", href: "https://www.youtube.com/@bgcorrea" },
  { label: "Email", href: "mailto:contacto@benjamincorrea.com" },
];

function baseWrap(innerHtml) {
  return `<!DOCTYPE html>
  <html lang="es" style="margin:0;padding:0;background:#F5F7FE;">
    <head>
      <meta charset="utf-8" />
      <meta name="color-scheme" content="light" />
      <meta name="supported-color-schemes" content="light" />
      <title>Mensaje</title>
    </head>
    <body style="margin:0;padding:24px;background:#F5F7FE;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr><td align="center">
          <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#ffffff;border:1px solid #E5E7EB;border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(17,24,39,0.06);">
            ${innerHtml}
          </table>
          <div style="height:24px;"></div>
        </td></tr>
      </table>
    </body>
  </html>`;
}

function headerBlock() {
  return `<tr>
    <td style="padding:28px 32px;background:linear-gradient(180deg,#F5F7FE 0%,#ffffff 100%);">
      <div style="font-family:Arial,Helvetica,sans-serif;color:#111827;font-weight:800;font-size:22px;">Benjamín Correa</div>
      <div style="font-family:Arial,Helvetica,sans-serif;color:#4B5563;font-size:13px;">Desarrollador Full Stack &amp; Especialista en Automatizaciones</div>
    </td>
  </tr>`;
}

function footerBlock() {
  // Botones tipo "pill" (compatibles con clientes de correo)
  const pills = SOCIAL_LINKS.map(
    (s) => `
    <a href="${s.href}" target="_blank"
       style="display:inline-block;margin:0 8px 8px 0;padding:8px 12px;border:1px solid #7B7AE6;border-radius:999px;
              color:#7B7AE6;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;">
      ${s.label}
    </a>`
  ).join("");

  return `<tr>
    <td style="padding:18px 32px;background:#F5F7FE;border-top:1px solid #E5E7EB;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6B7280;margin-bottom:10px;">
        Si no solicitaste este mensaje, puedes ignorarlo. — 
        <a href="https://benjamincorrea.com" style="color:#7B7AE6;text-decoration:none;">benjamincorrea.com</a>
      </div>
      <div>
        ${pills}
      </div>
    </td>
  </tr>`;
}

/** ---------- CLIENTE: auto-respuesta con CTA a 30 min ---------- */
function clientHtml({ name, email, message }) {
  const safeName = escapeHtml(name || "");
  const safeEmail = escapeHtml(email || "");
  const safeMsg = escapeHtml(message || "").replace(/\n/g, "<br/>");
  const body = `
    ${headerBlock()}
    <tr><td style="padding:20px 32px;font-family:Arial,Helvetica,sans-serif;color:#111827;">
      <h2 style="margin:0 0 12px 0;font-size:20px;line-height:1.3;">¡Gracias por escribir, ${safeName}!</h2>
      <p style="margin:0 0 14px 0;color:#6B7280;font-size:14px;">
        Soy Benjamín. Me encantaría ayudarte a <b>automatizar procesos</b> para que ahorres tiempo y escales sin contratar más personal.
      </p>
      <p style="margin:0 0 18px 0;color:#6B7280;font-size:14px;">
        Te propongo una <b>reunión de diagnóstico (30&nbsp;min)</b> sin costo. Revisamos tu caso, detectamos oportunidades y te llevo una propuesta clara.
      </p>

      <a href="${CAL_LINK}" target="_blank"
         style="display:inline-block;background:#7B7AE6;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 18px;border-radius:12px;">
        Agendar diagnóstico 30 min
      </a>

      <div style="height:16px;"></div>
      <ul style="padding-left:18px;margin:0 0 16px 0;color:#374151;font-size:13px;line-height:1.7;">
        <li>Resultados en &lt; 30 días.</li>
        <li>Flujos documentados y soporte pos-implementación.</li>
        <li>Stack: n8n/Make + APIs + Web + Datos.</li>
      </ul>

      <div style="margin:18px 0 10px 0;padding:14px;border:1px solid #E5E7EB;border-radius:12px;background:#F9FAFB;">
        <div style="font-size:13px;color:#6B7280;margin-bottom:6px;">Tu mensaje</div>
        <div style="font-size:14px;color:#111827;line-height:1.7;">${safeMsg}</div>
      </div>


      <div style="height:8px;"></div>
      <p style="margin:0;color:#111827;font-size:14px;">Un abrazo,<br/>Benjamín</p>
    </td></tr>
    ${footerBlock()}
  `;
  return baseWrap(body);
}

/** ---------- INTERNO: notificación para ti ---------- */
function internalHtml({ name, email, message }) {
  const safeName = escapeHtml(name || "");
  const safeEmail = escapeHtml(email || "");
  const safeMsg = escapeHtml(message || "").replace(/\n/g, "<br/>");
  const body = `
    ${headerBlock()}
    <tr><td style="padding:20px 32px;font-family:Arial,Helvetica,sans-serif;color:#111827;">
      <h2 style="margin:0 0 12px 0;font-size:20px;">Nuevo contacto desde la web</h2>
      <p style="margin:0 0 10px 0;color:#6B7280;font-size:14px;">Detalles:</p>
      <p style="margin:0;"><b>Nombre:</b> ${safeName}</p>
      <p style="margin:0 0 10px 0;"><b>Email:</b> <a href="mailto:${safeEmail}" style="color:#7B7AE6;text-decoration:none;">${safeEmail}</a></p>
      <div style="margin:10px 0 16px 0;padding:14px;border:1px solid #E5E7EB;border-radius:12px;background:#F9FAFB;">
        <div style="font-size:13px;color:#6B7280;margin-bottom:6px;">Mensaje</div>
        <div style="font-size:14px;color:#111827;line-height:1.7;">${safeMsg}</div>
      </div>
      <a href="${CAL_LINK}" target="_blank"
         style="display:inline-block;background:#7B7AE6;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:10px 16px;border-radius:10px;">
        Abrir agenda (Cal.com)
      </a>
    </td></tr>
    ${footerBlock()}
  `;
  return baseWrap(body);
}

/** ---------- HELPERS & SENDERS ---------- */
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function sendClientAutoReply({ name, email, message }) {
  const html = clientHtml({ name, email, message });
  const text = [
    `Hola ${name}, gracias por escribir.`,
    `Podemos ver oportunidades de automatización en una llamada de diagnóstico (30 min):`,
    CAL_LINK,
    "",
    "Tu mensaje:",
    message || "",
  ].join("\n");

  const { error } = await resend.emails.send({
    from: `Benjamín Correa <${CONTACT_FROM}>`,
    to: [email],
    subject: "¡Gracias por tu mensaje! Agendemos un diagnóstico de 30 min",
    html,
    text,
    reply_to: CONTACT_FROM,
  });
  if (error) throw error;
}

export async function sendInternalNotification({ name, email, message }) {
  const html = internalHtml({ name, email, message });
  const text = [
    "Nuevo contacto desde la web:",
    `Nombre: ${name}`,
    `Email: ${email}`,
    "Mensaje:",
    message || "",
    "",
    `Agenda: ${CAL_LINK}`,
  ].join("\n");

  const { error } = await resend.emails.send({
    from: `Portafolio <${CONTACT_FROM}>`,
    to: [CONTACT_TO],
    subject: "Nuevo contacto — benjamincorrea.com",
    html,
    text,
    reply_to: email,
  });
  if (error) throw error;
}
