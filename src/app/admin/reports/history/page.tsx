'use client';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function HistorialPacientes() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    attentionCode: '',
    patientName: '',
    patientLastName: '',
    dni: '',
    solicitor: ''
  });

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

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredReports = reports.filter(report => {
    return (
      (!filters.attentionCode || report.attentionCode.toLowerCase().includes(filters.attentionCode.toLowerCase())) &&
      (!filters.dni || report.patientDni.includes(filters.dni)) &&
      (!filters.patientName || report.patientFirstName.toLowerCase().includes(filters.patientName.toLowerCase())) &&
      (!filters.patientLastName || report.patientLastName.toLowerCase().includes(filters.patientLastName.toLowerCase()))
    );
  });

  return (
    <div className="space-y-[1.5rem] pb-[2rem]">
      {/* Filters Section - Responsive Grid */}
      <div className="bg-white p-[1.5rem] rounded-[1.5rem] shadow-xl shadow-blue-900/5 border border-gray-50 elite-shadow">
        <h2 className="text-[0.7rem] font-black text-[#003d63] uppercase tracking-[0.2em] mb-[1.5rem] flex items-center gap-[0.5rem]">
          <span className="w-[0.5rem] h-[1rem] bg-[#008de3] rounded-full"></span>
          Filtros de Búsqueda Avanzada
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1rem] items-end">
          <FilterInput label="Fec. Inicio" name="startDate" type="date" value={filters.startDate} onChange={handleFilterChange} />
          <FilterInput label="Fec. Final" name="endDate" type="date" value={filters.endDate} onChange={handleFilterChange} />
          <FilterInput label="Cod. Atención" name="attentionCode" placeholder="Q, I, C..." value={filters.attentionCode} onChange={handleFilterChange} />
          <FilterInput label="Nombres" name="patientName" placeholder="Juan..." value={filters.patientName} onChange={handleFilterChange} />
          <FilterInput label="Apellidos" name="patientLastName" placeholder="Perez..." value={filters.patientLastName} onChange={handleFilterChange} />
          <FilterInput label="DNI" name="dni" placeholder="Número..." value={filters.dni} onChange={handleFilterChange} />
          <FilterInput label="Med. Solicitante" name="solicitor" placeholder="Referencia..." value={filters.solicitor} onChange={handleFilterChange} />
          <div className="flex gap-[0.5rem]">
            <button className="flex-1 bg-[#003d63] text-white px-[1rem] py-[0.75rem] rounded-xl font-black text-[0.65rem] uppercase tracking-widest hover:bg-[#008de3] transition-all shadow-lg">Buscar</button>
            <button className="flex-1 bg-gray-50 text-[#003d63] px-[1rem] py-[0.75rem] rounded-xl font-black text-[0.65rem] uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100">Paciente</button>
          </div>
        </div>
      </div>

      {/* Tabs - Responsive */}
      <div className="flex flex-wrap gap-[0.5rem] border-b border-gray-100 pb-[0.5rem]">
        <TabButton active label="Serv. muestra HE (Q)" />
        <TabButton label="Inmunohistoquimica (I)" />
        <TabButton label="Citologia (C)" />
      </div>

      {/* Table Container - Fluid with Horizontal Scroll */}
      <div className="bg-white rounded-[1.5rem] shadow-2xl shadow-blue-900/5 border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-[0.75rem] border-collapse min-w-[75rem]">
            <thead>
              <tr className="bg-[#003d63] text-white font-black uppercase tracking-widest">
                <th className="px-[1rem] py-[1.25rem] border-r border-white/5">#</th>
                <th className="px-[1rem] py-[1.25rem] border-r border-white/5 whitespace-nowrap">COD-ATENCIÓN</th>
                <th className="px-[1rem] py-[1.25rem] border-r border-white/5">DNI</th>
                <th className="px-[1rem] py-[1.25rem] border-r border-white/5 whitespace-nowrap">MED. SOLICITANTE</th>
                <th className="px-[1rem] py-[1.25rem] border-r border-white/5">PACIENTE</th>
                <th className="px-[1rem] py-[1.25rem] border-r border-white/5 text-right">COSTO</th>
                <th className="px-[1rem] py-[1.25rem] border-r border-white/5 text-right">ADELANTO</th>
                <th className="px-[1rem] py-[1.25rem] border-r border-white/5 text-right">RESTA</th>
                <th className="px-[1rem] py-[1.25rem] border-r border-white/5 text-center whitespace-nowrap">FEC. ENTREGA</th>
                <th className="px-[1rem] py-[1.25rem] text-center">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-bold text-gray-600">
              {loading ? (
                <tr><td colSpan={10} className="p-[5rem] text-center animate-pulse uppercase tracking-[0.2em] text-gray-300 font-black text-[0.7rem]">Cargando bitácora clínica...</td></tr>
              ) : filteredReports.length === 0 ? (
                <tr><td colSpan={10} className="p-[5rem] text-center text-gray-300 uppercase tracking-widest font-black text-[0.7rem]">Sin coincidencias encontradas</td></tr>
              ) : filteredReports.map((report, idx) => {
                const resta = (report.cost || 0) - (report.prepayment || 0);
                return (
                  <tr key={report.id} className="hover:bg-blue-50/20 transition-all group">
                    <td className="px-[1rem] py-[1rem] border-r border-gray-50 text-gray-300 font-bold">{idx + 1}</td>
                    <td className="px-[1rem] py-[1rem] border-r border-gray-50 font-black text-[#008de3]">{report.attentionCode}</td>
                    <td className="px-[1rem] py-[1rem] border-r border-gray-50">{report.patientDni}</td>
                    <td className="px-[1rem] py-[1rem] border-r border-gray-50 truncate max-w-[10rem] group-hover:text-[#003d63] transition-colors">{report.solicitor || '---'}</td>
                    <td className="px-[1rem] py-[1rem] border-r border-gray-50 font-black uppercase text-[#003d63] whitespace-nowrap">
                      {report.patientLastName}, {report.patientFirstName}
                    </td>
                    <td className="px-[1rem] py-[1rem] border-r border-gray-50 text-right bg-green-50/30 text-green-700 font-black">S/ {(report.cost || 0).toFixed(2)}</td>
                    <td className="px-[1rem] py-[1rem] border-r border-gray-50 text-right bg-green-50/30 text-green-700 font-black">S/ {(report.prepayment || 0).toFixed(2)}</td>
                    <td className={`px-[1rem] py-[1rem] border-r border-gray-50 text-right font-black ${resta > 0 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                      S/ {resta.toFixed(2)}
                    </td>
                    <td className="px-[1rem] py-[1rem] border-r border-gray-50 font-bold text-center whitespace-nowrap text-gray-400">
                      {report.expectedDeliveryDate ? format(new Date(report.expectedDeliveryDate), 'dd/MM/yyyy') : '---'}
                    </td>
                    <td className="px-[1rem] py-[1rem]">
                      <div className="flex justify-center gap-[0.25rem]">
                        <MiniAction icon="edit" />
                        <MiniAction icon="search" />
                        <MiniAction icon="print" />
                        <MiniAction icon="delete" variant="danger" />
                        <MiniAction icon="lab" />
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
  );
}

function FilterInput({ label, name, value, onChange, placeholder, type = "text" }: any) {
  return (
    <div className="flex flex-col gap-[0.4rem] w-full">
      <label className="text-[0.6rem] font-black uppercase text-gray-400 tracking-[0.1em] ml-[0.25rem]">{label}</label>
      <input 
        type={type} 
        name={name} 
        value={value} 
        onChange={onChange}
        placeholder={placeholder} 
        className="w-full border border-gray-200 bg-gray-50/50 p-[0.65rem] rounded-xl text-[0.8rem] font-bold outline-none focus:ring-2 focus:ring-[#008de3] focus:bg-white transition-all"
      />
    </div>
  );
}

function TabButton({ label, active = false }: { label: string, active?: boolean }) {
  return (
    <button className={`px-[1.25rem] py-[0.65rem] rounded-xl text-[0.65rem] font-black uppercase tracking-wider transition-all ${
      active 
        ? 'bg-[#003d63] text-white shadow-lg' 
        : 'text-gray-400 hover:text-[#008de3] hover:bg-blue-50'
    }`}>
      {label}
    </button>
  );
}

function MiniAction({ icon, variant = 'default' }: { icon: string, variant?: 'default' | 'danger' }) {
  const icons: any = {
    edit: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    search: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    print: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>,
    delete: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    lab: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.691.387a6 6 0 01-3.861.517l-2.399-.48a2 2 0 00-1.02.547l-2.387 2.387a2 2 0 001.414 3.414h15.716a2 2 0 001.414-3.414l-2.387-2.387z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.985 10.613l-4-4a2 2 0 00-2.828 0l-4 4m0 0l4 4a2 2 0 002.828 0l4-4" /></svg>
  };

  const colors = {
    default: 'text-gray-400 hover:text-[#008de3] hover:bg-white',
    danger: 'text-red-200 hover:text-red-600 hover:bg-red-50'
  };

  return (
    <button className={`p-[0.4rem] rounded-lg transition-all border border-transparent hover:border-gray-50 ${colors[variant]}`}>
      {icons[icon]}
    </button>
  );
}

