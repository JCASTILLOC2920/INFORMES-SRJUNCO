import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center pt-[7rem] pb-[4rem] overflow-hidden bg-white">
      {/* Sutil background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full -z-10 opacity-[0.05] pointer-events-none">
        <svg className="w-full h-full text-[#008de3]" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 100 C 20 0 50 0 100 100 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-[1.5rem] z-10 grid lg:grid-cols-2 gap-[4rem] items-center">
        <div className="max-w-[40rem] order-2 lg:order-1 animate-reveal">
          <h1 className="text-[3rem] md:text-[4.5rem] font-black text-[#1e293b] leading-[1.1] mb-[1.5rem] tracking-tighter">
            <span className="text-gradient block">JC PATH LAB</span>
            <span>Patología de Precisión</span>
          </h1>
          <p className="text-[1.1rem] text-gray-600 mb-[2.5rem] max-w-[32rem] leading-relaxed font-medium">
            Diagnóstico especializado en Biopsias, Citología e Inmunohistoquímica con tecnología de punta en Puente Piedra, Lima Norte. Resultados rápidos en 3-4 días.
          </p>
          
          {/* Hero Action Buttons removed as requested */}

          <div className="mt-[3rem] flex items-center space-x-[1.5rem] text-gray-400">
            <div className="flex -space-x-[0.75rem]">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-[2.5rem] h-[2.5rem] rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-[0.65rem] font-bold uppercase tracking-widest leading-loose">
                Confianza médica de élite <br/> 
                <span className="text-[#008de3]">+5,000 diagnósticos precisos</span>
            </p>
          </div>
        </div>

        <div className="relative group p-[1rem] order-1 lg:order-2">
          <div className="absolute inset-0 bg-[#008de3]/5 rounded-[3rem] -rotate-3 transition-transform group-hover:rotate-0 duration-700"></div>
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 transform group-hover:scale-[1.01] border-[0.75rem] border-white">
            <Image 
              src="/doctor.png" 
              alt="Dr. Josehp Castillo Cuenca" 
              width={800} 
              height={600} 
              className="w-full h-auto aspect-[4/3] object-cover"
              priority
            />
          </div>
          {/* Artistic accents (Relative units) */}
          <div className="absolute -top-[1.5rem] -left-[1.5rem] w-[6rem] h-[6rem] bg-[#e1f2ff] rounded-full -z-10 mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute -bottom-[2.5rem] -right-[2.5rem] w-[12rem] h-[12rem] bg-[#003d63]/10 rounded-full -z-10 filter blur-3xl"></div>
        </div>
      </div>
    </section>
  );
}
