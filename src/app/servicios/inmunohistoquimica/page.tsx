import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import dynamic from "next/dynamic";
import Link from "next/link";

const ChatbotVictoria = dynamic(() => import("@/components/public/ChatbotVictoria"));

export const metadata = {
  title: "Inmunohistoquímica Avanzada en Lima | JC PATH LAB",
  description: "Paneles completos de marcadores tumorales. Inmunohistoquímica de alta precisión para el diagnóstico definitivo de cáncer y tipificación de tumores.",
};

export default function InmunohistoquimicaPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Header />
      
      {/* Search Engine Optimized Content Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="flex mb-8 text-sm text-slate-500 gap-2">
            <Link href="/" className="hover:text-clinical-blue">Inicio</Link>
            <span>/</span>
            <span className="font-bold text-nexus-void">Inmunohistoquímica</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-black text-nexus-void mb-8 leading-tight">
            Diagnóstico Dirigido: <span className="text-clinical-blue">Inmunohistoquímica</span> Especializada
          </h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-xl text-slate-600 mb-12 border-l-4 border-nexus-void pl-6 italic font-medium">
              "La inmunohistoquímica es el 'GPS' del diagnóstico oncológico. En JC PATH LAB, contamos con la tecnología para identificar el origen exacto de cada lesión."
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="bg-white p-8 rounded-3xl shadow-elite border border-slate-100">
                <h2 className="text-2xl font-bold text-nexus-void mb-4">Paneles de Marcadores</h2>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-clinical-blue rounded-full"></div>
                    Marcadores de Mama (ER, PR, Her2, Ki67)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-clinical-blue rounded-full"></div>
                    Paneles de Linfomas
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-clinical-blue rounded-full"></div>
                    Marcadores Digestivos y Pulmonares
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-clinical-blue rounded-full"></div>
                    Tipificación de Primarios Desconocidos
                  </li>
                </ul>
              </div>
              
              <div className="bg-nexus-void text-white p-8 rounded-3xl shadow-elite">
                <h2 className="text-2xl font-bold mb-4">Precisión Total</h2>
                <ul className="space-y-3 opacity-90">
                  <li>✅ Protocolos de recuperación antigénica</li>
                  <li>✅ Amplia biblioteca de anticuerpos</li>
                  <li>✅ Correlación Histopatológica estricta</li>
                  <li>✅ Informe detallado para Oncología</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-nexus-void mb-6">Tecnología al Servicio de la Vida</h2>
            <p className="text-slate-600 mb-8">
              Nuestro laboratorio utiliza anticuerpos de alta afinidad y sistemas de detección ultrasensibles. Esto nos permite garantizar resultados reproducibles y precisos, fundamentales para la decisión del tratamiento quimioterapéutico o quirúrgico por parte de su médico tratante.
            </p>
            
            <div className="bg-gradient-to-br from-nexus-void to-clinical-blue p-10 rounded-4xl text-center text-white shadow-glow-blue">
              <h3 className="text-2xl font-bold mb-4">Envíe su bloque de parafina</h3>
              <p className="mb-8 opacity-90">Realizamos estudios de inmunohistoquímica a partir de bloques de tejido procesados previamente en otros centros. Coordinamos el recojo seguro de su material.</p>
              <Link href="https://wa.me/51986396733" className="inline-block bg-white text-nexus-void px-10 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all">
                Coordinar Recojo de Bloque
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
