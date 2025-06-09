import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Configurar el worker de PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const CV = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 2.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));

  return (
    <section className="p-8 flex flex-col items-center min-h-screen">
      <div className="w-full max-w-4xl rounded-lg p-4">
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={zoomOut}
            className="px-4 py-2 rounded bg-amber-100 dark:bg-gray-800 text-amber-900 dark:text-amber-50 hover:bg-amber-200 dark:hover:bg-gray-700 transition-colors border border-amber-200 dark:border-gray-700"
          >
            -
          </button>
          <button
            onClick={zoomIn}
            className="px-4 py-2 rounded bg-amber-100 dark:bg-gray-800 text-amber-900 dark:text-amber-50 hover:bg-amber-200 dark:hover:bg-gray-700 transition-colors border border-amber-200 dark:border-gray-700"
          >
            +
          </button>
          <span className="px-4 py-2 rounded bg-amber-100 dark:bg-gray-800 text-amber-900 dark:text-amber-50 border border-amber-200 dark:border-gray-700">
            {pageNumber} de {numPages}
          </span>
        </div>

        <div className="flex justify-center overflow-auto">
          <Document
            file="/CV.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex justify-center items-center h-[800px]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500"></div>
              </div>
            }
            error={
              <div className="text-center p-4 text-amber-900 dark:text-amber-50">
                Error al cargar el PDF. Por favor, intenta nuevamente.
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="shadow-lg"
            />
          </Document>
        </div>

        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            disabled={pageNumber <= 1}
            className="px-4 py-2 rounded bg-amber-100 dark:bg-gray-800 text-amber-900 dark:text-amber-50 hover:bg-amber-200 dark:hover:bg-gray-700 transition-colors border border-amber-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <button
            onClick={() =>
              setPageNumber((prev) => Math.min(prev + 1, numPages))
            }
            disabled={pageNumber >= numPages}
            className="px-4 py-2 rounded bg-amber-100 dark:bg-gray-800 text-amber-900 dark:text-amber-50 hover:bg-amber-200 dark:hover:bg-gray-700 transition-colors border border-amber-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      </div>
    </section>
  );
};

export default CV;
