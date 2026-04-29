import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import dynamic from "next/dynamic";
import Link from "next/link";

const ChatbotVictoria = dynamic(() => import("@/components/public/ChatbotVictoria"));

export const metadata = {
  title: "Biopsias de Alta Precisión en Lima Norte | JC PATH LAB",
  description: "Servicio especializado de biopsias gástricas, prostáticas y de tejidos. Resultados en 3-4 días hábiles con máxima precisión médica en Puente Piedra.",
};

export default function BiopsiasPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Header />
      
      {/* Search Engine Optimized Content Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="flex mb-8 text-sm text-slate-500 gap-2">
            <Link href="/" className="hover:text-clinical-blue">Inicio</Link>
            <span>/</span>
            <span className="font-bold text-nexus-void">Biopsias</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-black text-nexus-void mb-8 leading-tight">
            Diagnóstico de Biopsias de <span className="text-clinical-blue">Alta Precisión</span> en Lima Norte
          </h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-xl text-slate-600 mb-12 border-l-4 border-cyan-pulse pl-6 italic">
              "En JC PATH LAB, cada biopsia es tratada como una prioridad vital. Nuestro compromiso es brindarle la claridad necesaria para su tranquilidad y tratamiento médico."
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="bg-white p-8 rounded-3xl shadow-elite border border-slate-100">
                <h2 className="text-2xl font-bold text-nexus-void mb-4">¿Qué ofrecemos?</h2>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-clinical-blue rounded-full"></div>
                    Biopsias Gástricas (S/ 80)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-clinical-blue rounded-full"></div>
                    Biopsias de Próstata
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-clinical-blue rounded-full"></div>
                    Biopsias de Piel y Tejidos Blandos
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-clinical-blue rounded-full"></div>
                    Marcadores de Inmunohistoquímica
                  </li>
                </ul>
              </div>
              
              <div className="bg-clinical-blue-deep text-white p-8 rounded-3xl shadow-elite">
                <h2 className="text-2xl font-bold mb-4">¿Por qué elegirnos?</h2>
                <ul className="space-y-3 opacity-90">
                  <li>✅ Resultados digitales en 3-4 días</li>
                  <li>✅ Interpretación por patólogos expertos</li>
                  <li>✅ Recojo de muestras a domicilio</li>
                  <li>✅ Tecnología automatizada de última generación</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-nexus-void mb-6">Proceso de atención</h2>
            <p className="text-slate-600 mb-8">
              Contamos con un sistema simplificado para su comodidad. Puede traer su muestra a nuestro laboratorio en Puente Piedra o solicitar un recojo motorizado en cualquier punto de Lima. Todas las muestras son procesadas bajo estrictos protocolos internacionales de calidad.
            </p>
            
            <div className="bg-cyan-pulse/10 p-8 rounded-3xl border border-cyan-pulse/20 text-center">
              <h3 className="text-2xl font-bold text-nexus-void mb-4">Solicite su Diagnóstico Hoy</h3>
              <p className="text-slate-600 mb-8">Hable con nuestra asistente virtual Victoria o contáctenos por WhatsApp para coordinar la recepción de su muestra.</p>
              <Link href="https://wa.me/51986396733" className="inline-block bg-nexus-void text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-clinical-blue transition-all shadow-glow-blue">
                Enviar Orden por WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatbotVictoria />
    </main>
  );
}
