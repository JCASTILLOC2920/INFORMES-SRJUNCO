export default function WhyUs() {
  const features = [
    {
      title: "Trayectoria Comprobada",
      description: "+15 años de experiencia liderando diagnósticos oncológicos de alta complejidad.",
      icon: (
        <svg className="w-[1.5rem] h-[1.5rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Volumen Diagnóstico",
      description: "+50,000 estudios realizados con 100% de confianza médica en todo el Perú.",
      icon: (
        <svg className="w-[1.5rem] h-[1.5rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Rapidez y Eficiencia",
      description: "Resultados en 3-4 días hábiles, guía fundamental para el inicio de tratamiento.",
      icon: (
        <svg className="w-[1.5rem] h-[1.5rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-[8rem] bg-white overflow-hidden">
      <div className="container mx-auto px-[1rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[5rem] items-center">
          <div className="bg-[#003d63] rounded-[3rem] p-[3rem] sm:p-[4rem] text-white relative overflow-hidden shadow-[0_30px_70px_rgba(0,61,99,0.2)] group transition-all duration-700">
             <div className="relative z-10">
                <p className="text-[#008de3] font-black text-[0.65rem] uppercase tracking-[0.4em] mb-[1.5rem]">Misión de Precisión</p>
                <h2 className="text-[2.5rem] md:text-[3rem] font-black mb-[2rem] leading-tight tracking-tighter italic">Comprometidos con la excelencia diagnóstica.</h2>
                <p className="text-blue-100/70 text-[1.125rem] mb-[3rem] leading-relaxed font-medium">
                  En JC PATH LAB, entendemos que cada muestra representa una vida. Nuestra ingeniería diagnóstica sigue los más rigurosos estándares globales para garantizar la máxima exactitud.
                </p>
                <button className="bg-[#008de3] text-white px-[2.5rem] py-[1rem] rounded-full font-black text-[0.7rem] uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 group-hover:scale-105">
                  Nuestro Centro
                </button>
             </div>
             {/* Elite decorative accents */}
             <div className="absolute top-0 right-0 w-[20rem] h-[20rem] bg-blue-400 opacity-5 rounded-full translate-x-[5rem] -translate-y-[5rem] blur-3xl group-hover:opacity-10 transition-opacity"></div>
             <div className="absolute -bottom-[5rem] -left-[5rem] w-[15rem] h-[15rem] bg-[#008de3] opacity-10 rounded-full blur-2xl"></div>
          </div>
          
          <div className="space-y-[3.5rem] px-[1rem] sm:px-[0rem]">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-[2rem] group decoration-none">
                <div className="flex-shrink-0 w-[4rem] h-[4rem] bg-[#f0f9ff] text-[#008de3] rounded-[1.25rem] flex items-center justify-center shadow-inner group-hover:bg-[#008de3] group-hover:text-white transition-all duration-500">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-[1.25rem] font-black text-[#003d63] mb-[0.75rem] tracking-tight group-hover:text-[#008de3] transition-colors">{feature.title}</h3>
                  <p className="text-gray-500 text-[0.85rem] leading-relaxed font-medium">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
