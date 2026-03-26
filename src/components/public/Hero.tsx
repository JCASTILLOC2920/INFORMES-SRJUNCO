import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-[95vh] flex items-center pt-[7rem] pb-[4rem] overflow-hidden bg-white">
      {/* Nexus Background Grid */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--secondary) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Dynamic Aura Accents */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-gradient-to-br from-[var(--secondary)] to-[var(--cyan-pulse)] rounded-full blur-[120px] opacity-[0.07] -z-10 animate-pulse-aura"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[50%] bg-[var(--primary)] rounded-full blur-[100px] opacity-[0.05] -z-10"></div>

      <div className="container mx-auto px-[1.5rem] z-10 grid lg:grid-cols-2 gap-[4rem] items-center">
        <div className="max-w-[42rem] order-2 lg:order-1 stagger-reveal">
          <h1 className="text-[3.2rem] md:text-[5rem] font-black text-[#1e293b] leading-[1] mb-[1.5rem] tracking-tighter">
            <span className="text-gradient block">JC PATH LAB</span>
            <span className="relative inline-block mt-2">
              Patología de Precisión
              <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-[var(--cyan-pulse)] rounded-full opacity-50"></div>
            </span>
          </h1>
          <p className="text-[1.15rem] text-gray-600 mb-[2.5rem] max-w-[34rem] leading-relaxed font-medium border-l-4 border-[var(--secondary)]/20 pl-6">
            Diagnóstico especializado en Biopsias, Citología e Inmunohistoquímica con tecnología de punta en Puente Piedra, Lima Norte. Resultados rápidos en 3-4 días.
          </p>
          
          <div className="mt-[3rem] flex items-center space-x-[2rem] text-gray-500">
            <div className="flex -space-x-[1rem]">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-[3rem] h-[3rem] rounded-full border-[3px] border-white bg-white flex items-center justify-center overflow-hidden elite-shadow transition-transform hover:scale-110 hover:z-20 cursor-default">
                  <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-[0.7rem] font-black uppercase tracking-[0.2em] text-[var(--secondary)] mb-1">Elite Medical Trust</span>
              <p className="text-[0.85rem] font-bold text-gray-700">
                <span className="text-[var(--nexus-void)]">+5,000</span> diagnósticos precisos
              </p>
            </div>
          </div>
        </div>

        <div className="relative group order-1 lg:order-2">
            {/* Image Frame with Glassmorphism and Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--secondary)]/10 to-[var(--cyan-pulse)]/10 rounded-[3.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            <div className="relative z-10 glass-card p-[1rem] rounded-[3rem] elite-shadow overflow-hidden transition-all duration-700 transform group-hover:scale-[1.02] border-[1px] border-white/50">
              <div className="rounded-[2.2rem] overflow-hidden bg-gray-100">
                <Image 
                  src="/doctor.png" 
                  alt="Dr. Josehp Castillo Cuenca" 
                  width={800} 
                  height={600} 
                  className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-[3s] group-hover:scale-105"
                  priority
                />
              </div>
            </div>

            {/* Floating Info badge */}
            <div className="absolute -bottom-6 -left-6 z-20 glow-card p-6 rounded-2xl animate-float">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--secondary)] flex items-center justify-center text-white shadow-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                        <p className="text-[0.7rem] uppercase tracking-tighter font-black text-[var(--secondary)]">Precisión Certificada</p>
                        <p className="text-[1.1rem] font-black text-[var(--nexus-void)]">ISO 9001:2015</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
