import React, { useEffect, useState } from "react";

export default function TikTokProfile() {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("https://portfolio-production-acab.up.railway.app/api/tiktok/profile", {
          method: "GET",
          credentials: "include",
        });
        const j = await r.json();
        if (r.ok) setUser(j.user);
        else setErr(j.error || "Error al cargar perfil");
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Cargando perfil…</div>;
  if (err) return <div className="text-red-600">{err}</div>;
  if (!user)
    return <div className="text-gray-600">No conectado con TikTok</div>;

  return (
    <div className="flex items-center gap-3">
      {user.avatar_url && (
        <img
          src={user.avatar_url}
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />
      )}
      <div>
        <div className="font-semibold">{user.display_name}</div>
        <div className="text-xs text-gray-500">open_id: {user.open_id}</div>
      </div>
    </div>
  );
}
