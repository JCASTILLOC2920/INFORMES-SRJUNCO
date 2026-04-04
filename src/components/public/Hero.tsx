import Image from 'next/image';
import React from 'react';
import HeroCarousel from './HeroCarousel';



export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-[95vh] flex items-center pt-[11.5rem] pb-[4rem] overflow-hidden bg-white">
      {/* Nexus Background Grid - Optimized O(1) impact */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--secondary) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Dynamic Aura Accents */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-gradient-to-br from-[var(--secondary)] to-[var(--cyan-pulse)] rounded-full blur-[120px] opacity-[0.07] -z-10 animate-pulse-aura"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[50%] bg-[var(--primary)] rounded-full blur-[100px] opacity-[0.05] -z-10"></div>

      <div className="max-w-[1700px] mx-auto px-[1.5rem] z-10 grid lg:grid-cols-[1.2fr_1fr] gap-[64px] items-center">
        <div className="max-w-[42rem] order-2 lg:order-1 stagger-reveal">
          <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] font-black text-[#1e293b] leading-[1.1] mb-[1.5rem] tracking-tighter">
            <span className="text-gradient block">Patología de Precisión</span>
            <span className="relative inline-block mt-2">
              en Lima Norte
              <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-[var(--cyan-pulse)] rounded-full opacity-50"></div>
            </span>
          </h1>
          <p className="text-[18px] text-[#1F2937] mb-[2.5rem] max-w-[34rem] leading-relaxed font-medium border-l-4 border-[var(--secondary)]/20 pl-6">
            Diagnóstico especializado en Biopsias, Citología e Inmunohistoquímica con tecnología de punta en Puente Piedra, Lima Norte. Resultados rápidos en 3-4 días.
          </p>
          <a 
            href="#contacto" 
            className="inline-block mt-[32px] px-[32px] py-[16px] bg-[#001F3F] text-[#FFFFFF] rounded-[6px] border-none text-[1.125rem] font-[600] cursor-pointer shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            Agendar Examen Ahora
          </a>
          
          <div className="mt-[3rem] flex items-center gap-[8px] text-gray-500">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-[#F59E0B]" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-[0.85rem] font-bold text-gray-700">
              <span className="text-[var(--nexus-void)]">4.9/5</span> basado en 5,000+ diagnósticos en Puente Piedra
            </p>
          </div>
        </div>

        <div className="relative group order-1 lg:order-2 h-[400px] md:h-[500px] lg:h-[600px] w-full">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--secondary)]/10 to-[var(--cyan-pulse)]/10 rounded-[3.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            <div className="relative h-full z-10 bg-white p-[1rem] rounded-[24px] elite-shadow overflow-hidden transition-all duration-700 transform group-hover:scale-[1.02] border-[1px] border-white/50"
                 style={{ boxShadow: '0 20px 25px -5px rgba(0, 31, 63, 0.05), 0 8px 10px -6px rgba(0, 31, 63, 0.01)' }}>
                <HeroCarousel />
            </div>

            <div className="absolute -bottom-[20px] -left-[20px] z-20 p-4 md:p-6 rounded-2xl animate-float scale-90 md:scale-100 origin-bottom-left"
                 style={{ 
                   background: 'rgba(255, 255, 255, 0.85)', 
                   backdropFilter: 'blur(12px)', 
                   border: '1px solid rgba(255, 255, 255, 0.3)' 
                 }}>
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--secondary)] flex items-center justify-center text-white shadow-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                        <p className="text-[0.7rem] uppercase tracking-tighter font-black text-[var(--secondary)]">Precisión Certificada</p>
                        <p className="text-[1.1rem] font-black text-[var(--nexus-void)]">ISO 9001:2015</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
