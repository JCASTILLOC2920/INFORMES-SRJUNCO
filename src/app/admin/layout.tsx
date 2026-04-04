'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// AuthGuard eliminado: La seguridad ahora está centralizada en middleware.ts para máxima agilidad.

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    sessionStorage.clear();
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = '/login';
  };

  const menuItems = [
    { href: '/', icon: <HomeIcon />, label: 'Sitio Principal' },
    { href: '/admin/doctors', icon: <DoctorsIcon />, label: 'Lista de Médicos' },
    { href: '/admin', icon: <DashboardIcon />, label: 'Lista de Pacientes' },
    { href: '/admin/reports/new', icon: <PlusIcon />, label: 'Registrar Paciente' },
    { href: '/admin/reports/history', icon: <HistoryIcon />, label: 'Historial' },
    { href: '/admin/billing', icon: <BillingIcon />, label: 'Gestión Boletas' },
    { href: '/admin/settings', icon: <SettingsIcon />, label: 'Configuración' },
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-[60] lg:hidden backdrop-blur-sm transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside 
          className={`fixed inset-y-0 left-0 z-[70] w-[16rem] bg-[#003d63] text-white flex flex-col transition-transform duration-300 transform lg:relative lg:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-[5rem] flex items-center px-[1.5rem] border-b border-white/10">
            <div className="bg-[#008de3] p-[0.4rem] rounded-lg shadow-lg shadow-blue-500/20">
              <svg className="h-[1.5rem] w-[1.5rem] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="ml-[0.75rem] text-[1.1rem] font-black tracking-tight uppercase">JC PLATFORM</span>
          </div>

          <nav className="flex-grow px-[1rem] py-[1.5rem] space-y-[0.5rem] overflow-y-auto custom-scrollbar">
            {menuItems.map((item) => (
              <SidebarItem 
                key={item.href} 
                {...item} 
                active={pathname === item.href} 
                onClick={() => setIsSidebarOpen(false)}
              />
            ))}
          </nav>

          <div className="p-[1rem] border-t border-white/10 bg-[#002a45]">
            <div onClick={handleLogout} className="flex items-center space-x-[0.75rem] px-[0.5rem] py-[0.75rem] rounded-xl hover:bg-red-500/20 cursor-pointer transition-all group" title="Cerrar el sistema y borrar cookies">
              <div className="w-[2rem] h-[2rem] rounded-full bg-[#008de3] group-hover:bg-red-500 flex items-center justify-center text-white font-black text-[0.7rem] shadow-lg transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <div className="flex-grow min-w-0">
                <p className="text-[0.75rem] font-bold truncate group-hover:text-red-400 transition-colors">Cerrar Sesión</p>
                <p className="text-[0.6rem] text-blue-200/60 truncate uppercase font-bold tracking-wider group-hover:text-red-400/60">Bloquear Sistema</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Header for Mobile */}
          <header className="h-[4rem] lg:hidden flex items-center px-[1.5rem] bg-white border-b border-gray-100 shrink-0">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-[0.5rem] -ml-[0.5rem] text-gray-400 hover:text-[#008de3] transition-colors"
            >
              <svg className="h-[1.5rem] w-[1.5rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            <span className="ml-[1rem] text-[0.9rem] font-bold text-[#003d63] uppercase tracking-wider">Lista de Pacientes</span>
          </header>

          <main className="flex-1 overflow-y-auto p-[1rem] sm:p-[2rem] relative bg-[#f8fafc]">
            <div className="max-w-full mx-auto px-[1rem] sm:px-[2rem] lg:px-[1rem]">
              {children}
            </div>
          </main>
        </div>
      </div>
  );
}

function SidebarItem({ href, icon, label, active = false, onClick }: { href: string, icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`flex items-center space-x-[1rem] px-[1.25rem] py-[0.8rem] rounded-xl transition-all duration-200 group ${
        active 
          ? 'bg-[#008de3] text-white shadow-lg shadow-blue-500/20' 
          : 'hover:bg-white/10 text-blue-100/70 hover:text-white'
      }`}
    >
      <span className={`${active ? 'text-white' : 'text-blue-300/40 group-hover:text-white'} transition-colors`}>
        {icon}
      </span>
      <span className="text-[0.85rem] font-bold tracking-tight">{label}</span>
    </Link>
  );
}

// Icons (Unique Set)
function HomeIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>; }
function DashboardIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10a2 2 0 11-4 0 2 2 0 014 0zM7 21a5 5 0 0110 0" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>; }
function DoctorsIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>; }
function PlusIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>; }
function HistoryIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0" /></svg>; }
function BillingIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>; }
function SettingsIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>; }
