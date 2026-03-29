import { ReportFormData } from "@/types/PatientFormTypes";
import { FormGroup } from "./PatientFormComponents";
import React from "react";

interface SectionProps {
  formData: ReportFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const ReferenceSection = React.memo(({ formData, handleInputChange }: SectionProps) => (
  <section className="grid grid-cols-1 md:grid-cols-2 gap-[2rem]">
    <div className="space-y-[1.5rem]">
      <h2 className="text-[0.7rem] font-black text-[#003d63] uppercase tracking-[0.2em]">Referencia y Contacto</h2>
      <FormGroup label="Persona de Contacto">
        <input type="text" name="contactName" value={formData.contactName} onChange={handleInputChange} className="w-full border border-gray-200 p-[0.75rem] rounded-xl font-bold text-[0.85rem]" />
      </FormGroup>
      <FormGroup label="Teléfono Contacto">
        <input type="text" name="contactPhone" value={formData.contactPhone} onChange={handleInputChange} className="w-full border border-gray-200 p-[0.75rem] rounded-xl font-bold text-[0.85rem]" />
      </FormGroup>
    </div>
    <div className="space-y-[1.5rem]">
      <h2 className="text-[0.7rem] font-black text-[#003d63] uppercase tracking-[0.2em]">Médico Solicitante</h2>
      <FormGroup label="Médico Referente">
        <div className="flex gap-[0.5rem] items-center">
          <select name="solicitor" value={formData.solicitor} onChange={handleInputChange} className="flex-grow border border-gray-200 p-[0.75rem] rounded-xl font-bold text-[0.85rem]">
            <option>SELECCIONAR</option>
            <option>DR. CASTILLO</option>
            <option>OTROS</option>
          </select>
          <button className="bg-gray-100 text-[#003d63] px-[0.75rem] py-[0.75rem] rounded-xl text-[0.6rem] font-black uppercase">Copiar</button>
        </div>
      </FormGroup>
      <FormGroup label="Motivo del Estudio">
        <textarea name="studyMotive" value={formData.studyMotive} onChange={handleInputChange} rows={3} className="w-full border border-gray-200 p-[0.75rem] rounded-xl font-bold text-[0.85rem] resize-none"></textarea>
      </FormGroup>
    </div>
  </section>
));

export const FinancialSection = React.memo(({ formData, handleInputChange }: SectionProps) => (
  <section className="pt-[1rem] border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-[1.5rem] items-end">
    <FormGroup label="Costo Transporte">
      <input type="text" name="transportCost" value={formData.transportCost} onChange={handleInputChange} className="w-full border border-gray-200 p-[0.75rem] rounded-xl font-bold" />
      <label className="flex items-center gap-[0.5rem] mt-[0.5rem] cursor-pointer group">
        <input type="checkbox" name="isPendingPayment" checked={formData.isPendingPayment} onChange={handleInputChange} className="w-[1.1rem] h-[1.1rem] rounded accent-[#003d63]" />
        <span className="text-[0.65rem] font-black text-gray-400 group-hover:text-[#008de3] uppercase tracking-wider transition-colors">Pago Pendiente</span>
      </label>
    </FormGroup>
    <FormGroup label="Adelanto">
       <input type="text" name="prepayment" value={formData.prepayment} onChange={handleInputChange} className="w-full border border-gray-200 p-[0.75rem] rounded-xl font-bold" />
    </FormGroup>
    <FormGroup label="Fecha Probable Entrega">
      <input type="date" name="expectedDeliveryDate" value={formData.expectedDeliveryDate} onChange={handleInputChange} className="w-full border border-gray-200 p-[0.75rem] rounded-xl font-bold bg-white" />
    </FormGroup>
  </section>
));
