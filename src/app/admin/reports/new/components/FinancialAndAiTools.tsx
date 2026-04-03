import { ReportFormData } from "@/types/PatientFormTypes";
import { FormGroup } from "./PatientFormComponents";
import React, { useState } from "react";
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface SectionProps {
  formData: ReportFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const inputStyle = "w-full border-2 border-slate-300 bg-white p-[1rem] rounded-[1.25rem] focus:ring-4 focus:ring-blue-500/10 focus:border-[#008de3] outline-none font-bold text-[0.85rem] h-[3.5rem] transition-all text-[#002a45] placeholder-[#94a3b8] shadow-sm hover:border-slate-400";
const btnStyle = "bg-[#002a45] text-white px-[1.5rem] rounded-[1.25rem] text-[0.7rem] font-black uppercase tracking-[0.15em] hover:bg-[#008de3] transition-all shadow-lg shadow-blue-900/10 h-[3.5rem] flex items-center justify-center shrink-0 min-w-[7rem]";

export const ReferenceSection = React.memo(({ formData, handleInputChange }: SectionProps) => {
  const { data: doctorsData, mutate } = useSWR('/api/doctors', fetcher);
  const doctors = Array.isArray(doctorsData) ? doctorsData : [];
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegisterDoctor = async () => {
    if (!formData.solicitor || formData.solicitor === 'SELECCIONAR' || formData.solicitor.trim() === '') {
      alert('Por favor, ingrese el nombre de un médico.');
      return;
    }

    const doctorExists = doctors.some((doc: any) => 
      doc.name.toLowerCase() === formData.solicitor.toLowerCase()
    );

    if (doctorExists) {
      alert('El médico ya se encuentra registrado.');
      return;
    }

    setIsRegistering(true);
    try {
      const res = await fetch('/api/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.solicitor.toUpperCase(),
          type: 'DR. CLIENTE', // Valor por defecto
        }),
      });

      if (res.ok) {
        alert(`Médico registrado con éxito: ${formData.solicitor.toUpperCase()}`);
        mutate(); // Recargar la lista de médicos
      } else {
        const errorData = await res.json();
        alert(`Error al registrar médico: ${errorData.error || 'Desconocido'}`);
      }
    } catch (error) {
      console.error('Error al registrar médico:', error);
      alert('Error de conexión al registrar el médico.');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <section className="animate-in fade-in slide-in-from-bottom duration-500 delay-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[2.5rem]">
        {/* Contact Information */}
        <div className="space-y-[1.5rem]">
          <div className="flex items-center gap-4 mb-4">
             <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#008de3]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
             </div>
             <h2 className="text-[0.75rem] font-black text-[#002a45] uppercase tracking-[0.25em]">Referencia y Contacto</h2>
          </div>
          <FormGroup label="Persona de Contacto">
            <input type="text" name="contactName" value={formData.contactName} onChange={handleInputChange} placeholder="Nombre completo" className={inputStyle} />
          </FormGroup>
          <FormGroup label="Teléfono Contacto">
            <input type="text" name="contactPhone" value={formData.contactPhone} onChange={handleInputChange} placeholder="999 999 999" className={inputStyle} />
          </FormGroup>
        </div>

        {/* Medical Information */}
        <div className="space-y-[1.5rem]">
          <div className="flex items-center gap-4 mb-4">
             <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#008de3]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01m-.01 4h.01" /></svg>
             </div>
             <h2 className="text-[0.75rem] font-black text-[#002a45] uppercase tracking-[0.25em]">Médico y Estudio</h2>
          </div>
          <FormGroup label="Médico Referente (Solicitante)">
            <div className="flex gap-[0.5rem] items-center">
              <input 
                list="doctors-list"
                name="solicitor" 
                value={formData.solicitor} 
                onChange={handleInputChange} 
                className={inputStyle}
                placeholder="Buscar o escribir nombre..."
              />
              <datalist id="doctors-list">
                {doctors.map((doc: any) => (
                  <option key={doc.id} value={doc.name} />
                ))}
              </datalist>
              <button 
                type="button"
                onClick={handleRegisterDoctor}
                disabled={isRegistering}
                className={`${btnStyle} ${isRegistering ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isRegistering ? 'Sincronizando...' : 'Registrar'}
              </button>
            </div>
          </FormGroup>
          <FormGroup label="Muestra y Motivo del Estudio">
            <textarea 
              name="studyMotive" 
              value={formData.studyMotive} 
              onChange={handleInputChange} 
              rows={3} 
              placeholder="Descripción detallada de la muestra..."
              className="w-full border-2 border-slate-300 bg-white p-[1rem] rounded-[1.5rem] focus:ring-4 focus:ring-blue-500/10 focus:border-[#008de3] outline-none font-bold text-[0.85rem] resize-none transition-all text-[#002a45] placeholder-[#94a3b8] min-h-[7rem] shadow-sm hover:border-slate-400"
            ></textarea>
          </FormGroup>
        </div>
      </div>
    </section>
  );
});

export const FinancialSection = React.memo(({ formData, handleInputChange }: SectionProps) => (
  <section className="pt-[2rem] border-t border-gray-100 animate-in fade-in slide-in-from-bottom duration-500 delay-400">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.5rem]">
      <FormGroup label="Inversión y Transporte">
        <div className="relative group">
          <input type="text" name="transportCost" value={formData.transportCost} onChange={handleInputChange} className={`text-right pr-[3rem] ${inputStyle}`} />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[#94a3b8] font-black text-[0.8rem]">S/</span>
        </div>
        <label className="flex items-center gap-[0.75rem] mt-[0.75rem] cursor-pointer group px-2">
          <div className="relative">
            <input 
              type="checkbox" 
              name="isPendingPayment" 
              checked={formData.isPendingPayment} 
              onChange={handleInputChange} 
              className="peer appearance-none w-[1.5rem] h-[1.5rem] rounded-lg border-2 border-[#002a45]/20 checked:bg-[#e33e2b] checked:border-transparent transition-all" 
            />
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <span className="text-[0.65rem] font-black text-[#64748b] group-hover:text-[#e33e2b] uppercase tracking-widest transition-colors">Estado: Pago Pendiente</span>
        </label>
      </FormGroup>

      <FormGroup label="Adelanto / Pago Inicial">
        <div className="relative">
          <input type="text" name="prepayment" value={formData.prepayment} onChange={handleInputChange} className={`text-right pr-[3rem] ${inputStyle}`} />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[#94a3b8] font-black text-[0.8rem]">S/</span>
        </div>
      </FormGroup>

      <FormGroup label="Compromiso: Fecha de Entrega">
        <input 
          type="date" 
          name="expectedDeliveryDate" 
          value={formData.expectedDeliveryDate} 
          onChange={handleInputChange} 
          className={inputStyle} 
        />
      </FormGroup>
    </div>
  </section>
));

