import Link from 'next/link';
import React from 'react';
import { SPECIALTIES } from '@/data/publicContent';

const ServiceCard = React.memo(({ item }: { item: typeof SPECIALTIES[0] }) => (
  <div className="glow-card nexus-border p-[2rem] md:p-[3rem] rounded-[2.5rem] hover:shadow-[0_25px_70px_rgba(0,141,227,0.12)] transition-all duration-700 group hover:-translate-y-3 relative overflow-hidden flex flex-col h-full">
    <div className="absolute top-0 right-0 w-[10rem] h-[10rem] bg-gradient-to-br from-[var(--secondary)]/10 to-transparent rounded-full -mr-[5rem] -mt-[5rem] group-hover:scale-150 transition-transform duration-1000"></div>
    
    <div className="w-[5.5rem] h-[5.5rem] bg-white text-[var(--secondary)] rounded-[1.8rem] flex items-center justify-center mb-[2.5rem] group-hover:bg-[var(--secondary)] group-hover:text-white transition-all duration-700 shadow-xl border border-[var(--secondary)]/10 p-4">
      <div className="transition-transform duration-700 group-hover:scale-110">
        {item.icon}
      </div>
    </div>
    
    <h3 className="text-[1.4rem] font-black text-[var(--nexus-void)] mb-[1rem] tracking-tight">{item.title}</h3>
    <p className="text-gray-500 text-[0.95rem] leading-relaxed mb-[2.5rem] font-medium opacity-80 group-hover:opacity-100 transition-opacity">
      {item.description}
    </p>
    
    <div className="flex items-center justify-between mt-auto pt-[2rem] border-t border-[var(--secondary)]/10">
      <div className="flex flex-col">
          <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-[var(--secondary)] opacity-60">Inversión Médica</span>
          <div className="text-[var(--nexus-void)] font-black text-[1.4rem] tracking-tighter cursor-default mt-1">
              {item.price}
          </div>
      </div>
      <Link href="/admin/reports/new" className="w-[3.5rem] h-[3.5rem] bg-[var(--nexus-void)] text-white rounded-2xl flex items-center justify-center hover:bg-[var(--secondary)] hover:shadow-lg transition-all duration-500 transform hover:rotate-12">
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
      <div className="absolute top-0 left-1/4 w-[20rem] h-[20rem] bg-[var(--secondary)]/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-[var(--cyan-pulse)]/5 rounded-full blur-[120px] -z-10"></div>

      <div className="container mx-auto px-[1.5rem]">
        <div className="text-center mb-[6rem] animate-reveal">
          <span className="text-[var(--secondary)] font-black text-[0.7rem] uppercase tracking-[0.5em] mb-[1.5rem] block">Excelencia Diagnóstica</span>
          <h2 className="text-[2.2rem] sm:text-[3rem] md:text-[4.2rem] font-black text-[var(--nexus-void)] mb-[1.5rem] tracking-tighter leading-none italic">
            Servicios de <span className="text-gradient">Alta Complejidad</span>
          </h2>
          <div className="w-[8rem] h-[0.3rem] bg-gradient-to-r from-transparent via-[var(--cyan-pulse)] to-transparent mx-auto rounded-full opacity-40"></div>
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
