'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Carga Dinámica: Sentinel-V se activa tras la hidratación del cliente
// para asegurar un TTI (Time to Interactive) ultra-rápido.
const SentinelWindow = dynamic(() => import('./ChatbotVictoria'), {
  ssr: false,
  loading: () => null // Mantenemos el DOM limpio hasta el despliegue
});

const SentinelGateway = () => {
  return <SentinelWindow />;
};

export default SentinelGateway;
