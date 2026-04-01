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
    <div className="max-w-[85rem] mx-auto bg-white min-h-screen">
      <div className="p-[1rem] sm:p-[1.5rem] pt-[1rem]">

        {/* --- Formularios de Filtro Superiores --- */}
        <div className="bg-white border border-gray-200 rounded shadow-sm p-[1.25rem] mb-[1.5rem]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-[1rem] md:gap-x-[2rem] md:gap-y-[1.25rem] items-end">
              {/* Row 1 */}
              <div className="space-y-[0.35rem]">
                  <label className="text-[0.8rem] font-bold text-gray-800">Fec. Inicio</label>
                  <div className="relative">
                      <input type="text" placeholder="dd/mm/aaaa" className="w-[100%] border border-gray-300 rounded px-[0.75rem] py-[0.5rem] text-[0.85rem] text-gray-700 focus:outline-none focus:border-[#2e588c]" />
                      <span className="absolute right-[0.75rem] top-[50%] -translate-y-[50%] text-gray-600">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </span>
                  </div>
              </div>

              <div className="space-y-[0.35rem]">
                  <label className="text-[0.8rem] font-bold text-gray-800">Fec. Final</label>
                  <div className="relative">
                      <input type="text" placeholder="dd/mm/aaaa" className="w-[100%] border border-gray-300 rounded px-[0.75rem] py-[0.5rem] text-[0.85rem] text-gray-700 focus:outline-none focus:border-[#2e588c]" />
                      <span className="absolute right-[0.75rem] top-[50%] -translate-y-[50%] text-gray-600">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </span>
                  </div>
              </div>

              <div className="space-y-[0.35rem]">
                  <label className="text-[0.8rem] font-bold text-gray-800">Cod. Atención</label>
                  <input type="text" placeholder="Cod-Atencion" className="w-[100%] border border-gray-300 rounded px-[0.75rem] py-[0.5rem] text-[0.85rem] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#2e588c]" />
              </div>

              <div className="space-y-[0.35rem]">
                  <label className="text-[0.8rem] font-bold text-gray-800">Nom. Paciente</label>
                  <input type="text" placeholder="Nom. Paciente" className="w-[100%] border border-gray-300 rounded px-[0.75rem] py-[0.5rem] text-[0.85rem] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#2e588c]" />
              </div>

              {/* Row 2 */}
              <div className="space-y-[0.35rem]">
                  <label className="text-[0.8rem] font-bold text-gray-800">Ape. Paciente</label>
                  <input type="text" placeholder="Ape. Paciente" className="w-[100%] border border-gray-300 rounded px-[0.75rem] py-[0.5rem] text-[0.85rem] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#2e588c]" />
              </div>

              <div className="space-y-[0.35rem]">
                  <label className="text-[0.8rem] font-bold text-gray-800">DNI</label>
                  <input type="text" placeholder="digite" className="w-[100%] border border-gray-300 rounded px-[0.75rem] py-[0.5rem] text-[0.85rem] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#2e588c]" />
              </div>

              <div className="space-y-[0.35rem]">
                  <label className="text-[0.8rem] font-bold text-gray-800">Med. Solicitante</label>
                  <input type="text" placeholder="Ing. nombre doctor o referencia" className="w-[100%] border border-gray-300 rounded px-[0.75rem] py-[0.5rem] text-[0.85rem] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#2e588c]" />
              </div>

              <div className="flex space-x-[0.5rem] items-end pb-[0.1rem]">
                  <button className="bg-[#2e4c8c] hover:bg-[#1f376a] text-white px-[1.25rem] py-[0.5rem] rounded-[4px] text-[0.85rem] font-bold transition-colors shadow-sm">
                      Buscar
                  </button>
                  <Link href="/admin/reports/new" className="bg-[#2e4c8c] hover:bg-[#1f376a] text-white px-[1.25rem] py-[0.5rem] rounded-[4px] text-[0.85rem] font-bold transition-colors shadow-sm">
                      Paciente
                  </Link>
              </div>
          </div>
        </div>

        {/* --- Pestañas --- */}
        <div className="flex border-b border-gray-200 mb-[1.5rem] overflow-x-auto">
            <button className="text-gray-500 hover:text-gray-700 px-[1.5rem] pb-[0.75rem] text-[0.85rem] font-medium border-b-2 border-transparent">
                Serv. muestra HE (Q)
            </button>
            <button className="text-[#007bff] font-bold px-[1.5rem] pb-[0.75rem] text-[0.85rem] border-b-2 border-[#007bff]">
                Serv. Inmunohistoquimica (I)
            </button>
            <button className="text-[#007bff] hover:text-[#0056b3] px-[1.5rem] pb-[0.75rem] text-[0.85rem] font-medium border-b-2 border-transparent whitespace-nowrap">
                Serv. Citología (C)
            </button>
        </div>

        {/* --- Tabla Principal --- */}
        <div className="border border-gray-300 overflow-x-auto bg-white p-[0.35rem]">
          <table className="w-full text-center border-collapse min-w-[75rem] table-fixed">
            <thead>
              <tr className="bg-[#007bff] text-white text-[0.7rem] font-bold uppercase tracking-wider">
                <th className="border border-white p-[0.6rem] w-[2.5rem]">#</th>
                <th className="border border-white p-[0.6rem] w-[7rem]">COD-<br/>ATENCIÓN</th>
                <th className="border border-white p-[0.6rem] w-[6rem]">DNI</th>
                <th className="border border-white p-[0.6rem] w-[14rem]">MED. SOLICITANTE</th>
                <th className="border border-white p-[0.6rem] w-[15rem] text-left">PACIENTE</th>
                <th className="border border-white p-[0.6rem] w-[5.5rem]">COSTO<br/>SERVICIO</th>
                <th className="border border-white p-[0.6rem] w-[5.5rem]">ADELANTO</th>
                <th className="border border-white p-[0.6rem] w-[5.5rem]">RESTA</th>
                <th className="border border-white p-[0.6rem] w-[6rem]">FEC.<br/>ENTREGA</th>
                
                {/* Cabeceras de Acción Separadas */}
                <th className="border border-white p-[0.6rem] w-[2.5rem] bg-[#007bff]">E</th>
                <th className="border border-white p-[0.6rem] w-[2.5rem] bg-[#007bff]">VER</th>
                <th className="border border-white p-[0.6rem] w-[2.5rem] bg-[#007bff]">P/E</th>
                <th className="border border-white p-[0.6rem] w-[2.5rem] bg-[#007bff]">E</th>
                <th className="border border-white p-[0.6rem] w-[2.5rem] bg-[#007bff]">T/L</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-[0.75rem] bg-[#fdfdfd]">
              {loading ? (
                  <tr>
                      <td colSpan={14} className="border border-gray-300 p-8 text-center text-gray-500">Cargando datos...</td>
                  </tr>
              ) : reports.length === 0 ? (
                  <tr>
                      <td colSpan={14} className="border border-gray-300 p-8 text-center text-gray-500">Sin registros activos.</td>
                  </tr>
              ) : reports.map((report, idx) => {
                  
                const hasDebt = report.balance > 0;
                const financeColorClass = hasDebt ? "bg-[#ff0000] text-white" : "bg-[#28a745] text-white";

                return (
                  <tr key={report.id} className="hover:bg-gray-50 border-b border-gray-300">
                    <td className="border border-gray-300 p-[0.5rem] text-center">{idx + 1}</td>
                    <td className="border border-gray-300 p-[0.5rem] text-center whitespace-nowrap">{report.attentionCode}</td>
                    <td className="border border-gray-300 p-[0.5rem] text-center">{report.patientDni || '0'}</td>
                    <td className="border border-gray-300 p-[0.5rem] uppercase text-center truncate px-2">
                        {report.referringDoctor || '-----------------------'}
                    </td>
                    <td className="border border-gray-300 p-[0.5rem] uppercase text-left truncate px-2">
                        {report.patientLastName}, {report.patientFirstName}
                    </td>

                    {/* Columnas financieras (Bloque Coloreado) */}
                    <td className={`border border-gray-300 p-[0.5rem] font-bold text-left px-3 ${financeColorClass}`}>
                        S/ {report.cost.toFixed(2)}
                    </td>
                    <td className={`border border-gray-300 p-[0.5rem] font-bold text-left px-3 ${financeColorClass}`}>
                        S/ {report.prepayment.toFixed(2)}
                    </td>
                    <td className={`border border-gray-300 p-[0.5rem] font-bold text-left px-3 ${financeColorClass}`}>
                        S/ {report.balance.toFixed(2)}
                    </td>
                    <td className={`border border-gray-300 p-[0.5rem] font-bold text-center ${financeColorClass}`}>
                        {report.reportDate ? format(new Date(report.reportDate), 'yyyy-MM-dd') : '---'}
                    </td>

                    {/* Acciones */}
                    <td className="border border-gray-300 p-[0.3rem]">
                        <button onClick={() => handleEditClick(report)} className="text-gray-800 hover:text-[#007bff] flex items-center justify-center w-full h-full">
                            {/* Pencil Icon */}
                            <svg className="w-[1.2rem] h-[1.2rem]" fill="currentColor" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                        </button>
                    </td>
                    <td className="border border-gray-300 p-[0.3rem]">
                        <button className="text-gray-800 hover:text-[#007bff] flex items-center justify-center w-full h-full">
                            {/* Search/Eye Icon */}
                            <svg className="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </td>
                    <td className="border border-gray-300 p-[0.3rem]">
                        <button className="text-gray-800 hover:text-[#007bff] flex items-center justify-center w-full h-full" onClick={() => exportReportToPdf(report)}>
                            {/* Document/Card Icon */}
                            <svg className="w-[1.2rem] h-[1.2rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" /></svg>
                        </button>
                    </td>
                    <td className="border border-gray-300 p-[0.3rem]">
                        <button className="text-gray-800 hover:text-red-500 flex items-center justify-center w-full h-full">
                            {/* Trash Icon */}
                            <svg className="w-[1.2rem] h-[1.2rem]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                        </button>
                    </td>
                    <td className="border border-gray-300 p-[0.3rem]">
                        <button className="text-gray-800 hover:text-[#007bff] flex items-center justify-center w-full h-full" onClick={() => exportReportToWord(report)}>
                            {/* File/Word Icon */}
                            <svg className="w-[1.2rem] h-[1.2rem]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
                        </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
