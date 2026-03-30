import { ReportFormData } from "@/types/PatientFormTypes";
import { FormGroup } from "./PatientFormComponents";
import React from "react";

interface SectionProps {
  formData: ReportFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const inputStyle = "border-[3px] border-[#002a45] bg-white p-[0.75rem] rounded-xl focus:ring-2 focus:ring-[#008de3] outline-none font-bold text-[0.85rem] h-[3.2rem] transition-all";
const btnStyle = "bg-[#003d63] text-white px-[1.5rem] rounded-xl text-[0.7rem] font-black uppercase tracking-wider hover:bg-[#008de3] transition-all shadow-md h-[3.2rem] flex items-center justify-center shrink-0";

export const ReferenceSection = React.memo(({ formData, handleInputChange }: SectionProps) => (
  <section className="grid grid-cols-1 md:grid-cols-2 gap-[2rem]">
    <div className="space-y-[1.5rem]">
      <h2 className="text-[0.7rem] font-black text-[#003d63] uppercase tracking-[0.2em]">Referencia y Contacto</h2>
      <FormGroup label="Persona de Contacto">
        <input type="text" name="contactName" value={formData.contactName} onChange={handleInputChange} className={`w-full ${inputStyle}`} />
      </FormGroup>
      <FormGroup label="Teléfono Contacto">
        <input type="text" name="contactPhone" value={formData.contactPhone} onChange={handleInputChange} className={`w-full ${inputStyle}`} />
      </FormGroup>
    </div>
    <div className="space-y-[1.5rem]">
      <h2 className="text-[0.7rem] font-black text-[#003d63] uppercase tracking-[0.2em]">Médico Solicitante</h2>
      <FormGroup label="Médico Referente">
        <div className="flex gap-[0.5rem] items-center">
          <select name="solicitor" value={formData.solicitor} onChange={handleInputChange} className={`flex-grow w-full ${inputStyle}`}>
            <option>SELECCIONAR</option>
            <option>DR. CASTILLO</option>
            <option>OTROS</option>
          </select>
          <button className={btnStyle}>Copiar</button>
        </div>
      </FormGroup>
      <FormGroup label="Motivo del Estudio">
        <textarea name="studyMotive" value={formData.studyMotive} onChange={handleInputChange} rows={3} className={`w-full border-[3px] border-[#002a45] bg-white p-[0.75rem] rounded-xl focus:ring-2 focus:ring-[#008de3] outline-none font-bold text-[0.85rem] resize-none transition-all`}></textarea>
      </FormGroup>
    </div>
  </section>
));

export const FinancialSection = React.memo(({ formData, handleInputChange }: SectionProps) => (
  <section className="pt-[1rem] border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-[1.5rem]">
    <FormGroup label="Costo Transporte" className="h-full">
      <input type="text" name="transportCost" value={formData.transportCost} onChange={handleInputChange} className={`w-full text-right ${inputStyle}`} />
      <label className="flex items-center gap-[0.5rem] mt-[0.5rem] cursor-pointer group h-[1.5rem]">
        <input type="checkbox" name="isPendingPayment" checked={formData.isPendingPayment} onChange={handleInputChange} className="w-[1.25rem] h-[1.25rem] rounded border-2 border-[#003d63] accent-[#003d63] transition-colors" />
        <span className="text-[0.65rem] font-black text-[#003d63] group-hover:text-[#008de3] uppercase tracking-wider transition-colors pt-1">Pago Pendiente</span>
      </label>
    </FormGroup>
    <FormGroup label="Adelanto" className="h-full">
       <input type="text" name="prepayment" value={formData.prepayment} onChange={handleInputChange} className={`w-full text-right ${inputStyle}`} />
       <div className="mt-[0.5rem] h-[1.5rem]" /> {/* Espaciador de alineación */}
    </FormGroup>
    <FormGroup label="Fecha Probable Entrega" className="h-full">
      <input type="date" name="expectedDeliveryDate" value={formData.expectedDeliveryDate} onChange={handleInputChange} className={`w-full ${inputStyle}`} />
      <div className="mt-[0.5rem] h-[1.5rem]" /> {/* Espaciador de alineación */}
    </FormGroup>
  </section>
));

