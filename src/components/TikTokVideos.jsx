import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TikTokVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTikTokVideos = async () => {
      try {
        setLoading(true);
        // Llamar a nuestro endpoint que obtiene los videos de TikTok
        const response = await fetch("/api/tiktok-videos");
        const data = await response.json();

        if (response.ok) {
          setVideos(data.videos || []);
        } else {
          throw new Error(data.error || "Error al cargar videos");
        }
      } catch (err) {
        console.error("Error fetching TikTok videos:", err);
        setError(err.message);
        // Fallback a videos estáticos si falla la API
        setVideos([
          {
            id: "1",
            title: "Automatización en 60 segundos",
            thumbnail: "/img/tiktok-thumb-1.jpg",
            likes: "2.1K",
            shares: "156",
            publishedAt: "2024-01-15T10:00:00Z",
            videoUrl: "https://www.tiktok.com/@bgcorrea/video/1234567890",
          },
          {
            id: "2",
            title: "Low-code vs Full Stack",
            thumbnail: "/img/tiktok-thumb-2.jpg",
            likes: "1.8K",
            shares: "89",
            publishedAt: "2024-01-10T15:30:00Z",
            videoUrl: "https://www.tiktok.com/@bgcorrea/video/1234567891",
          },
          {
            id: "3",
            title: "APIs en 30 segundos",
            thumbnail: "/img/tiktok-thumb-3.jpg",
            likes: "3.2K",
            shares: "234",
            publishedAt: "2024-01-05T09:15:00Z",
            videoUrl: "https://www.tiktok.com/@bgcorrea/video/1234567892",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTikTokVideos();
  }, []);

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `Hace ${diffInHours} horas`;
    } else if (diffInHours < 48) {
      return "Hace 1 día";
    } else if (diffInHours < 168) {
      const days = Math.floor(diffInHours / 24);
      return `Hace ${days} días`;
    } else {
      const weeks = Math.floor(diffInHours / 168);
      return `Hace ${weeks} semana${weeks > 1 ? "s" : ""}`;
    }
  };

  const handleVideoClick = (videoUrl) => {
    window.open(videoUrl, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
            >
              <div className="aspect-[9/16] bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    console.warn("TikTok API error, using fallback videos:", error);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.slice(0, 3).map((video, index) => (
          <motion.div
            key={video.id}
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onClick={() => handleVideoClick(video.videoUrl)}
          >
            {/* TikTok Video Container */}
            <div className="aspect-[9/16] bg-gray-100 relative overflow-hidden">
              {/* Thumbnail del video */}
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              {/* Fallback si no hay imagen */}
              <div
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100"
                style={{ display: "none" }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium text-sm">
                    Video {index + 1}
                  </p>
                </div>
              </div>

              {/* Overlay con play button */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-black ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Badge de TikTok */}
              <div className="absolute top-3 right-3">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                {video.title}
              </h3>
              <p className="text-xs text-gray-500 mb-2">
                {formatTimeAgo(video.publishedAt)}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  {video.likes}
                </span>
                <span className="flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                  </svg>
                  {video.shares}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TikTokVideos;
