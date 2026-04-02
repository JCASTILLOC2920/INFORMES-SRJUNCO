import { ReportFormData } from "@/types/PatientFormTypes";
import React from "react";

export function FormGroup({ label, children, className = "" }: { label: string, children: React.ReactNode, className?: string }) {
  return (
    <div className={`flex flex-col gap-[0.5rem] w-full ${className}`}>
      <label className="text-[0.6rem] font-black text-[#475569] uppercase tracking-[0.2em] ml-[0.5rem]">{label}</label>
      {children}
    </div>
  );
}

interface SectionProps {
  formData: ReportFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const inputStyle = "w-full border-2 border-slate-300 bg-white p-[1rem] rounded-[1.25rem] focus:ring-4 focus:ring-blue-500/10 focus:border-[#008de3] outline-none font-bold text-[0.85rem] h-[3.5rem] transition-all text-[#002a45] placeholder-[#94a3b8] shadow-sm hover:border-slate-400";
const btnStyle = "bg-[#002a45] text-white px-[1.5rem] rounded-[1.25rem] text-[0.7rem] font-black uppercase tracking-[0.15em] hover:bg-[#008de3] transition-all shadow-lg shadow-blue-900/10 h-[3.5rem] flex items-center justify-center shrink-0 min-w-[7rem]";

export const ServiceSection = React.memo(({ formData, handleInputChange }: SectionProps) => {
  const [isLocked, setIsLocked] = React.useState(true);

  return (
    <section className="animate-in fade-in slide-in-from-bottom duration-500 delay-100">
      <div className="flex items-center gap-4 mb-6">
         <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#008de3]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
         </div>
         <h2 className="text-[0.75rem] font-black text-[#002a45] uppercase tracking-[0.25em]">Datos del Servicio</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.5rem]">
        <FormGroup label="Tipo Servicio">
          <select 
            name="serviceType" 
            value={formData.serviceType} 
            onChange={handleInputChange} 
            className={inputStyle}
          >
            <option>SELECCIONAR</option>
            <option>PAPANICOLAO</option>
            <option>HEMATOXILINA EOSINA</option>
          </select>
        </FormGroup>
        <FormGroup label="Fecha de Registro">
          <input 
            type="date" 
            name="registrationDate" 
            value={formData.registrationDate} 
            onChange={handleInputChange} 
            className={inputStyle}
          />
        </FormGroup>
        <FormGroup label="Cód. Atención (Auto-Generado)">
          <div className="flex gap-[0.5rem]">
            <input 
              type="text" 
              name="attentionCode" 
              value={formData.attentionCode || (isLocked ? "Calculando..." : "")} 
              onChange={handleInputChange}
              readOnly={isLocked}
              placeholder="Ej: JQ26-529"
              className={`${inputStyle} ${isLocked ? 'opacity-70 bg-slate-100 text-blue-800' : 'border-blue-500 bg-white ring-4 ring-blue-500/10 animate-in zoom-in-95 duration-200'}`} 
            />
            <button 
              type="button"
              onClick={() => setIsLocked(!isLocked)}
              className={`px-[1rem] rounded-[1.25rem] text-[0.6rem] font-black uppercase tracking-[0.1rem] flex items-center justify-center border transition-all duration-300 min-w-[7rem] hover:scale-[1.02] active:scale-95 ${
                isLocked 
                ? 'bg-blue-600 text-white border-transparent shadow-lg shadow-blue-500/20' 
                : 'bg-[#e33e2b] text-white border-transparent shadow-lg shadow-red-500/20'
              }`}
            >
              {isLocked ? (
                <span className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  Protegido / Corregir
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  Modo Manual
                </span>
              )}
            </button>
          </div>
        </FormGroup>
      </div>
    </section>
  );
});

export const PatientSection = React.memo(({ formData, handleInputChange }: SectionProps) => (
  <section className="animate-in fade-in slide-in-from-bottom duration-500 delay-200">
    <div className="flex items-center gap-4 mb-6">
       <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#008de3]">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
       </div>
       <h2 className="text-[0.75rem] font-black text-[#002a45] uppercase tracking-[0.25em]">Información del Paciente</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.5rem]">
      <FormGroup label="Identificación (DNI)">
        <div className="flex gap-[0.5rem]">
          <input type="text" name="patientDni" value={formData.patientDni} onChange={handleInputChange} placeholder="DNI" className={inputStyle} />
          <button className={btnStyle}>Localizar</button>
        </div>
      </FormGroup>
      <FormGroup label="Nombres">
        <input type="text" name="patientFirstName" value={formData.patientFirstName} onChange={handleInputChange} placeholder="..." className={inputStyle} />
      </FormGroup>
      <FormGroup label="Apellidos">
        <input type="text" name="patientLastName" value={formData.patientLastName} onChange={handleInputChange} placeholder="..." className={inputStyle} />
      </FormGroup>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-[1.5rem] mt-[1.5rem]">
      <FormGroup label="Edad">
        <input type="text" name="age" value={formData.age} onChange={handleInputChange} placeholder="00" className={inputStyle} />
      </FormGroup>
      <FormGroup label="Teléfono">
        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="000 000 000" className={inputStyle} />
      </FormGroup>
      <FormGroup label="Género Biológico" className="col-span-2 md:col-span-1">
        <select name="gender" value={formData.gender} onChange={handleInputChange} className={inputStyle}>
          <option>SELECCIONAR</option>
          <option>MASCULINO</option>
          <option>FEMENINO</option>
        </select>
      </FormGroup>
    </div>
  </section>
));
