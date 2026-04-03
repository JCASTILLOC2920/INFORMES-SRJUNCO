'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import useSWR from 'swr';
import dynamic from 'next/dynamic';

const EditReportModal = dynamic(() => import('@/components/admin/EditReportModal'), { ssr: false });
const DeleteConfirmModal = dynamic(() => import('@/components/admin/DeleteConfirmModal'), { ssr: false });

import { exportReportToPdf, exportReportToWord } from '@/utils/reportExporter';

const fetcher = (url: string) => fetch(url).then(res => res.json());

/**
 * JC PATH LAB - DASHBOARD ADMINISTRATIVO (NIVEL ANTIGRAVITY)
 * Conectividad total, filtrado en servidor y purga de seguridad activada.
 */

export default function AdminDashboard() {
  const [activeType, setActiveType] = useState('HEMATOXILINA EOSINA');
  
  // ESTADO DE FILTROS
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    attentionCode: '',
    name: ''
  });

  // ESTADO DE MODALES
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // MOTOR DE BÚSQUEDA ULTRA-ÁGIL (SWR)
  const queryParams = new URLSearchParams();
  if (filters.startDate) queryParams.append('startDate', filters.startDate);
  if (filters.endDate) queryParams.append('endDate', filters.endDate);
  if (filters.attentionCode) queryParams.append('attentionCode', filters.attentionCode);
  if (filters.name) queryParams.append('name', filters.name);
  queryParams.append('limit', '50');

  const { data: reportsData, error, mutate } = useSWR(`/api/reports?${queryParams.toString()}`, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 5000,
  });

  const reports = useMemo(() => Array.isArray(reportsData) ? reportsData : [], [reportsData]);
  const loading = !reportsData && !error;

  const fetchReports = () => mutate();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ startDate: '', endDate: '', attentionCode: '', name: '' });
    // El useEffect disparará la recarga al cambiar filtros si lo hiciéramos reactivo, 
    // pero el usuario pidió un botón "Localizar".
  };

  // GESTIÓN DE EDICIÓN
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
        setIsEditModalOpen(false);
        fetchReports();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error al actualizar:', error);
      return false;
    }
  };

  // GESTIÓN DE ELIMINACIÓN (PURGA)
  const handleDeleteClick = (report: any) => {
    setSelectedReport(report);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedReport) return;
    try {
      const res = await fetch(`/api/reports?id=${selectedReport.id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setIsDeleteModalOpen(false);
        fetchReports();
      }
    } catch (error) {
      console.error('Purge failure:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-[5rem] lg:pb-0 font-sans selection:bg-[#008de3]/10">
      <div className="max-w-[90rem] mx-auto px-[1rem] sm:px-[2rem] py-[1.5rem]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-[2rem] gap-4">
          <div>
            <h1 className="text-[1.85rem] font-black text-[#002a45] tracking-tight leading-none mb-2">Panel de Control</h1>
            <p className="text-[#64748b] text-[0.9rem] font-bold uppercase tracking-[0.1em]">Gestión Centralizada / Antigravity Mode</p>
          </div>
          <div className="hidden lg:flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
             <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#008de3]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292" /></svg>
             </div>
             <div>
                <p className="text-[0.7rem] font-black text-[#002a45] uppercase opacity-40">Status</p>
                <p className="text-[0.9rem] font-bold text-[#28a745]">Sincronía 100%</p>
             </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-[1.75rem] mb-[2rem]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1.25rem] items-end">
              <div className="space-y-1.5">
                  <label className="text-[0.7rem] font-black text-[#002a45] uppercase tracking-wider ml-1">Fec. Inicio</label>
                  <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} className="w-full border-2 border-gray-100 bg-[#f8fafc] rounded-xl px-[1rem] py-[0.75rem] text-[0.85rem] font-bold text-[#002a45] focus:outline-none focus:border-[#008de3] focus:bg-white transition-all" />
              </div>
              <div className="space-y-1.5">
                  <label className="text-[0.7rem] font-black text-[#002a45] uppercase tracking-wider ml-1">Fec. Final</label>
                  <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} className="w-full border-2 border-gray-100 bg-[#f8fafc] rounded-xl px-[1rem] py-[0.75rem] text-[0.85rem] font-bold text-[#002a45] focus:outline-none focus:border-[#008de3] focus:bg-white transition-all" />
              </div>
              <div className="space-y-1.5">
                  <label className="text-[0.7rem] font-black text-[#002a45] uppercase tracking-wider ml-1">Cod. Atención</label>
                  <input type="text" name="attentionCode" value={filters.attentionCode} onChange={handleFilterChange} placeholder="Ej: JQ26-..." className="w-full border-2 border-gray-100 bg-[#f8fafc] rounded-xl px-[1rem] py-[0.75rem] text-[0.85rem] font-bold text-[#002a45] placeholder-gray-300 focus:outline-none focus:border-[#008de3] focus:bg-white transition-all" />
              </div>
              <div className="space-y-1.5">
                  <label className="text-[0.7rem] font-black text-[#002a45] uppercase tracking-wider ml-1">Paciente</label>
                  <input type="text" name="name" value={filters.name} onChange={handleFilterChange} placeholder="Nombres o DNI" className="w-full border-2 border-gray-100 bg-[#f8fafc] rounded-xl px-[1rem] py-[0.75rem] text-[0.85rem] font-bold text-[#002a45] placeholder-gray-300 focus:outline-none focus:border-[#008de3] focus:bg-white transition-all" />
              </div>

              <div className="hidden lg:flex col-span-4 justify-between items-center mt-2 pt-4 border-t border-gray-50">
                  <div className="flex gap-4">
                      <button onClick={fetchReports} className="bg-[#002a45] text-white px-[2rem] py-[0.85rem] rounded-xl text-[0.8rem] font-black uppercase tracking-[0.15em] hover:bg-[#008de3] transform hover:scale-[1.02] transition-all shadow-lg shadow-blue-900/10">
                          Localizar Registros
                      </button>
                      <button onClick={clearFilters} className="bg-white text-[#002a45] border-2 border-[#002a45]/10 px-[1.5rem] py-[0.85rem] rounded-xl text-[0.8rem] font-black uppercase tracking-[0.15em] hover:bg-gray-50 transition-all">
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

        {/* Pestañas */}
        <div className="flex border-b border-gray-100 mb-[1.5rem] overflow-x-auto no-scrollbar gap-[0.5rem]">
            <button onClick={() => setActiveType('HEMATOXILINA EOSINA')} className={`${activeType === 'HEMATOXILINA EOSINA' ? 'text-[#008de3] border-[#008de3] bg-blue-50/50' : 'text-[#64748b] border-transparent hover:text-[#002a45]'} px-[1.5rem] py-[1rem] text-[0.75rem] font-black uppercase tracking-[0.15em] border-b-[3px] transition-all rounded-t-xl`}>Hematoxilina Eosina</button>
            <button onClick={() => setActiveType('PAPANICOLAO')} className={`${activeType === 'PAPANICOLAO' ? 'text-[#008de3] border-[#008de3] bg-blue-50/50' : 'text-[#64748b] border-transparent hover:text-[#002a45]'} px-[1.5rem] py-[1rem] text-[0.75rem] font-black uppercase tracking-[0.15em] border-b-[3px] transition-all rounded-t-xl`}>Papanicolaou</button>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-center border-collapse min-w-[85rem] table-fixed">
              <thead>
                <tr className="bg-[#008de3] text-white text-[0.7rem] font-black uppercase tracking-widest">
                  <th className="border border-white/20 p-3 w-[3rem]">#</th>
                  <th className="border border-white/20 p-3 w-[9rem] text-center">Código</th>
                  <th className="border border-white/20 p-3 w-[9rem] text-center">Doc. Identidad</th>
                  <th className="border border-white/20 p-3 w-[14rem] text-center">Médico Referente</th>
                  <th className="border border-white/20 p-3 w-[18rem] text-left">Paciente</th>
                  <th className="border border-white/20 p-3 w-[7.5rem] text-center">Costo</th>
                  <th className="border border-white/20 p-3 w-[7.5rem] text-center">Adelanto</th>
                  <th className="border border-white/20 p-3 w-[7.5rem] text-center">Resta</th>
                  <th className="border border-white/20 p-3 w-[9rem] text-center">Entrega</th>
                  <th className="border border-white/20 p-3 w-[10rem] text-center">Gestión</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-[0.8rem] font-bold">
              {loading ? (
                  <tr><td colSpan={10} className="p-8 text-center text-gray-500 font-black uppercase tracking-widest opacity-30">Analizando registros...</td></tr>
              ) : reports.filter(r => r.serviceType === activeType).length === 0 ? (
                  <tr><td colSpan={10} className="p-8 text-center text-gray-500 font-black uppercase tracking-widest opacity-30">No se encontraron coincidencias bajo este filtro.</td></tr>
              ) : (
                reports.filter(r => r.serviceType === activeType).map((report, idx) => {
                  const hasDebt = report.balance > 0;
                  const financeColorClass = hasDebt ? "bg-[#ff0000] text-white" : "bg-[#28a745] text-white";

                  return (
                    <tr key={report.id} className="hover:bg-blue-50/50 transition-colors group">
                      <td className="border border-gray-100 p-3 text-center text-gray-400 font-normal">{idx + 1}</td>
                      <td className="border border-gray-100 p-3 text-center whitespace-nowrap font-black text-[#002a45]">{report.attentionCode}</td>
                      <td className="border border-gray-100 p-3 text-center text-[#64748b]">{report.patientDni || '---'}</td>
                      <td className="border border-gray-100 p-3 uppercase text-center truncate px-4 text-[#64748b]">
                          {report.solicitor === 'SELECCIONAR' ? '---' : report.solicitor}
                      </td>
                      <td className="border border-gray-100 p-3 uppercase text-left truncate px-4 text-[#002a45]">
                          {report.patientLastName}, {report.patientFirstName}
                      </td>
                      <td className="border border-gray-100 p-3 font-bold text-center">
                          <span className={`px-3 py-1 rounded-full text-[0.7rem] bg-gray-100 text-[#002a45]`}>S/ {report.cost?.toFixed(0)}</span>
                      </td>
                      <td className="border border-gray-100 p-3 font-bold text-center">
                          <span className={`px-3 py-1 rounded-full text-[0.7rem] bg-green-50 text-[#28a745]`}>S/ {report.prepayment?.toFixed(0)}</span>
                      </td>
                      <td className="border border-gray-100 p-3 font-bold text-center">
                          <span className={`px-3 py-1 rounded-full text-[0.7rem] ${financeColorClass}`}>S/ {report.balance?.toFixed(0)}</span>
                      </td>
                      <td className="border border-gray-100 p-3 font-black text-center text-[#334155] text-[0.75rem]">
                          {report.expectedDeliveryDate ? format(new Date(report.expectedDeliveryDate), 'dd MMM', { locale: es }) : '---'}
                      </td>
                      <td className="border border-gray-100 p-3 bg-gray-50/30 group-hover:bg-transparent transition-colors">
                          <div className="flex items-center justify-center gap-1">
                              <button onClick={() => handleEditClick(report)} className="p-2 text-[#64748b] hover:text-[#008de3] hover:bg-white rounded-lg shadow-sm transition-all" title="Editar">
                                  <svg className="w-[1.1rem] h-[1.1rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                              </button>
                              <button onClick={() => exportReportToPdf(report)} className="p-2 text-[#64748b] hover:text-[#008de3] hover:bg-white rounded-lg shadow-sm transition-all" title="Generar PDF">
                                  <svg className="w-[1.1rem] h-[1.1rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                              </button>
                              <button onClick={() => handleDeleteClick(report)} className="p-2 text-red-200 hover:text-red-500 hover:bg-white rounded-lg shadow-sm transition-all" title="Purgar">
                                  <svg className="w-[1.1rem] h-[1.1rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
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
      </div>

      <EditReportModal isOpen={isEditModalOpen} report={selectedReport} onClose={() => setIsEditModalOpen(false)} onSave={handleSaveEdit} />
      
      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={confirmDelete} 
        title={selectedReport?.attentionCode || "Registro seleccionado"} 
      />
    </div>
  );
}
