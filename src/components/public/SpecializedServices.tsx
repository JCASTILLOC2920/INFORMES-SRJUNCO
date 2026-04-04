import React from 'react';

const services = [
  {
    title: 'Citología y Papanicolaou',
    description: 'Diagnóstico precoz de lesiones cervicales y estudios citológicos especializados con citotécnicos de alto nivel.',
    icon: '🔬'
  },
  {
    title: 'Biopsias y Estudios Histopatológicos',
    description: 'Análisis detallado de tejidos para diagnósticos oncológicos y patología general con reporte en 72 horas.',
    icon: '🧬'
  },
  {
    title: 'Inmunohistoquímica Especializada',
    description: 'Determinación de marcadores moleculares para caracterización tumoral avanzada y medicina de precisión.',
    icon: '🧪'
  }
];

export default function SpecializedServices() {
  return (
    <section className="bg-transparent">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] max-w-[1600px] mx-auto px-[20px] py-[64px]">
        {services.map((service, index) => (
          <div 
            key={index}
            className="bg-white border border-[#E2E8F0] rounded-[12px] p-[24px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] transition-all duration-200 ease-in-out hover:-translate-y-[4px] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] group cursor-default"
          >
            <div className="text-[2rem] mb-4 group-hover:scale-110 transition-transform duration-300">
              {service.icon}
            </div>
            <h3 className="text-[1.25rem] font-black text-[#1e293b] mb-3 leading-tight uppercase tracking-tight">
              {service.title}
            </h3>
            <p className="text-gray-600 text-[0.95rem] leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
