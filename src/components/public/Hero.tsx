import Image from 'next/image';
import React from 'react';
import HeroCarousel from './HeroCarousel';



export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-[95vh] flex items-center pt-[11.5rem] pb-[4rem] overflow-hidden bg-gradient-to-b from-premium-silver via-white to-premium-silver perspective-1000">
      {/* Nexus Background Grid - Optimized O(1) impact */}
      <div className="absolute inset-0 -z-10 opacity-[0.04] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-clinical-blue) 1.5px, transparent 0)', backgroundSize: '48px 48px' }}>
      </div>

      {/* Dynamic Aura Accents */}
      <div className="absolute top-[-10%] right-[-5%] w-[45%] h-[65%] bg-gradient-to-br from-clinical-blue to-cyan-pulse rounded-full blur-[140px] opacity-[0.08] -z-10 animate-pulse-aura"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[35%] h-[55%] bg-clinical-blue-deep rounded-full blur-[120px] opacity-[0.06] -z-10"></div>

      <div className="max-w-[1700px] mx-auto px-[1.5rem] z-10 grid lg:grid-cols-[1.2fr_1fr] gap-[64px] items-center">
        <div className="max-w-[42rem] order-2 lg:order-1 stagger-reveal">
          <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-black text-nexus-void leading-[1.05] mb-[1.5rem] tracking-tighter font-outfit">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexus-void to-clinical-blue block drop-shadow-sm">Centro Especializado</span>
            <span className="relative inline-block mt-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-clinical-blue to-cyan-pulse">en Anatomía Patológica</span>
              <div className="absolute -bottom-3 left-0 w-2/5 h-[6px] bg-cyan-pulse rounded-full opacity-60 shadow-glow-cyan"></div>
            </span>
          </h1>
          <p className="text-[1.15rem] md:text-[1.25rem] text-slate-700 mb-[2.5rem] max-w-[38rem] leading-relaxed font-medium border-l-[5px] border-cyan-pulse/40 pl-6 bg-gradient-to-r from-slate-50 to-transparent py-2 rounded-r-xl">
            Diagnóstico avanzado en <strong className="text-nexus-void font-bold">Biopsias</strong>, <strong className="text-nexus-void font-bold">Citología</strong>, <strong className="text-nexus-void font-bold">Papanicolaou</strong> e <strong className="text-nexus-void font-bold">Inmunohistoquímica</strong> en Lima Norte. Resultados digitales certificados en <strong className="text-clinical-blue font-bold">3-4 días hábiles</strong>.
          </p>
          <div className="mt-[32px] flex flex-wrap gap-4">
            <a 
              href="#contacto" 
              className="inline-flex items-center justify-center px-[36px] py-[18px] bg-nexus-void text-white rounded-full border-none text-[1.125rem] font-bold shadow-elite transition-all duration-300 hover:bg-clinical-blue hover:shadow-glow-blue magnetic-cta uppercase tracking-widest hover:-translate-y-1 active:scale-95"
            >
              Agendar Examen
            </a>
            <a 
              href="/login" 
              className="inline-flex items-center justify-center px-[36px] py-[18px] bg-white/70 backdrop-blur-md text-nexus-void rounded-full border-[2px] border-slate-200 text-[1.125rem] font-bold shadow-lg transition-all duration-300 hover:border-clinical-blue hover:bg-white magnetic-cta gap-3 hover:-translate-y-1 active:scale-95"
            >
              <svg className="w-5 h-5 text-clinical-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Ver Resultados
            </a>
          </div>
          
          <div className="mt-[3rem] flex items-center gap-[8px] text-gray-500">
            <div className="flex items-center gap-1" aria-label="Calificación de 4.9 sobre 5 estrellas">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-[#F59E0B]" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-[0.85rem] font-bold text-gray-700">
              <span className="text-[var(--nexus-void)]">4.9/5</span> basado en 5,000+ diagnósticos en Puente Piedra y Lima Norte
            </p>
          </div>
        </div>

        <div className="relative group order-1 lg:order-2 h-[400px] md:h-[500px] lg:h-[600px] w-full perspective-1000">
            <div className="absolute -inset-4 bg-gradient-to-tr from-clinical-blue/20 to-cyan-pulse/20 rounded-[3.5rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            <div className="relative h-full z-10 bg-white/60 backdrop-blur-2xl p-[1rem] rounded-[32px] shadow-premium overflow-hidden transition-all duration-700 transform group-hover:scale-[1.02] border-[1px] border-white/80">
                <HeroCarousel />
            </div>

        </div>
      </div>
    </section>
  );
}
