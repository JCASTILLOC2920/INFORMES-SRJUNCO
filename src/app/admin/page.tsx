'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function AdminDashboard() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchReports();
  }, []);

  const stats = [
    { label: "Informes Totales", value: reports.length.toString(), change: "+2", status: "up" },
    { label: "Pendientes Cobro", value: reports.filter(r => r.balance > 0).length.toString(), change: "-1", status: "down" },
    { label: "Entregas Hoy", value: reports.filter(r => {
        const today = new Date().toISOString().split('T')[0];
        return r.reportDate?.startsWith(today);
    }).length.toString(), valueSuffix: "", status: "neutral" },
    { label: "Balance Total", value: `S/ ${reports.reduce((acc, r) => acc + (r.balance || 0), 0).toFixed(2)}`, change: "+5%", status: "up" },
  ];

  return (
    <div className="max-w-full mx-auto space-y-[2rem]">
      {/* Dashboard Header - Fluid */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-[1.5rem] px-[0.5rem]">
        <div>
          <p className="text-[#008de3] font-black text-[0.65rem] uppercase tracking-[0.3em] mb-[0.5rem]">Panel Médico Administrativo</p>
          <h1 className="text-[2rem] sm:text-[2.5rem] font-black text-[#003d63] tracking-tighter leading-tight">Archivo Digital de Informes</h1>
        </div>
        <div className="flex flex-wrap gap-[0.75rem] w-full lg:w-auto">
            <Link href="/admin/reports/history" className="flex-1 lg:flex-none justify-center bg-white text-[#003d63] border border-gray-100 px-[1.5rem] py-[1rem] rounded-2xl font-black text-[0.75rem] shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center space-x-[0.5rem] uppercase tracking-widest">
                <svg className="w-[1.25rem] h-[1.25rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Historial</span>
            </Link>
            <Link href="/admin/reports/new" className="flex-1 lg:flex-none justify-center bg-[#003d63] text-white px-[2rem] py-[1rem] rounded-2xl font-black text-[0.75rem] shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center space-x-[0.5rem] uppercase tracking-widest">
                <svg className="w-[1.25rem] h-[1.25rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                <span>Nuevo Reporte</span>
            </Link>
        </div>
      </div>

      {/* Stats Grid - Responsive Stacking */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1.5rem] px-[0.5rem]">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-[1.5rem] rounded-[1.5rem] shadow-xl shadow-blue-900/5 border border-gray-50 group hover:border-[#008de3] transition-all transform hover:scale-[1.02]">
            <p className="text-gray-400 text-[0.6rem] font-black uppercase tracking-widest mb-[1rem] opacity-60">{stat.label}</p>
            <div className="flex justify-between items-end">
                <span className="text-[1.5rem] font-black text-[#003d63]">{stat.value}</span>
                {stat.change && (
                    <span className={`text-[0.6rem] font-black px-[0.5rem] py-[0.25rem] rounded-lg ${stat.status === 'up' ? 'text-green-600 bg-green-50' : stat.status === 'down' ? 'text-red-600 bg-red-50' : 'text-gray-600 bg-gray-50'}`}>
                        {stat.change}
                    </span>
                )}
            </div>
          </div>
        ))}
      </div>

      {/* Main Records Table - Fluid Containment */}
      <div className="bg-white rounded-[2rem] shadow-2xl shadow-blue-900/5 border border-gray-100 overflow-hidden mx-[0.5rem]">
        <div className="p-[1.5rem] sm:p-[2rem] border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-[1.5rem] bg-gray-50/30">
            <h3 className="text-[0.8rem] font-black text-[#003d63] uppercase tracking-[0.2em]">Registros de Atentión</h3>
            <div className="relative w-full md:w-[24rem] group">
                <input 
                    type="text" 
                    placeholder="Buscar paciente o DNI..." 
                    className="w-full pl-[3rem] pr-[1.5rem] py-[0.8rem] bg-white border border-gray-100 rounded-xl text-[0.85rem] focus:ring-4 focus:ring-[#008de3]/10 focus:border-[#008de3] transition-all outline-none font-bold"
                />
                <svg className="w-[1.25rem] h-[1.25rem] absolute left-[1rem] top-[0.65rem] text-gray-300 group-focus-within:text-[#008de3] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full border-collapse min-w-[60rem]">
                <thead>
                    <tr className="bg-[#003d63] text-white text-[0.65rem] font-black uppercase tracking-widest">
                        <th className="px-[1.5rem] py-[1.25rem] text-left">#</th>
                        <th className="px-[1.5rem] py-[1.25rem] text-left">COD. ATENCIÓN</th>
                        <th className="px-[1.5rem] py-[1.25rem] text-left">PACIENTE</th>
                        <th className="px-[1.5rem] py-[1.25rem] text-right">COSTO</th>
                        <th className="px-[1.5rem] py-[1.25rem] text-right">ADELANTO</th>
                        <th className="px-[1.5rem] py-[1.25rem] text-right">RESTA</th>
                        <th className="px-[1.5rem] py-[1.25rem] text-center">FEC. ENTREGA</th>
                        <th className="px-[1.5rem] py-[1.25rem] text-center">ACCIONES</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-bold text-gray-600">
                    {loading ? (
                        <tr>
                            <td colSpan={8} className="px-6 py-20 text-center">
                                <div className="flex flex-col items-center justify-center space-y-4">
                                    <div className="w-[2rem] h-[2rem] border-[3px] border-blue-100 border-t-[#008de3] rounded-full animate-spin"></div>
                                    <span className="text-[0.6rem] font-black text-gray-300 uppercase tracking-widest">Sincronizando base de datos...</span>
                                </div>
                            </td>
                        </tr>
                    ) : reports.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="px-6 py-20 text-center text-gray-300 font-black uppercase tracking-widest text-[0.7rem]">
                                Sin registros activos en el sistema.
                            </td>
                        </tr>
                    ) : reports.map((report, idx) => (
                        <tr key={report.id} className="hover:bg-blue-50/30 transition-colors">
                            <td className="px-[1.5rem] py-[1rem] text-[0.7rem] text-gray-300">{idx + 1}</td>
                            <td className="px-[1.5rem] py-[1rem] text-[0.7rem] font-black text-[#008de3]">{report.attentionCode}</td>
                            <td className="px-[1.5rem] py-[1rem]">
                                <p className="text-[0.8rem] font-black text-[#003d63] uppercase truncate max-w-[12rem]">{report.patientLastName}, {report.patientFirstName}</p>
                                <p className="text-[0.6rem] text-gray-400 font-bold uppercase tracking-tighter">DNI: {report.patientDni}</p>
                            </td>
                            <td className="px-[1.5rem] py-[1rem] text-right text-[0.8rem] font-black text-gray-900">S/ {report.cost.toFixed(2)}</td>
                            <td className="px-[1.5rem] py-[1rem] text-right text-[0.8rem] font-black text-green-600">S/ {report.prepayment.toFixed(2)}</td>
                            <td className={`px-[1.5rem] py-[1rem] text-right text-[0.8rem] font-black ${report.balance > 0 ? 'text-red-500 bg-red-50/30' : 'text-gray-400'}`}>
                                S/ {report.balance.toFixed(2)}
                            </td>
                            <td className="px-[1.5rem] py-[1rem] text-center text-[0.7rem] font-mono font-bold">
                                {report.reportDate ? format(new Date(report.reportDate), 'dd/MM/yyyy') : '---'}
                            </td>
                            <td className="px-[1.5rem] py-[1rem]">
                                <div className="flex justify-center gap-[0.25rem]">
                                    <ActionButton icon="edit" />
                                    <ActionButton icon="view" />
                                    <ActionButton icon="print" />
                                    <ActionButton icon="delete" variant="danger" />
                                </div>
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

function ActionButton({ icon, variant = 'default' }: { icon: string, variant?: 'default' | 'danger' | 'success' }) {
    const icons: any = {
        edit: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
        view: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
        print: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>,
        delete: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
        file: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    };

    const colors = {
        default: 'text-gray-300 hover:text-[#008de3] hover:bg-white',
        danger: 'text-red-200 hover:text-red-600 hover:bg-red-50',
        success: 'text-green-200 hover:text-green-600 hover:bg-green-50'
    };

    return (
        <button className={`p-[0.5rem] rounded-xl transition-all border border-transparent hover:border-gray-100 ${colors[variant]}`}>
            {icons[icon]}
        </button>
    );
}
