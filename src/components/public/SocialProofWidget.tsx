'use client';

import React, { useState, useEffect } from 'react';

const ACTIVITIES = [
  { location: "Trujillo", service: "12 Biopsias - Clínica San Pablo", status: "Entregadas", icon: "🏢" },
  { location: "Arequipa", service: "Patología Quirúrgica", status: "Certificada", icon: "🧬" },
  { location: "Cusco", service: "Inmunohistoquímica Masiva", status: "Procesada", icon: "🎯" },
  { location: "Chiclayo", service: "Lote de Papanicolaou - Essalud", status: "Recibido", icon: "🏢" },
  { location: "Iquitos", service: "Biopsia de Piel - Clínica Ana Stahl", status: "Entregada", icon: "🏥" },
  { location: "Huancayo", service: "Citología Oncologica", status: "Completada", icon: "📋" },
  { location: "Tacna", service: "Bloques de Parafina", status: "Recibidos", icon: "📦" },
  { location: "Piura", service: "Citología - Policlínico Popular", status: "Procesada", icon: "🏥" },
  { location: "Huaraz", service: "Inmunohistoquímica", status: "Certificada", icon: "⚡" },
];
 Broadway

export default function SocialProofWidget() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const initTimer = setTimeout(() => setVisible(true), 3000);
    
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ACTIVITIES.length);
        setVisible(true);
      }, 1000);
    }, 8000);

    return () => {
      clearTimeout(initTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`fixed bottom-32 left-8 z-[9998] pointer-events-none hidden md:block transition-all duration-700 transform ${visible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-12 scale-90'}`}>
      <div className="flex items-center gap-4 bg-white/80 backdrop-blur-xl border border-white/40 p-4 rounded-[2rem] shadow-premium max-w-sm">
        <div className="w-12 h-12 rounded-2xl bg-clinical-blue/10 flex items-center justify-center text-2xl">
          {ACTIVITIES[index].icon}
        </div>
        <div className="flex flex-col">
          <span className="text-[0.65rem] font-black uppercase tracking-widest text-clinical-blue-deep opacity-60">Actividad Reciente</span>
          <p className="text-sm font-bold text-nexus-void leading-tight">
            {ACTIVITIES[index].service} en <span className="text-clinical-blue">{ACTIVITIES[index].location}</span>
          </p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[0.7rem] font-bold text-green-600 uppercase tracking-tighter">{ACTIVITIES[index].status} con éxito</span>
          </div>
        </div>
      </div>
    </div>
  );
}
