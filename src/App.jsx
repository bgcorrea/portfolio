import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import CV from "./pages/CV";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";

const App = () => {
  // Inicializar el estado del modo oscuro desde localStorage
  const [darkMode, setDarkMode] = useState(() => {
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

  const toggleDarkMode = () => {
    console.log("Cambiando modo:", !darkMode);
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <Router>
        <div className="min-h-screen bg-amber-50 dark:bg-gray-900 transition-colors duration-500">
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="min-h-[calc(100vh-4rem)]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/cv" element={<CV />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </Router>
    </div>
  );
};

export default App;
