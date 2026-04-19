'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Carga Dinámica Directa: Victoria maneja su propio estado de apertura/cierre
// y su botón de activación con vista previa de video.
const VictoriaWindow = dynamic(() => import('./ChatbotVictoria'), {
  ssr: false,
  loading: () => null // Invisible hasta que el cliente hidrate
});

const VictoriaGateway = () => {
  return <VictoriaWindow />;
};

export default VictoriaGateway;

