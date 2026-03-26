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
    <div className="max-w-[72.5rem] mx-auto space-y-[2rem]">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-[1rem]">
        <div>
          <h1 className="text-[1.5rem] font-black text-[#003d63] leading-tight italic tracking-tighter">Gestión de Boletas y Recibos</h1>
          <p className="text-gray-500 text-[0.85rem] font-medium">Administre los cobros y estados de pago de los estudios en tiempo real.</p>
        </div>
        <button className="bg-[#008de3] text-white px-[1.5rem] py-[0.75rem] rounded-[1.25rem] font-black text-[0.7rem] uppercase tracking-widest hover:bg-[#003d63] transition-all shadow-[0_10px_25px_rgba(0,141,227,0.15)] flex items-center space-x-[0.5rem] hover:-translate-y-1 active:scale-95">
          <svg className="w-[1.25rem] h-[1.25rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
          <span>Emitir Nueva Boleta</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white/70 backdrop-blur-xl p-[2rem] rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-[1.5rem] items-end">
        <div className="space-y-[0.5rem]">
            <label className="text-[0.625rem] font-black text-gray-400 uppercase tracking-widest ml-[0.25rem]">Buscar Paciente</label>
            <div className="relative">
                <span className="absolute left-[1rem] top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-[1rem] h-[1rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </span>
                <input 
                    type="text" 
                    placeholder="Nombre del paciente..." 
                    className="w-full pl-[2.5rem] pr-[1rem] py-[0.85rem] bg-gray-50 border border-gray-100 rounded-[1rem] focus:bg-white focus:ring-4 focus:ring-[#008de3]/5 focus:border-[#008de3] transition-all outline-none text-[0.85rem]" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        <div className="space-y-[0.5rem]">
            <label className="text-[0.625rem] font-black text-gray-400 uppercase tracking-widest ml-[0.25rem]">Rango de Fechas</label>
            <input type="date" className="w-full px-[1rem] py-[0.85rem] bg-gray-50 border border-gray-100 rounded-[1rem] focus:bg-white focus:ring-4 focus:ring-[#008de3]/5 focus:border-[#008de3] transition-all outline-none text-[0.85rem]" />
        </div>

        <div className="space-y-[0.5rem]">
            <label className="text-[0.625rem] font-black text-gray-400 uppercase tracking-widest ml-[0.25rem]">Estado de Pago</label>
            <select className="w-full px-[1rem] py-[0.85rem] bg-gray-50 border border-gray-100 rounded-[1rem] focus:bg-white focus:ring-4 focus:ring-[#008de3]/5 focus:border-[#008de3] transition-all outline-none appearance-none cursor-pointer text-[0.85rem]">
                <option>Todos los estados</option>
                <option>Pagado</option>
                <option>Pendiente</option>
            </select>
        </div>
      </div>

      {/* DataGrid */}
      <div className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[50rem]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-[2rem] py-[1.25rem] text-[0.65rem] font-black text-gray-400 uppercase tracking-widest">ID Boleta</th>
                <th className="px-[2rem] py-[1.25rem] text-[0.65rem] font-black text-gray-400 uppercase tracking-widest">Fecha Emisión</th>
                <th className="px-[2rem] py-[1.25rem] text-[0.65rem] font-black text-gray-400 uppercase tracking-widest">Paciente Entidad</th>
                <th className="px-[2rem] py-[1.25rem] text-[0.65rem] font-black text-gray-400 uppercase tracking-widest text-right">Monto Total</th>
                <th className="px-[2rem] py-[1.25rem] text-[0.65rem] font-black text-gray-400 uppercase tracking-widest">Estado</th>
                <th className="px-[2rem] py-[1.25rem] text-[0.65rem] font-black text-gray-400 uppercase tracking-widest text-center">Gestión</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {billingData.map((item, index) => (
                <tr key={index} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-[2rem] py-[1.25rem] text-[0.85rem] font-black text-[#003d63]">{item.id}</td>
                  <td className="px-[2rem] py-[1.25rem] text-[0.85rem] text-gray-500 font-medium">{item.date}</td>
                  <td className="px-[2rem] py-[1.25rem] text-[0.85rem] font-bold text-gray-900">{item.patient}</td>
                  <td className="px-[2rem] py-[1.25rem] text-[0.85rem] font-black text-[#003d63] text-right">{item.amount}</td>
                  <td className="px-[2rem] py-[1.25rem]">
                    <span className={`px-[1rem] py-[0.35rem] rounded-full text-[0.6rem] font-black uppercase tracking-widest ${item.status === 'Pagado' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-[2rem] py-[1.25rem] text-center">
                      <button className="w-[2.25rem] h-[2.25rem] text-gray-400 hover:text-[#008de3] transition-all rounded-full hover:bg-blue-50 flex items-center justify-center mx-auto">
                          <svg className="w-[1rem] h-[1rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-[2rem] py-[1rem] bg-gray-50/30 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-[1rem]">
            <span className="text-[0.65rem] text-gray-400 font-bold uppercase tracking-wider">Mostrando 1 a 5 de 42 resultados</span>
            <div className="flex space-x-[0.5rem]">
                <button className="px-[1rem] py-[0.5rem] rounded-[0.75rem] border border-gray-200 bg-white text-[0.7rem] font-black uppercase tracking-widest hover:bg-gray-50 disabled:opacity-30 transition-all" disabled>Ant</button>
                <button className="px-[1rem] py-[0.5rem] rounded-[0.75rem] border border-gray-200 bg-white text-[0.7rem] font-black uppercase tracking-widest hover:bg-[#008de3] hover:text-white transition-all">Sig</button>
            </div>
        </div>
      </div>
    </div>
  );
}
