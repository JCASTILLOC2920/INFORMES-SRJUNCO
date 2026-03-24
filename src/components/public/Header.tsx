'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-clinical-blue-deep p-1.5 rounded-lg shadow-inner">
             <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
             </svg>
          </div>
          <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-gray-900' : 'text-gray-900 md:text-gray-900'}`}>JC PATH LAB</span>
        </div>
        
        <nav className="hidden md:flex space-x-8 items-center text-sm font-medium">
          <Link href="#inicio" className="text-gray-600 hover:text-clinical-blue transition-colors">Inicio</Link>
          <Link href="#servicios" className="text-gray-600 hover:text-clinical-blue transition-colors">Servicios</Link>
          <Link href="#resultados" className="text-gray-600 hover:text-clinical-blue transition-colors">Resultados en Línea</Link>
          <Link href="#portal-medico" className="text-gray-600 hover:text-clinical-blue transition-colors">Portal Médico</Link>
          <Link href="#contacto" className="text-gray-600 hover:text-clinical-blue transition-colors">Contacto</Link>
        </nav>

        <button className="bg-clinical-blue hover:bg-clinical-blue-deep text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95">
          Agendar Cita
        </button>
      </div>
    </header>
  );
}
