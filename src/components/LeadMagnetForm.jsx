import React from "react";

const API_URL =
  "https://portfolio-production-acab.up.railway.app/api/lead-magnet";
const CAL_LINK =
  process.env.REACT_APP_CAL_LINK ||
  "https://cal.com/benjamin-correa-8pbfpd/diagnostico-30min";

export default function LeadMagnetForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [ok, setOk] = React.useState(false);
  const [downloadUrl, setDownloadUrl] = React.useState("");
  const [error, setError] = React.useState("");
  const [website, setWebsite] = React.useState(""); // honeypot

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setOk(false);
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, website }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error al enviar");
      setDownloadUrl(data?.downloadUrl || "");
      setOk(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (ok) {
    return (
      <div
        style={{
          background: "#F5F7FE",
          border: "1px solid #E5E7EB",
          borderRadius: 12,
          padding: 16,
        }}
      >
        <h3 style={{ marginTop: 0, color: "#111827" }}>
          ¡Listo! Revisa tu correo 📩
        </h3>
        <p style={{ color: "#374151" }}>
          Te envié la guía a <b>{email}</b>. También puedes descargarla aquí:
        </p>
        {downloadUrl && (
          <a
            href={downloadUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              background: "#7B7AE6",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 14,
              padding: "10px 16px",
              borderRadius: 10,
            }}
          >
            Descargar guía (PDF)
          </a>
        )}
        <div style={{ height: 12 }} />
        <a
          href={CAL_LINK}
          target="_blank"
          rel="noreferrer"
          style={{ color: "#7B7AE6", textDecoration: "none", fontWeight: 700 }}
        >
          Agendar diagnóstico 30 min →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
      <div>
        <label
          style={{
            display: "block",
            fontWeight: 700,
            color: "#111827",
            marginBottom: 6,
          }}
        >
          Nombre
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Tu nombre"
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #E5E7EB",
            borderRadius: 10,
          }}
        />
      </div>
      <div>
        <label
          style={{
            display: "block",
            fontWeight: 700,
            color: "#111827",
            marginBottom: 6,
          }}
        >
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="tu@correo.com"
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #E5E7EB",
            borderRadius: 10,
          }}
        />
      </div>

      {/* Honeypot (oculto a humanos) */}
      <input
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        autoComplete="off"
        tabIndex="-1"
        style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          background: "#7B7AE6",
          color: "#fff",
          border: "none",
          padding: "12px 16px",
          borderRadius: 12,
          fontWeight: 800,
          cursor: "pointer",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Enviando..." : "Descargar gratis"}
      </button>

      {error && <p style={{ color: "#b91c1c", margin: 0 }}>{error}</p>}
    </form>
  );
}
