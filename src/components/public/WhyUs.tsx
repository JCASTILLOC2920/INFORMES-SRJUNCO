import React from 'react';
import { FEATURES } from '@/data/publicContent';

const FeatureItem = React.memo(({ feature }: { feature: typeof FEATURES[0] }) => (
  <div className="flex items-start space-x-[2.5rem] group bg-white/50 backdrop-blur-md p-6 rounded-3xl hover:bg-white transition-all duration-500 hover:shadow-premium border border-transparent hover:border-slate-100">
    <div className="flex-shrink-0 w-[5.5rem] h-[5.5rem] bg-clinical-blue-light text-clinical-blue rounded-[2.2rem] flex items-center justify-center shadow-md border border-slate-100 group-hover:bg-clinical-blue group-hover:text-white transition-all duration-700 transform group-hover:rotate-[15deg] group-hover:scale-110 drop-shadow-sm">
      <div className="transition-transform duration-500 group-hover:scale-110 text-3xl">
        {feature.icon}
      </div>
    </div>
    <div className="pt-2">
      <h3 className="text-[1.35rem] font-black text-nexus-void mb-[0.75rem] tracking-tight group-hover:text-clinical-blue transition-colors duration-500 font-outfit">{feature.title}</h3>
      <p className="text-slate-600 text-[1rem] leading-relaxed font-medium opacity-85 group-hover:opacity-100 transition-opacity duration-500">{feature.description}</p>
    </div>
  </div>
));

FeatureItem.displayName = 'FeatureItem';

export default function WhyUs() {
  return (
    <section id="nosotros" className="py-[10rem] bg-gradient-to-b from-white to-premium-silver overflow-hidden relative perspective-1000">
      {/* Background Decorative Grid - O(1) impact */}
      <div className="absolute inset-0 -z-10 opacity-[0.04] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(var(--color-clinical-blue) 1.5px, transparent 1.5px), linear-gradient(90deg, var(--color-clinical-blue) 1.5px, transparent 1.5px)', backgroundSize: '70px 70px' }}>
      </div>

      <div className="max-w-[1700px] mx-auto px-[1.5rem] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[6rem] items-center">
          <div className="bg-nexus-void rounded-[3.5rem] p-[2rem] sm:p-[5rem] text-white relative overflow-hidden shadow-elite group transition-all duration-1000 animate-reveal border border-white/10 hover:shadow-glow-cyan transform hover:scale-[1.01]">
             <div className="relative z-10">
                <span className="text-cyan-pulse font-black text-[0.8rem] uppercase tracking-[0.5em] mb-[1.5rem] block drop-shadow-sm">Misión de Precisión</span>
                <h2 className="text-[2.2rem] md:text-[3.5rem] font-black mb-[2rem] leading-[1.1] tracking-tighter font-outfit">Comprometidos con la <span className="text-transparent bg-clip-text bg-gradient-to-r from-clinical-blue to-cyan-pulse italic">excelencia</span> diagnóstica.</h2>
                <p className="text-blue-100/70 text-[1.15rem] mb-[3.5rem] leading-relaxed font-medium border-l-[3px] border-cyan-pulse/60 pl-8 bg-gradient-to-r from-white/5 to-transparent py-3 pr-4 rounded-r-xl">
                  En JC PATH LAB, entendemos que cada muestra representa una vida. Nuestra ingeniería diagnóstica sigue los más rigurosos estándares globales para garantizar la máxima exactitud.
                </p>
                <button className="bg-clinical-blue text-white px-[3rem] py-[1.2rem] rounded-full font-black text-[0.8rem] uppercase tracking-[0.2em] shadow-premium hover:shadow-glow-cyan transition-all duration-500 transform hover:-translate-y-1 active:scale-95 border border-white/20 magnetic-cta overflow-hidden relative">
                  <span className="relative z-10">Nuestro Centro</span>
                </button>
             </div>
             {/* Elite decorative accents */}
             <div className="absolute top-0 right-0 w-[25rem] h-[25rem] bg-cyan-pulse opacity-[0.07] rounded-full translate-x-[10rem] -translate-y-[10rem] blur-[120px] group-hover:opacity-[0.15] transition-opacity duration-1000 animate-pulse-aura"></div>
             <div className="absolute -bottom-[8rem] -left-[8rem] w-[20rem] h-[20rem] bg-clinical-blue opacity-[0.12] rounded-full blur-[100px]"></div>
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
