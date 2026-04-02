'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import EditReportModal from '@/components/admin/EditReportModal';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import { exportReportToPdf, exportReportToWord } from '@/utils/reportExporter';

/**
 * JC PATH LAB - HISTORIAL CLÍNICO (NIVEL ANTIGRAVITY)
 * Gestión masiva, filtrado activo y purga de seguridad integrada.
 */

export default function HistorialPacientes() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState('HEMATOXILINA EOSINA');
  
  // ESTADO DE FILTROS
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    attentionCode: '',
    patientName: '',
    patientLastName: '',
    dni: '',
    solicitor: ''
  });

  // ESTADO DE MODALES
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      // Nota: Para el historial cargamos todos los registros iniciales y filtramos en cliente
      // para una experiencia "Instant Search" suave en listas largas (hasta ~1000 items).
      const res = await fetch('/api/reports?limit=200');
      const data = await res.json();
      setReports(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('[HISTORY_FAIL] Uplink Error:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchesType = report.serviceType === activeType;
      const matchesCode = !filters.attentionCode || report.attentionCode?.toLowerCase().includes(filters.attentionCode.toLowerCase());
      const matchesDni = !filters.dni || report.patientDni?.includes(filters.dni);
      const matchesFirstName = !filters.patientName || report.patientFirstName?.toLowerCase().includes(filters.patientName.toLowerCase());
      const matchesLastName = !filters.patientLastName || report.patientLastName?.toLowerCase().includes(filters.patientLastName.toLowerCase());
      const matchesSolicitor = !filters.solicitor || report.solicitor?.toLowerCase().includes(filters.solicitor.toLowerCase());
      
      let matchesDate = true;
      if (filters.startDate || filters.endDate) {
        const reportDate = new Date(report.receptionDate || report.createdAt);
        if (filters.startDate) {
          const start = new Date(filters.startDate);
          start.setHours(0, 0, 0, 0);
          if (reportDate < start) matchesDate = false;
        }
        if (filters.endDate) {
          const end = new Date(filters.endDate);
          end.setHours(23, 59, 59, 999);
          if (reportDate > end) matchesDate = false;
        }
      }

      return matchesType && matchesCode && matchesDni && matchesFirstName && matchesLastName && matchesSolicitor && matchesDate;
    });
  }, [reports, filters, activeType]);

  const clearFilters = () => {
    setFilters({ startDate: '', endDate: '', attentionCode: '', patientName: '', patientLastName: '', dni: '', solicitor: '' });
  };

  // GESTIÓN DE EDICIÓN
  const handleEdit = (report: any) => {
    setSelectedReport(report);
    setIsEditModalOpen(true);
  };

  const handleSaveReport = async (updatedData: any) => {
    try {
      const res = await fetch('/api/reports', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (res.ok) {
        setIsEditModalOpen(false);
        fetchReports();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error saving report:', error);
      return false;
    }
  };

  // GESTIÓN DE ELIMINACIÓN
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
    <div className="min-h-screen bg-[#f8fafc] pb-[6rem] lg:pb-0 font-sans selection:bg-[#008de3]/10">
      <div className="max-w-[90rem] mx-auto px-[1rem] sm:px-[2rem] py-[1.5rem]">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-[2rem] gap-4">
          <div>
            <h1 className="text-[1.85rem] font-black text-[#002a45] tracking-tight leading-none mb-2">Historial Clínico</h1>
            <p className="text-[#64748b] text-[0.9rem] font-bold uppercase tracking-[0.1em]">Bitácora de Supervivencia de Registros</p>
          </div>
          <Link href="/admin" className="hidden lg:flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 text-[#002a45] font-black text-[0.75rem] uppercase tracking-widest hover:bg-gray-50 transition-all">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
             Dashboard
          </Link>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgb(0,42,69,0.04)] border border-gray-100 p-[2rem] mb-[2.5rem] animate-in fade-in slide-in-from-top duration-500">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1.5rem] items-end">
            <FilterInput label="Desde" name="startDate" type="date" value={filters.startDate} onChange={handleFilterChange} />
            <FilterInput label="Hasta" name="endDate" type="date" value={filters.endDate} onChange={handleFilterChange} />
            <FilterInput label="Identificación" name="dni" placeholder="DNI..." value={filters.dni} onChange={handleFilterChange} />
            <FilterInput label="Código" name="attentionCode" placeholder="JQ..." value={filters.attentionCode} onChange={handleFilterChange} />
            <FilterInput label="Nombre Paciente" name="patientName" placeholder="Nombres..." value={filters.patientName} onChange={handleFilterChange} />
            <FilterInput label="Apellido Paciente" name="patientLastName" placeholder="Apellidos..." value={filters.patientLastName} onChange={handleFilterChange} />
            <FilterInput label="Médico Referente" name="solicitor" placeholder="Doctor..." value={filters.solicitor} onChange={handleFilterChange} />
            
            <div className="flex gap-[0.75rem]">
              <button onClick={clearFilters} className="flex-grow bg-gray-50 text-[#64748b] px-[1.5rem] py-[1.1rem] rounded-2xl font-black text-[0.7rem] uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100 shadow-sm">Limpiar Filtros</button>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-gray-100 mb-[2rem] overflow-x-auto no-scrollbar gap-[0.5rem]">
            <TabButton active={activeType === 'HEMATOXILINA EOSINA'} label="Hematoxilina Eosina" onClick={() => setActiveType('HEMATOXILINA EOSINA')} />
            <TabButton active={activeType === 'PAPANICOLAO'} label="Papanicolaou" onClick={() => setActiveType('PAPANICOLAO')} />
        </div>

        {/* Table Results */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden animate-in fade-in duration-700">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-center border-collapse min-w-[85rem] table-fixed">
              <thead>
                <tr className="bg-[#f8fafc] text-[#002a45] text-[0.65rem] font-black uppercase tracking-[0.25em] border-b border-gray-100">
                  <th className="p-[1.25rem] w-[3.5rem]">#</th>
                  <th className="p-[1.25rem] w-[9rem]">Código</th>
                  <th className="p-[1.25rem] w-[8.5rem]">DNI</th>
                  <th className="p-[1.25rem] w-[14rem]">Médico Solicitante</th>
                  <th className="p-[1.25rem] w-[18.5rem] text-left">Paciente</th>
                  <th className="p-[1.25rem] w-[7.5rem]">Costo</th>
                  <th className="p-[1.25rem] w-[7.5rem]">Adelanto</th>
                  <th className="p-[1.25rem] w-[7.5rem]">Resta</th>
                  <th className="p-[1.25rem] w-[9rem]">Entrega</th>
                  <th className="p-[1.25rem] w-[11rem] bg-gray-50/50">Gestión</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-[0.8rem] font-bold bg-[#fdfdfd]">
                {loading ? (
                  <tr><td colSpan={10} className="p-[5rem] text-center uppercase tracking-widest text-[#94a3b8] opacity-40 font-black text-[0.75rem]">Accediendo a base de datos...</td></tr>
                ) : filteredReports.length === 0 ? (
                  <tr><td colSpan={10} className="p-[5rem] text-center text-[#94a3b8] uppercase tracking-widest font-black text-[0.75rem] opacity-40">No hay registros para este filtro</td></tr>
                ) : filteredReports.map((report, idx) => {
                  const resta = (report.cost || 0) - (report.prepayment || 0);
                  const isOverdue = report.expectedDeliveryDate && new Date(report.expectedDeliveryDate) < new Date() && !report.reportDate;
                  const hasDebt = resta > 0;
                  const amountColor = hasDebt ? "bg-[#ff0000] text-white shadow-sm" : "bg-[#28a745] text-white shadow-sm";

                  return (
                    <tr key={report.id} className={`hover:bg-[#f1f5f9]/50 transition-colors border-b border-gray-50 group`}>
                      <td className="p-[1rem] text-center opacity-30 text-[0.7rem]">{idx + 1}</td>
                      <td className="p-[1rem] text-center whitespace-nowrap font-black text-[#002a45]">
                        <span className="bg-blue-50/50 px-3 py-1.5 rounded-lg border border-blue-100/50">{report.attentionCode}</span>
                      </td>
                      <td className="p-[1rem] text-[#64748b]">{report.patientDni || '---'}</td>
                      <td className="p-[1rem] uppercase truncate px-4 text-[#64748b] font-bold text-[0.75rem]">
                        {report.solicitor === 'SELECCIONAR' ? '---' : report.solicitor}
                      </td>
                      <td className="p-[1rem] uppercase text-left truncate px-4 text-[#002a45] tracking-tight">
                        {report.patientLastName}, {report.patientFirstName}
                      </td>
                      <td className="p-[1rem] font-black">
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-[#64748b] text-[0.7rem]">S/ {report.cost?.toFixed(0)}</span>
                      </td>
                      <td className="p-[1rem] font-black">
                        <span className="px-3 py-1 rounded-full bg-green-50 text-[#28a745] text-[0.7rem]">S/ {report.prepayment?.toFixed(0)}</span>
                      </td>
                      <td className="p-[1rem] font-black">
                        <span className={`px-3 py-1 rounded-full text-[0.7rem] ${amountColor}`}>S/ {resta.toFixed(0)}</span>
                      </td>
                      <td className={`p-[1rem] font-black text-[0.75rem] ${isOverdue ? 'text-red-500 animate-pulse' : 'text-[#334155]'}`}>
                        {report.expectedDeliveryDate ? format(new Date(report.expectedDeliveryDate), 'dd MMM yy', { locale: es }) : '---'}
                      </td>
                      <td className="p-[1rem] bg-gray-50/30 group-hover:bg-gray-100/50 transition-colors">
                        <div className="flex items-center justify-center gap-1.5 text-gray-400">
                          <MiniAction icon="edit" onClick={() => handleEdit(report)} />
                          <MiniAction icon="print" onClick={() => exportReportToPdf(report)} />
                          <MiniAction icon="lab" />
                          <MiniAction icon="delete" variant="danger" onClick={() => handleDeleteClick(report)} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <EditReportModal report={selectedReport} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSaveReport} />
      
      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={confirmDelete} 
        title={selectedReport?.attentionCode || "Registro seleccionado"} 
      />
    </div>
  );
}

function FilterInput({ label, name, value, onChange, placeholder, type = "text" }: any) {
  return (
    <div className="flex flex-col gap-[0.5rem] w-full">
      <label className="text-[0.6rem] font-black uppercase text-[#64748b] tracking-[0.2em] ml-[0.5rem]">{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className="w-full border-2 border-gray-100 bg-[#f8fafc] p-[1.1rem] rounded-2xl text-[0.85rem] font-bold outline-none focus:border-[#008de3] focus:bg-white transition-all text-[#002a45] h-[3.5rem]" />
    </div>
  );
}

function TabButton({ label, active = false, onClick }: any) {
  return (
    <button onClick={onClick} className={`px-[1.75rem] py-[1.1rem] rounded-t-2xl text-[0.7rem] font-black uppercase tracking-[0.2em] transition-all border-b-[3px] ${active ? 'text-[#008de3] border-[#008de3] bg-blue-50/50 shadow-sm' : 'text-[#64748b] border-transparent hover:text-[#002a45]'}`}>{label}</button>
  );
}

function MiniAction({ icon, variant = 'default', onClick }: { icon: string, variant?: 'default' | 'danger', onClick?: () => void }) {
  const icons: any = {
    edit: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    print: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    delete: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    lab: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477" /></svg>
  };
  const colors = { default: 'text-[#64748b] hover:text-[#008de3] hover:bg-white', danger: 'text-red-300 hover:text-red-600 hover:bg-white' };
  return (<button onClick={onClick} className={`p-2.5 rounded-xl transition-all border border-transparent ${colors[variant]}`}>{icons[icon]}</button>);
}
