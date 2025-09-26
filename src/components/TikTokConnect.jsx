import React from "react";

export default function TikTokConnect() {
  const connect = () => {
    // Redirigir al endpoint del backend Express
    const backendUrl = "https://portfolio-production-acab.up.railway.app";
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
