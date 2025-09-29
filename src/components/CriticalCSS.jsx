import React from "react";

const CriticalCSS = () => {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
        /* Critical CSS - Above the fold styles */
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: #ffffff;
          color: #1e293b;
        }
        
        #root {
          min-height: 100vh;
        }
        
        /* Critical layout styles */
        .min-h-screen {
          min-height: 100vh;
        }
        
        .bg-white {
          background-color: #ffffff;
        }
        
        /* Critical typography */
        h1 {
          font-size: 2rem;
          font-weight: 700;
          line-height: 1.2;
          color: #0f172a;
          margin: 0;
        }
        
        p {
          margin: 0;
          line-height: 1.6;
          color: #475569;
        }
        
        /* Critical button styles */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.75rem;
          background-color: #7c3aed;
          color: #ffffff;
          padding: 1.25rem 2rem;
          font-weight: 500;
          text-decoration: none;
          transition: background-color 0.2s;
          border: none;
          cursor: pointer;
        }
        
        .btn-primary:hover {
          background-color: #6d28d9;
        }
        
        /* Critical grid layout */
        .grid {
          display: grid;
        }
        
        .grid-cols-1 {
          grid-template-columns: repeat(1, minmax(0, 1fr));
        }
        
        /* Critical spacing */
        .px-4 {
          padding-left: 1rem;
          padding-right: 1rem;
        }
        
        .py-8 {
          padding-top: 2rem;
          padding-bottom: 2rem;
        }
        
        .mt-4 {
          margin-top: 1rem;
        }
        
        .mb-6 {
          margin-bottom: 1.5rem;
        }
        
        /* Critical responsive */
        @media (min-width: 768px) {
          h1 {
            font-size: 3.75rem;
          }
          
          .md\\:grid-cols-12 {
            grid-template-columns: repeat(12, minmax(0, 1fr));
          }
          
          .md\\:col-span-7 {
            grid-column: span 7 / span 7;
          }
          
          .md\\:col-span-5 {
            grid-column: span 5 / span 5;
          }
        }
        
        /* Loading state */
        .loading {
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }
        
        .loaded {
          opacity: 1;
        }
      `,
      }}
    />
  );
};

export default CriticalCSS;
