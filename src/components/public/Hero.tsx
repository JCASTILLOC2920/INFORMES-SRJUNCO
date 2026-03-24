import Image from 'next/image';

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      {/* Sutil background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full -z-10 opacity-10">
        <svg className="w-full h-full text-clinical-blue" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 100 C 20 0 50 0 100 100 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-clinical-blue uppercase bg-clinical-blue-light rounded-full">
            Excelencia en Diagnóstico
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            <span className="text-clinical-blue-deep">Laboratorio de Anatomía</span> <br /> 
            <span className="text-clinical-blue">Patológica Especializada</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
            Ofrecemos diagnósticos de alta precisión con tecnología de vanguardia y un equipo de expertos comprometidos con la salud y la rapidez en los resultados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-clinical-blue-deep text-white px-8 py-4 rounded-xl font-bold text-base shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95">
              Solicitar Estudio
            </button>
            <button className="bg-white text-clinical-blue-deep border-2 border-clinical-blue-deep px-8 py-4 rounded-xl font-bold text-base hover:bg-clinical-blue-light transition-all">
              Ver Servicios
            </button>
          </div>
        </div>
        <div className="relative group perspective">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 transform group-hover:rotate-y-3 group-hover:scale-105 border-8 border-white">
                {/* Image Placeholder - In real use, an image would be here */}
                <div className="w-full aspect-[4/3] bg-gradient-to-br from-clinical-blue-light to-clinical-blue flex items-center justify-center p-8">
                     <svg className="w-32 h-32 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                     </svg>
                </div>
            </div>
            {/* Artistic accents */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-clinical-blue-light rounded-full -z-10 mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-clinical-blue rounded-full -z-10 opacity-20 filter blur-3xl"></div>
        </div>
      </div>
    </section>
  );
}
