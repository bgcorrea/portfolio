require("dotenv").config();
const fetch = require("node-fetch");

async function testEmail() {
  try {
    console.log("Probando envío de correo...");

    const response = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Usuario de Prueba",
        email: "test@ejemplo.com",
        subject: "Mensaje de prueba",
        message:
          "Este es un mensaje de prueba para verificar que el sistema de correos funciona correctamente.",
      }),
    });

    const data = await response.json();

    if (data.success) {
      console.log("✅ Prueba exitosa:", data.message);
    } else {
      console.log("❌ Error:", data.message);
    }
  } catch (error) {
    console.error("❌ Error de conexión:", error.message);
  }
}

// Ejecutar la prueba
testEmail();
