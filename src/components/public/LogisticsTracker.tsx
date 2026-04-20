'use client';

import React, { useState } from 'react';

const MOCK_STATUS_MAP: Record<string, any> = {
  "RECIBIDO": { icon: "📥", label: "Recibido en Lima", color: "text-blue-600", bg: "bg-blue-50" },
  "TRANSITO": { icon: "🚚", label: "En Tránsito Nacional", color: "text-amber-600", bg: "bg-amber-50" },
  "PROCESANDO": { icon: "🔬", label: "En Análisis Patológico", color: "text-purple-600", bg: "bg-purple-50" },
  "LISTO": { icon: "✅", label: "Resultado Certificado", color: "text-green-600", bg: "bg-green-50" },
};

export default function LogisticsTracker() {
  const [trackingId, setTrackingId] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!trackingId) return;
    setLoading(true);
    // Simulación de búsqueda (en prod se conectaría a un endpoint que busque por DNI o Código)
    setTimeout(() => {
      setResult({
        patient: "C. JUNCO",
        origin: "Trujillo",
        status: "PROCESANDO",
        updateDate: "2026-04-20 09:30 AM"
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto my-20 px-6">
      <div className="bg-white/60 backdrop-blur-2xl rounded-[3rem] border border-white/80 p-10 shadow-premium text-center">
        <h2 className="text-3xl font-black text-nexus-void mb-4">Nexo <span className="text-clinical-blue">Logístico Nacional</span></h2>
        <p className="text-slate-600 font-medium mb-8">Rastree su muestra enviada desde provincia en tiempo real.</p>
        
        <div className="relative mb-10">
          <input 
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Ingrese DNI o Nro. de Guía"
            className="w-full h-16 bg-white border border-slate-200 rounded-2xl px-8 font-bold text-nexus-void focus:outline-none focus:border-clinical-blue transition-all"
          />
          <button 
            onClick={handleTrack}
            className="absolute right-2 top-2 h-12 px-6 bg-nexus-void text-white rounded-xl font-bold uppercase tracking-wider hover:bg-clinical-blue transition-all"
          >
            {loading ? '🔍' : 'Rastrear'}
          </button>
        </div>

        {result && (
          <div className="animate-reveal border-t border-slate-100 pt-8 text-left">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest block">Paciente</span>
                <span className="text-lg font-bold text-nexus-void">{result.patient}</span>
              </div>
              <div className="text-right">
                <span className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest block">Origen</span>
                <span className="text-sm font-bold text-slate-700">{result.origin}</span>
              </div>
            </div>

            <div className={`p-6 rounded-3xl flex items-center gap-6 ${MOCK_STATUS_MAP[result.status].bg} border border-white`}>
              <div className="text-4xl">{MOCK_STATUS_MAP[result.status].icon}</div>
              <div>
                <span className={`text-xl font-black ${MOCK_STATUS_MAP[result.status].color}`}>
                  {MOCK_STATUS_MAP[result.status].label}
                </span>
                <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-tighter">Última actualización: {result.updateDate}</p>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
               {[ "RECIBIDO", "TRANSITO", "PROCESANDO", "LISTO" ].map((step, i) => (
                 <div key={i} className="flex flex-col items-center gap-2">
                   <div className={`w-3 h-3 rounded-full ${result.status === step ? 'bg-clinical-blue animate-pulse' : (i < Object.keys(MOCK_STATUS_MAP).indexOf(result.status) ? 'bg-clinical-blue' : 'bg-slate-200')}`}></div>
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
