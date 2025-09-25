// Script de prueba para verificar la configuración de Resend
import dotenv from "dotenv";
import {
  sendClientAutoReply,
  sendInternalNotification,
} from "./src/lib/email/resend.js";

dotenv.config();

async function testResend() {
  console.log("🧪 Probando configuración de Resend...");

  try {
    // Verificar variables de entorno
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY no está configurada");
    }

    if (!process.env.CONTACT_TO || !process.env.CONTACT_FROM) {
      throw new Error("CONTACT_TO o CONTACT_FROM no están configuradas");
    }

    console.log("✅ Variables de entorno configuradas correctamente");
    console.log(`📧 CONTACT_TO: ${process.env.CONTACT_TO}`);
    console.log(`📧 CONTACT_FROM: ${process.env.CONTACT_FROM}`);

    // Datos de prueba
    const testData = {
      name: "Test User",
      email: "test@example.com",
      subject: "Prueba de Resend",
      message:
        "Este es un mensaje de prueba para verificar que Resend funciona correctamente.",
    };

    console.log("\n📤 Enviando auto-respuesta al cliente...");
    await sendClientAutoReply(testData);
    console.log("✅ Auto-respuesta enviada exitosamente");

    console.log("\n📤 Enviando notificación interna...");
    await sendInternalNotification(testData);
    console.log("✅ Notificación interna enviada exitosamente");

    console.log(
      "\n🎉 ¡Todas las pruebas pasaron! Resend está configurado correctamente."
    );
  } catch (error) {
    console.error("❌ Error en las pruebas:", error.message);
    process.exit(1);
  }
}

testResend();
