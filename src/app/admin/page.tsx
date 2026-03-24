export default function AdminDashboard() {
  const stats = [
    { label: "Informes Generados", value: "1,280", change: "+12%", status: "up" },
    { label: "Pacientes Atendidos", value: "842", change: "+5%", status: "up" },
    { label: "Pendientes de Firma", value: "12", change: "-2", status: "down" },
    { label: "Facturación Mensual", value: "S/ 12,450", change: "+18%", status: "up" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-clinical-blue font-bold text-xs uppercase tracking-[0.2em] mb-2">Resumen General</p>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Bienvenido, Dr. Josehp</h1>
        </div>
        <div className="text-right">
            <p className="text-gray-400 text-sm font-medium">Lunes, 23 de Marzo 2026</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-gray-50 group hover:border-clinical-blue-light transition-all">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4">{stat.label}</p>
            <div className="flex justify-between items-end">
                <span className="text-2xl font-black text-gray-900">{stat.value}</span>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${stat.status === 'up' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                    {stat.change}
                </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Recent Activity */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-gray-50">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-gray-900">Actividad Reciente</h3>
                <button className="text-clinical-blue text-xs font-bold hover:underline">Ver todo</button>
            </div>
            <div className="space-y-6">
                <ActivityItem patient="Juan Pérez" type="Biopsia" time="Hace 10 min" status="Completado" />
                <ActivityItem patient="María García" type="Citología" time="Hace 1 hora" status="Pendiente" />
                <ActivityItem patient="Carlos R." type="Molar" time="Hace 3 horas" status="En Proceso" />
                <ActivityItem patient="Ana Martínez" type="Gástrica" time="Ayer" status="Completado" />
            </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 px-4">Accesos Rápidos</h3>
            <div className="grid grid-cols-2 gap-6">
                <QuickActionButton 
                    label="Nuevo Informe" 
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>}
                    color="bg-clinical-blue"
                />
                <QuickActionButton 
                    label="Emitir Boleta" 
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                    color="bg-clinical-blue-deep"
                />
            </div>
            <div className="bg-gradient-to-br from-clinical-blue-deep to-clinical-blue rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                 <div className="relative z-10">
                    <p className="text-xs font-bold opacity-60 uppercase tracking-widest mb-4">Consejo del día</p>
                    <h4 className="text-xl font-bold mb-4">Optimización de Imágenes</h4>
                    <p className="text-sm opacity-80 leading-relaxed font-medium">
                        Recuerde subir las fotos macroscópicas con buena iluminación para mejorar la precisión del informe final.
                    </p>
                 </div>
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-5 rounded-full"></div>
            </div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ patient, type, time, status }: any) {
    return (
        <div className="flex items-center justify-between group cursor-pointer hover:translate-x-1 transition-transform">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-clinical-blue group-hover:bg-clinical-blue-light transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <div>
                    <h4 className="text-sm font-bold text-gray-900">{patient}</h4>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">{type} • {time}</p>
                </div>
            </div>
            <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg ${status === 'Completado' ? 'text-green-600' : status === 'Pendiente' ? 'text-yellow-600' : 'text-blue-600'}`}>
                {status}
            </span>
        </div>
    );
}

function QuickActionButton({ label, icon, color }: any) {
    return (
        <button className={`${color} text-white p-8 rounded-[2rem] flex flex-col items-center justify-center space-y-4 hover:scale-105 transition-all shadow-xl active:scale-95`}>
            <div className="bg-white/20 p-3 rounded-xl">
                {icon}
            </div>
            <span className="font-bold text-sm tracking-tight">{label}</span>
        </button>
    );
}
