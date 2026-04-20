'use client';

import React, { useState } from 'react';
import { analyzeMedicalOrder } from '@/app/actions/aiActions';

export default function OrderExtractionDashboard() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processOrder = async () => {
    if (!image) return;
    setLoading(true);
    try {
      // Remover el prefix de base64 para la API
      const base64Data = image.split(',')[1];
      const result = await analyzeMedicalOrder(base64Data);
      setExtractedData(result);
    } catch (err) {
      console.error("Error procesando orden:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/60 shadow-premium max-w-4xl mx-auto my-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-nexus-void tracking-tight">Recepción Inteligente <span className="text-clinical-blue">(AI-Vision)</span></h2>
          <p className="text-slate-500 font-medium italic">Depuración y extracción automática de órdenes médicas.</p>
        </div>
        <div className="w-16 h-16 bg-clinical-blue/10 rounded-2xl flex items-center justify-center text-3xl">👁️</div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Upload Area */}
        <div className="space-y-6">
          <div className={`relative h-[400px] border-2 border-dashed rounded-[2.5rem] flex items-center justify-center overflow-hidden transition-all ${image ? 'border-clinical-blue' : 'border-slate-300 hover:border-clinical-blue'}`}>
            {image ? (
              <img src={image} alt="Orden Médica" className="w-full h-full object-cover" />
            ) : (
              <label className="cursor-pointer flex flex-col items-center">
                <span className="text-4xl mb-4">📸</span>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Cargar Foto de Orden</span>
                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
              </label>
            )}
          </div>
          
          <button 
            onClick={processOrder}
            disabled={!image || loading}
            className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-glow-blue ${loading ? 'bg-slate-200 text-slate-400 animate-pulse' : 'bg-nexus-void text-white hover:bg-clinical-blue'}`}
          >
            {loading ? 'Sincronizando Cerebro...' : 'Escanear Orden con IA'}
          </button>
        </div>

        {/* Extracted Data Area */}
        <div className="bg-slate-50/50 rounded-[2.5rem] p-8 border border-slate-100 flex flex-col h-full">
          <h3 className="text-lg font-black text-nexus-void uppercase tracking-widest mb-6 border-b pb-4">Datos Extraídos</h3>
          
          {extractedData ? (
            <div className="space-y-4 flex-grow">
              <DataField label="Paciente" value={`${extractedData.patientFirstName || ''} ${extractedData.patientLastName || ''}`} />
              <DataField label="DNI" value={extractedData.patientDni} />
              <DataField label="Edad" value={extractedData.age} />
              <DataField label="Servicio" value={extractedData.serviceType} />
              <DataField label="Origen" value={extractedData.clinic} />
              <DataField label="Motivo" value={extractedData.studyMotive} />
              
              <button className="mt-8 w-full py-4 bg-green-600 text-white rounded-xl font-bold uppercase tracking-widest hover:bg-green-700 transition-all shadow-lg">
                Registrar en Sistema
              </button>
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center text-slate-400 italic text-center p-12">
              Buscando patrones diagnósticos... Cargue la imagen para iniciar la asimilación.
            </div>
          )}
        </div>
      </div>
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
