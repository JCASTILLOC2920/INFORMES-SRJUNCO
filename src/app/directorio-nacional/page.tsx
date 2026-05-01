import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import Link from "next/link";
import provincialData from "@/data/nacional.json";

export const metadata = {
  title: "Directorio Nacional de Anatomía Patológica | JC PATH LAB",
  description: "Red nacional de diagnóstico oncológico y patológico en los 1,979 distritos de Perú. Localice su servicio de biopsia y citología más cercano.",
};

export default function DirectoryPage() {
  // Agrupar ciudades por región (departamento)
  const regions = Array.from(new Set(provincialData.cities.map(c => c.region))).sort();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Header />
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-reveal">
            <h1 className="text-5xl md:text-6xl font-black text-nexus-void mb-6 tracking-tighter">
              Saturación <span className="text-clinical-blue">Nacional</span> de Diagnóstico
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              JC PATH LAB expande su infraestructura de precisión a cada rincón de Perú. 
              Seleccione su ubicación para iniciar un proceso de diagnóstico certificado por el Dr. Castillo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {regions.map((region) => (
              <div key={region} className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-slate-100 hover:shadow-2xl transition-all group">
                <h2 className="text-2xl font-black text-clinical-blue mb-6 border-b border-slate-50 pb-4 group-hover:text-nexus-void">
                  {region}
                </h2>
                <div className="max-h-64 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-200">
                  <ul className="space-y-3">
                    {provincialData.cities
                      .filter(c => c.region === region)
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((city) => (
                        <li key={city.id}>
                          <Link 
                            href={`/nacional/${city.id}-biopsia`}
                            className="text-slate-500 hover:text-clinical-blue text-sm font-medium flex items-center gap-2 transition-colors"
                          >
                            <span className="w-1.5 h-1.5 bg-slate-200 rounded-full group-hover:bg-clinical-blue"></span>
                            {city.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="mt-6 text-[0.6rem] uppercase tracking-widest font-bold text-slate-300">
                  {provincialData.cities.filter(c => c.region === region).length} NODOS ACTIVOS
                </div>
              </div>
            ))}
          </div>

          {/* Banner de Autoridad B2B */}
          <div className="mt-20 p-12 bg-nexus-void rounded-[3rem] text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:30px_30px]"></div>
            <h3 className="text-3xl font-black mb-6 relative z-10">¿Es usted un profesional de la salud?</h3>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto relative z-10">
              Ofrecemos convenios de procesamiento para clínicas en cualquiera de estos {provincialData.cities.length} distritos. 
              Garantice la máxima precisión para sus pacientes hoy mismo.
            </p>
            <Link 
              href="https://wa.me/51986396733"
              className="inline-block px-10 py-5 bg-clinical-blue text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform relative z-10 shadow-xl"
            >
              SOLICITAR CONVENIO REGIONAL
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
