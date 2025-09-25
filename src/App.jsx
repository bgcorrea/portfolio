import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Automatizaciones from "./pages/Automatizaciones";
import Privacidad from "./pages/Privacidad";
import Cookies from "./pages/Cookies";
import Redes from "./pages/Redes";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import Navbar from "./components/Navbar";
import CookieBanner from "./components/CookieBanner";
import CookieManager from "./components/CookieManager";
import CookieConsent from "./components/CookieConsent";

// Componente interno para manejar el navbar condicional
const AppContent = ({ darkMode }) => {
  const location = useLocation();
  const isDashboard = location.pathname === "/analytics-dashboard";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      {!isDashboard && <Navbar />}
      <main
        className={isDashboard ? "min-h-screen" : "min-h-[calc(100vh-4rem)]"}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/automatizaciones" element={<Automatizaciones />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/redes" element={<Redes />} />
          <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        </Routes>
      </main>

      {/* Cookie Banner */}
      <CookieBanner />

      {/* Cookie Manager */}
      <CookieManager />

      {/* Cookie Consent Global */}
      <CookieConsent />
    </div>
  );
};

const App = () => {
  // Inicializar el estado del modo oscuro desde localStorage
  const [darkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    // Guardar el estado en localStorage
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    // Aplicar la clase dark al elemento html
    if (darkMode) {
      document.documentElement.classList.add("dark");
      console.log("Modo oscuro activado");
    } else {
      document.documentElement.classList.remove("dark");
      console.log("Modo claro activado");
    }
  }, [darkMode]);

  // const toggleDarkMode = () => {
  //   console.log("Cambiando modo:", !darkMode);
  //   setDarkMode(!darkMode);
  // };

  return (
    <div className={darkMode ? "dark" : ""}>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AppContent darkMode={darkMode} />
      </Router>
    </div>
  );
};

export default App;
