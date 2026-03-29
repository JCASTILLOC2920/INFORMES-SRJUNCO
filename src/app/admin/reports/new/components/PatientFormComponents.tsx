import { ReportFormData } from "@/types/PatientFormTypes";
import React from "react";

export function FormGroup({ label, children, className = "" }: { label: string, children: React.ReactNode, className?: string }) {
  return (
    <div className={`flex flex-col gap-[0.4rem] w-full ${className}`}>
      <label className="text-[0.65rem] font-black text-gray-400 uppercase tracking-[0.15em] ml-[0.25rem]">{label}</label>
      {children}
    </div>
  );
}

interface SectionProps {
  formData: ReportFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const inputStyle = "border-[3px] border-[#002a45] bg-white p-[0.75rem] rounded-xl focus:ring-2 focus:ring-[#008de3] outline-none font-bold text-[0.85rem] h-[3.2rem] transition-all";
const btnStyle = "bg-[#003d63] text-white px-[1.5rem] rounded-xl text-[0.7rem] font-black uppercase tracking-wider hover:bg-[#008de3] transition-all shadow-md h-[3.2rem] flex items-center justify-center shrink-0";

export const ServiceSection = React.memo(({ formData, handleInputChange }: SectionProps) => (
  <section className="space-y-[1.5rem]">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.5rem]">
      <FormGroup label="Tipo Servicio">
        <select 
          name="serviceType" 
          value={formData.serviceType} 
          onChange={handleInputChange} 
          className={`w-full ${inputStyle} bg-gray-50/50`}
        >
          <option>SELECCIONAR</option>
          <option>BIOPSIA</option>
          <option>CITOLOGÍA</option>
          <option>INMUNOHISTOQUÍMICA</option>
        </select>
      </FormGroup>
      <FormGroup label="Fecha de Registro">
        <input 
          type="date" 
          name="registrationDate" 
          value={formData.registrationDate} 
          onChange={handleInputChange} 
          className={`w-full ${inputStyle} bg-gray-50/50`}
        />
      </FormGroup>
      <FormGroup label="Cód. Atención">
        <div className="flex gap-[0.5rem]">
          <input 
            type="text" 
            name="attentionCode" 
            value={formData.attentionCode} 
            onChange={handleInputChange} 
            placeholder="Q,I,C-#" 
            className={`w-full flex-grow ${inputStyle} bg-gray-50/50`} 
          />
          <button className={btnStyle}>
            Validar
          </button>
        </div>
      </FormGroup>
    </div>
  </section>
));

export const PatientSection = React.memo(({ formData, handleInputChange }: SectionProps) => (
  <section className="bg-gray-50/50 p-[1.5rem] rounded-[1.5rem] border border-gray-100 space-y-[1.5rem]">
    <h2 className="text-[0.7rem] font-black text-[#003d63] uppercase tracking-[0.2em] mb-[1rem]">Datos del Paciente</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.5rem]">
      <FormGroup label="DNI">
        <div className="flex gap-[0.5rem]">
          <input type="text" name="patientDni" value={formData.patientDni} onChange={handleInputChange} placeholder="DNI" className={`w-full flex-grow ${inputStyle}`} />
          <button className={btnStyle}>Buscar</button>
        </div>
      </FormGroup>
      <FormGroup label="Nombres">
        <input type="text" name="patientFirstName" value={formData.patientFirstName} onChange={handleInputChange} className={`w-full ${inputStyle}`} />
      </FormGroup>
      <FormGroup label="Apellidos">
        <input type="text" name="patientLastName" value={formData.patientLastName} onChange={handleInputChange} className={`w-full ${inputStyle}`} />
      </FormGroup>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-[1.5rem]">
      <FormGroup label="Edad">
        <input type="text" name="age" value={formData.age} onChange={handleInputChange} className={`w-full ${inputStyle}`} />
      </FormGroup>
      <FormGroup label="Teléfono">
        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className={`w-full ${inputStyle}`} />
      </FormGroup>
      <FormGroup label="Sexo" className="col-span-2 md:col-span-1">
        <select name="gender" value={formData.gender} onChange={handleInputChange} className={`w-full ${inputStyle}`}>
          <option>SELECCIONAR</option>
          <option>MASCULINO</option>
          <option>FEMENINO</option>
        </select>
      </FormGroup>
    </div>
  </section>
));
