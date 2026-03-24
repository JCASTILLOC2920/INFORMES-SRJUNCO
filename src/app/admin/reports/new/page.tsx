'use client';
import { useState, useRef } from 'react';
import { generateWordReport, ReportData } from '@/utils/wordGenerator';

export default function NewReport() {
  const [formData, setFormData] = useState<Partial<ReportData>>({
    patientFirstName: '',
    patientLastName: '',
    age: '',
    patientId: '',
    receptionDate: '',
    reportDate: '',
    ind: '',
    muestra: '',
    macroscopy: '',
    microscopy: '',
    diagnosis: '',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (file: File, type: 'macro' | 'micro') => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      setImages(prev => ({ ...prev, [type]: arrayBuffer }));
      
      // Create preview URL
      const blob = new Blob([arrayBuffer]);
      const url = URL.createObjectURL(blob);
      setPreviews(prev => ({ ...prev, [type]: url }));
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDrag = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(id);
    } else if (e.type === "dragleave") {
      setDragActive(null);
    }
  };

  const handleDrop = (e: React.DragEvent, type: 'macro' | 'micro') => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0], type);
    }
  };

  const handleSubmit = async () => {
    if (!formData.patientFirstName || !formData.patientLastName || !formData.patientId) {
      alert('Por favor complete los campos obligatorios (Nombres, Apellidos, ID).');
      return;
    }

    setLoading(true);
    try {
      await generateWordReport({
        ...(formData as ReportData),
        fotoMacro: images.macro,
        fotoMicro: images.micro
      });
    } catch (error) {
      alert('Error al generar el informe. Verifique la consola.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      patientFirstName: '',
      patientLastName: '',
      age: '',
      patientId: '',
      receptionDate: '',
      reportDate: '',
      ind: '',
      muestra: '',
      macroscopy: '',
      microscopy: '',
      diagnosis: '',
    });
    setImages({ macro: null, micro: null });
    setPreviews({ macro: null, micro: null });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Generar Informe</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Automatización de diagnósticos JC PATH LAB.</p>
        </div>
        <div className="flex space-x-3 w-full md:w-auto">
            <button 
                onClick={resetForm}
                className="flex-1 md:flex-none px-6 py-3 bg-gray-100 text-gray-600 rounded-2xl text-sm font-bold hover:bg-gray-200 transition-all active:scale-95"
            >
                Limpiar datos
            </button>
            <button className="flex-1 md:flex-none px-6 py-3 bg-white text-clinical-blue border-2 border-clinical-blue-light rounded-2xl text-sm font-bold hover:bg-blue-50 transition-all active:scale-95">
                Previsualizar
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1: Datos del Paciente */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-gray-50 space-y-8 md:col-span-3">
          <div className="flex items-center space-x-4 border-b border-gray-100 pb-6">
             <div className="p-3 bg-clinical-blue-light text-clinical-blue rounded-2xl">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
             </div>
             <h2 className="text-xl font-bold text-gray-800 tracking-tight uppercase">Datos del Paciente</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-6">
            <InputField label="Nombres" name="patientFirstName" value={formData.patientFirstName} onChange={handleInputChange} placeholder="Juan" required />
            <InputField label="Apellidos" name="patientLastName" value={formData.patientLastName} onChange={handleInputChange} placeholder="Pérez" required />
            <InputField label="Edad" name="age" value={formData.age} onChange={handleInputChange} placeholder="0" type="number" />
            <InputField label="ID / Código" name="patientId" value={formData.patientId} onChange={handleInputChange} placeholder="B-2024-001" required />
            <InputField label="Fecha Recepción" name="receptionDate" value={formData.receptionDate} onChange={handleInputChange} type="date" />
            <InputField label="Fecha Informe" name="reportDate" value={formData.reportDate} onChange={handleInputChange} type="date" />
            <InputField label="Médico Solicitante" name="ind" value={formData.ind} onChange={handleInputChange} placeholder="Dr. Smith" />
            <InputField label="Muestra" name="muestra" value={formData.muestra} onChange={handleInputChange} placeholder="Gástrica" />
          </div>
        </section>

        {/* Card 2: Hallazgos Médicos */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-gray-100 space-y-8 md:col-span-2">
          <div className="flex items-center space-x-4 border-b border-gray-100 pb-6">
             <div className="p-3 bg-clinical-blue-light text-clinical-blue rounded-2xl">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
             </div>
             <h2 className="text-xl font-bold text-gray-800 tracking-tight uppercase">Hallazgos Médicos</h2>
          </div>
          
          <div className="space-y-8">
            <TextAreaField label="Examen Macroscópico" name="macroscopy" value={formData.macroscopy} onChange={handleInputChange} placeholder="Aspecto macroscópico..." rows={4} />
            <TextAreaField label="Examen Microscópico" name="microscopy" value={formData.microscopy} onChange={handleInputChange} placeholder="Hallazgos microscópicos..." rows={8} />
            <TextAreaField label="Diagnóstico Final" name="diagnosis" value={formData.diagnosis} onChange={handleInputChange} placeholder="Conclusión definitiva..." rows={3} highlight />
          </div>
        </section>

        {/* Card 3: Evidencia */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-gray-100 space-y-8">
          <div className="flex items-center space-x-4 border-b border-gray-100 pb-6">
             <div className="p-3 bg-clinical-blue-light text-clinical-blue rounded-2xl">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
             </div>
             <h2 className="text-xl font-bold text-gray-800 tracking-tight uppercase">Evidencia</h2>
          </div>

          <div className="space-y-6">
            <DropZone 
                id="macro" 
                label="Macroscópica" 
                active={dragActive === 'macro'} 
                preview={previews.macro}
                handleDrag={handleDrag} 
                handleDrop={(e: React.DragEvent) => handleDrop(e, 'macro')}
                onFileSelect={(file: File) => handleImageUpload(file, 'macro')}
            />
            <DropZone 
                id="micro" 
                label="Microscópica" 
                active={dragActive === 'micro'} 
                preview={previews.micro}
                handleDrag={handleDrag} 
                handleDrop={(e: React.DragEvent) => handleDrop(e, 'micro')}
                onFileSelect={(file: File) => handleImageUpload(file, 'micro')}
            />
          </div>
        </section>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-12 right-12 z-50">
        <button 
            onClick={handleSubmit}
            disabled={loading}
            className={`flex items-center space-x-4 bg-clinical-blue-deep hover:bg-gray-900 text-white px-10 py-6 rounded-[2rem] shadow-2xl transition-all transform hover:-translate-y-2 active:scale-95 group ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className="font-bold text-xl">{loading ? 'Generando...' : 'Generar Informe Word'}</span>
          <div className="p-2 bg-clinical-blue rounded-xl group-hover:rotate-12 transition-transform shadow-lg">
             <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
        </button>
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange, placeholder, type = "text", required = false, className = "" }: any) {
  return (
    <div className={className}>
      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">{label} {required && <span className="text-clinical-blue">*</span>}</label>
      <input 
        type={type} 
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder} 
        className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-clinical-blue/5 focus:border-clinical-blue transition-all outline-none text-gray-900 placeholder:text-gray-300 font-medium" 
      />
    </div>
  );
}

function TextAreaField({ label, name, value, onChange, placeholder, rows, highlight = false }: any) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">{label}</label>
      <textarea 
        name={name}
        value={value}
        onChange={onChange}
        rows={rows} 
        placeholder={placeholder} 
        className={`w-full px-6 py-5 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] focus:bg-white focus:ring-4 focus:ring-clinical-blue/5 focus:border-clinical-blue transition-all outline-none text-gray-900 placeholder:text-gray-300 font-medium leading-relaxed ${highlight ? 'border-clinical-blue-light bg-blue-50/20 ring-4 ring-clinical-blue/5' : ''}`} 
      />
    </div>
  );
}

function DropZone({ id, label, active, preview, handleDrag, handleDrop, onFileSelect }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div 
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`relative border-2 border-dashed rounded-3xl p-8 transition-all cursor-pointer flex flex-col items-center justify-center space-y-3 min-h-[160px] ${active ? 'border-clinical-blue bg-blue-50 ring-8 ring-clinical-blue/5 shadow-inner' : 'border-gray-100 hover:border-blue-100 hover:bg-gray-50 shadow-sm'}`}
    >
      <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-[0.25em] absolute top-4 left-6">{label}</span>
      
      {preview ? (
        <div className="w-full h-full absolute inset-0 rounded-3xl overflow-hidden">
            <img src={preview} alt="Preview" className="w-full h-full object-cover p-2" />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold uppercase tracking-widest">Cambiar imagen</div>
        </div>
      ) : (
        <>
            <div className={`p-4 rounded-2xl ${active ? 'bg-clinical-blue text-white' : 'bg-gray-100 text-gray-400'}`}>
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            </div>
            <div className="text-center">
                <p className="text-sm font-bold text-gray-600">Subir imagen</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-tighter mt-1 font-medium italic">Clic o arrastrar</p>
            </div>
        </>
      )}
      
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])}
        className="hidden" 
        accept="image/*"
      />
    </div>
  );
}
