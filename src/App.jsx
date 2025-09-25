import React, { useState, useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CookieBanner from "./components/CookieBanner";
import CookieManager from "./components/CookieManager";

// Lazy loading para páginas pesadas
const Automatizaciones = lazy(() => import("./pages/Automatizaciones"));
const Privacidad = lazy(() => import("./pages/Privacidad"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Redes = lazy(() => import("./pages/Redes"));
const AnalyticsDashboard = lazy(() => import("./pages/AnalyticsDashboard"));

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
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/automatizaciones" element={<Automatizaciones />} />
            <Route path="/privacidad" element={<Privacidad />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/redes" element={<Redes />} />
            <Route
              path="/analytics-dashboard"
              element={<AnalyticsDashboard />}
            />
          </Routes>
        </Suspense>
      </main>

      {/* Cookie Banner */}
      <CookieBanner />

      {/* Cookie Manager */}
      <CookieManager />
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
    // Aplicar la clase dark al elemento html solo una vez
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
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
