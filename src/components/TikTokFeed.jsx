import React, { useEffect, useState } from "react";

export default function TikTokFeed() {
  const [videos, setVideos] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("https://portfolio-production-acab.up.railway.app/api/tiktok/videos", {
          method: "GET",
          credentials: "include",
        });
        const j = await r.json();
        if (r.ok) setVideos(j.videos || []);
        else setErr(j.error || "Error al cargar videos");
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Cargando videos…</div>;
  if (err) return <div className="text-red-600">{err}</div>;
  if (!videos.length)
    return <div className="text-gray-600">No hay videos disponibles</div>;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {videos.map((v) => (
        <div key={v.id} className="rounded-2xl overflow-hidden shadow">
          <iframe
            src={v.embed_link}
            allow="fullscreen; autoplay; clipboard-read; clipboard-write"
            className="w-full aspect-[9/16] border-0"
            loading="lazy"
            title={v.title || v.id}
          />
          <div className="p-3 text-sm">{v.title || v.video_description}</div>
        </div>
      ))}
    </div>
  );
}
