import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-950 text-gray-400 flex flex-shrink-0 flex-col transition-all duration-300">
        <div className="p-6 flex items-center space-x-3 text-white">
          <div className="bg-clinical-blue p-1.5 rounded-lg">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <span className="text-lg font-bold">JC PLATFORM</span>
        </div>

        <nav className="flex-grow px-4 space-y-2 mt-4">
          <SidebarItem href="/admin" icon={<HomeIcon />} label="Inicio" />
          <SidebarItem href="/admin/reports/new" icon={<PlusIcon />} label="Nuevo Informe" active />
          <SidebarItem href="/admin/reports/history" icon={<HistoryIcon />} label="Historial de Pacientes" />
          <SidebarItem href="/admin/billing" icon={<BillingIcon />} label="Gestión de Boletas" />
          <SidebarItem href="/admin/settings" icon={<SettingsIcon />} label="Configuración" />
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3 px-2 py-3 rounded-xl hover:bg-gray-900 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-clinical-blue flex items-center justify-center text-white font-bold text-xs">
              JP
            </div>
            <div className="flex-grow overflow-hidden text-xs">
              <p className="text-white font-semibold truncate">Dr. Josehp Castillo</p>
              <p className="text-gray-500 truncate">Patólogo Principal</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto p-8 relative">
        {children}
      </main>
    </div>
  );
}

function SidebarItem({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link href={href} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${active ? 'bg-clinical-blue text-white shadow-lg' : 'hover:bg-gray-900 hover:text-white'}`}>
      <span className={`${active ? 'text-white' : 'text-gray-500 group-hover:text-clinical-blue'} transition-colors`}>
        {icon}
      </span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

// Icons
function HomeIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>; }
function PlusIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>; }
function HistoryIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0" /></svg>; }
function BillingIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>; }
function SettingsIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>; }
