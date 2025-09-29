import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  const trackEvent = (eventName, source) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, {
        event_category: "Navigation",
        event_label: source,
        value: 1,
      });
    }
  };

  // Update CSS variable for navbar height
  useEffect(() => {
    const updateNavHeight = () => {
      if (navRef.current) {
        const height = navRef.current.offsetHeight;
        document.documentElement.style.setProperty("--nav-h", `${height}px`);
      }
    };

    // Initial update
    updateNavHeight();

    // ResizeObserver for dynamic height changes
    const resizeObserver = new ResizeObserver(updateNavHeight);
    if (navRef.current) {
      resizeObserver.observe(navRef.current);
    }

    // Window resize listener as fallback
    window.addEventListener("resize", updateNavHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateNavHeight);
    };
  }, []);

  return (
    <div ref={navRef} className="fixed top-0 inset-x-0 z-50">
      <header
        id="site-nav"
        className="backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          {/* Logo/Banner */}
          <button
            className="inline-flex items-center hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 rounded-md px-3 py-2"
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
            <img
              src="/img/banner.png"
              alt="Benjamín Correa - Automatizaciones"
              className="h-8 w-auto"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="/automatizaciones"
              className={`transition-colors ${
                location.pathname === "/automatizaciones"
                  ? "text-slate-900 font-medium"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              onClick={() => trackEvent("navbar_automatizaciones", "Nav")}
            >
              Automatizaciones
            </a>
            <a
              href="/#proyectos"
              className={`transition-colors ${
                location.pathname === "/" &&
                window.location.hash === "#proyectos"
                  ? "text-slate-900 font-medium"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              onClick={(e) => {
                e.preventDefault();
                trackEvent("navbar_proyectos", "Nav");
                if (location.pathname === "/") {
                  document.getElementById("proyectos")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                } else {
                  // Redirigir al Home y hacer scroll después de que cargue
                  window.location.href = "/";
                  // Esperar a que la página cargue y luego hacer scroll
                  setTimeout(() => {
                    const checkElement = () => {
                      const element = document.getElementById("proyectos");
                      if (element) {
                        element.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      } else {
                        // Si el elemento no existe, intentar de nuevo en 100ms
                        setTimeout(checkElement, 100);
                      }
                    };
                    checkElement();
                  }, 1000);
                }
              }}
            >
              Proyectos
            </a>
            <a
              href="/#sobre-mi"
              className={`transition-colors ${
                location.pathname === "/" &&
                window.location.hash === "#sobre-mi"
                  ? "text-slate-900 font-medium"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              onClick={(e) => {
                e.preventDefault();
                trackEvent("navbar_sobre_mi", "Nav");
                if (location.pathname === "/") {
                  document.getElementById("sobre-mi")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                } else {
                  // Redirigir al Home y hacer scroll después de que cargue
                  window.location.href = "/";
                  // Esperar a que la página cargue y luego hacer scroll
                  setTimeout(() => {
                    const checkElement = () => {
                      const element = document.getElementById("sobre-mi");
                      if (element) {
                        element.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      } else {
                        // Si el elemento no existe, intentar de nuevo en 100ms
                        setTimeout(checkElement, 100);
                      }
                    };
                    checkElement();
                  }, 1000);
                }
              }}
            >
              Sobre mí
            </a>
            <a
              href="/blog"
              className={`transition-colors ${
                location.pathname === "/blog"
                  ? "text-slate-900 font-medium"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              onClick={() => trackEvent("navbar_blog", "Nav")}
            >
              Blog
            </a>
          </nav>

          {/* Desktop CTA */}
          <a
            href="/#contacto"
            className="hidden md:inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-medium hover:bg-slate-50 transition"
            onClick={(e) => {
              e.preventDefault();
              trackEvent("navbar_contacto", "CTA");
              document.getElementById("contacto")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            Contacto
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              <a
                href="/automatizaciones"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  location.pathname === "/automatizaciones"
                    ? "text-slate-900 bg-slate-100"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
                onClick={() => {
                  trackEvent("navbar_automatizaciones", "Mobile");
                  setIsMobileMenuOpen(false);
                }}
              >
                Automatizaciones
              </a>
              <a
                href="/#proyectos"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  location.pathname === "/" &&
                  window.location.hash === "#proyectos"
                    ? "text-slate-900 bg-slate-100"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  trackEvent("navbar_proyectos", "Mobile");
                  setIsMobileMenuOpen(false);
                  if (location.pathname === "/") {
                    document.getElementById("proyectos")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  } else {
                    // Redirigir al Home y hacer scroll después de que cargue
                    window.location.href = "/";
                    // Esperar a que la página cargue y luego hacer scroll
                    setTimeout(() => {
                      const checkElement = () => {
                        const element = document.getElementById("proyectos");
                        if (element) {
                          element.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        } else {
                          // Si el elemento no existe, intentar de nuevo en 100ms
                          setTimeout(checkElement, 100);
                        }
                      };
                      checkElement();
                    }, 1000);
                  }
                }}
              >
                Proyectos
              </a>
              <a
                href="/#sobre-mi"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  location.pathname === "/" &&
                  window.location.hash === "#sobre-mi"
                    ? "text-slate-900 bg-slate-100"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  trackEvent("navbar_sobre_mi", "Mobile");
                  setIsMobileMenuOpen(false);
                  if (location.pathname === "/") {
                    document.getElementById("sobre-mi")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  } else {
                    // Redirigir al Home y hacer scroll después de que cargue
                    window.location.href = "/";
                    // Esperar a que la página cargue y luego hacer scroll
                    setTimeout(() => {
                      const checkElement = () => {
                        const element = document.getElementById("sobre-mi");
                        if (element) {
                          element.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        } else {
                          // Si el elemento no existe, intentar de nuevo en 100ms
                          setTimeout(checkElement, 100);
                        }
                      };
                      checkElement();
                    }, 1000);
                  }
                }}
              >
                Sobre mí
              </a>
              <a
                href="/blog"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  location.pathname === "/blog"
                    ? "text-slate-900 bg-slate-100"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
                onClick={() => {
                  trackEvent("navbar_blog", "Mobile");
                  setIsMobileMenuOpen(false);
                }}
              >
                Blog
              </a>
              <a
                href="/#contacto"
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  trackEvent("navbar_contacto", "Mobile");
                  setIsMobileMenuOpen(false);
                  document.getElementById("contacto")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                Contacto
              </a>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
