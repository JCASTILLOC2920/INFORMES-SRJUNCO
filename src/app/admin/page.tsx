'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import EditReportModal from '@/components/admin/EditReportModal';
import { exportReportToPdf, exportReportToWord } from '@/utils/reportExporter';

export default function AdminDashboard() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState('HEMATOXILINA EOSINA');
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchReports = async () => {
    try {
      const res = await fetch('/api/reports');
      const data = await res.json();
      setReports(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchReports();
  }, []);

  const handleEditClick = (report: any) => {
    setSelectedReport(report);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (updatedData: any) => {
    try {
      const res = await fetch('/api/reports', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        alert('Registro actualizado exitosamente.');
        setIsEditModalOpen(false);
        fetchReports();
        return true;
      } else {
        const data = await res.json();
        console.error('Update failed:', data.errors);
        return false;
      }
    } catch (error) {
      console.error('Error al actualizar:', error);
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-[5rem] lg:pb-0 font-sans selection:bg-[#008de3]/10">
      <div className="max-w-[90rem] mx-auto px-[1rem] sm:px-[2rem] py-[1.5rem]">
        {/* --- Header & Title --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-[2rem] gap-4">
          <div>
            <h1 className="text-[1.85rem] font-black text-[#002a45] tracking-tight leading-none mb-2">
              Panel de Control
            </h1>
            <p className="text-[#64748b] text-[0.9rem] font-bold uppercase tracking-[0.1em]">
              Gestión Centralizada de Informes Médicos
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
             <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#008de3]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
             </div>
             <div>
                <p className="text-[0.7rem] font-black text-[#002a45] uppercase opacity-40">Usuario Activo</p>
                <p className="text-[0.9rem] font-bold text-[#002a45]">Administrador Senior</p>
             </div>
          </div>
        </div>

        {/* --- Formularios de Filtro Superiores --- */}
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-[1.75rem] mb-[2rem] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1.25rem] items-end">
              {/* Row 1 */}
              <div className="space-y-1.5">
                  <label className="text-[0.7rem] font-black text-[#002a45] uppercase tracking-wider ml-1">Fec. Inicio</label>
                  <div className="relative group">
                      <input type="date" className="w-[100%] border-2 border-gray-100 bg-[#f8fafc] rounded-xl px-[1rem] py-[0.75rem] text-[0.85rem] font-bold text-[#002a45] focus:outline-none focus:border-[#008de3] focus:bg-white transition-all" />
                  </div>
              </div>

              <div className="space-y-1.5">
                  <label className="text-[0.7rem] font-black text-[#002a45] uppercase tracking-wider ml-1">Fec. Final</label>
                  <div className="relative group">
                      <input type="date" className="w-[100%] border-2 border-gray-100 bg-[#f8fafc] rounded-xl px-[1rem] py-[0.75rem] text-[0.85rem] font-bold text-[#002a45] focus:outline-none focus:border-[#008de3] focus:bg-white transition-all" />
                  </div>
              </div>

              <div className="space-y-1.5">
                  <label className="text-[0.7rem] font-black text-[#002a45] uppercase tracking-wider ml-1">Cod. Atención</label>
                  <input type="text" placeholder="Ej: JQ26-..." className="w-[100%] border-2 border-gray-100 bg-[#f8fafc] rounded-xl px-[1rem] py-[0.75rem] text-[0.85rem] font-bold text-[#002a45] placeholder-gray-300 focus:outline-none focus:border-[#008de3] focus:bg-white transition-all" />
              </div>

              <div className="space-y-1.5">
                  <label className="text-[0.7rem] font-black text-[#002a45] uppercase tracking-wider ml-1">Paciente</label>
                  <input type="text" placeholder="Nombres o DNI" className="w-[100%] border-2 border-gray-100 bg-[#f8fafc] rounded-xl px-[1rem] py-[0.75rem] text-[0.85rem] font-bold text-[#002a45] placeholder-gray-300 focus:outline-none focus:border-[#008de3] focus:bg-white transition-all" />
              </div>

              {/* Botones de Acción (Desktop) */}
              <div className="hidden lg:flex col-span-4 justify-between items-center mt-2 pt-4 border-t border-gray-50">
                  <div className="flex gap-4">
                      <button className="bg-[#002a45] text-white px-[2rem] py-[0.85rem] rounded-xl text-[0.8rem] font-black uppercase tracking-[0.15em] hover:bg-[#008de3] transform hover:scale-[1.02] transition-all shadow-lg shadow-blue-900/10">
                          Localizar Registros
                      </button>
                      <button className="bg-white text-[#002a45] border-2 border-[#002a45]/10 px-[1.5rem] py-[0.85rem] rounded-xl text-[0.8rem] font-black uppercase tracking-[0.15em] hover:bg-gray-50 transition-all">
                          Limpiar
                      </button>
                  </div>
                  <Link href="/admin/reports/new" className="bg-[#008de3] text-white px-[2rem] py-[0.85rem] rounded-xl text-[0.8rem] font-black uppercase tracking-[0.15em] hover:bg-[#002a45] transform hover:scale-[1.02] transition-all shadow-xl shadow-blue-500/20 flex items-center gap-2">
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                       Nuevo Paciente
                  </Link>
              </div>
          </div>
        </div>

        {/* --- Pestañas --- */}
        <div className="flex border-b border-gray-100 mb-[1.5rem] overflow-x-auto no-scrollbar gap-[0.5rem]">
            <button 
              onClick={() => setActiveType('HEMATOXILINA EOSINA')}
              className={`${activeType === 'HEMATOXILINA EOSINA' ? 'text-[#008de3] border-[#008de3] bg-blue-50/50' : 'text-[#64748b] border-transparent hover:text-[#002a45]'} px-[1.5rem] py-[1rem] text-[0.75rem] font-black uppercase tracking-[0.15em] border-b-[3px] transition-all whitespace-nowrap rounded-t-xl`}
            >
                Hematoxilina Eosina
            </button>
            <button 
              onClick={() => setActiveType('PAPANICOLAO')}
              className={`${activeType === 'PAPANICOLAO' ? 'text-[#008de3] border-[#008de3] bg-blue-50/50' : 'text-[#64748b] border-transparent hover:text-[#002a45]'} px-[1.5rem] py-[1rem] text-[0.75rem] font-black uppercase tracking-[0.15em] border-b-[3px] transition-all whitespace-nowrap rounded-t-xl`}
            >
                Papanicolaou
            </button>
        </div>

        {/* --- Tabla Principal --- */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-center border-collapse min-w-[85rem] table-fixed">
              <thead>
                <tr className="bg-[#f8fafc] text-[#002a45] text-[0.65rem] font-black uppercase tracking-[0.2em] border-b border-gray-100">
                  <th className="p-[1.25rem] w-[3.5rem]">#</th>
                  <th className="p-[1.25rem] w-[9rem]">Código</th>
                  <th className="p-[1.25rem] w-[8rem]">Doc. Identidad</th>
                  <th className="p-[1.25rem] w-[14rem]">Médico Referente</th>
                  <th className="p-[1.25rem] w-[18rem] text-left">Paciente</th>
                  <th className="p-[1.25rem] w-[7rem]">Costo</th>
                  <th className="p-[1.25rem] w-[7rem]">Adelanto</th>
                  <th className="p-[1.25rem] w-[7rem]">Resta</th>
                  <th className="p-[1.25rem] w-[8.5rem]">Entrega</th>
                  <th className="p-[1.25rem] w-[11rem] bg-gray-50/50">Gestión</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-[0.8rem] font-bold">
              {loading ? (
                  <tr>
                      <td colSpan={10} className="p-8 text-center text-gray-500 font-bold uppercase tracking-widest opacity-30">Cargando datos del sistema...</td>
                  </tr>
              ) : reports.filter(r => r.serviceType === activeType).length === 0 ? (
                  <tr>
                      <td colSpan={10} className="p-8 text-center text-gray-500 font-bold uppercase tracking-widest opacity-30">Sin registros para esta categoría.</td>
                  </tr>
              ) : (
                reports.filter(r => r.serviceType === activeType).map((report, idx) => {
                  const hasDebt = report.balance > 0;
                  const financeColorClass = hasDebt ? "bg-[#ff0000] text-white shadow-sm shadow-red-200" : "bg-[#28a745] text-white shadow-sm shadow-green-200";

                  return (
                    <tr key={report.id} className="hover:bg-[#f1f5f9]/50 transition-colors border-b border-gray-50 group">
                      <td className="p-[1rem] text-center opacity-30 text-[0.7rem]">{idx + 1}</td>
                      <td className="p-[1rem] text-center whitespace-nowrap font-black text-[#002a45]">{report.attentionCode}</td>
                      <td className="p-[1rem] text-center text-[#64748b]">{report.patientDni || '---'}</td>
                      <td className="p-[1rem] uppercase text-center truncate px-4 text-[#64748b]">
                          {report.solicitor === 'SELECCIONAR' ? '---' : report.solicitor}
                      </td>
                      <td className="p-[1rem] uppercase text-left truncate px-4 text-[#002a45]">
                          {report.patientLastName}, {report.patientFirstName}
                      </td>

                      {/* Columnas financieras */}
                      <td className="p-[1rem] font-bold text-center">
                          <span className={`px-3 py-1 rounded-full text-[0.7rem] ${financeColorClass}`}>
                            S/ {report.cost?.toFixed(0)}
                          </span>
                      </td>
                      <td className="p-[1rem] font-bold text-center">
                          <span className={`px-3 py-1 rounded-full text-[0.7rem] ${financeColorClass}`}>
                            S/ {report.prepayment?.toFixed(0)}
                          </span>
                      </td>
                      <td className="p-[1rem] font-bold text-center">
                          <span className={`px-3 py-1 rounded-full text-[0.7rem] ${financeColorClass}`}>
                            S/ {report.balance?.toFixed(0)}
                          </span>
                      </td>
                      <td className="p-[1rem] font-black text-center text-[#334155] text-[0.75rem]">
                          {report.expectedDeliveryDate ? format(new Date(report.expectedDeliveryDate), 'dd MMM', { locale: es }) : '---'}
                      </td>

                      {/* Acciones Rediseñadas */}
                      <td className="p-[1rem] bg-gray-50/30 group-hover:bg-gray-100/50 transition-colors">
                          <div className="flex items-center justify-center gap-1">
                              <button onClick={() => handleEditClick(report)} className="p-2 text-[#64748b] hover:text-[#008de3] hover:bg-white rounded-lg shadow-sm transition-all border border-transparent hover:border-gray-100" title="Editar">
                                  <svg className="w-[1.1rem] h-[1.1rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                              </button>
                              <button onClick={() => exportReportToPdf(report)} className="p-2 text-[#64748b] hover:text-[#008de3] hover:bg-white rounded-lg shadow-sm transition-all border border-transparent hover:border-gray-100" title="PDF">
                                  <svg className="w-[1.1rem] h-[1.1rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                              </button>
                              <button onClick={() => exportReportToWord(report)} className="p-2 text-[#64748b] hover:text-[#28a745] hover:bg-white rounded-lg shadow-sm transition-all border border-transparent hover:border-gray-100" title="Word">
                                  <svg className="w-[1.1rem] h-[1.1rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                              </button>
                              <button className="p-2 text-[#64748b] hover:text-[#e33e2b] hover:bg-white rounded-lg shadow-sm transition-all border border-transparent hover:border-gray-100" title="Eliminar">
                                  <svg className="w-[1.1rem] h-[1.1rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                          </div>
                      </td>
                    </tr>
                  );
                })
              )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Action Bar Ergonómico (Mobile) --- */}
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-50">
            <div className="bg-[#002a45] rounded-3xl shadow-2xl shadow-blue-900/50 p-2 flex items-center justify-between border border-white/10 backdrop-blur-md">
                <button 
                  onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                  className="w-14 h-14 flex items-center justify-center text-white/60 hover:text-white transition-all"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
                <Link href="/admin/reports/new" className="bg-[#008de3] text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-black uppercase text-[0.8rem] tracking-widest shadow-lg shadow-blue-500/30 active:scale-95 transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    Paciente
                </Link>
                <button className="w-14 h-14 flex items-center justify-center text-white/60 hover:text-white transition-all">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                </button>
            </div>
        </div>
      </div>

      <EditReportModal 
        isOpen={isEditModalOpen} 
        report={selectedReport} 
        onClose={() => setIsEditModalOpen(false)} 
        onSave={handleSaveEdit}
      />
    </div>
  );
}
