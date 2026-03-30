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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Registro', href: '/admin/reports/new' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-header transition-all duration-700 ${
        isScrolled || isMenuOpen ? 'bg-white/80 backdrop-blur-2xl border-b border-[var(--secondary)]/10 shadow-[0_10px_40px_rgba(0,0,0,0.05)] py-[0.8rem]' : 'bg-transparent py-[1.5rem]'
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
                className="text-[0.8rem] font-black text-gray-500 hover:text-[var(--secondary)] transition-all tracking-[0.2em] uppercase relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--cyan-pulse)] transition-all duration-500 group-hover:w-full"></span>
              </Link>
            ))}
            <button className="bg-[var(--nexus-void)] text-white px-[2.2rem] py-[0.8rem] rounded-2xl text-[0.75rem] font-black uppercase tracking-[0.15em] shadow-xl hover:bg-[var(--secondary)] hover:shadow-[0_0_25px_rgba(0,141,227,0.3)] transition-all transform hover:-translate-y-0.5 active:scale-95 border border-white/10">
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
