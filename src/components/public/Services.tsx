import Link from 'next/link';
import React from 'react';
import { SPECIALTIES } from '@/data/publicContent';

const ServiceCard = React.memo(({ item }: { item: typeof SPECIALTIES[0] }) => (
  <div className="bg-white/80 backdrop-blur-xl border border-slate-100 p-[2rem] md:p-[3rem] rounded-[2.5rem] shadow-elite hover:shadow-premium transition-all duration-700 group hover:-translate-y-3 relative overflow-hidden flex flex-col h-full">
    <div className="absolute top-0 right-0 w-[12rem] h-[12rem] bg-gradient-to-br from-clinical-blue-light to-transparent rounded-full -mr-[5rem] -mt-[5rem] group-hover:scale-150 transition-transform duration-1000 opacity-60"></div>
    
    <div className="w-[5.5rem] h-[5.5rem] bg-premium-silver text-clinical-blue rounded-[1.8rem] flex items-center justify-center mb-[2.5rem] group-hover:bg-clinical-blue group-hover:text-white transition-all duration-700 shadow-md border border-slate-100 p-4 drop-shadow-sm">
      <div className="transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
        {item.icon}
      </div>
    </div>
    
    <h3 className="text-[1.4rem] font-black text-nexus-void mb-[1rem] tracking-tight font-outfit">{item.title}</h3>
    <p className="text-slate-600 text-[1rem] leading-relaxed mb-[2.5rem] font-medium opacity-85 group-hover:opacity-100 transition-opacity">
      {item.description}
    </p>
    
    <div className="flex items-center justify-between mt-auto pt-[2rem] border-t border-slate-100/50">
      <div className="flex flex-col">
          <span className="text-[0.7rem] font-black uppercase tracking-[0.2em] text-clinical-blue opacity-80">Inversión Médica</span>
          <div className="text-nexus-void font-black text-[1.4rem] tracking-tighter cursor-default mt-1">
              {item.price}
          </div>
      </div>
      <Link href="/login" className="w-[3.5rem] h-[3.5rem] bg-nexus-void text-white rounded-2xl flex items-center justify-center hover:bg-clinical-blue hover:shadow-glow-blue transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110">
          <svg className="w-[1.5rem] h-[1.5rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
      </Link>
    </div>
  </div>
));

ServiceCard.displayName = 'ServiceCard';

export default function Services() {
  return (
    <section id="servicios" className="py-[10rem] bg-white relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/4 w-[25rem] h-[25rem] bg-clinical-blue-light/50 rounded-full blur-[140px] -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-[35rem] h-[35rem] bg-cyan-pulse/10 rounded-full blur-[160px] -z-10"></div>

      <div className="max-w-[1700px] mx-auto px-[1.5rem]">
        <div className="text-center mb-[6rem] animate-reveal">
          <span className="text-clinical-blue font-black text-[0.8rem] uppercase tracking-[0.5em] mb-[1.5rem] block drop-shadow-sm">Excelencia Diagnóstica en Lima Norte</span>
          <h2 className="text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] font-black text-nexus-void mb-[1.5rem] tracking-tighter leading-tight font-outfit">
            Servicios de <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexus-void to-clinical-blue">Alta Complejidad</span> en Puente Piedra
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-[1.1rem] leading-relaxed font-medium">
            Laboratorio de anatomía patológica líder en Lima Norte. Atendemos pacientes de Puente Piedra, Comas, Los Olivos y Carabayllo con los más altos estándares de diagnóstico médico.
          </p>
          <div className="w-[10rem] h-[0.4rem] bg-gradient-to-r from-transparent via-cyan-pulse to-transparent mx-auto rounded-full opacity-60 mt-8 shadow-glow-cyan"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3rem] stagger-reveal">
          {SPECIALTIES.map((item) => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
