'use client';
import { useState } from 'react';

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const billingData = [
    { id: 'BOL-001', date: '2024-03-20', patient: 'Juan Pérez', amount: 'S/ 150.00', status: 'Pagado' },
    { id: 'BOL-002', date: '2024-03-21', patient: 'María García', amount: 'S/ 220.00', status: 'Pendiente' },
    { id: 'BOL-003', date: '2024-03-22', patient: 'Carlos Rodríguez', amount: 'S/ 180.00', status: 'Pagado' },
    { id: 'BOL-004', date: '2024-03-22', patient: 'Ana Martínez', amount: 'S/ 300.00', status: 'Pendiente' },
    { id: 'BOL-005', date: '2024-03-23', patient: 'Luis Torres', amount: 'S/ 120.00', status: 'Pagado' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">Gestión de Boletas y Recibos</h1>
          <p className="text-gray-500 text-sm">Administre los cobros y estados de pago de los estudios realizados.</p>
        </div>
        <button className="bg-clinical-blue text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-clinical-blue-deep transition-all shadow-lg flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          <span>Emitir Nueva Boleta</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Buscar Paciente</label>
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </span>
                <input 
                    type="text" 
                    placeholder="Nombre del paciente..." 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-clinical-blue transition-all outline-none" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Rango de Fechas</label>
            <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-clinical-blue transition-all outline-none" />
        </div>

        <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Estado</label>
            <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-clinical-blue transition-all outline-none appearance-none cursor-pointer">
                <option>Todos los estados</option>
                <option>Pagado</option>
                <option>Pendiente</option>
            </select>
        </div>
      </div>

      {/* DataGrid */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">ID Boleta</th>
              <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Paciente</th>
              <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Monto</th>
              <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {billingData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors group">
                <td className="px-8 py-5 text-sm font-bold text-clinical-blue-deep">{item.id}</td>
                <td className="px-8 py-5 text-sm text-gray-600">{item.date}</td>
                <td className="px-8 py-5 text-sm font-semibold text-gray-900">{item.patient}</td>
                <td className="px-8 py-5 text-sm font-bold text-gray-900 text-right">{item.amount}</td>
                <td className="px-8 py-5">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.status === 'Pagado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-center">
                    <button className="p-2 text-gray-400 hover:text-clinical-blue transition-colors rounded-lg hover:bg-clinical-blue-light/30">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination placeholder */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
            <span>Mostrando 1 a 5 de 42 resultados</span>
            <div className="flex space-x-2">
                <button className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-50" disabled>Anterior</button>
                <button className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100">Siguiente</button>
            </div>
        </div>
      </div>
    </div>
  );
}
