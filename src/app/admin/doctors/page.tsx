'use client';
import { useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: doctors, error, mutate } = useSWR(`/api/doctors${searchTerm ? `?q=${searchTerm}` : ''}`, fetcher);

  const handleDelete = async (id: string) => {
    if (!confirm('¿Está seguro de eliminar este médico?')) return;
    try {
      const res = await fetch(`/api/doctors?id=${id}`, { method: 'DELETE' });
      if (res.ok) mutate();
    } catch (err) {
      console.error('Delete Error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-8 font-sans animate-in fade-in duration-500">
      
      {/* Botones de Acción Superiores */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white px-6 py-2.5 rounded-md font-bold text-[0.8rem] shadow-sm transition-all active:scale-95">
          Nuevo Doctor
        </button>
        <button className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white px-6 py-2.5 rounded-md font-bold text-[0.8rem] shadow-sm transition-all active:scale-95">
          Nueva Especialización
        </button>
        <div className="w-full sm:w-auto">
          <button className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white px-8 py-2.5 rounded-md font-bold text-[0.8rem] shadow-sm transition-all active:scale-95">
            Exportar
          </button>
        </div>
      </div>

      {/* Contenedor Principal de la Tabla */}
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Título de la Sección */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
          <h1 className="text-[1.1rem] font-bold text-[#475569] uppercase tracking-tight">Lista de Doctor</h1>
        </div>

        {/* Controles de la Tabla */}
        <div className="p-6 flex flex-wrap justify-between items-center gap-4 bg-white/50">
          <div className="flex items-center gap-2 text-[0.85rem] text-[#64748b] font-medium">
            Mostrar 
            <select className="border border-gray-200 rounded px-2 py-1 outline-none focus:border-[#1e40af]">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            registros
          </div>
          
          <div className="flex items-center gap-3">
             <span className="text-[0.85rem] text-[#64748b] font-medium">Buscar:</span>
             <input 
               type="text" 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="border border-gray-300 rounded px-4 py-1.5 outline-none focus:ring-2 focus:ring-[#1e40af]/20 focus:border-[#1e40af] transition-all min-w-[15rem] shadow-sm" 
             />
          </div>
        </div>

        {/* Tabla Estilo Excel (Fiel a la Referencia) */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#008de3] text-white">
                <th className="border border-white/20 p-3 text-[0.7rem] font-black uppercase tracking-widest text-center w-[3rem]">#</th>
                <th className="border border-white/20 p-3 text-[0.7rem] font-black uppercase tracking-widest text-left">Tipo</th>
                <th className="border border-white/20 p-3 text-[0.7rem] font-black uppercase tracking-widest text-left">Provincia</th>
                <th className="border border-white/20 p-3 text-[0.7rem] font-black uppercase tracking-widest text-left">Doctor</th>
                <th className="border border-white/20 p-3 text-[0.7rem] font-black uppercase tracking-widest text-center"># Especialización</th>
                <th className="border border-white/20 p-3 text-[0.7rem] font-black uppercase tracking-widest text-center"># Colegiado</th>
                <th className="border border-white/20 p-3 text-[0.7rem] font-black uppercase tracking-widest text-center"># Telefono</th>
                <th className="border border-white/20 p-3 text-[0.7rem] font-black uppercase tracking-widest text-left">Correo</th>
                <th className="border border-white/20 p-3 text-[0.7rem] font-black uppercase tracking-widest text-center w-[5rem]">Firma</th>
                <th className="border border-white/20 p-3 text-[0.7rem] font-black uppercase tracking-widest text-center w-[8rem]">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-[#334155] text-[0.8rem] font-bold">
              {doctors?.map((doc: any, index: number) => (
                <tr key={doc.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="border border-gray-200 p-3 text-center text-gray-400 font-normal">{index + 1}</td>
                  <td className="border border-gray-200 p-3">{doc.type || 'DR. CLIENTE'}</td>
                  <td className="border border-gray-200 p-3">{doc.province || ''}</td>
                  <td className="border border-gray-200 p-3 uppercase">{doc.name}</td>
                  <td className="border border-gray-200 p-3 text-center">{doc.specialization || ''}</td>
                  <td className="border border-gray-200 p-3 text-center">{doc.licenseNumber || ''}</td>
                  <td className="border border-gray-200 p-3 text-center">{doc.phone || '0'}</td>
                  <td className="border border-gray-200 p-3 lowercase">{doc.email || ''}</td>
                  <td className="border border-gray-200 p-3 text-center">
                    {doc.signatureUrl ? '✔' : ''}
                  </td>
                  <td className="border border-gray-200 p-3">
                    <div className="flex justify-center gap-3">
                      <button className="text-gray-400 hover:text-[#1e40af] transition-colors" title="Editar">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button className="text-gray-400 hover:text-green-600 transition-colors" title="Ver Firma">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0" /></svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(doc.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors" 
                        title="Eliminar"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!doctors || doctors.length === 0) && (
                <tr>
                  <td colSpan={10} className="p-20 text-center text-gray-300 font-black uppercase tracking-[0.4em] italic bg-gray-50/20">
                    Buscando especialistas en el núcleo...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación (Simulación como en la imagen) */}
        <div className="p-6 bg-white flex justify-between items-center text-[0.8rem] text-[#64748b] font-medium border-t border-gray-100">
           <span>Mostrando 0 a 0 de 0 registros</span>
           <div className="flex gap-2">
              <button disabled className="px-4 py-1.5 rounded border border-gray-200 text-gray-300">Anterior</button>
              <button disabled className="px-4 py-1.5 rounded border border-gray-200 text-gray-300">Siguiente</button>
           </div>
        </div>
      </div>
    </div>
  );
}
