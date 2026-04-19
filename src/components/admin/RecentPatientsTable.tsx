'use client';
import useSWR from 'swr';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function RecentPatientsTable() {
  const { data: reports, mutate } = useSWR('/api/reports?limit=10', fetcher);

  if (!reports) return (
    <div className="animate-pulse space-y-4">
      <div className="h-10 bg-gray-100 rounded-xl w-1/4"></div>
      <div className="h-64 bg-gray-50 rounded-[2rem]"></div>
    </div>
  );

  // BLINDAJE PARA EVITAR EXCEPCIÓN DE CLIENTE (reports.map no es una función si la API falla)
  const safeReports = Array.isArray(reports) ? reports : [];
  const hasError = !Array.isArray(reports) && reports?.error;

  return (
    <div className="mt-12 animate-in fade-in slide-in-from-bottom duration-700">
      <div className="flex items-center justify-between mb-6 px-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#008de3]/10 flex items-center justify-center text-[#008de3]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01m-.01 4h.01" /></svg>
          </div>
          <div>
            <h3 className="text-[0.8rem] font-black text-[#002a45] uppercase tracking-[0.2em]">Sección: Lista de Pacientes</h3>
            <p className="text-[0.65rem] text-[#64748b] font-bold uppercase tracking-widest">Últimos Registros Inyectados</p>
          </div>
        </div>
        <button 
          onClick={() => mutate()} 
          className="p-3 text-[#008de3] hover:bg-blue-50 rounded-xl transition-all active:scale-95"
          title="Sincronizar Lista"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,42,69,0.04)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse border border-slate-300">
            <thead>
              <tr className="bg-slate-50 text-[#002a45] text-[0.65rem] font-black uppercase tracking-[0.2em]">
                <th className="p-4 border border-slate-300">Código</th>
                <th className="p-4 border border-slate-300 text-left">Paciente</th>
                <th className="p-4 border border-slate-300">Servicio</th>
                <th className="p-4 border border-slate-300">Costo</th>
                <th className="p-4 border border-slate-300">Estado</th>
              </tr>
            </thead>
            <tbody className="text-[0.75rem] font-bold">
              {hasError ? (
                <tr><td colSpan={5} className="p-12 text-[#e33e2b] uppercase tracking-widest font-black opacity-60 border border-slate-300">Error al cargar registros: {reports.error}</td></tr>
              ) : safeReports.length === 0 ? (
                <tr><td colSpan={5} className="p-12 text-[#94a3b8] uppercase tracking-widest font-black opacity-40 border border-slate-300">No hay registros recientes</td></tr>
              ) : safeReports.map((report: any) => (
                <tr key={report.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="p-4 font-black text-[#002a45] border border-slate-300">{report.attentionCode}</td>
                  <td className="p-4 text-left uppercase text-[#475569] border border-slate-300">
                    {report.patientLastName}, {report.patientFirstName}
                  </td>
                  <td className="p-4 border border-slate-300">
                    <span className="bg-blue-100/50 text-[#008de3] px-3 py-1 rounded-full text-[0.65rem] uppercase">
                      {report.serviceType}
                    </span>
                  </td>
                  <td className="p-4 text-[#002a45] border border-slate-300">S/ {report.cost || 0}</td>
                  <td className="p-4 border border-slate-300">
                    {report.isPendingPayment ? (
                      <span className="text-red-500 flex items-center justify-center gap-1">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                        Pendiente
                      </span>
                    ) : (
                      <span className="text-green-500">Completado</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
