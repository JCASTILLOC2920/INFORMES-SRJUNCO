'use client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { generateClinicalDescription } from '@/utils/ollamaClient';
import { ReportFormData } from '@/types/PatientFormTypes';
import { ServiceSection, PatientSection } from './components/PatientFormComponents';
import { ReferenceSection, FinancialSection } from './components/FinancialAndAiTools';

export default function RegistroPaciente() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<ReportFormData>({
    serviceType: 'SELECCIONAR',
    registrationDate: new Date().toISOString().split('T')[0],
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
    expectedDeliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    macroscopy: '',
    microscopy: '',
    diagnosis: '',
    sampleType: ''
  });

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  }, []);

  const handleAiAssist = async (field: 'macroscopia' | 'microscopia' | 'diagnostico') => {
    const dbFieldMap: Record<string, keyof ReportFormData> = {
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
      const result = await generateClinicalDescription(field, context, formData[dbField as string]);
      if (result) {
        setFormData((prev) => ({ ...prev, [dbField]: result }));
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
      const submissionData = {
        ...formData,
        age: parseInt(formData.age) || null,
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
      {/* Header Bar */}
      <div className="bg-[#003d63] text-white px-[1.5rem] py-[1rem] flex justify-between items-center border-b border-white/10">
        <h1 className="text-[1.1rem] font-black uppercase tracking-widest flex items-center gap-[0.75rem]">
          <span className="bg-[#008de3] p-[0.4rem] rounded-md shadow-lg shadow-blue-500/20">
            <svg className="w-[1.25rem] h-[1.25rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </span>
          Registro de Paciente
        </h1>
        <button onClick={() => router.back()} className="hover:bg-white/10 p-[0.5rem] rounded-full transition-all text-white/70 hover:text-white">
          <svg className="w-[1.5rem] h-[1.5rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div className="p-[1.5rem] sm:p-[2.5rem] space-y-[2rem]">
        <ServiceSection formData={formData} handleInputChange={handleInputChange} />
        <PatientSection formData={formData} handleInputChange={handleInputChange} />
        <ReferenceSection formData={formData} handleInputChange={handleInputChange} />
        <FinancialSection formData={formData} handleInputChange={handleInputChange} />

        {/* Bottom AI Tools */}
        <div className="pt-[2rem] border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-[1rem]">
           {['macroscopia', 'microscopia', 'diagnostico'].map((f) => (
             <button 
                key={f} 
                onClick={() => handleAiAssist(f as any)} 
                disabled={aiLoading === f}
                className="text-[0.65rem] font-black uppercase tracking-[0.15em] text-[#003d63] bg-blue-50/50 py-[1rem] rounded-xl hover:bg-[#008de3] hover:text-white transition-all transform hover:scale-[1.02] border border-[#008de3]/10 disabled:opacity-50"
              >
               {aiLoading === f ? 'Procesando...' : `Asistente IA: ${f}`}
             </button>
           ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-[1rem] pt-[2rem] border-t-2 border-[#003d63]">
          <button onClick={() => router.back()} className="w-full sm:w-auto px-[3rem] py-[1rem] rounded-xl font-black uppercase text-[0.8rem] text-gray-500 hover:bg-gray-100 transition-all tracking-widest">
            Cancelar
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={loading} 
            className="w-full sm:w-auto bg-[#003d63] text-white px-[4rem] py-[1rem] rounded-xl font-black uppercase text-[0.8rem] tracking-[0.2em] hover:bg-[#008de3] transition-all shadow-xl shadow-blue-900/10 disabled:opacity-50"
          >
            {loading ? 'Procesando...' : 'Registrar Paciente'}
          </button>
        </div>
      </div>
    </div>
  );
}
