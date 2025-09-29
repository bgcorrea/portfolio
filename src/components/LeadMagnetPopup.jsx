import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaDownload,
  FaGift,
  FaRocket,
  FaCheckCircle,
  FaClock,
  FaUsers,
} from "react-icons/fa";
import LeadMagnetForm from "./LeadMagnetForm";

const LeadMagnetPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Verificar si el popup ya fue cerrado
    const popupClosed = localStorage.getItem("leadMagnetPopupClosed");

    if (!popupClosed) {
      // Mostrar popup después de 3 segundos
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        } else if (prevTime.hours > 0) {
          return { hours: prevTime.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset to 8 hours when countdown reaches 0
          return { hours: 8, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      // Marcar como cerrado en localStorage
      localStorage.setItem("leadMagnetPopupClosed", "true");
    }, 300);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        onClick={handleOverlayClick}
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0, y: 50 }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
            duration: 0.6,
          }}
          className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[95vh] overflow-y-auto border border-slate-200"
        >
          {/* Header compacto */}
          <div className="relative bg-gradient-to-r from-violet-600 to-purple-700 text-white p-4 rounded-t-3xl">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors"
              aria-label="Cerrar popup"
            >
              <FaTimes size={16} />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <FaGift size={20} className="text-yellow-300" />
              </div>
              <div>
                <h2 className="text-lg font-bold">¡Regalo exclusivo!</h2>
                <p className="text-violet-100 text-xs">
                  Checklist premium gratuito
                </p>
              </div>
            </div>

            {/* Countdown más grande */}
            <div className="bg-red-500/20 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FaClock className="text-red-300 text-sm" />
                <span className="text-red-100 text-sm font-bold">
                  OFERTA TERMINA EN:
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-red-200">HORAS</div>
                </div>
                <div className="text-red-300 text-xl">:</div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-red-200">MIN</div>
                </div>
                <div className="text-red-300 text-xl">:</div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-red-200">SEG</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content compacto */}
          <div className="p-4">
            <div className="text-center mb-3">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Checklist: 5 Procesos para Automatizar Primero
              </h3>
              <p className="text-slate-600 text-xs">
                Identifica en <strong>5 minutos</strong> dónde estás perdiendo
                tiempo y dinero.
              </p>
            </div>

            {/* Imagen compacta con badge */}
            <div className="mb-3 flex justify-center">
              <div className="relative">
                {/* Badge compacto - bajado un poco */}
                <div className="absolute top-2 -right-2 z-20">
                  <div className="bg-gradient-to-r from-violet-600 to-purple-700 text-white px-2 py-1 rounded-lg shadow-lg transform rotate-12">
                    <div className="flex items-center gap-1">
                      <FaRocket className="text-yellow-300 text-xs" />
                      <div className="text-center">
                        <div className="text-xs text-violet-200 line-through">
                          $27
                        </div>
                        <div className="text-xs font-bold text-yellow-300">
                          ¡GRATIS!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Imagen más pequeña */}
                <img
                  src="/img/leadmagnetimg.png"
                  alt="Checklist de automatizaciones"
                  className="w-32 h-auto rounded-lg shadow-md"
                />
              </div>
            </div>

            {/* Formulario compacto */}
            <div className="bg-gradient-to-br from-slate-50 to-violet-50 rounded-lg p-3 border border-slate-200">
              <LeadMagnetForm />
            </div>

            {/* Beneficios compactos */}
            <div className="mt-3 flex justify-center gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-1">
                <FaCheckCircle className="text-violet-600 text-xs" />
                <span>Procesos</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCheckCircle className="text-green-600 text-xs" />
                <span>Priorizar</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCheckCircle className="text-blue-600 text-xs" />
                <span>Plantillas</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LeadMagnetPopup;
