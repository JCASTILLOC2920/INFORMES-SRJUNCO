'use client';

import React, { useState, useEffect } from 'react';

const REGIONS = [
  { name: "Trujillo", top: "25%", left: "30%", active: true },
  { name: "Arequipa", top: "80%", left: "55%", active: true },
  { name: "Cusco", top: "70%", left: "65%", active: true },
  { name: "Iquitos", top: "15%", left: "60%", active: true },
  { name: "Lima", top: "50%", left: "28%", active: true },
  { name: "Chiclayo", top: "20%", left: "25%", active: true },
  { name: "Huancayo", top: "58%", left: "45%", active: true },
  { name: "Piura", top: "12%", left: "20%", active: true },
];

export default function NationalActivityMap() {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => (p + 1) % REGIONS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-nexus-void relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-cyan-pulse) 1px, transparent 0)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="max-w-[1700px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="animate-reveal">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight font-outfit">
            Soberanía Diagnóstica en <span className="text-cyan-pulse">Todo el Perú</span>
          </h2>
          <p className="text-xl text-slate-400 mb-12 font-medium leading-relaxed">
            La Colmena de JC PATH LAB procesa muestras diariamente desde las 25 regiones del país. Nuestra red logística asegura que un diagnóstico de precisión esté a su alcance, sin importar su ubicación.
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
              <span className="text-3xl font-black text-cyan-pulse block mb-2">+25</span>
              <p className="text-sm text-slate-300 font-bold uppercase tracking-widest">Ciudades Conectadas</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
              <span className="text-3xl font-black text-clinical-blue block mb-2">72h</span>
              <p className="text-sm text-slate-300 font-bold uppercase tracking-widest">Tiempo Nacional</p>
            </div>
          </div>
        </div>

        <div className="relative h-[600px] bg-white/5 rounded-[4rem] border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center p-8 group">
          {/* Simulated Peru Map with SVG or CSS */}
          <div className="relative w-full h-full opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000">
             <div className="absolute inset-0 flex items-center justify-center text-white/5 text-[20rem] font-black pointer-events-none">PERÚ</div>
             
             {/* Dynamic Activity Pulses */}
             {REGIONS.map((region, i) => (
               <div 
                 key={i} 
                 className="absolute w-4 h-4"
                 style={{ top: region.top, left: region.left }}
               >
                 <div className={`absolute inset-0 bg-cyan-pulse rounded-full animate-ping ${pulse === i ? 'opacity-100' : 'opacity-0'}`}></div>
                 <div className={`relative w-full h-full bg-cyan-pulse rounded-full shadow-glow-cyan cursor-help transition-transform hover:scale-150`}>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white text-nexus-void px-3 py-1 rounded-lg text-[0.65rem] font-black opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-tighter shadow-lg">
                      {region.name} - Activo
                    </div>
                 </div>
               </div>
             ))}
          </div>

          <div className="absolute bottom-8 left-8 right-8 bg-clinical-blue/20 border border-clinical-blue/30 p-4 rounded-2xl backdrop-blur-md">
            <p className="text-xs text-cyan-pulse font-black uppercase tracking-[0.2em] animate-pulse">
              ● Transmisión de Actividad en Tiempo Real
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
