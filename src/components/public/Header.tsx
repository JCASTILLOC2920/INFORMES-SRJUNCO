'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
        <div className="flex items-center space-x-3">
          <Link href="/">
            <Image 
                src="/logo.png" 
                alt="JC PATH LAB Logo" 
                width={150} 
                height={50} 
                className="h-10 w-auto object-contain"
            />
          </Link>
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
