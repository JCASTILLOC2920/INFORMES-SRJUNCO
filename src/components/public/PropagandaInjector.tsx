'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PropagandaInjector() {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Solo activar si no se ha mostrado en esta sesión
    if (hasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Detectar si el puntero sale por la parte superior (intento de cerrar pestaña)
      if (e.clientY <= 0) {
        setShowExitIntent(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  if (!showExitIntent) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-6 bg-nexus-void/80 backdrop-blur-md animate-fade-in">
      <div className="relative bg-white rounded-[3rem] p-10 max-w-xl w-full text-center shadow-premium transform animate-bounce-in">
        <button 
          onClick={() => setShowExitIntent(false)}
          className="absolute top-6 right-6 text-slate-400 hover:text-nexus-void text-2xl"
        >
          ✕
        </button>
        
        <div className="w-20 h-20 bg-clinical-blue/10 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6">
          🩺
        </div>
        
        <h2 className="text-3xl font-black text-nexus-void mb-4 leading-tight">
          ¡Asegure su Diagnóstico con <span className="text-clinical-blue">Autoridad Médica Nacional</span>!
        </h2>
        
        <p className="text-slate-600 mb-8 text-lg font-medium leading-relaxed">
          Ya sea en <span className="font-bold text-clinical-blue underline decoration-clinical-blue/30">Trujillo, Arequipa, Cusco o Lima</span>, el Dr. Castillo garantiza la máxima precisión clínica para su bienestar. 
          <span className="block mt-2 text-nexus-void font-black uppercase text-sm tracking-widest">Atendemos envíos de TODO EL PERÚ.</span>
        </p>
        
        <div className="space-y-4">
          <Link 
            href="https://wa.me/51986396733"
            className="group relative block w-full bg-nexus-void text-white py-5 rounded-2xl font-black uppercase tracking-widest overflow-hidden shadow-glow-blue transition-all"
          >
            <span className="relative z-10">Hablar con el Dr. Castillo Directo</span>
            <div className="absolute inset-0 bg-clinical-blue translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
          </Link>
          
          <button 
            onClick={() => setShowExitIntent(false)}
            className="text-sm font-bold text-slate-400 hover:text-nexus-void uppercase tracking-widest"
          >
            Ver más servicios
          </button>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-bounce-in {
          animation: bounceIn 0.6s cubic-bezier(0.17, 0.67, 0.83, 0.67) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounceIn {
          from { opacity: 0; transform: scale(0.3); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
