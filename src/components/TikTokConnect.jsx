import React from "react";

export default function TikTokConnect() {
  const connect = () => {
    // Redirigir al endpoint del backend Express
    const backendUrl =
      process.env.NODE_ENV === "production"
        ? "https://portfolio-production-acab.up.railway.app"
        : "http://localhost:5000";
    window.location.href = `${backendUrl}/api/tiktok/auth`;
  };

  return (
    <button
      onClick={connect}
      className="px-4 py-2 rounded-2xl shadow border bg-white hover:bg-gray-50 transition-colors"
    >
      Conectar con TikTok
    </button>
  );
}
