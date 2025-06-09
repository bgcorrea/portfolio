import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-amber-50 dark:bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-amber-900 dark:text-amber-50 text-xl font-bold ${
              isActive ? "underline" : ""
            }`
          }
        >
          Benjamín Correa
        </NavLink>

        {/* Botón de menú hamburguesa para móviles */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-amber-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-amber-900 dark:text-amber-50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Menú de navegación */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 right-0 md:left-auto md:right-auto bg-amber-50 dark:bg-gray-800 md:bg-transparent dark:md:bg-transparent p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-4 shadow-lg md:shadow-none`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-amber-900 dark:text-amber-50 hover:text-amber-700 dark:hover:text-amber-300 ${
                isActive ? "underline" : ""
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Inicio
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `text-amber-900 dark:text-amber-50 hover:text-amber-700 dark:hover:text-amber-300 ${
                isActive ? "underline" : ""
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Proyectos
          </NavLink>
          <NavLink
            to="/cv"
            className={({ isActive }) =>
              `text-amber-900 dark:text-amber-50 hover:text-amber-700 dark:hover:text-amber-300 ${
                isActive ? "underline" : ""
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            CV
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-amber-900 dark:text-amber-50 hover:text-amber-700 dark:hover:text-amber-300 ${
                isActive ? "underline" : ""
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Contacto
          </NavLink>
          <button
            onClick={() => {
              console.log("Botón clickeado - darkMode actual:", darkMode);
              toggleDarkMode();
            }}
            className="p-2 rounded-full hover:bg-amber-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={
              darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
            }
          >
            {darkMode ? (
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
              >
                <circle
                  cx="14"
                  cy="14"
                  r="7"
                  fill="#FCD34D"
                  stroke="#B45309"
                  strokeWidth="2"
                />
                <g stroke="#B45309" strokeWidth="1.5">
                  <line x1="14" y1="2" x2="14" y2="6" />
                  <line x1="14" y1="22" x2="14" y2="26" />
                  <line x1="2" y1="14" x2="6" y2="14" />
                  <line x1="22" y1="14" x2="26" y2="14" />
                  <line x1="5.1" y1="5.1" x2="8.1" y2="8.1" />
                  <line x1="19.9" y1="19.9" x2="22.9" y2="22.9" />
                  <line x1="5.1" y1="22.9" x2="8.1" y2="19.9" />
                  <line x1="19.9" y1="8.1" x2="22.9" y2="5.1" />
                </g>
                <defs>
                  <radialGradient id="sunGradient" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0%" stopColor="#FFF9C4" />
                    <stop offset="100%" stopColor="#FCD34D" />
                  </radialGradient>
                </defs>
              </svg>
            ) : (
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
              >
                <circle cx="14" cy="14" r="10" fill="#B45309" />
                <path
                  d="M19 14c0 3-2.5 5.5-5.5 5.5A5.5 5.5 0 0114 8.5c.5 0 1 .06 1.5.18A7 7 0 0014 24a7 7 0 005-10z"
                  fill="#FCD34D"
                />
                <circle cx="16.5" cy="15.5" r="0.7" fill="#FDE68A" />
                <circle cx="13.5" cy="17.5" r="0.4" fill="#FDE68A" />
                <circle cx="17.5" cy="12.5" r="0.3" fill="#FDE68A" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
