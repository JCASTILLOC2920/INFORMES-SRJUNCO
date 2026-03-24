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
            Dr. Josehp Castillo Cuenca • CMP 56435 • RNE 29091
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tighter">
            <span className="text-clinical-blue-deep block">JC PATH LAB</span>
            <span className="text-clinical-blue">Patología de Precisión</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed font-medium">
            Diagnóstico especializado en Biopsias, Citología e Inmunohistoquímica con tecnología de punta en Puente Piedra, Lima Norte. Resultados rápidos en 3-4 días.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/login" className="bg-clinical-blue-deep text-white px-8 py-4 rounded-xl font-bold text-base shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 text-center">
              ENTREGA DE RESULTADOS
            </Link>
            <Link href="#servicios" className="bg-white text-clinical-blue-deep border-2 border-clinical-blue-deep px-8 py-4 rounded-xl font-bold text-base hover:bg-clinical-blue-light transition-all text-center">
              Ver Servicios
            </Link>
          </div>
        </div>
        <div className="relative group perspective">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 transform group-hover:rotate-y-3 group-hover:scale-105 border-8 border-white">
                <Image 
                    src="/doctor.png" 
                    alt="Dr. Josehp Castillo Cuenca" 
                    width={800} 
                    height={600} 
                    className="w-full aspect-[4/3] object-cover"
                />
            </div>
            {/* Artistic accents */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-clinical-blue-light rounded-full -z-10 mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-clinical-blue rounded-full -z-10 opacity-20 filter blur-3xl"></div>
        </div>
      </div>
    </section>
  );
}
