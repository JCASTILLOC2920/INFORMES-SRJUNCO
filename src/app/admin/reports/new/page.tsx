'use client';
import { useState, useCallback, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ServiceSection, PatientSection } from './components/PatientFormComponents';
import { ReferenceSection, FinancialSection } from './components/FinancialAndAiTools';
import { ReportFormData } from '@/types/PatientFormTypes';

/**
 * JC PATH LAB - REGISTRO DE PACIENTES (MODO ANTIGRAVITY)
 * Arquitectura Blindada: Cero condiciones de carrera, validación Zod y transiciones React 19.
 */

const getLocalDate = () => new Date().toLocaleDateString('sv-SE'); // YYYY-MM-DD local

const INITIAL_STATE: ReportFormData = {
  serviceType: 'SELECCIONAR',
  registrationDate: getLocalDate(),
  attentionCode: '', // Generado atómicamente por el servidor
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
  cost: '0',
  transportCost: '0',
  isPendingPayment: false,
  prepayment: '0',
  clinic: '',
  expectedDeliveryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('sv-SE'),
  macroscopy: '',
  microscopy: '',
  diagnosis: '',
  sampleType: ''
};

export default function RegistroPaciente() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<ReportFormData>(INITIAL_STATE);
  
  // FETCH DE CORRELATIVO SUGERIDO (ANTIGRAVITY INITIALIZATION)
  const fetchNextCode = useCallback(async () => {
    try {
      const res = await fetch('/api/reports/next');
      const data = await res.json();
      if (data.nextCode) {
        setFormData(prev => ({ ...prev, attentionCode: data.nextCode }));
      }
    } catch (err) {
      console.error('[ANTIGRAVITY_PREVIEW] Error fetching next code:', err);
    }
  }, []);

  useEffect(() => {
    fetchNextCode();
  }, [fetchNextCode]);

  // MANEJO DE ENTRADA OPTIMIZADO (AISLAMIENTO DE RENDERIZADO)
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData((prev) => ({ ...prev, [name]: val }));
    setErrors((prev) => prev.length > 0 ? [] : prev);
  }, []);

  // MOTOR DE VALIDACIÓN Y ENVÍO (SISTEMA DE GRADO MILITAR)
  const handleSubmit = () => {
    // 1. VALIDACIÓN ESTRICTA CAMPO POR CAMPO
    const missing: string[] = [];
    if (formData.serviceType === 'SELECCIONAR') missing.push('Falta seleccionar Tipo de Servicio');
    if (!formData.attentionCode) missing.push('Falta Código de Atención (Obligatorio)');
    if (!formData.patientDni) missing.push('Falta ingresar DNI del paciente');
    if (!formData.patientFirstName) missing.push('Falta llenar Nombres del paciente');
    if (!formData.patientLastName) missing.push('Falta llenar Apellidos del paciente');
    if (!formData.age || formData.age === '0') missing.push('Falta especificar Edad del paciente');
    if (formData.gender === 'SELECCIONAR') missing.push('Falta seleccionar Género biológico');
    if (!formData.solicitor || formData.solicitor === 'SELECCIONAR') missing.push('Falta especificar Médico Solicitante');
    if (!formData.studyMotive) missing.push('Falta llenar Motivo del Estudio / Muestra');
    if (!formData.expectedDeliveryDate) missing.push('Falta definir Fecha de Entrega');

    if (missing.length > 0) {
      setErrors(missing);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 2. INYECCIÓN Y VERIFICACIÓN DE TRASLADO
    startTransition(async () => {
      try {
        const res = await fetch('/api/reports', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const report = await res.json();

        if (res.ok && report.attentionCode) {
          // VERIFICADOR DE GRADO MILITAR: ¿Realmente se trasladó a la base de datos?
          const verifyRes = await fetch(`/api/reports?attentionCode=${report.attentionCode}`);
          const verifyData = await verifyRes.json();
          
          const isVerified = Array.isArray(verifyData) && verifyData.some(r => r.attentionCode === report.attentionCode);

          if (isVerified) {
            setSuccess(true);
            setErrors([]);
            setFormData(INITIAL_STATE);
            
            // Ciclo Autónomo: Proponer el nuevo código inmediato superior
            await fetchNextCode();
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Temporal success message clearing for next entry
            setTimeout(() => setSuccess(false), 5000);
          } else {
            setErrors(['ERROR DE TRASLADO: Registro no detectado en el historial tras inyección.']);
            setSuccess(false);
          }
        } else {
          // REPORTE FORENSE DE ERRORES
          const errorMsg = report.errors 
            ? report.errors.join(' | ') 
            : (report.error || 'Fallo crítico en el Núcleo de Datos.');
          setErrors([`REPORTE TÉCNICO DETALLADO: ${errorMsg}`]);
          setSuccess(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } catch (error: any) {
        setErrors([`FALLO SISTÉMICO (EXCEPTION): ${error.message}`]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-[6rem] lg:pb-0 font-sans selection:bg-[#008de3]/10">
      <div className="max-w-[65rem] mx-auto pt-[1rem] sm:pt-[3rem] px-[1rem]">
        
        {/* Header - Arquitectura Neumórfica */}
        <div className="bg-[#002a45] rounded-[2rem] shadow-2xl shadow-blue-900/20 p-[1.5rem] mb-[2.5rem] flex flex-col sm:flex-row justify-between items-center gap-4 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          
          <h1 className="text-[1.25rem] font-black text-white uppercase tracking-[0.25em] flex items-center gap-[1rem] relative z-10">
            <span className="bg-[#008de3] p-[0.75rem] rounded-2xl shadow-lg shadow-blue-500/40 animate-pulse">
              <svg className="w-[1.5rem] h-[1.5rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </span>
            Antigravity OS / Nuevo Informe
          </h1>
          
          <button 
            onClick={() => router.back()} 
            className="group bg-white/5 hover:bg-white/10 text-white/50 hover:text-white px-[1.5rem] py-[0.75rem] rounded-2xl transition-all flex items-center gap-2 border border-white/10 relative z-10 font-bold text-[0.8rem] uppercase"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Abortar
          </button>
        </div>

        <div className="space-y-[2.5rem]">
          {/* Banners de Estado - Neuro-Feedback */}
          {success && (
            <div className="bg-[#28a745] text-white p-[1.5rem] rounded-[1.5rem] shadow-xl shadow-green-500/20 flex items-center gap-4 animate-in fade-in zoom-in duration-500">
               <div className="bg-white/20 p-2 rounded-full ring-4 ring-white/10">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
               </div>
               <div>
                  <h3 className="font-black uppercase text-[0.8rem] tracking-widest leading-none mb-1">TRANSFERENCIA REALIZADA CON ÉXITO</h3>
                  <p className="text-[0.7rem] opacity-90 font-bold uppercase tracking-tighter">Información verificada y trasladada al historial clínico.</p>
               </div>
            </div>
          )}

          {errors.length > 0 && (
            <div className="bg-[#e33e2b] text-white p-[1.5rem] rounded-[1.5rem] shadow-xl shadow-red-500/20 animate-in slide-in-from-top-4 duration-300">
               <div className="flex items-center gap-4 mb-4">
                  <div className="bg-white/20 p-2 rounded-full ring-4 ring-white/10">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-black uppercase text-[0.8rem] tracking-widest leading-none mb-1">Fallo de Sistema / Error de Integridad</h3>
                    <p className="text-[0.7rem] opacity-90 font-bold uppercase tracking-tighter">Informe Forense detallado a continuación:</p>
                  </div>
               </div>
               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 opacity-90 px-2">
                 {errors.map((error, i) => (
                   <li key={i} className="flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-wider">
                      <div className="w-2 h-2 bg-white rotate-45 shrink-0"></div>
                      {error}
                   </li>
                 ))}
               </ul>
            </div>
          )}

          {/* Formulario - Estructura de Aislamiento */}
          <div className={`bg-white p-[2rem] sm:p-[3.5rem] rounded-[3rem] shadow-[0_20px_50px_rgba(0,42,69,0.05)] border border-gray-100 space-y-[3rem] transition-opacity duration-300 ${isPending ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
            <ServiceSection formData={formData} handleInputChange={handleInputChange} />
            <PatientSection formData={formData} handleInputChange={handleInputChange} />
            <ReferenceSection formData={formData} handleInputChange={handleInputChange} />
            <FinancialSection formData={formData} handleInputChange={handleInputChange} />
            
            {/* Acciones de Escritorio */}
            <div className="hidden lg:flex justify-end items-center gap-6 pt-10 border-t border-gray-50 mt-10">
              <button 
                onClick={() => router.back()} 
                className="text-[#64748b] font-black uppercase text-[0.8rem] tracking-[0.2em] hover:text-[#e33e2b] transition-all px-8 py-4"
              >
                Cancelar Carga
              </button>
              <button 
                onClick={handleSubmit} 
                disabled={isPending} 
                className="bg-[#002a45] text-white px-[4.5rem] py-[1.25rem] rounded-[1.5rem] font-black uppercase text-[0.85rem] tracking-[0.25em] hover:bg-[#008de3] transform hover:scale-[1.03] active:scale-95 transition-all shadow-2xl shadow-blue-900/20 disabled:scale-100 disabled:bg-gray-400 group"
              >
                {isPending ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Sincronizando...
                  </span>
                ) : 'Finalizar e Inyectar'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Action Bar Ergonómico (Mobile - One Hand Rule) --- */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-50">
          <div className="bg-[#002a45] rounded-[2.5rem] shadow-2xl shadow-blue-900/50 p-2 flex items-center justify-between border border-white/10 backdrop-blur-md">
              <button 
                onClick={() => router.back()}
                className="w-14 h-14 flex items-center justify-center text-white/40 hover:text-white transition-all active:scale-95"
              >
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isPending}
                className="flex-grow bg-[#008de3] text-white px-8 py-5 rounded-[2rem] flex items-center justify-center gap-4 font-black uppercase text-[0.8rem] tracking-[0.25em] shadow-lg shadow-blue-500/40 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                  {isPending ? (
                    <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      Finalizar Registro
                    </>
                  )}
              </button>
          </div>
      </div>
    </div>
  );
}
