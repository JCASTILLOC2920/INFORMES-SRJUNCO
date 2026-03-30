'use client';
import { useState, useEffect } from 'react';
import { ReportFormData } from '@/types/PatientFormTypes';

interface EditReportModalProps {
  report: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: any) => void;
}

export default function EditReportModal({ report, isOpen, onClose, onSave }: EditReportModalProps) {
  const [formData, setFormData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('desc');

  useEffect(() => {
    if (report) {
      setFormData({ ...report });
    }
  }, [report]);

  if (!isOpen || !formData) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-[1rem] sm:p-[2rem]">
      <div className="absolute inset-0 bg-[#001a2d]/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="bg-white w-full max-w-[85rem] h-full max-h-[55rem] rounded-[1.5rem] shadow-2xl flex flex-col overflow-hidden relative z-10 border border-white/20">
        {/* Header */}
        <div className="bg-[#003d63] text-white px-[2rem] py-[1.25rem] flex justify-between items-center shrink-0">
          <h2 className="text-[1.1rem] font-black uppercase tracking-widest flex items-center gap-[0.75rem]">
             Gestionar Registro de Paciente
          </h2>
          <button onClick={onClose} className="hover:bg-white/10 p-[0.5rem] rounded-full transition-all">
            <svg className="w-[1.5rem] h-[1.5rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden p-[1.5rem] gap-[1.5rem] bg-[#f8fafc]">
          {/* Left Side: Datos Servicio */}
          <div className="w-[28rem] flex flex-col gap-[1rem] overflow-y-auto pr-[0.5rem] custom-scrollbar">
            <div className="bg-white rounded-2xl border-2 border-[#003d63] overflow-hidden shadow-xl shadow-blue-900/5">
              <div className="bg-[#003d63] text-white px-[1.25rem] py-[0.75rem] text-[0.8rem] font-black uppercase tracking-widest">
                Datos Servicio
              </div>
              <div className="p-[1.5rem] space-y-[1rem]">
                <ModalField label="CodAtención" name="attentionCode" value={formData.attentionCode} onChange={handleInputChange} />
                <ModalField label="DNI" name="patientDni" value={formData.patientDni} onChange={handleInputChange} />
                <ModalField label="Sexo" name="gender" value={formData.gender} onChange={handleInputChange} type="select" options={['SELECCIONAR', 'MASCULINO', 'FEMENINO']} />
                <ModalField label="Nom. Paciente" name="patientFirstName" value={formData.patientFirstName} onChange={handleInputChange} />
                <ModalField label="Ape. Paciente" name="patientLastName" value={formData.patientLastName} onChange={handleInputChange} />
                <ModalField label="Edad" name="age" value={formData.age} onChange={handleInputChange} />
                <ModalField label="Telefono" name="phone" value={formData.phone} onChange={handleInputChange} />
                <ModalField label="F. Contacto" name="contactName" value={formData.contactName} onChange={handleInputChange} />
                <ModalField label="Tel. Contacto" name="contactPhone" value={formData.contactPhone} onChange={handleInputChange} />
                <ModalField label="Med. Solicitante" name="solicitor" value={formData.solicitor} onChange={handleInputChange} type="select" options={['SELECCIONAR', 'DR. CASTILLO', 'OTROS']} showCopy />
                <ModalField label="Motivo Estudio" name="studyMotive" value={formData.studyMotive} onChange={handleInputChange} type="textarea" />
                <ModalField label="Fec. Probable-Entrega" name="expectedDeliveryDate" value={formData.expectedDeliveryDate} onChange={handleInputChange} type="date" />
                <ModalField label="Doctor" name="doctor" value={formData.doctor} onChange={handleInputChange} type="select" options={['SELECCIONAR', 'PATÓLOGO 1', 'PATÓLOGO 2']} />
                <ModalField label="# CASETES" name="casetes" value={formData.casetes || '0'} onChange={handleInputChange} />
              </div>
            </div>

            {/* Orden Servicio area */}
            <div className="bg-white rounded-2xl border-2 border-[#003d63] overflow-hidden shadow-xl shadow-blue-900/5 mt-[1rem]">
                <div className="bg-[#003d63] text-white px-[1.25rem] py-[0.75rem] text-[0.8rem] font-black uppercase tracking-widest">
                  Orden Servicio
                </div>
                <div className="p-[1rem]">
                   <div className="border-2 border-dashed border-gray-200 rounded-xl p-[2rem] text-center text-gray-400 text-[0.7rem] font-bold uppercase tracking-widest">
                      Sin documentos adjuntos
                   </div>
                </div>
            </div>
          </div>

          {/* Right Side: Tabs and Editors */}
          <div className="flex-1 bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100 flex flex-col overflow-hidden">
            <div className="flex border-b border-gray-100">
               <TabBtn active={activeTab === 'desc'} onClick={() => setActiveTab('desc')} label="Descrip. Micro-Macro" />
               <TabBtn active={activeTab === 'img01'} onClick={() => setActiveTab('img01')} label="Adjunto Imagen 01" />
               <TabBtn active={activeTab === 'img02'} onClick={() => setActiveTab('img02')} label="Adjunto Imagen 02" />
            </div>

            <div className="flex-1 overflow-y-auto p-[2rem] custom-scrollbar">
               {activeTab === 'desc' && (
                 <div className="space-y-[2.5rem]">
                    {/* Macroscopica */}
                    <div className="space-y-[1rem]">
                       <div className="flex justify-between items-center">
                          <label className="text-[0.8rem] font-black text-[#003d63] uppercase tracking-widest">Cat. Macroscopica</label>
                          <select className="border-2 border-gray-200 p-[0.5rem] rounded-lg text-[0.75rem] font-bold outline-none focus:border-[#008de3]">
                             <option>SELECCIONAR</option>
                          </select>
                       </div>
                       <EditorBox label="Plan. Macroscopica" value={formData.macroscopy} onChange={(val: string) => setFormData({...formData, macroscopy: val})} />
                    </div>

                    {/* Microscopica */}
                    <div className="space-y-[1rem]">
                       <div className="flex justify-between items-center">
                          <label className="text-[0.8rem] font-black text-[#003d63] uppercase tracking-widest">Cat. Microscopica</label>
                          <select className="border-2 border-gray-200 p-[0.5rem] rounded-lg text-[0.75rem] font-bold outline-none focus:border-[#008de3]">
                             <option>SELECCIONAR</option>
                          </select>
                       </div>
                       <EditorBox label="Plan. Microscopica" value={formData.microscopy} onChange={(val: string) => setFormData({...formData, microscopy: val})} />
                    </div>
                 </div>
               )}
               {activeTab.startsWith('img') && (
                 <div className="h-full flex flex-col justify-center items-center text-gray-300 gap-[1.5rem]">
                    <svg className="w-[5rem] h-[5rem] opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <p className="text-[0.8rem] font-black uppercase tracking-[0.3em]">Módulo de imágenes en desarrollo</p>
                 </div>
               )}
            </div>

            <div className="p-[1.5rem] border-t border-gray-100 flex justify-end gap-[1rem] bg-gray-50/50">
               <button onClick={onClose} className="px-[2rem] py-[0.8rem] rounded-xl font-black uppercase text-[0.75rem] text-gray-400 hover:bg-gray-200 transition-all">Cancelar</button>
               <button onClick={() => onSave(formData)} className="bg-[#003d63] text-white px-[3rem] py-[0.8rem] rounded-xl font-black uppercase text-[0.75rem] tracking-widest shadow-lg hover:bg-[#008de3] transition-all">Guardar Cambios</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalField({ label, name, value, onChange, type = 'text', options = [], showCopy = false }: any) {
  return (
    <div className="flex items-center gap-[1rem]">
      <label className="w-[8rem] text-[0.7rem] font-bold text-gray-500 uppercase tracking-tight shrink-0">{label}</label>
      <div className="flex-grow flex gap-[0.5rem]">
        {type === 'select' ? (
          <select name={name} value={value || ''} onChange={onChange} className="w-full bg-[#ecf1f5] border border-gray-200 rounded-md p-[0.4rem] text-[0.75rem] font-bold outline-none focus:ring-2 focus:ring-[#008de3]/20">
            {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
          </select>
        ) : type === 'textarea' ? (
          <textarea name={name} value={value || ''} onChange={onChange} rows={2} className="w-full bg-[#ecf1f5] border border-gray-200 rounded-md p-[0.5rem] text-[0.75rem] font-bold outline-none focus:ring-2 focus:ring-[#008de3]/20 resize-none" />
        ) : (
          <input type={type} name={name} value={value || ''} onChange={onChange} className="w-full bg-[#ecf1f5] border border-gray-200 rounded-md p-[0.4rem] text-[0.75rem] font-bold outline-none focus:ring-2 focus:ring-[#008de3]/20" />
        )}
        {showCopy && (
          <button className="bg-[#003d63] text-white px-[0.75rem] rounded-md text-[0.6rem] font-black uppercase transition-all hover:bg-[#008de3]">Copiar</button>
        )}
      </div>
    </div>
  );
}

function TabBtn({ active, onClick, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-[1.5rem] py-[1rem] text-[0.75rem] font-black uppercase tracking-widest transition-all border-b-4 ${active ? 'border-[#008de3] text-[#003d63] bg-blue-50/30' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
    >
      {label}
    </button>
  );
}

function EditorBox({ label, value, onChange }: any) {
  return (
    <div className="border-2 border-gray-200 rounded-[1.25rem] overflow-hidden bg-white shadow-inner">
       {/* Fake Toolbar */}
       <div className="bg-[#f1f5f9] border-b border-gray-200 p-[0.5rem] flex gap-[0.5rem] items-center">
          <div className="flex border-r border-gray-300 pr-[0.5rem] gap-[0.25rem]">
             <EditorAction label="B" />
             <EditorAction label="I" />
             <EditorAction label="U" />
             <EditorAction label="✓" />
          </div>
          <div className="flex gap-[1rem] text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest ml-[1rem]">
             <span>Fuente</span>
             <span>Tamaño</span>
             <span>Color</span>
          </div>
       </div>
       <textarea 
          value={value || ''} 
          onChange={(e) => onChange(e.target.value)} 
          className="w-full h-[15rem] p-[1.5rem] text-[0.85rem] font-medium text-gray-700 outline-none resize-none" 
          placeholder={`Escriba el ${label.toLowerCase()} aquí...`}
       />
    </div>
  );
}

function EditorAction({ label }: any) {
  return <button className="w-[1.8rem] h-[1.8rem] flex items-center justify-center font-black rounded hover:bg-white text-[0.75rem] text-gray-500 transition-colors uppercase">{label}</button>;
}
