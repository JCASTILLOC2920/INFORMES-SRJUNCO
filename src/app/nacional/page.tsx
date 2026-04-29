import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import Link from "next/link";
import provincialData from "@/data/nacional.json";

export const metadata = {
  title: 'Directorio Nacional de Anatomía Patológica | JC PATH LAB',
  description: 'Acceda a servicios de biopsias, papanicolaou e inmunohistoquímica en todo el Perú. Cobertura nacional con recojo de muestras y diagnóstico experto.',
};

export default function NationalDirectoryPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Header />
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-nexus-void mb-8 text-center leading-tight">
            Red Nacional de <span className="text-gradient-clinical">Diagnóstico</span>
          </h1>
          <p className="text-xl text-slate-600 text-center mb-16 max-w-3xl mx-auto">
            JC PATH LAB conecta a médicos y pacientes de todo el país con la precisión del Dr. Castillo. 
            Seleccione su ubicación para ver servicios locales y protocolos de envío.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {provincialData.cities.map((city) => (
              <div key={city.id} className="bg-white p-8 rounded-3xl shadow-premium border border-slate-100 hover:border-clinical-blue transition-all group hover-lift cursor-pointer">
                <h2 className="text-2xl font-bold text-nexus-void mb-4 flex items-center justify-between">
                  {city.name}
                  <span className="text-xs font-normal bg-slate-100 px-3 py-1 rounded-full text-slate-500">{city.region}</span>
                </h2>
                <div className="space-y-2">
                  {city.services.map((serviceId) => {
                    const service = (provincialData.serviceDetails as any)[serviceId];
                    return (
                      <Link 
                        key={serviceId}
                        href={`/nacional/${city.id}-${serviceId}`}
                        className="block text-slate-600 hover:text-clinical-blue hover:translate-x-2 transition-all text-sm font-medium"
                      >
                        → {service.title}
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-6 pt-6 border-t border-slate-50 flex gap-4">
                  <Link href={`/b2b/${city.id}-biopsia`} className="text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-clinical-blue">B2B</Link>
                  <Link href={`/urgencia/${city.id}-biopsia`} className="text-[10px] uppercase tracking-widest font-bold text-red-400 hover:text-red-600">Urgencia</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
