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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexus-void to-clinical-blue block drop-shadow-sm">Sistema Nacional</span>
            <span className="relative inline-block mt-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-clinical-blue to-cyan-pulse">de Anatomía Patológica</span>
              <div className="absolute -bottom-3 left-0 w-full h-[6px] bg-cyan-pulse rounded-full opacity-60 shadow-glow-cyan"></div>
            </span>
          </h1>
          <p className="text-[1.15rem] md:text-[1.25rem] text-slate-700 mb-[2.5rem] max-w-[38rem] leading-relaxed font-medium border-l-[5px] border-cyan-pulse/40 pl-6 bg-gradient-to-r from-slate-50 to-transparent py-2 rounded-r-xl">
            Diagnóstico de alta complejidad para <strong className="text-nexus-void font-bold">Todo el Perú</strong>. Procesamos Biopsias, Citología e IHQ con recojo prioritario en provincias y resultados certificados en <strong className="text-clinical-blue font-bold">72-96 Horas</strong>.
          </p>
          <div className="mt-[32px] flex flex-wrap gap-[1rem]">
            <a 
              href="https://wa.me/51986396733?text=Hola+Dr.+Castillo,+deseo+consultar+sobre+un+analisis+nacional" 
              className="inline-flex items-center justify-center px-[42px] py-[20px] bg-nexus-void text-white rounded-full border-none text-[1.125rem] font-black shadow-glow-blue transition-all duration-300 hover:bg-clinical-blue magnetic-cta uppercase tracking-[0.2em] hover:-translate-y-1 active:scale-95 group relative overflow-hidden"
            >
              <span className="relative z-10">Hablar con el Dr. Castillo (Urgente)</span>
              <div className="absolute inset-0 bg-clinical-blue translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
            <a 
              href="/login" 
              className="inline-flex items-center justify-center px-[36px] py-[18px] bg-white text-nexus-void rounded-full border-[1.5px] border-slate-200 text-[1rem] font-bold shadow-lg transition-all duration-300 hover:border-clinical-blue magnetic-cta gap-3 hover:-translate-y-1 active:scale-95"
            >
              Portal Resultados
            </a>
          </div>
          
          <div className="mt-[3rem] flex flex-wrap items-center gap-[24px]">
            <div className="flex items-center gap-[8px] text-gray-500">
              <div className="flex items-center gap-1" aria-label="Calificación de 4.9 sobre 5 estrellas">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-[#F59E0B]" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[0.75rem] font-bold text-gray-700 uppercase tracking-tighter">
                <span className="text-[var(--nexus-void)]">4.9/5</span> Confianza Nacional
              </p>
            </div>
            
            <div className="flex items-center gap-6 border-l border-slate-200 pl-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-[10px]">🔒</div>
                    <span className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest">SSL Seguro</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[10px]">⚖️</div>
                    <span className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest">CMP Certificado</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-[10px]">🔬</div>
                    <span className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest">Precisión Titán</span>
                </div>
            </div>
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
