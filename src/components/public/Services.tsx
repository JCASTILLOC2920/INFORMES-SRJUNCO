import Link from 'next/link';

export default function Services() {
  const specialties = [
    {
      title: "Biopsias Especializadas",
      description: "Diagnóstico histopatológico de alta precisión (Gástricas, Próstata, Cervix, Piel). Resultados rápidos y precisos.",
      price: "Desde S/ 80",
      icon: (
        <svg className="w-[2.5rem] h-[2.5rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: "Citología y Papanicolaou",
      description: "Despistaje preventivo con tecnología avanzada. Papanicolaou, Citología de aspiración y líquidos corporales.",
      price: "Desde S/ 20",
      icon: (
        <svg className="w-[2.5rem] h-[2.5rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      title: "Inmunohistoquímica",
      description: "Paneles completos de marcadores específicos para caracterización definitiva de tumores complejos.",
      price: "Consultar panel",
      icon: (
        <svg className="w-[2.5rem] h-[2.5rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    }
  ];

  return (
    <section id="servicios" className="py-[6rem] bg-[#f8fafc]">
      <div className="container mx-auto px-[1rem]">
        <div className="text-center mb-[5rem]">
          <p className="text-[#008de3] font-black text-[0.65rem] uppercase tracking-[0.4em] mb-[1rem]">Excelencia Diagnóstica</p>
          <h2 className="text-[2.5rem] md:text-[3rem] font-black text-[#003d63] mb-[1.5rem] tracking-tighter leading-tight italic">Servicios de Alta Complejidad</h2>
          <div className="w-[6rem] h-[0.25rem] bg-[#008de3] mx-auto rounded-full opacity-20"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2.5rem]">
          {specialties.map((item, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-xl p-[3rem] rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-white/50 hover:shadow-[0_20px_60px_rgba(0,141,227,0.08)] transition-all duration-500 group hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[8rem] h-[8rem] bg-[#008de3]/5 rounded-full -mr-[4rem] -mt-[4rem] group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="w-[5rem] h-[5rem] bg-blue-50 text-[#008de3] rounded-[1.5rem] flex items-center justify-center mb-[2.5rem] group-hover:bg-[#008de3] group-hover:text-white transition-all duration-500 shadow-inner">
                {item.icon}
              </div>
              <h3 className="text-[1.25rem] font-black text-[#003d63] mb-[1rem] tracking-tight">{item.title}</h3>
              <p className="text-gray-500 text-[0.85rem] leading-relaxed mb-[2rem] font-medium">
                {item.description}
              </p>
              <div className="flex items-center justify-between mt-auto pt-[1.5rem] border-t border-gray-50">
                <div className="text-[#008de3] font-black text-[1.25rem] tracking-tighter cursor-default">
                  {item.price}
                </div>
                <Link href="/admin/reports/new" className="w-[3rem] h-[3rem] bg-gray-50 rounded-full flex items-center justify-center hover:bg-[#008de3] hover:text-white transition-all duration-300">
                    <svg className="w-[1.25rem] h-[1.25rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
