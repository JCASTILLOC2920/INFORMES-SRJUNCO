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
    <div className="max-w-full mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-2">
        <div>
          <p className="text-clinical-blue font-bold text-[10px] uppercase tracking-[0.3em] mb-2">Panel Médico Administrativo</p>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Archivo Digital de Informes</h1>
        </div>
        <div className="flex space-x-3">
            <Link href="/admin/reports/new" className="bg-clinical-blue-deep text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                <span>NUEVO REPORTE</span>
            </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-2">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-gray-50 group hover:border-clinical-blue-light transition-all">
            <p className="text-gray-400 text-[9px] font-extrabold uppercase tracking-widest mb-3 opacity-60">{stat.label}</p>
            <div className="flex justify-between items-end">
                <span className="text-2xl font-black text-gray-900">{stat.value}</span>
                {stat.change && (
                    <span className={`text-[9px] font-black px-2 py-1 rounded-lg ${stat.status === 'up' ? 'text-green-600 bg-green-50' : stat.status === 'down' ? 'text-red-600 bg-red-50' : 'text-gray-600 bg-gray-50'}`}>
                        {stat.change}
                    </span>
                )}
            </div>
          </div>
        ))}
      </div>

      {/* Military Grade Data Table */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-gray-100 overflow-hidden mx-2">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/50">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter">REGISTROS DE ATENCIÓN</h3>
            <div className="relative w-full md:w-96 group">
                <input 
                    type="text" 
                    placeholder="Buscar por paciente, DNI o código..." 
                    className="w-full pl-12 pr-6 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:ring-4 focus:ring-clinical-blue/5 focus:border-clinical-blue transition-all outline-none font-medium"
                />
                <svg className="w-5 h-5 absolute left-4 top-3 text-gray-300 group-focus-within:text-clinical-blue transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-clinical-blue text-white text-[10px] font-black uppercase tracking-widest">
                        <th className="px-6 py-5 text-left rounded-tl-none">#</th>
                        <th className="px-6 py-5 text-left">COD-ATENCIÓN</th>
                        <th className="px-6 py-5 text-left">DNI</th>
                        <th className="px-6 py-5 text-left">PACIENTE</th>
                        <th className="px-6 py-5 text-left">MED. SOLICITANTE</th>
                        <th className="px-6 py-5 text-right">COSTO</th>
                        <th className="px-6 py-5 text-right">ADELANTO</th>
                        <th className="px-6 py-5 text-right">RESTA</th>
                        <th className="px-6 py-5 text-center">FEC. ENTREGA</th>
                        <th className="px-6 py-5 text-center rounded-tr-none">ACCIONES</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 italic font-medium text-gray-700">
                    {loading ? (
                        <tr>
                            <td colSpan={10} className="px-6 py-20 text-center">
                                <div className="flex flex-col items-center justify-center space-y-4">
                                    <div className="w-10 h-10 border-4 border-clinical-blue-light border-t-clinical-blue rounded-full animate-spin"></div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Cargando base de datos segura...</span>
                                </div>
                            </td>
                        </tr>
                    ) : reports.length === 0 ? (
                        <tr>
                            <td colSpan={10} className="px-6 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                                No hay informes registrados en el sistema.
                            </td>
                        </tr>
                    ) : reports.map((report, idx) => (
                        <tr key={report.id} className="hover:bg-blue-50/30 transition-colors">
                            <td className="px-6 py-4 text-xs font-bold text-gray-300">{idx + 1}</td>
                            <td className="px-6 py-4 text-xs font-black text-clinical-blue-deep">{report.attentionCode}</td>
                            <td className="px-6 py-4 text-xs">{report.patientDni}</td>
                            <td className="px-6 py-4 text-sm font-bold text-gray-900 uppercase">{report.patientLastName}, {report.patientFirstName}</td>
                            <td className="px-6 py-4 text-[11px] text-gray-500">{report.solicitor || '---'}</td>
                            <td className="px-6 py-4 text-right text-sm font-bold">S/ {report.cost.toFixed(2)}</td>
                            <td className="px-6 py-4 text-right text-sm font-bold text-green-600">S/ {report.prepayment.toFixed(2)}</td>
                            <td className="px-6 py-4 text-right text-sm font-black text-red-600 bg-red-50/50">S/ {report.balance.toFixed(2)}</td>
                            <td className="px-6 py-4 text-center text-xs font-mono">
                                {report.reportDate ? format(new Date(report.reportDate), 'dd/MM/yyyy') : '---'}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex justify-center space-x-2">
                                    <ActionButton icon="edit" />
                                    <ActionButton icon="view" />
                                    <ActionButton icon="print" />
                                    <ActionButton icon="delete" variant="danger" />
                                    <ActionButton icon="file" variant="success" />
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
        default: 'text-gray-400 hover:text-clinical-blue hover:bg-blue-50',
        danger: 'text-red-300 hover:text-red-600 hover:bg-red-50',
        success: 'text-green-300 hover:text-green-600 hover:bg-green-50'
    };

    return (
        <button className={`p-2 rounded-xl transition-all ${colors[variant]}`}>
            {icons[icon]}
        </button>
    );
}
