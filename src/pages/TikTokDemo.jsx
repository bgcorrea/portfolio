import React from "react";
import TikTokConnect from "../components/TikTokConnect";
import TikTokProfile from "../components/TikTokProfile";
import TikTokFeed from "../components/TikTokFeed";

const TikTokDemo = () => {
  return (
    <main className="max-w-5xl mx-auto px-4 pt-20 pb-10 space-y-8">
      <h1 className="text-3xl font-bold">Demo TikTok – Benjamín Correa</h1>
      <p className="text-gray-600">
        Esta página muestra el flujo de login con TikTok y el feed de mis
        últimos videos usando Display API.
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">1) Conectar con TikTok</h2>
        <TikTokConnect />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">2) Perfil</h2>
        <TikTokProfile />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">3) Mis últimos videos</h2>
        <TikTokFeed />
      </section>

      <footer className="pt-10 text-sm text-gray-500">
        <a className="underline" href="/privacidad">
          Política de Privacidad
        </a>{" "}
        ·{" "}
        <a className="underline" href="/terminos">
          Términos de Servicio
        </a>
      </footer>
    </main>
  );
};

export default TikTokDemo;
