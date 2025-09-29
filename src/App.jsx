import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CookieBanner from "./components/CookieBanner";
import CookieManager from "./components/CookieManager";

// Lazy loading para páginas pesadas
const Automatizaciones = lazy(() => import("./pages/Automatizaciones"));
const Blog = lazy(() => import("./pages/Blog"));
const Privacidad = lazy(() => import("./pages/Privacidad"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Redes = lazy(() => import("./pages/Redes"));

// Lazy loading para artículos del blog
const Articulo5Procesos = lazy(() =>
  import("./pages/articles/5-procesos-automatizar-primero")
);
const ArticuloElegirHerramienta = lazy(() =>
  import("./pages/articles/elegir-herramienta-automatizacion")
);
const ArticuloErroresComunes = lazy(() =>
  import("./pages/articles/errores-comunes-automatizaciones")
);

// Componente interno para manejar el navbar condicional
const AppContent = ({ darkMode }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/automatizaciones" element={<Automatizaciones />} />
            <Route path="/blog" element={<Blog />} />
            <Route
              path="/blog/5-procesos-automatizar-primero"
              element={<Articulo5Procesos />}
            />
            <Route
              path="/blog/elegir-herramienta-automatizacion"
              element={<ArticuloElegirHerramienta />}
            />
            <Route
              path="/blog/errores-comunes-automatizaciones"
              element={<ArticuloErroresComunes />}
            />
            <Route path="/privacidad" element={<Privacidad />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/redes" element={<Redes />} />
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
    <HelmetProvider>
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
    </HelmetProvider>
  );
};

export default App;
