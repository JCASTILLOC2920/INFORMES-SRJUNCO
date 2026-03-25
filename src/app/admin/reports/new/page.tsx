'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { generateWordReport, ReportData } from '@/utils/wordGenerator';
import { REPORT_TEMPLATES, ReportTemplate } from '@/data/reportTemplates';
import { generateClinicalDescription } from '@/utils/ollamaClient';

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

  const [aiLoading, setAiLoading] = useState<string | null>(null);

  const handleAiAssist = async (field: 'macroscopia' | 'microscopia' | 'diagnostico') => {
    if (!formData.material) {
      alert('Por favor, indique primero el "Material Enviado" para que la IA tenga contexto.');
      return;
    }
    setAiLoading(field);
    try {
      const result = await generateClinicalDescription(field, formData.material, formData[field]);
      if (result) {
        setFormData(prev => ({ ...prev, [field]: result }));
      }
    } catch (error) {
      console.error('AI Error:', error);
      alert('Error al conectar con la IA de Ollama.');
    } finally {
      setAiLoading(null);
    }
  };

  const [images, setImages] = useState<{ 
    img1: ArrayBuffer | null, 
    img2: ArrayBuffer | null,
    img3: ArrayBuffer | null,
    img4: ArrayBuffer | null 
  }>({
    img1: null,
    img2: null,
    img3: null,
    img4: null
  });

  const [previews, setPreviews] = useState<{ 
    img1: string | null, 
    img2: string | null,
    img3: string | null,
    img4: string | null 
  }>({
    img1: null,
    img2: null,
    img3: null,
    img4: null
  });

  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState<string | null>(null);

  // Auto-calculate balance
  useEffect(() => {
    const cost = parseFloat(formData.paga) || 0;
    const prepay = parseFloat(formData.adelanta) || 0;
    setFormData(prev => ({ ...prev, resta: (cost - prepay).toFixed(2) }));
  }, [formData.paga, formData.adelanta]);

  const applyTemplate = (template: ReportTemplate) => {
    setFormData(prev => ({
      ...prev,
      material: template.material,
      macroscopia: template.macroscopia,
      microscopia: template.microscopia,
      diagnostico: template.diagnostico
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (file: File, type: 'img1' | 'img2' | 'img3' | 'img4') => {
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

  const handleDrop = (e: React.DragEvent, type: 'img1' | 'img2' | 'img3' | 'img4') => {
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
        img1: images.img1,
        img2: images.img2,
        img3: images.img3,
        img4: images.img4
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
        hasImages: !!(images.img1 || images.img2 || images.img3 || images.img4)
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
    <div className="max-w-7xl mx-auto space-y-8 pb-32 px-4 text-gray-900">
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Templates Sidebar */}
        <div className="lg:col-span-1 space-y-8">
            <section className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-gray-100">
                <div className="flex items-center space-x-4 mb-8 border-b border-gray-50 pb-6">
                    <div className="w-10 h-10 bg-clinical-blue-light text-clinical-blue rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                    </div>
                    <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Plantillas</h2>
                </div>
                <div className="space-y-3 max-h-[1000px] overflow-y-auto pr-2 custom-scrollbar">
                    {REPORT_TEMPLATES.map((template, idx) => (
                        <button 
                            key={idx}
                            onClick={() => applyTemplate(template)}
                            className="w-full text-left p-4 rounded-2xl text-[11px] font-bold text-gray-600 bg-gray-50 hover:bg-clinical-blue-light hover:text-clinical-blue transition-all border border-transparent hover:border-clinical-blue/20 flex items-center justify-between group"
                        >
                            <span className="truncate pr-2">{template.name}</span>
                            <i className="fas fa-chevron-right opacity-0 group-hover:opacity-100 transform translate-x-1 transition-all"></i>
                        </button>
                    ))}
                </div>
            </section>

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
                    <section className="bg-clinical-blue-deep p-6 rounded-3xl shadow-xl text-white mt-4">
                        <div className="space-y-4">
                            <InputField dark label="Costo Total" name="paga" value={formData.paga} onChange={handleInputChange} type="number" />
                            <InputField dark label="Adelanto" name="adelanta" value={formData.adelanta} onChange={handleInputChange} type="number" />
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-60">
                                <span>Resta Pendiente</span>
                                <span className="text-clinical-blue-light">S/ {formData.resta}</span>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </div>

        {/* Clinical Data & Photos */}
        <div className="lg:col-span-3 space-y-8">
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
                    <TextAreaField 
                        label="Examen Macroscópico" 
                        name="macroscopia" 
                        value={formData.macroscopia} 
                        onChange={handleInputChange} 
                        rows={3} 
                        onAiAssist={() => handleAiAssist('macroscopia')}
                        isAiLoading={aiLoading === 'macroscopia'}
                    />
                    <TextAreaField 
                        label="Examen Microscópico" 
                        name="microscopia" 
                        value={formData.microscopia} 
                        onChange={handleInputChange} 
                        rows={6} 
                        onAiAssist={() => handleAiAssist('microscopia')}
                        isAiLoading={aiLoading === 'microscopia'}
                    />
                    <TextAreaField 
                        label="Diagnóstico Final" 
                        name="diagnostico" 
                        value={formData.diagnostico} 
                        onChange={handleInputChange} 
                        rows={3} 
                        highlight 
                        onAiAssist={() => handleAiAssist('diagnostico')}
                        isAiLoading={aiLoading === 'diagnostico'}
                    />
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex items-center justify-between px-4">
                    <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Evidencia Fotográfica (Max 4)</h2>
                    <span className="text-[10px] text-clinical-blue font-bold px-3 py-1 bg-clinical-blue-light rounded-full italic">Protocolo de Alta Fidelidad</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <DropZone 
                        id="img1" 
                        label="MACRO A" 
                        active={dragActive === 'img1'} 
                        preview={previews.img1}
                        handleDrag={handleDrag} 
                        handleDrop={(e: React.DragEvent) => handleDrop(e, 'img1')}
                        onFileSelect={(file: File) => handleImageUpload(file, 'img1')}
                    />
                    <DropZone 
                        id="img2" 
                        label="MACRO B" 
                        active={dragActive === 'img2'} 
                        preview={previews.img2}
                        handleDrag={handleDrag} 
                        handleDrop={(e: React.DragEvent) => handleDrop(e, 'img2')}
                        onFileSelect={(file: File) => handleImageUpload(file, 'img2')}
                    />
                    <DropZone 
                        id="img3" 
                        label="MICRO A" 
                        active={dragActive === 'img3'} 
                        preview={previews.img3}
                        handleDrag={handleDrag} 
                        handleDrop={(e: React.DragEvent) => handleDrop(e, 'img3')}
                        onFileSelect={(file: File) => handleImageUpload(file, 'img3')}
                    />
                    <DropZone 
                        id="img4" 
                        label="MICRO B" 
                        active={dragActive === 'img4'} 
                        preview={previews.img4}
                        handleDrag={handleDrag} 
                        handleDrop={(e: React.DragEvent) => handleDrop(e, 'img4')}
                        onFileSelect={(file: File) => handleImageUpload(file, 'img4')}
                    />
                </div>
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

function TextAreaField({ label, name, value, onChange, placeholder, rows, highlight = false, onAiAssist, isAiLoading }: any) {
  return (
    <div className="relative group">
      <div className="flex justify-between items-center mb-3 ml-1">
        <label className="block text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">{label}</label>
        {onAiAssist && (
            <button 
                onClick={(e) => { e.preventDefault(); onAiAssist(); }}
                disabled={isAiLoading}
                className="text-[9px] font-black text-clinical-blue uppercase tracking-widest flex items-center gap-2 hover:text-clinical-blue-deep transition-colors bg-blue-50 px-3 py-1 rounded-full border border-clinical-blue/10 disabled:opacity-50"
            >
                {isAiLoading ? (
                    <><i className="fas fa-spinner fa-spin"></i> Procesando...</>
                ) : (
                    <><i className="fas fa-sparkles text-clinical-blue"></i> ✨ IA</>
                )}
            </button>
        )}
      </div>
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
