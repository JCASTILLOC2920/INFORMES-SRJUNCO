export default function WhyUs() {
  const features = [
    {
      title: "Precisión Diagnóstica",
      description: "Resultados validados por expertos con años de trayectoria clínica.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Entrega Rápida",
      description: "Flujos de trabajo optimizados para reducir el tiempo de espera del paciente.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Tecnología de Punta",
      description: "Equipamiento automatizado para máxima precisión en cada estudio.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="bg-clinical-blue-deep rounded-[40px] p-12 text-white relative overflow-hidden">
             <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-6 italic">Comprometidos con la excelencia diagnóstica.</h2>
                <p className="text-clinical-blue-light text-lg mb-8 opacity-90 leading-relaxed">
                  En JC PATH LAB, cada muestra es una vida. Por eso aplicamos los más altos estándares internacionales en cada proceso anatomopatológico.
                </p>
                <button className="bg-white text-clinical-blue-deep px-8 py-4 rounded-xl font-bold hover:bg-clinical-blue-light transition-all">
                  Nuestro Centro
                </button>
             </div>
             {/* Decorative element */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-clinical-blue opacity-10 rounded-full translate-x-20 -translate-y-20"></div>
          </div>
          
          <div className="space-y-12">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-14 h-14 bg-clinical-blue-light text-clinical-blue rounded-2xl flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
