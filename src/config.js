// Configuración del backend según el entorno
const config = {
  development: {
    apiUrl: "http://localhost:5000",
  },
  production: {
    apiUrl: "https://portfolio-production-acab.up.railway.app",
  },
};

// Obtener el entorno actual
const environment = process.env.NODE_ENV || "development";

// Exportar la configuración del entorno actual
export const API_URL = config[environment].apiUrl;
