'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Registro', href: '/admin/reports/new' },
    { name: 'Listado', href: '/admin/reports/history' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-header transition-all duration-500 ${
        isScrolled || isMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-lg py-[1rem]' : 'bg-transparent py-[1.5rem]'
      }`}
    >
      <div className="container mx-auto px-[1.5rem]">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="relative z-[60] flex items-center">
            <div className="w-[12rem] h-auto transition-transform duration-300 hover:scale-[1.02]">
              <Image 
                src="/logo.png" 
                alt="JC PATH LAB Logo" 
                width={180} 
                height={60} 
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-[2.5rem]">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className="text-[0.9rem] font-bold text-gray-600 hover:text-[#008de3] transition-colors tracking-tight uppercase"
              >
                {link.name}
              </Link>
            ))}
            <button className="bg-[#008de3] text-white px-[2rem] py-[0.75rem] rounded-full text-[0.8rem] font-black uppercase tracking-wider shadow-lg hover:shadow-[#008de3]/40 transition-all transform hover:-translate-y-0.5 active:scale-95">
              Agendar Cita
            </button>
          </nav>

          {/* Hamburger Toggle */}
          <button 
            type="button"
            className="lg:hidden relative z-[60] w-[2.5rem] h-[2.5rem] flex flex-col items-center justify-center space-y-1.5 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className={`w-[1.5rem] h-1 bg-[#003d63] rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[0.6rem]' : ''}`} />
            <span className={`w-[1.5rem] h-1 bg-[#003d63] rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-[1.5rem] h-1 bg-[#003d63] rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[0.6rem]' : ''}`} />
          </button>
        </div>

        {/* Credentials Banner removed as requested */}

        {/* Mobile menu overlay */}
        <div 
          className={`fixed inset-0 bg-white/98 flex flex-col items-center justify-center space-y-[2rem] transition-all duration-500 lg:hidden ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
        >
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              className="text-[1.5rem] font-black text-[#003d63] uppercase tracking-widest hover:text-[#008de3] transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <button className="bg-[#003d63] text-white px-[3rem] py-[1.25rem] rounded-full text-[1rem] font-black uppercase tracking-widest shadow-2xl">
            Agendar Cita
          </button>
        </div>
      </div>
    </header>
  );
}
