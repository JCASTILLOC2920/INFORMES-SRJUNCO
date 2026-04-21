'use client';

import React, { useState } from 'react';
import { analyzeMedicalOrder } from '@/app/actions/aiActions';

export default function OrderExtractionDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setOrders(prev => [...prev, { 
            id: Math.random().toString(36).substr(2, 9),
            image: reader.result as string,
            loading: false,
            data: null
          }]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const processBatch = async () => {
    setLoading(true);
    const newOrders = [...orders];
    
    for (let i = 0; i < newOrders.length; i++) {
      if (newOrders[i].data) continue; // Saltar ya procesados
      
      newOrders[i].loading = true;
      setOrders([...newOrders]);
      
      try {
        const base64Data = newOrders[i].image.split(',')[1];
        const result = await analyzeMedicalOrder(base64Data);
        newOrders[i].data = result;
      } catch (err) {
        console.error("Error procesando lote:", err);
      } finally {
        newOrders[i].loading = false;
        setOrders([...newOrders]);
      }
    }
    setLoading(false);
  };

  return (
    <div className="p-10 bg-white/40 backdrop-blur-3xl rounded-[4rem] border border-white/60 shadow-premium max-w-6xl mx-auto my-12">
      <div className="flex items-center justify-between mb-12">
        <div className="animate-reveal">
          <h2 className="text-4xl font-black text-nexus-void tracking-tight">Cerebro de Recepción <span className="text-clinical-blue">(Modo Batch)</span></h2>
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[0.6rem]">Asimilación Masiva de Órdenes | Directiva 3</p>
        </div>
        <div className="w-20 h-20 bg-nexus-void text-white rounded-3xl flex flex-col items-center justify-center text-xs font-black shadow-glow-blue border border-white/20">
          <span className="text-2xl mb-1">⚡</span> BATCH
        </div>
      </div>

      <div className="grid lg:grid-cols-[300px_1fr] gap-12">
        {/* Dropzone Column */}
        <div className="space-y-6">
          <label className="cursor-pointer group block">
            <div className="h-64 border-4 border-dashed border-slate-200 group-hover:border-clinical-blue rounded-[3rem] flex flex-col items-center justify-center transition-all bg-white/50 group-hover:bg-clinical-blue/5">
              <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">📸</span>
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-clinical-blue">Añadir Órdenes</span>
              <input type="file" multiple className="hidden" onChange={handleImagesUpload} accept="image/*" />
            </div>
          </label>
          
          <button 
            onClick={processBatch}
            disabled={orders.length === 0 || loading}
            className={`w-full py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-glow-blue transition-all ${loading ? 'bg-slate-300 animate-pulse cursor-wait' : 'bg-nexus-void text-white hover:bg-clinical-blue'}`}
          >
            {loading ? 'Sincronizando...' : `Procesar ${orders.length} Órdenes`}
          </button>
        </div>

        {/* Results List */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
          {orders.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-300 p-20 border-2 border-dashed border-slate-100 rounded-[3rem]">
              <span className="text-6xl mb-6 opacity-20">📥</span>
              <p className="font-bold uppercase tracking-widest text-xs">Esperando Lote de Trabajo</p>
            </div>
          ) : (
            orders.map((order, idx) => (
              <div key={order.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-8 animate-fade-in">
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100 shadow-inner">
                  <img src={order.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow">
                  {order.loading ? (
                    <div className="flex items-center gap-4">
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-clinical-blue animate-pulse w-1/2"></div>
                      </div>
                      <span className="text-[0.6rem] font-black uppercase tracking-tighter text-clinical-blue">Asimilando...</span>
                    </div>
                  ) : order.data ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-2">
                       <MiniField label="Paciente" value={`${order.data.patientFirstName} ${order.data.patientLastName}`} />
                       <MiniField label="DNI" value={order.data.patientDni} />
                       <MiniField label="Edad" value={order.data.age} />
                       <MiniField label="Servicio" value={order.data.serviceType} />
                    </div>
                  ) : (
                    <span className="text-[0.6rem] font-black uppercase text-slate-400 tracking-widest italic">Listo para extracción</span>
                  )}
                </div>
                
                <div className="flex-shrink-0">
                  {order.data && <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-black">✓</span>}
                  <button onClick={() => setOrders(prev => prev.filter(o => o.id !== order.id))} className="text-slate-200 hover:text-red-500 transition-colors ml-4 font-black">✕</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function MiniField({ label, value }: { label: string, value: string | null }) {
  return (
    <div className="flex flex-col">
      <span className="text-[0.55rem] font-black text-slate-400 uppercase tracking-tighter">{label}</span>
      <span className="text-[0.8rem] font-bold text-nexus-void truncate">{value || '---'}</span>
    </div>
  );
}

function DataField({ label, value }: { label: string, value: string | null }) {
  return (
    <div className="flex flex-col border-b border-slate-200/50 pb-2">
      <span className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">{label}</span>
      <span className="text-sm font-bold text-nexus-void">{value || '---'}</span>
    </div>
  );
}
