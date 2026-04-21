'use client';

import React, { useState, useEffect } from 'react';

export default function FloatingWhatsAppHub() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setShowTooltip(true), 1500);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed bottom-8 right-8 z-[100000] flex flex-col items-end gap-4 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-50'}`}>
      
      {/* Tooltip Persuasivo */}
      <div className={`bg-white border border-slate-200 p-4 rounded-[2rem] shadow-premium-dark max-w-[280px] transition-all duration-700 animate-bounce-in ${showTooltip ? 'opacity-100' : 'opacity-0 scale-75 pointer-events-none'}`}>
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-clinical-blue/20 flex items-center justify-center text-xl flex-shrink-0">👨‍⚕️</div>
          <div>
            <p className="text-[0.7rem] font-black text-clinical-blue uppercase tracking-widest mb-1">Dr. Castillo - Patólogo</p>
            <p className="text-[0.85rem] font-bold text-nexus-void leading-tight">
              ¿Tiene una orden médica de provincia? Recibimos muestras de todo el Perú hoy mismo.
            </p>
          </div>
        </div>
        <div className="absolute -bottom-2 right-10 w-4 h-4 bg-white border-r border-b border-slate-200 rotate-45"></div>
      </div>

      {/* Botón Principal de Fuego */}
      <a 
        href="https://wa.me/51986396733?text=Hola+Dr.+Castillo,+necesito+informacion+sobre+un+analisis+urgente"
        className="group relative flex items-center gap-4 bg-nexus-void hover:bg-clinical-blue text-white px-8 py-5 rounded-full shadow-glow-blue transition-all duration-500 overflow-hidden"
      >
        <span className="text-[0.8rem] font-black uppercase tracking-[0.2em] whitespace-nowrap">
          Consulta Directa
        </span>
        <div className="relative">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-xl shadow-lg animate-pulse">
            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-nexus-void animate-ripple"></div>
        </div>
      </a>

      <style jsx>{`
        @keyframes ripple {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
        .animate-ripple {
          animation: ripple 2s infinite;
        }
        .animate-bounce-in {
          animation: bounceIn 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67) forwards;
        }
        @keyframes bounceIn {
          from { opacity: 0; transform: translateY(20px) scale(0.8); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
