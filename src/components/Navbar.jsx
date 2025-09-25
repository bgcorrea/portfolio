import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // No mostrar navbar en la página de automatizaciones
  if (location.pathname === "/automatizaciones") {
    return null;
  }

  const trackEvent = (eventName, source) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, {
        event_category: "Navigation",
        event_label: source,
        value: 1,
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Home */}
          <button
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md px-3 py-2"
            onClick={() => {
              trackEvent("navbar_home", "Logo");
              if (location.pathname === "/") {
                // Si ya estamos en home, solo hacer scroll
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                // Si estamos en otra página, navegar a home
                navigate("/");
              }
            }}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="font-medium">Inicio</span>
          </button>

          {/* Botón Automatizaciones */}
          <a
            href="/automatizaciones"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm"
            onClick={() => trackEvent("navbar_automatizaciones", "CTA")}
          >
            Conoce las automatizaciones
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
