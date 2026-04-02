'use client';
import { useState, useEffect } from 'react';
import { exportReportToPdf } from '@/utils/reportExporter';

interface EditReportModalProps {
  report: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: any) => Promise<boolean>;
}

export default function EditReportModal({ report, isOpen, onClose, onSave }: EditReportModalProps) {
  const [formData, setFormData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('desc');
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (report) {
      setFormData({ ...report });
      setErrors([]);
    }
  }, [report]);

  if (!isOpen || !formData) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    if (errors.length > 0) setErrors([]);
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    if (!formData.attentionCode) newErrors.push('Falta el dato: Código de Atención');
    if (formData.attentionCode && !/^(Q|I|C|JQ\d{2})-/.test(formData.attentionCode)) {
      newErrors.push('Formato de código inválido (Ej. JQ26-XXX)');
    }
    if (!formData.patientDni || !/^\d{8}$/.test(formData.patientDni)) {
      newErrors.push('DNI debe tener 8 dígitos');
    }
    if (!formData.patientFirstName) newErrors.push('Falta el dato: Nombres');
    if (!formData.patientLastName) newErrors.push('Falta el dato: Apellidos');
    if (formData.gender === 'SELECCIONAR') newErrors.push('Falta el dato: Género');
    if (formData.serviceType === 'SELECCIONAR') newErrors.push('Falta el dato: Tipo de Servicio');

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    const success = await onSave(formData);
    setLoading(false);
    
    if (!success) {
      setErrors(['Error crítico al sincronizar con el servidor.']);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-[0.5rem] sm:p-[2rem]">
      <div className="absolute inset-0 bg-[#001a2d]/85 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose} />
      
      <div className="bg-white w-full max-w-[90rem] h-full lg:h-[90vh] rounded-[3rem] shadow-[-20px_20px_60px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden relative z-10 border border-white/10 animate-in zoom-in-95 duration-300">
        
        {/* Header - Premium Navigation */}
        <div className="bg-[#002a45] text-white px-[2.5rem] py-[1.5rem] flex justify-between items-center shrink-0 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="bg-[#008de3] p-2 rounded-xl shadow-lg">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </div>
            <h2 className="text-[1rem] font-black uppercase tracking-[0.2em]">Expediente Clínico: {formData.attentionCode}</h2>
          </div>
          <button onClick={onClose} className="bg-white/5 hover:bg-red-500/20 text-white/50 hover:text-red-500 p-[0.6rem] rounded-xl transition-all border border-white/5">
            <svg className="w-[1.5rem] h-[1.5rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Validation Errors */}
        {errors.length > 0 && (
          <div className="bg-red-50 border-b border-red-200 p-4 shrink-0 overflow-y-auto max-h-[8rem] flex gap-3 items-center">
             <div className="bg-red-100 p-2 rounded-full text-red-600"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></div>
             <ul className="text-red-700 text-[0.7rem] font-black uppercase tracking-wider flex flex-wrap gap-x-6 gap-y-1">
               {errors.map((error, i) => <li key={i}>{error}</li>)}
             </ul>
          </div>
        )}

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#f8fafc]">
          {/* Sidebar: Clinical Data */}
          <div className="w-full md:w-[26rem] flex flex-col gap-[1rem] overflow-y-auto p-[1.5rem] lg:p-[2rem] custom-scrollbar border-r border-gray-100 bg-white/50">
            <div className="space-y-[1.25rem]">
              <h3 className="text-[0.65rem] font-black text-[#64748b] uppercase tracking-[0.3em] mb-4 border-b border-gray-100 pb-2">Información Central</h3>
              
              <ModalField label="Código Atención" name="attentionCode" value={formData.attentionCode} onChange={handleInputChange} />
              <ModalField label="Documento (DNI)" name="patientDni" value={formData.patientDni} onChange={handleInputChange} placeholder="8 dígitos" />
              <ModalField label="Nombres" name="patientFirstName" value={formData.patientFirstName} onChange={handleInputChange} />
              <ModalField label="Apellidos" name="patientLastName" value={formData.patientLastName} onChange={handleInputChange} />
              
              <div className="grid grid-cols-2 gap-4">
                <ModalField label="Edad" name="age" value={formData.age} onChange={handleInputChange} />
                <ModalField label="Género" name="gender" value={formData.gender} onChange={handleInputChange} type="select" options={['SELECCIONAR', 'MASCULINO', 'FEMENINO']} />
              </div>

              <div className="pt-4 space-y-[1.25rem]">
                <h3 className="text-[0.65rem] font-black text-[#64748b] uppercase tracking-[0.3em] mb-4 border-b border-gray-100 pb-2">Clínica y Costos</h3>
                <ModalField label="Servicio Méd." name="serviceType" value={formData.serviceType} onChange={handleInputChange} type="select" options={['SELECCIONAR', 'PAPANICOLAO', 'HEMATOXILINA EOSINA']} />
                <ModalField label="Méd. Referente" name="solicitor" value={formData.solicitor} onChange={handleInputChange} type="select" options={['SELECCIONAR', 'DR. CASTILLO', 'OTROS']} showCopy />
                <ModalField label="Muestra/Motivo" name="studyMotive" value={formData.studyMotive} onChange={handleInputChange} type="textarea" />
                <ModalField label="Compromiso" name="expectedDeliveryDate" value={formData.expectedDeliveryDate} onChange={handleInputChange} type="date" />
                
                <div className="grid grid-cols-2 gap-4">
                   <ModalField label="Costo" name="cost" value={formData.cost} onChange={handleInputChange} type="number" />
                   <ModalField label="Adelanto" name="prepayment" value={formData.prepayment} onChange={handleInputChange} type="number" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Area: Clinical Editors */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tabs Selector */}
            <div className="flex bg-white px-[2rem] border-b border-gray-100">
               <TabBtn active={activeTab === 'desc'} onClick={() => setActiveTab('desc')} label="Protocolos de Análisis" />
               <TabBtn active={activeTab === 'img'} onClick={() => setActiveTab('img')} label="Capturas de Patología" />
            </div>

            {/* Editor Container */}
            <div className="flex-1 overflow-y-auto p-[1.5rem] lg:p-[3rem] custom-scrollbar bg-gray-50/30">
               {activeTab === 'desc' && (
                 <div className="space-y-[3.5rem] max-w-[65rem] mx-auto animate-in slide-in-from-bottom duration-500">
                    {/* Macroscopia Section */}
                     <div className="space-y-[1.5rem]">
                        <div className="flex justify-between items-center bg-[#002a45] p-4 rounded-t-[1.5rem] border border-white/5">
                           <label className="text-[0.7rem] font-black text-white uppercase tracking-[0.3em]">Examen Macroscópico</label>
                           <div className="bg-white/10 px-3 py-1 rounded-lg text-[0.6rem] text-white/50 font-bold uppercase tracking-widest">Digital Transcription</div>
                        </div>
                        <EditorBox 
                           label="Macroscopia"
                           value={formData.macroscopy} 
                           onChange={(val: string) => setFormData({...formData, macroscopy: val})} 
                        />
                     </div>

                     {/* Microscopia Section */}
                     <div className="space-y-[1.5rem]">
                        <div className="flex justify-between items-center bg-[#002a45] p-4 rounded-t-[1.5rem] border border-white/5">
                           <label className="text-[0.7rem] font-black text-white uppercase tracking-[0.3em]">Examen Microscópico</label>
                           <div className="bg-white/10 px-3 py-1 rounded-lg text-[0.6rem] text-white/50 font-bold uppercase tracking-widest">Digital Transcription</div>
                        </div>
                        <EditorBox 
                           label="Microscopia"
                           value={formData.microscopy} 
                           onChange={(val: string) => setFormData({...formData, microscopy: val})} 
                        />
                     </div>
                 </div>
               )}
               
               {activeTab === 'img' && (
                 <div className="h-full flex flex-col justify-center items-center text-gray-300 gap-[2rem] py-20 animate-in zoom-in duration-500">
                    <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col items-center gap-6">
                      <div className="w-[6rem] h-[6rem] rounded-full bg-blue-50 flex items-center justify-center text-[#008de3]">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                      <div className="text-center">
                        <p className="text-[0.8rem] font-black text-[#002a45] uppercase tracking-[0.4em] mb-2 text-balance leading-relaxed">Laboratorio Digitalizado de Imágenes</p>
                        <p className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest">Disponible en Versión 2.0 (Próximamente)</p>
                      </div>
                    </div>
                 </div>
               )}
            </div>

            {/* Footer Actions */}
            <div className="p-[2rem] border-t border-gray-100 flex justify-end items-center gap-[1.5rem] bg-white">
               <button onClick={onClose} className="px-[2.5rem] py-[1rem] rounded-2xl font-black uppercase text-[0.75rem] text-gray-400 hover:text-[#002a45] hover:bg-gray-50 transition-all tracking-[0.2em]">Cerrar</button>
               
               <button 
                onClick={() => exportReportToPdf(formData)} 
                className="group bg-[#f8fafc] text-[#002a45] border-2 border-[#002a45]/5 px-[2.5rem] py-[1rem] rounded-2xl font-black uppercase text-[0.75rem] tracking-[0.2em] shadow-sm hover:border-[#008de3] hover:text-[#008de3] transition-all flex items-center gap-3 active:scale-95"
               >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  <span>Generar PDF</span>
               </button>

               <button 
                onClick={handleSave} 
                disabled={loading}
                className="bg-[#002a45] text-white px-[4.5rem] py-[1.1rem] rounded-2xl font-black uppercase text-[0.8rem] tracking-[0.25em] shadow-2xl shadow-blue-900/40 hover:bg-[#008de3] transform hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50"
               >
                {loading ? 'Sincronizando...' : 'Publicar Cambios'}
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalField({ label, name, value, onChange, type = 'text', options = [], showCopy = false, placeholder = "" }: any) {
  const inputBase = "w-full bg-[#f8fafc] border-2 border-transparent rounded-2xl p-[0.9rem] text-[0.8rem] font-bold outline-none focus:bg-white focus:border-[#008de3] focus:ring-4 focus:ring-[#008de3]/5 transition-all text-[#002a45] placeholder-[#94a3b8]";
  
  return (
    <div className="space-y-1.5 w-full">
      <label className="text-[0.6rem] font-black text-[#64748b] uppercase tracking-[0.2em] ml-2">{label}</label>
      <div className="flex gap-2">
        {type === 'select' ? (
          <select name={name} value={value || ''} onChange={onChange} className={inputBase}>
            {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
          </select>
        ) : type === 'textarea' ? (
          <textarea name={name} value={value || ''} onChange={onChange} rows={3} className={`${inputBase} resize-none`} placeholder={placeholder} />
        ) : (
          <input type={type} name={name} value={value || ''} onChange={onChange} className={inputBase} placeholder={placeholder} />
        )}
        {showCopy && (
          <button className="bg-[#002a45] text-white px-4 rounded-2xl text-[0.6rem] font-black uppercase tracking-widest hover:bg-[#008de3] transition-all shadow-lg active:scale-95">Copiar</button>
        )}
      </div>
    </div>
  );
}

function TabBtn({ active, onClick, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-[2.5rem] py-[1.25rem] text-[0.7rem] font-black uppercase tracking-[0.25em] transition-all border-b-[4px] whitespace-nowrap ${
        active 
          ? 'border-[#008de3] text-[#002a45] bg-blue-50/30' 
          : 'border-transparent text-[#64748b] hover:text-[#002a45] hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  );
}

function EditorBox({ value, onChange, label }: any) {
  return (
    <div className="border-2 border-gray-100 rounded-b-[2.5rem] overflow-hidden bg-white shadow-[0_15px_40px_rgba(0,42,69,0.02)] relative group">
       {/* High-End Toolbar */}
       <div className="bg-[#f8fafc] border-b border-gray-100 p-2 flex gap-1 items-center">
          <div className="flex border-r border-gray-200 pr-2 gap-1 px-2">
             <EditorBtn icon="bold" onClick={() => {
                const textarea = document.getElementById(`editor-${label.replace(/\s+/g, '-')}`) as HTMLTextAreaElement;
                if (!textarea) return;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const text = textarea.value;
                const selected = text.substring(start, end);
                const before = text.substring(0, start);
                const after = text.substring(end);
                onChange(before + `**${selected}**` + after);
             }} />
             <EditorBtn icon="italic" onClick={() => {
                const textarea = document.getElementById(`editor-${label.replace(/\s+/g, '-')}`) as HTMLTextAreaElement;
                if (!textarea) return;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const text = textarea.value;
                const selected = text.substring(start, end);
                const before = text.substring(0, start);
                const after = text.substring(end);
                onChange(before + `_${selected}_` + after);
             }} />
             <EditorBtn icon="underline" onClick={() => {
                const textarea = document.getElementById(`editor-${label.replace(/\s+/g, '-')}`) as HTMLTextAreaElement;
                if (!textarea) return;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const text = textarea.value;
                const selected = text.substring(start, end);
                const before = text.substring(0, start);
                const after = text.substring(end);
                onChange(before + `<u>${selected}</u>` + after);
             }} />
          </div>
          <div className="flex gap-3 text-[0.6rem] font-black text-[#94a3b8] uppercase tracking-[0.2em] ml-4">
             <span className="hover:text-[#008de3] cursor-pointer transition-colors">{label} - Standard</span>
          </div>
          <div className="ml-auto px-4"><div className="w-2 h-2 rounded-full bg-[#28a745] animate-pulse"></div></div>
       </div>
       <textarea 
          id={`editor-${label.replace(/\s+/g, '-')}`}
          value={value || ''} 
          onChange={(e) => onChange(e.target.value)} 
          className="w-full h-[22rem] p-[2.5rem] text-[0.95rem] font-bold text-[#002a45] outline-none resize-none leading-relaxed custom-scrollbar" 
          placeholder="Inicie la transcripción..."
       />
    </div>
  );
}

function EditorBtn({ icon, onClick }: { icon: 'bold' | 'italic' | 'underline', onClick?: () => void }) {
  const icons = {
    bold: <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h8a4 4 0 100-8H6v8zm0 0h10a4 4 0 110 8H6v-8z" />,
    italic: <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 0h-4M8 20h4" />,
    underline: <path strokeLinecap="round" strokeLinejoin="round" d="M7 5v7a5 5 0 0010 0V5M5 19h14" />
  };
  return (
    <button onClick={onClick} className="w-9 h-9 flex items-center justify-center font-black rounded-xl hover:bg-white hover:shadow-sm text-[#64748b] hover:text-[#008de3] transition-all">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">{icons[icon]}</svg>
    </button>
  );
}
