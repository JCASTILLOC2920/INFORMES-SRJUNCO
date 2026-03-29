import React from 'react';

export const SPECIALTIES = [
  {
    title: "Biopsias Especializadas",
    description: "Diagnóstico histopatológico de alta precisión (Gástricas, Próstata, Cervix, Piel). Resultados rápidos y precisos.",
    price: "Desde S/ 80",
    id: "biopsia",
    icon: (
      <svg className="w-[2.5rem] h-[2.5rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
  {
    title: "Citología y Papanicolaou",
    description: "Despistaje preventivo con tecnología avanzada. Papanicolaou, Citología de aspiración y líquidos corporales.",
    price: "Desde S/ 20",
    id: "citologia",
    icon: (
      <svg className="w-[2.5rem] h-[2.5rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    )
  },
  {
    title: "Inmunohistoquímica",
    description: "Paneles completos de marcadores específicos para caracterización definitiva de tumores complejos.",
    price: "Consultar panel",
    id: "ihq",
    icon: (
      <svg className="w-[2.5rem] h-[2.5rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  }
];

export const FEATURES = [
  {
    title: "Trayectoria Comprobada",
    description: "+15 años de experiencia liderando diagnósticos oncológicos de alta complejidad.",
    id: "trayectoria",
    icon: (
      <svg className="w-[1.6rem] h-[1.6rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Volumen Diagnóstico",
    description: "+50,000 estudios realizados con 100% de confianza médica en todo el Perú.",
    id: "volumen",
    icon: (
      <svg className="w-[1.6rem] h-[1.6rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Rapidez y Eficiencia",
    description: "Resultados en 3-4 días hábiles, guía fundamental para el inicio de tratamiento.",
    id: "rapidez",
    icon: (
      <svg className="w-[1.6rem] h-[1.6rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
];

export const NAV_LINKS = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Nosotros', href: '#nosotros' },
  { name: 'Contacto', href: '#contacto' },
];
