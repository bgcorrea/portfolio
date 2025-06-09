import ContactForm from "../components/ContactForm";

const Contact = () => {
  return (
    <div className="min-h-screen p-4 sm:p-8 md:p-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 md:mb-16 text-amber-900 dark:text-amber-50">
          Contacto
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Información de contacto */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-amber-100 dark:border-gray-700">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-amber-900 dark:text-amber-50">
              Información de Contacto
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-amber-600 dark:text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-amber-800 dark:text-amber-200 text-sm md:text-base">
                  bgcorrea@uc.cl
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-amber-600 dark:text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-amber-800 dark:text-amber-200 text-sm md:text-base">
                  +56 9 7856 6046
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-amber-600 dark:text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-amber-800 dark:text-amber-200 text-sm md:text-base">
                  Santiago, Chile
                </span>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
