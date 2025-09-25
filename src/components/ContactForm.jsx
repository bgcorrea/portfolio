import { useState } from "react";
import { API_URL } from "../config";

const ContactForm = ({
  defaultSubject = "",
  successMessage = "¡Mensaje enviado con éxito! Te he enviado un correo de confirmación.",
  tags = [],
  extraFields = {},
  variant = "default",
  children,
  hideFields = [],
  buttonText = "Enviar Mensaje",
  showPrivacyCheckbox = false,
  privacyText = "Acepto recibir recursos y actualizaciones.",
  privacyLink = "/privacidad",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: defaultSubject || "",
    message: "",
    privacyAccepted: false,
    ...extraFields,
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Enviando mensaje..." });

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({
          type: "success",
          message: successMessage,
        });
        setFormData({
          name: "",
          email: "",
          subject: defaultSubject || "",
          message: "",
          privacyAccepted: false,
          ...extraFields,
        });
      } else {
        setStatus({
          type: "error",
          message:
            data.message ||
            "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus({
        type: "error",
        message:
          "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.",
      });
    }
  };

  const containerClasses =
    variant === "compact"
      ? "bg-white rounded-lg p-4 border border-gray-200"
      : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700";

  return (
    <div className={containerClasses}>
      {children}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-900 dark:text-gray-100"
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
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700/50 dark:text-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900 dark:text-gray-100"
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
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700/50 dark:text-gray-100"
          />
        </div>

        {!hideFields.includes("subject") && (
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-900 dark:text-gray-100"
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
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700/50 dark:text-gray-100"
            />
          </div>
        )}

        {!hideFields.includes("message") && (
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-900 dark:text-gray-100"
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
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700/50 dark:text-gray-100"
            />
          </div>
        )}

        {showPrivacyCheckbox && (
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="privacyAccepted"
              name="privacyAccepted"
              checked={formData.privacyAccepted}
              onChange={handleChange}
              required
              className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="privacyAccepted" className="text-sm text-gray-600">
              {privacyText}
              {". "}
              <a
                href={privacyLink}
                className="text-indigo-600 hover:text-indigo-800 underline"
              >
                Privacidad
              </a>
            </label>
          </div>
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
        >
          {buttonText}
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
            role="status"
            aria-live="polite"
          >
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
