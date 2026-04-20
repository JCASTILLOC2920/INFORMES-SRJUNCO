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
    { name: 'Seguimiento', href: '/seguimiento' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-header transition-all duration-700 ${
        isScrolled || isMenuOpen ? 'bg-white/85 backdrop-blur-xl border-b border-white/20 shadow-premium py-[0.8rem]' : 'bg-transparent py-[1.5rem]'
      }`}
    >
      {/* Trust Banner - Top Alignment for zero-collision */}
      <div className="bg-gradient-to-r from-nexus-void via-clinical-blue-deep to-nexus-void text-cyan-pulse text-center py-[8px] text-[0.75rem] font-medium tracking-[0.2em] shadow-inner font-outfit uppercase">
        Operatividad Garantizada: Resultados de Alta Precisión en 72h
      </div>

      <div className="max-w-[1700px] mx-auto px-[1.5rem]">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="relative z-[60] flex items-center">
            <div className="w-[12rem] h-auto transition-transform duration-300 hover:scale-[1.02]">
              <Image 
                src="/logo.webp" 
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
                prefetch={link.href.startsWith('/')}
                className="text-[0.8rem] font-black text-gray-500 hover:text-[var(--secondary)] transition-all tracking-[0.2em] uppercase relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--cyan-pulse)] transition-all duration-500 group-hover:w-full"></span>
              </Link>
            ))}
            <Link 
              href="/login" 
              prefetch={true}
              className="bg-transparent border-[1.5px] border-nexus-void text-nexus-void px-[1.2rem] py-[0.7rem] rounded-full text-[0.75rem] font-bold uppercase tracking-[0.1em] transition-all duration-300 ease-in-out hover:bg-nexus-void hover:text-white magnetic-cta glow-pulse hover:shadow-glow-cyan"
            >
              Portal de Resultados
            </Link>
            <button className="bg-clinical-blue text-white px-[2.2rem] py-[0.8rem] rounded-full text-[0.75rem] font-black uppercase tracking-[0.15em] shadow-elite hover:bg-nexus-void hover:shadow-glow-cyan transition-all duration-500 transform hover:-translate-y-1 active:scale-95 border border-white/20 magnetic-cta overflow-hidden relative">
              <span className="relative z-10">Agendar Cita</span>
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
          <button className="bg-transparent border-[1.5px] border-nexus-void text-nexus-void px-[1.2rem] py-[1rem] rounded-full text-[1rem] font-bold uppercase tracking-[0.1em] transition-all duration-300 ease-in-out hover:bg-nexus-void hover:text-white w-[80%] max-w-[300px]">
            Portal de Resultados
          </button>
          <button className="bg-clinical-blue text-white px-[3rem] py-[1.25rem] rounded-full text-[1rem] font-black uppercase tracking-widest shadow-premium w-[80%] max-w-[300px] border border-white/20 hover:shadow-glow-cyan transition-all duration-300">
            Agendar Cita
          </button>
        </div>
      </div>
    </header>
  );
}
