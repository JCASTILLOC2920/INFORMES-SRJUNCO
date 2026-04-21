'use client';

import React from 'react';

interface ViralSocialHubProps {
  city: string;
  service: string;
}

export default function ViralSocialHub({ city, service }: ViralSocialHubProps) {
  const shareText = `🔴 IMPORTANTE: Servicio de ${service} de alta precisión en ${city}. JC PATH LAB certifica resultados en 72h. Comparte esta alerta con tus familiares y médicos de la región. https://informes-srjunco-git-main-jcastilloc2920s-projects.vercel.app/`;
  
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://informes-srjunco-git-main-jcastilloc2920s-projects.vercel.app/')}`;

  return (
    <div className="my-12 p-8 bg-gradient-to-br from-red-600 to-red-800 rounded-[2.5rem] shadow-premium text-white relative overflow-hidden group">
      {/* Background Pulse Effect */}
      <div className="absolute inset-0 bg-white/10 animate-pulse pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div className="text-5xl animate-bounce">⚠️</div>
        
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Difundir Alerta Médica en {city}</h3>
          <p className="text-red-100 font-medium leading-tight">
            Ayuda a tu comunidad en {city} a obtener diagnósticos de precisión. Comparte esta información vital con tus contactos.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all hover:scale-105 shadow-lg"
          >
            <span>WhatsApp</span>
          </a>
          <a 
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#1877F2] hover:bg-[#0E52B0] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all hover:scale-105 shadow-lg"
          >
            <span>Facebook</span>
          </a>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/20 text-center">
        <p className="text-[0.7rem] uppercase tracking-[0.3em] font-bold opacity-60">
          Infiltrador Social JC PATH LAB - Operando en 150 Nodos
        </p>
      </div>
    </div>
  );
}
