import { useState } from "react";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Alquitones",
      description:
        "Plataforma web para la gestión y visualización de datos de alquitones, implementando soluciones cloud y análisis de datos.",
      technologies: ["React", "Java", "Spring Boot", "AWS"],
      images: [
        "/img/alquitones1.png",
        "/img/alquitones2.png",
        "/img/alquitones3.png",
      ],
      link: "https://alquitones.online",
    },
    {
      id: 2,
      title: "VitaHue",
      description:
        "Landing page corporativa para una empresa de arriendo de maquinaria pesada, diseñada para captar clientes y mostrar sus servicios de forma clara y visual.",
      technologies: ["React"],
      images: ["/img/vitahue1.png", "/img/vitahue2.png"],
      link: "https://vitahue-landing.vercel.app/",
    },
    {
      id: 3,
      title: "OdontoApp",
      description:
        "Sistema de gestión dental para clínicas odontológicas. Incluye agenda, ficha clínica y seguimiento de tratamientos para pacientes.",
      technologies: ["React", "JavaScript", "HTML", "CSS"],
      images: ["/img/odonto1.png", "/img/odonto2.png"],
      link: "https://ctd-esp-fe3-final-sandy-iota.vercel.app/",
    },
    {
      id: 4,
      title: "SportIt",
      description:
        "Landing page deportiva con información sobre equipos, jugadores y estadísticas, orientada a aficionados y clubes.",
      technologies: ["HTML", "CSS", "JavaScript"],
      images: ["/img/sportit1.png", "/img/sportit2.png"],
      link: "https://trabajo-final-frontend1.vercel.app/",
    },
  ];

  const [hoveredProject, setHoveredProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const handleMouseEnter = (projectId) => {
    setHoveredProject(projectId);
    // Iniciar el cambio automático de imágenes
    const project = projects.find((p) => p.id === projectId);
    if (project.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => ({
          ...prev,
          [projectId]: ((prev[projectId] || 0) + 1) % project.images.length,
        }));
      }, 4000); // Cambiar cada 4 segundos

      // Guardar el intervalo para limpiarlo después
      return () => clearInterval(interval);
    }
  };

  const handleMouseLeave = (projectId) => {
    setHoveredProject(null);
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectId]: 0,
    }));
  };

  return (
    <section className="min-h-screen p-4 sm:p-8 md:p-16">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 md:mb-16 text-amber-900 dark:text-amber-50">
        Mis Proyectos
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border border-amber-100 dark:border-gray-700"
            onMouseEnter={() => handleMouseEnter(project.id)}
            onMouseLeave={() => handleMouseLeave(project.id)}
          >
            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
              <img
                src={project.images[currentImageIndex[project.id] || 0]}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-amber-50 dark:bg-gray-800 text-amber-900 dark:text-amber-50 rounded-lg hover:bg-amber-100 dark:hover:bg-gray-700 transition-colors text-sm md:text-base"
                >
                  Ver Proyecto
                </a>
              </div>
              {project.images.length > 1 && (
                <div className="absolute bottom-2 right-2 bg-amber-900 bg-opacity-70 text-amber-50 px-2 py-1 rounded text-xs md:text-sm">
                  {currentImageIndex[project.id] + 1 || 1} /{" "}
                  {project.images.length}
                </div>
              )}
            </div>

            <div className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-2 text-amber-900 dark:text-amber-50">
                {project.title}
              </h2>
              <p className="text-amber-800 dark:text-amber-200 text-sm md:text-base mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 md:px-3 py-1 bg-amber-100 dark:bg-gray-700 text-amber-900 dark:text-amber-50 rounded-full text-xs md:text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
