// src/lib/email/resend.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_TO = process.env.CONTACT_TO || "contacto@benjamincorrea.com";
const CONTACT_FROM = process.env.CONTACT_FROM || "contacto@benjamincorrea.com";

/**
 * Envía correo de contacto vía Resend (API HTTP).
 * Dominio benjamincorrea.com ya está verificado en Resend.
 */
export async function sendContactEmail({
  name,
  email,
  message,
  subject = "Nuevo mensaje desde el portafolio",
}) {
  const html = `
    <div style="font-family:Arial, sans-serif; line-height:1.6; font-size:14px">
      <p><b>Nombre:</b> ${escapeHtml(name)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p><b>Asunto:</b> ${escapeHtml(subject)}</p>
      <p><b>Mensaje:</b></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: `Portafolio <${CONTACT_FROM}>`,
    to: [CONTACT_TO],
    subject,
    html,
    reply_to: email, // para poder responderte directo al remitente
  });

  if (error) {
    throw error;
  }
}

/**
 * Envía correo de confirmación al remitente
 */
export async function sendConfirmationEmail({ name, email, subject, message }) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #92400e;">¡Gracias por contactarme!</h2>
      <p>Hola ${escapeHtml(name)},</p>
      <p>He recibido tu mensaje y te responderé lo antes posible.</p>
      
      <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Detalles de tu mensaje:</h3>
        <p><strong>Asunto:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Mensaje:</strong></p>
        <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
          ${escapeHtml(message).replace(/\n/g, "<br>")}
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
  `;

  const { error } = await resend.emails.send({
    from: `Portafolio <${CONTACT_FROM}>`,
    to: [email],
    subject: "Confirmación de mensaje enviado - Benjamin Correa",
    html,
  });

  if (error) {
    throw error;
  }
}

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
