import React from 'react';
import { FEATURES } from '@/data/publicContent';

const FeatureItem = React.memo(({ feature }: { feature: typeof FEATURES[0] }) => (
  <div className="flex items-start space-x-[2.5rem] group">
    <div className="flex-shrink-0 w-[5rem] h-[5rem] bg-[var(--accent)] text-[var(--secondary)] rounded-[2rem] flex items-center justify-center shadow-xl border border-[var(--secondary)]/5 group-hover:bg-[var(--secondary)] group-hover:text-white transition-all duration-700 transform group-hover:rotate-[15deg]">
      {feature.icon}
    </div>
    <div className="pt-2">
      <h3 className="text-[1.5rem] font-black text-[var(--nexus-void)] mb-[0.75rem] tracking-tight group-hover:text-[var(--secondary)] transition-colors duration-500">{feature.title}</h3>
      <p className="text-gray-500 text-[1rem] leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-500">{feature.description}</p>
    </div>
  </div>
));

FeatureItem.displayName = 'FeatureItem';

export default function WhyUs() {
  return (
    <section id="nosotros" className="py-[10rem] bg-white overflow-hidden relative">
      {/* Background Decorative Grid - O(1) impact */}
      <div className="absolute inset-0 -z-10 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(var(--secondary) 1px, transparent 1px), linear-gradient(90deg, var(--secondary) 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
      </div>

      <div className="container mx-auto px-[1.5rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[6rem] items-center">
          <div className="bg-[var(--nexus-void)] rounded-[3.5rem] p-[2rem] sm:p-[5rem] text-white relative overflow-hidden shadow-[0_40px_100px_rgba(0,27,46,0.3)] group transition-all duration-1000 animate-reveal">
             <div className="relative z-10">
                <span className="text-[var(--cyan-pulse)] font-black text-[0.7rem] uppercase tracking-[0.5em] mb-[1.5rem] block">Misión de Precisión</span>
                <h2 className="text-[2.2rem] md:text-[3.5rem] font-black mb-[2rem] leading-[1.1] tracking-tighter italic">Comprometidos con la <span className="text-[var(--secondary)]">excelencia</span> diagnóstica.</h2>
                <p className="text-blue-100/60 text-[1.15rem] mb-[3.5rem] leading-relaxed font-medium border-l-2 border-[var(--cyan-pulse)]/30 pl-8">
                  En JC PATH LAB, entendemos que cada muestra representa una vida. Nuestra ingeniería diagnóstica sigue los más rigurosos estándares globales para garantizar la máxima exactitud.
                </p>
                <button className="bg-[var(--secondary)] text-white px-[3rem] py-[1.2rem] rounded-2xl font-black text-[0.75rem] uppercase tracking-[0.2em] shadow-xl hover:shadow-[0_0_30px_rgba(0,141,227,0.4)] transition-all transform hover:-translate-y-1 active:scale-95 group-hover:scale-105 border border-white/10">
                  Nuestro Centro
                </button>
             </div>
             {/* Elite decorative accents */}
             <div className="absolute top-0 right-0 w-[25rem] h-[25rem] bg-[var(--cyan-pulse)] opacity-5 rounded-full translate-x-[10rem] -translate-y-[10rem] blur-[120px] group-hover:opacity-20 transition-opacity duration-1000 animate-pulse-aura"></div>
             <div className="absolute -bottom-[8rem] -left-[8rem] w-[20rem] h-[20rem] bg-[var(--secondary)] opacity-10 rounded-full blur-[100px]"></div>
          </div>
          
          <div className="space-y-[4rem] px-[1rem] sm:px-[0rem] stagger-reveal">
            {FEATURES.map((feature) => (
              <FeatureItem key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
