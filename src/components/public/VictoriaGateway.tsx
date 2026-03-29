'use client';

import React, { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Carga Dinámica Agresiva: El chat completo (video, lógica, conocimiento)
// no se descarga hasta que el usuario muestra intención de usarlo.
const VictoriaWindow = dynamic(() => import('./ChatbotVictoria'), {
  ssr: false,
  loading: () => <div className="fixed bottom-4 right-4 animate-pulse bg-clinical-blue-deep rounded-full w-14 h-14" />
});

const VictoriaGateway = () => {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <>
      {!hasStarted ? (
        <button 
          className="chat-toggle-btn"
          onClick={() => setHasStarted(true)}
          aria-label="Abrir Asistente Victoria"
        >
          💬
        </button>
      ) : (
        <VictoriaWindow initialOpen={true} />
      )}
    </>
  );
};

export default VictoriaGateway;
