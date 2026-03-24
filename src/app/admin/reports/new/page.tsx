'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { generateWordReport, ReportData } from '@/utils/wordGenerator';

export default function NewReport() {
  const router = useRouter();
  const [formData, setFormData] = useState<ReportData>({
    atendido: '',
    nombre: '',
    dni: '',
    edad: '',
    procede: '',
    material: '',
    macroscopia: '',
    microscopia: '',
    diagnostico: '',
    paga: '0',
    adelanta: '0',
    resta: '0',
    fecha_ext: new Date().toISOString().split('T')[0],
  });

  const [images, setImages] = useState<{ macro: ArrayBuffer | null, micro: ArrayBuffer | null }>({
    macro: null,
    micro: null
  });

  const [previews, setPreviews] = useState<{ macro: string | null, micro: string | null }>({
    macro: null,
    micro: null
  });

  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState<string | null>(null);

  // Auto-calculate balance
  useEffect(() => {
    const cost = parseFloat(formData.paga) || 0;
    const prepay = parseFloat(formData.adelanta) || 0;
    setFormData(prev => ({ ...prev, resta: (cost - prepay).toFixed(2) }));
  }, [formData.paga, formData.adelanta]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (file: File, type: 'macro' | 'micro') => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      setImages(prev => ({ ...prev, [type]: arrayBuffer }));
      const blob = new Blob([arrayBuffer]);
      const url = URL.createObjectURL(blob);
      setPreviews(prev => ({ ...prev, [type]: url }));
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(e.currentTarget.id);
    else if (e.type === "dragleave") setDragActive(null);
  };

  const handleDrop = (e: React.DragEvent, type: 'macro' | 'micro') => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);
    if (e.dataTransfer.files?.[0]) handleImageUpload(e.dataTransfer.files[0], type);
  };

  const handleSubmit = async () => {
    if (!formData.atendido || !formData.nombre || !formData.dni) {
      alert('Por favor complete los campos críticos (Código, Paciente, DNI).');
      return;
    }

    setLoading(true);
    try {
      // 1. Generate Word Document locally
      await generateWordReport({
        ...formData,
        img1: images.macro,
        img2: images.micro
      });

      // 2. Save to Database via API
      const apiData = {
        attentionCode: formData.atendido,
        patientDni: formData.dni,
        patientFirstName: formData.nombre.split(' ')[0] || '',
        patientLastName: formData.nombre.split(' ').slice(1).join(' ') || '',
        age: formData.edad,
        solicitor: formData.procede,
        sampleType: formData.material,
        receptionDate: formData.fecha_ext,
        reportDate: formData.fecha_ext,
        macroscopy: formData.macroscopia,
        microscopy: formData.microscopia,
        diagnosis: formData.diagnostico,
        cost: formData.paga,
        prepayment: formData.adelanta,
        hasImages: !!(images.macro || images.micro)
      };

      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiData)
      });

      if (res.ok) {
        alert('Informe generado y guardado exitosamente.');
        router.push('/admin');
      } else {
        throw new Error('Error al guardar en la base de datos');
      }
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error. Verifique la consola.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-32 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Nuevo Informe Patológico</h1>
          <p className="text-gray-400 text-sm mt-2 font-bold uppercase tracking-widest">Protocolo de Redacción Táctica</p>
        </div>
        <div className="flex space-x-4 w-full md:w-auto">
            <button 
                onClick={() => router.back()}
                className="flex-1 md:flex-none px-8 py-4 bg-gray-100 text-gray-500 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95"
            >
                Cancelar
            </button>
            <button 
                onClick={handleSubmit} 
                className="flex-1 md:flex-none px-8 py-4 bg-clinical-blue-deep text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-900 transition-all shadow-xl active:scale-95"
            >
                {loading ? 'Procesando...' : 'Registrar y Descargar'}
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Patient & Financial Card */}
        <div className="lg:col-span-1 space-y-8">
            <section className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-gray-100">
                <div className="flex items-center space-x-4 mb-8 border-b border-gray-50 pb-6">
                    <div className="w-10 h-10 bg-clinical-blue-light text-clinical-blue rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Identificación</h2>
                </div>
                <div className="space-y-5">
                    <InputField label="Cód. Atención" name="atendido" value={formData.atendido} onChange={handleInputChange} placeholder="B-2026-XXXX" />
                    <InputField label="Nombre de Paciente" name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="APELLIDOS, NOMBRES" />
                    <div className="grid grid-cols-2 gap-4">
                        <InputField label="DNI / ID" name="dni" value={formData.dni} onChange={handleInputChange} placeholder="12345678" />
                        <InputField label="Edad" name="edad" value={formData.edad} onChange={handleInputChange} placeholder="45" />
                    </div>
                </div>
            </section>

            <section className="bg-clinical-blue-deep p-8 rounded-[2.5rem] shadow-2xl text-white">
                <div className="flex items-center space-x-4 mb-8 border-b border-white/10 pb-6">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zM17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /></svg>
                    </div>
                    <h2 className="text-sm font-black uppercase tracking-widest">Finanzas & Entrega</h2>
                </div>
                <div className="space-y-5">
                    <InputField dark label="Costo del Servicio" name="paga" value={formData.paga} onChange={handleInputChange} type="number" />
                    <InputField dark label="Adelanto / Pago" name="adelanta" value={formData.adelanta} onChange={handleInputChange} type="number" />
                    <div className="p-4 bg-white/5 rounded-2xl flex justify-between items-center border border-white/10">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Resta pendiente</span>
                        <span className="text-xl font-black text-clinical-blue-light">S/ {formData.resta}</span>
                    </div>
                    <InputField dark label="Fecha de Entrega" name="fecha_ext" value={formData.fecha_ext} onChange={handleInputChange} type="date" />
                </div>
            </section>
        </div>

        {/* Clinical Tabs / Areas */}
        <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-gray-100">
                <div className="flex items-center space-x-4 mb-10 border-b border-gray-50 pb-6">
                    <div className="w-10 h-10 bg-blue-50 text-clinical-blue rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Hallazgos y Origen</h2>
                </div>
                
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Médico Solicitante" name="procede" value={formData.procede} onChange={handleInputChange} placeholder="DR. JUAN PEREZ" />
                        <InputField label="Material Enviado" name="material" value={formData.material} onChange={handleInputChange} placeholder="BIOPSIA GÁSTRICA" />
                    </div>
                    <TextAreaField label="Examen Macroscópico" name="macroscopia" value={formData.macroscopia} onChange={handleInputChange} rows={3} />
                    <TextAreaField label="Examen Microscópico" name="microscopia" value={formData.microscopia} onChange={handleInputChange} rows={6} />
                    <TextAreaField label="Diagnóstico Final" name="diagnostico" value={formData.diagnostico} onChange={handleInputChange} rows={3} highlight />
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DropZone 
                    id="macro" 
                    label="EVIDENCIA MACRO" 
                    active={dragActive === 'macro'} 
                    preview={previews.macro}
                    handleDrag={handleDrag} 
                    handleDrop={(e: any) => handleDrop(e, 'macro')}
                    onFileSelect={(file: any) => handleImageUpload(file, 'macro')}
                />
                <DropZone 
                    id="micro" 
                    label="EVIDENCIA MICRO" 
                    active={dragActive === 'micro'} 
                    preview={previews.micro}
                    handleDrag={handleDrag} 
                    handleDrop={(e: any) => handleDrop(e, 'micro')}
                    onFileSelect={(file: any) => handleImageUpload(file, 'micro')}
                />
            </section>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange, placeholder, type = "text", dark = false }: any) {
  return (
    <div>
      <label className={`block text-[9px] font-black uppercase tracking-[0.2em] mb-3 ml-1 ${dark ? 'text-white/40' : 'text-gray-400'}`}>{label}</label>
      <input 
        type={type} 
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder} 
        className={`w-full px-6 py-4 rounded-2xl transition-all outline-none font-medium text-sm ${dark ? 'bg-white/5 border border-white/10 text-white focus:bg-white/10 focus:border-white/30' : 'bg-gray-50 border border-gray-100 text-gray-900 focus:bg-white focus:ring-4 focus:ring-clinical-blue/5 focus:border-clinical-blue'}`} 
      />
    </div>
  );
}

function TextAreaField({ label, name, value, onChange, placeholder, rows, highlight = false }: any) {
  return (
    <div>
      <label className="block text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">{label}</label>
      <textarea 
        name={name}
        value={value}
        onChange={onChange}
        rows={rows} 
        placeholder={placeholder} 
        className={`w-full px-8 py-6 bg-gray-50/50 border border-gray-100 rounded-[2rem] focus:bg-white focus:ring-8 focus:ring-clinical-blue/5 focus:border-clinical-blue transition-all outline-none text-gray-900 placeholder:text-gray-300 font-medium leading-relaxed italic ${highlight ? 'border-clinical-blue/30 bg-blue-50/20 ring-4 ring-clinical-blue/5 not-italic font-bold text-clinical-blue-deep' : ''}`} 
      />
    </div>
  );
}

function DropZone({ id, label, active, preview, handleDrag, handleDrop, onFileSelect }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <div 
      id={id}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`relative border-2 border-dashed rounded-[2.5rem] p-10 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[220px] ${active === id ? 'border-clinical-blue bg-blue-50 ring-8 ring-clinical-blue/5 shadow-inner' : 'border-gray-200 bg-white hover:border-clinical-blue-light hover:bg-gray-50 shadow-xl shadow-blue-900/5'}`}
    >
      <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] absolute top-6">{label}</span>
      {preview ? (
        <div className="w-full h-full absolute inset-0 rounded-[2.5rem] overflow-hidden p-2">
            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-3xl" />
            <div className="absolute inset-0 bg-clinical-blue-deep/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-black uppercase tracking-widest">Cambiar Evidencia</div>
        </div>
      ) : (
        <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-2xl flex items-center justify-center mx-auto">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Arrastrar Captura</p>
        </div>
      )}
      <input type="file" ref={fileInputRef} onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])} className="hidden" accept="image/*" />
    </div>
  );
}
