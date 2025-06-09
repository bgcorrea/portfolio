import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Enviando mensaje..." });

    try {
      // Aquí iría la lógica de envío del formulario
      // Por ahora solo simulamos un envío exitoso
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus({
        type: "success",
        message:
          "¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.",
      });
    }
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-amber-100 dark:border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-amber-900 dark:text-amber-50"
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-amber-300 dark:border-gray-600 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700/50 dark:text-amber-50"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-amber-900 dark:text-amber-50"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-amber-300 dark:border-gray-600 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700/50 dark:text-amber-50"
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-amber-900 dark:text-amber-50"
          >
            Asunto
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-amber-300 dark:border-gray-600 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700/50 dark:text-amber-50"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-amber-900 dark:text-amber-50"
          >
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-amber-300 dark:border-gray-600 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700/50 dark:text-amber-50"
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 dark:focus:ring-offset-gray-800"
        >
          Enviar Mensaje
        </button>

        {status.message && (
          <div
            className={`mt-4 p-4 rounded-md ${
              status.type === "success"
                ? "bg-green-50/80 dark:bg-green-900/80 text-green-800 dark:text-green-200"
                : status.type === "error"
                ? "bg-red-50/80 dark:bg-red-900/80 text-red-800 dark:text-red-200"
                : "bg-amber-50/80 dark:bg-amber-900/80 text-amber-800 dark:text-amber-200"
            }`}
          >
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
