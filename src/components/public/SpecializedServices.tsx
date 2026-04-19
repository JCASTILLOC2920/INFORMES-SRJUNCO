import React from 'react';

const services = [
  {
    title: 'Citología y Papanicolaou en Lima Norte',
    description: 'Despistaje preventivo de cáncer cervical con tecnología avanzada en Puente Piedra. Papanicolaou, citología de aspiración y líquidos corporales con citotécnicos de alto nivel.',
    icon: '🔬'
  },
  {
    title: 'Biopsias y Estudios Histopatológicos',
    description: 'Análisis detallado de tejidos para diagnósticos oncológicos en Lima Norte. Biopsias gástricas, de próstata, piel y cervix con reporte histopatológico en 72 horas.',
    icon: '🧬'
  },
  {
    title: 'Inmunohistoquímica Especializada',
    description: 'Determinación de marcadores moleculares para caracterización tumoral avanzada en Lima. Paneles completos de IHQ para diagnóstico oncológico de precisión.',
    icon: '🧪'
  }
];


export default function SpecializedServices() {
  return (
    <section className="bg-gradient-to-b from-premium-silver to-white py-[80px] relative overflow-hidden">
      {/* Soft background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-cyan-pulse/5 to-transparent blur-[100px] pointer-events-none"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px] max-w-[1600px] mx-auto px-[24px] relative z-10">
        {services.map((service, index) => (
          <div 
            key={index}
            className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-[24px] p-[32px] shadow-elite transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-premium group cursor-default"
          >
            <div className="text-[2.5rem] mb-6 group-hover:scale-110 transition-transform duration-500 drop-shadow-md">
              {service.icon}
            </div>
            <h3 className="text-[1.35rem] font-bold text-nexus-void mb-4 leading-tight uppercase tracking-tight font-outfit">
              {service.title}
            </h3>
            <p className="text-slate-600 text-[1rem] leading-relaxed font-medium">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
