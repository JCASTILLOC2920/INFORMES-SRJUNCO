'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { generateWordReport, ReportData } from '@/utils/wordGenerator';
import { generateClinicalDescription } from '@/utils/ollamaClient';

export default function RegistroPaciente() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    serviceType: 'SELECCIONAR',
    attentionCode: '',
    patientDni: '',
    patientFirstName: '',
    patientLastName: '',
    age: '',
    phone: '',
    gender: 'SELECCIONAR',
    contactName: '',
    contactPhone: '',
    solicitor: 'SELECCIONAR',
    studyMotive: '',
    transportCost: '0',
    isPendingPayment: false,
    prepayment: '0',
    clinic: '',
    expectedDeliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Default 5 days later
    // Clinical data (hidden but used for generation/IA)
    macroscopy: '',
    microscopy: '',
    diagnosis: '',
    sampleType: ''
  });

  const [aiLoading, setAiLoading] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev: any) => ({ ...prev, [name]: val }));
  };

  const handleAiAssist = async (field: 'macroscopia' | 'microscopia' | 'diagnostico') => {
    // Mapping form fields to AI client expectations
    const dbFieldMap: any = {
      macroscopia: 'macroscopy',
      microscopia: 'microscopy',
      diagnostico: 'diagnosis'
    };
    
    const dbField = dbFieldMap[field];

    if (!formData.studyMotive && !formData.sampleType) {
      alert('Por favor, indique el motivo o material para contexto de IA.');
      return;
    }
    setAiLoading(field);
    try {
      const context = `${formData.sampleType || ''} ${formData.studyMotive || ''}`;
      const result = await generateClinicalDescription(field, context, formData[dbField]);
      if (result) {
        setFormData((prev: any) => ({ ...prev, [dbField]: result }));
      }
    } catch (error) {
      console.error('AI Error:', error);
      alert('Error al conectar con la IA.');
    } finally {
      setAiLoading(null);
    }
  };

  const handleSubmit = async () => {
    if (!formData.attentionCode || !formData.patientFirstName || !formData.patientDni) {
      alert('Por favor complete los campos obligatorios (*).');
      return;
    }

    setLoading(true);
    try {
      // Ensure numeric fields are numbers
      const submissionData = {
        ...formData,
        age: parseInt(formData.age) || null,
        cost: parseFloat(formData.cost) || 0,
        transportCost: parseFloat(formData.transportCost) || 0,
        prepayment: parseFloat(formData.prepayment) || 0,
      };

      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      if (res.ok) {
        alert('Paciente registrado exitosamente.');
        router.push('/admin');
      } else {
        throw new Error('Error al guardar');
      }
    } catch (error) {
      console.error(error);
      alert('Error al registrar paciente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[60rem] mx-auto bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100 elite-shadow">
      {/* Header Bar - Fluid & Responsive */}
      <div className="bg-[#003d63] text-white px-[1.5rem] py-[1rem] flex justify-between items-center border-b border-white/10">
        <h1 className="text-[1.1rem] font-black uppercase tracking-widest flex items-center gap-[0.75rem]">
          <span className="bg-[#008de3] p-[0.4rem] rounded-md shadow-lg shadow-blue-500/20">
            <svg className="w-[1.25rem] h-[1.25rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </span>
          Registro de Paciente
        </h1>
        <button 
          onClick={() => router.back()} 
          className="hover:bg-white/10 p-[0.5rem] rounded-full transition-all text-white/70 hover:text-white"
          aria-label="Cerrar"
        >
          <svg className="w-[1.5rem] h-[1.5rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div className="p-[1.5rem] sm:p-[2.5rem] space-y-[2rem]">
        {/* Section: Identificación del Servicio */}
        <section className="space-y-[1.5rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.5rem]">
            <FormGroup label="Tipo Servicio">
              <select 
                name="serviceType" 
                value={formData.serviceType} 
                onChange={handleInputChange} 
                className="w-full border border-gray-200 bg-gray-50/50 p-[0.75rem] rounded-xl focus:ring-2 focus:ring-[#008de3] focus:border-transparent outline-none transition-all font-bold text-[0.85rem]"
              >
                <option>SELECCIONAR</option>
                <option>BIOPSIA</option>
                <option>CITOLOGÍA</option>
                <option>INMUNOHISTOQUÍMICA</option>
              </select>
            </FormGroup>
            <FormGroup label="Cód. Atención">
              <div className="flex gap-[0.5rem]">
                <input 
                  type="text" 
                  name="attentionCode" 
                  value={formData.attentionCode} 
                  onChange={handleInputChange} 
                  placeholder="Q,I,C-#" 
                  className="flex-grow border border-gray-200 bg-gray-50/50 p-[0.75rem] rounded-xl focus:ring-2 focus:ring-[#008de3] focus:border-transparent outline-none transition-all font-bold text-[0.85rem]" 
                />
                <button className="bg-[#003d63] text-white px-[1rem] py-[0.75rem] rounded-xl text-[0.7rem] font-black uppercase tracking-wider hover:bg-[#008de3] transition-all shadow-md">
                  Validar
                </button>
              </div>
            </FormGroup>
          </div>
        </section>

        {/* Section: Datos del Paciente */}
        <section className="bg-gray-50/50 p-[1.5rem] rounded-[1.5rem] border border-gray-100 space-y-[1.5rem]">
          <h2 className="text-[0.7rem] font-black text-[#003d63] uppercase tracking-[0.2em] mb-[1rem]">Datos del Paciente</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.5rem]">
            <FormGroup label="DNI">
              <div className="flex gap-[0.5rem]">
                <input 
                  type="text" 
                  name="patientDni" 
                  value={formData.patientDni} 
                  onChange={handleInputChange} 
                  placeholder="DNI" 
                  className="w-full border border-gray-200 bg-white p-[0.75rem] rounded-xl focus:ring-2 focus:ring-[#008de3] outline-none transition-all font-bold text-[0.85rem]" 
                />
                <button className="bg-[#008de3] text-white px-[1rem] py-[0.75rem] rounded-xl text-[0.7rem] font-black uppercase tracking-wider hover:bg-[#003d63] transition-all shadow-md">
                  Buscar
                </button>
              </div>
            </FormGroup>
            <FormGroup label="Nombres">
              <input 
                type="text" 
                name="patientFirstName" 
                value={formData.patientFirstName} 
                onChange={handleInputChange} 
                placeholder="Nombres completos" 
                className="w-full border border-gray-200 bg-white p-[0.75rem] rounded-xl focus:ring-2 focus:ring-[#008de3] outline-none transition-all font-bold text-[0.85rem]" 
              />
            </FormGroup>
            <FormGroup label="Apellidos">
              <input 
                type="text" 
                name="patientLastName" 
                value={formData.patientLastName} 
                onChange={handleInputChange} 
                placeholder="Apellidos completos" 
                className="w-full border border-gray-200 bg-white p-[0.75rem] rounded-xl focus:ring-2 focus:ring-[#008de3] outline-none transition-all font-bold text-[0.85rem]" 
              />
            </FormGroup>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-[1.5rem]">
            <FormGroup label="Edad">
              <input type="text" name="age" value={formData.age} onChange={handleInputChange} placeholder="Años" className="w-full border border-gray-200 bg-white p-[0.75rem] rounded-xl focus:ring-2 focus:ring-[#008de3] outline-none font-bold text-[0.85rem]" />
            </FormGroup>
            <FormGroup label="Teléfono">
              <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="999..." className="w-full border border-gray-200 bg-white p-[0.75rem] rounded-xl focus:ring-2 focus:ring-[#008de3] outline-none font-bold text-[0.85rem]" />
            </FormGroup>
            <FormGroup label="Sexo" className="col-span-2 md:col-span-1">
              <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full border border-gray-200 bg-white p-[0.75rem] rounded-xl outline-none font-bold text-[0.85rem]">
                <option>SELECCIONAR</option>
                <option>MASCULINO</option>
                <option>FEMENINO</option>
              </select>
            </FormGroup>
          </div>
        </section>

        {/* Section: Contacto y Otros */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-[2rem]">
          <div className="space-y-[1.5rem]">
            <h2 className="text-[0.7rem] font-black text-[#003d63] uppercase tracking-[0.2em]">Referencia y Contacto</h2>
            <div className="grid grid-cols-1 gap-[1rem]">
              <FormGroup label="Persona de Contacto">
                <input type="text" name="contactName" value={formData.contactName} onChange={handleInputChange} className="w-full border border-gray-200 p-[0.75rem] rounded-xl font-bold text-[0.85rem]" />
              </FormGroup>
              <FormGroup label="Teléfono Contacto">
                <input type="text" name="contactPhone" value={formData.contactPhone} onChange={handleInputChange} className="w-full border border-gray-200 p-[0.75rem] rounded-xl font-bold text-[0.85rem]" />
              </FormGroup>
            </div>
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

        {/* Section: Financiero & Entrega */}
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

        {/* Bottom AI Tools */}
        <div className="pt-[2rem] border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-[1rem]">
           {['macroscopy', 'microscopy', 'diagnosis'].map((f) => (
             <button 
                key={f} 
                onClick={() => handleAiAssist(f as any)} 
                className="text-[0.65rem] font-black uppercase tracking-[0.15em] text-[#003d63] bg-blue-50/50 py-[1rem] rounded-xl hover:bg-[#008de3] hover:text-white transition-all transform hover:scale-[1.02] border border-[#008de3]/10"
              >
               Asistente IA: {f === 'diagnosis' ? 'Diagnóstico' : f}
             </button>
           ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-[1rem] pt-[2rem] border-t-2 border-[#003d63]">
          <button 
            onClick={() => router.back()} 
            className="w-full sm:w-auto px-[3rem] py-[1rem] rounded-xl font-black uppercase text-[0.8rem] text-gray-500 hover:bg-gray-100 transition-all tracking-widest"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={loading} 
            className="w-full sm:w-auto bg-[#003d63] text-white px-[4rem] py-[1rem] rounded-xl font-black uppercase text-[0.8rem] tracking-[0.2em] hover:bg-[#008de3] transition-all shadow-xl shadow-blue-900/10 disabled:opacity-50"
          >
            {loading ? 'Procesando...' : 'Guardar Registro'}
          </button>
        </div>
      </div>
    </div>
  );
}

function FormGroup({ label, children, className = "" }: { label: string, children: React.ReactNode, className?: string }) {
  return (
    <div className={`flex flex-col gap-[0.4rem] w-full ${className}`}>
      <label className="text-[0.65rem] font-black text-gray-400 uppercase tracking-[0.15em] ml-[0.25rem]">{label}</label>
      {children}
    </div>
  );
}
