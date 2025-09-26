import React from "react";

const Terminos = () => {
  return (
    <main className="max-w-3xl mx-auto px-4 pt-20 pb-10 space-y-6">
      <h1 className="text-3xl font-bold">Términos de Servicio</h1>
      <p>Última actualización: {new Date().toISOString().slice(0, 10)}</p>

      <h2 className="text-xl font-semibold">1. Aceptación</h2>
      <p>
        Al usar el sitio <strong>benjamincorrea.com</strong> aceptas estos
        Términos de Servicio.
      </p>

      <h2 className="text-xl font-semibold">2. Uso del sitio</h2>
      <p>
        El contenido es informativo. No garantizamos disponibilidad
        ininterrumpida ni ausencia de errores.
      </p>

      <h2 className="text-xl font-semibold">3. Integraciones con terceros</h2>
      <p>
        Este sitio puede integrar servicios de terceros (por ejemplo, TikTok
        APIs). Tu uso de dichos servicios se rige por sus términos y políticas.
      </p>

      <h2 className="text-xl font-semibold">4. Propiedad intelectual</h2>
      <p>
        El contenido del sitio pertenece a sus respectivos titulares. No se
        otorga licencia salvo lo indicado explícitamente.
      </p>

      <h2 className="text-xl font-semibold">
        5. Limitación de responsabilidad
      </h2>
      <p>
        No seremos responsables por daños indirectos o consecuentes derivados
        del uso del sitio.
      </p>

      <h2 className="text-xl font-semibold">6. Modificaciones</h2>
      <p>
        Podemos actualizar estos Términos en cualquier momento. La versión
        vigente se publica en esta página.
      </p>

      <h2 className="text-xl font-semibold">7. Contacto</h2>
      <p>
        Para consultas:{" "}
        <a className="underline" href="mailto:contacto@benjamincorrea.com">
          contacto@benjamincorrea.com
        </a>
      </p>
    </main>
  );
};

export default Terminos;
