export default function Services() {
  const specialties = [
    {
      title: "Biopsias Especializadas",
      description: "Diagnóstico histopatológico de alta precisión (Gástricas, Próstata, Cervix, Piel). Resultados rápidos y precisos.",
      price: "Desde S/ 80",
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: "Citología y Papanicolaou",
      description: "Despistaje preventivo con tecnología avanzada. Papanicolaou, Citología de aspiración y líquidos corporales.",
      price: "Desde S/ 20",
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      title: "Inmunohistoquímica",
      description: "Paneles completos de marcadores específicos para caracterización definitiva de tumores complejos.",
      price: "Consultar panel",
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    }
  ];

  return (
    <section id="servicios" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestras Especialidades</h2>
          <div className="w-20 h-1.5 bg-clinical-blue mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {specialties.map((item, index) => (
            <div key={index} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group hover:-translate-y-2">
              <div className="w-16 h-16 bg-clinical-blue-light text-clinical-blue rounded-2xl flex items-center justify-center mb-8 group-hover:bg-clinical-blue group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                {item.description}
              </p>
              <div className="text-clinical-blue-deep font-black text-2xl mb-6">
                {item.price}
              </div>
              <Link href="#" className="text-clinical-blue font-semibold inline-flex items-center hover:translate-x-1 transition-transform">
                Leer más 
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
