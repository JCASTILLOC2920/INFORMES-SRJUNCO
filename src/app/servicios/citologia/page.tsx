import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import dynamic from "next/dynamic";
import Link from "next/link";

const ChatbotVictoria = dynamic(() => import("@/components/public/ChatbotVictoria"));

export const metadata = {
  title: "Citología y Papanicolaou en Puente Piedra | JC PATH LAB",
  description: "Estudios citológicos y Papanicolaou de alta precisión. Prevención de cáncer de cuello uterino con resultados rápidos en 3-4 días hábiles en Lima Norte.",
};

export default function CitologiaPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Header />
      
      {/* Search Engine Optimized Content Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="flex mb-8 text-sm text-slate-500 gap-2">
            <Link href="/" className="hover:text-clinical-blue">Inicio</Link>
            <span>/</span>
            <span className="font-bold text-nexus-void">Citología y PAP</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-black text-nexus-void mb-8 leading-tight">
            Prevención y Diagnóstico: <span className="text-clinical-blue">Papanicolaou</span> en Lima Norte
          </h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-xl text-slate-600 mb-12 border-l-4 border-clinical-blue pl-6 italic">
              "La detección temprana es la mejor medicina. En JC PATH LAB, nos especializamos en citología oncológica con estándares internacionales."
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="bg-white p-8 rounded-3xl shadow-elite border border-slate-100">
                <h2 className="text-2xl font-bold text-nexus-void mb-4">Servicios Citológicos</h2>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-clinical-blue rounded-full"></div>
                    Papanicolaou Convencional (S/ 20)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-clinical-blue rounded-full"></div>
                    Citología en Base Líquida
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-clinical-blue rounded-full"></div>
                    Citología de Líquidos (Pleural, Ascítico)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-clinical-blue rounded-full"></div>
                    Block Cell / Improntas
                  </li>
                </ul>
              </div>
              
              <div className="bg-clinical-blue text-white p-8 rounded-3xl shadow-elite">
                <h2 className="text-2xl font-bold mb-4">Ventajas Preventivas</h2>
                <ul className="space-y-3 opacity-90">
                  <li>✅ Lectura especializada por patólogos</li>
                  <li>✅ Cumplimiento de sistema Bethesda</li>
                  <li>✅ Entrega de informes digitales</li>
                  <li>✅ Seguimiento de casos sospechosos</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-nexus-void mb-6">Importancia del Diagnóstico</h2>
            <p className="text-slate-600 mb-8">
              El estudio citológico es fundamental para la detección precoz de lesiones pre-cancerosas. En nuestro centro, utilizamos coloraciones de alta fidelidad y microscopía avanzada para asegurar que cada célula sea evaluada con el máximo rigor clínico.
            </p>
            
            <div className="bg-clinical-blue-light p-8 rounded-3xl border border-clinical-blue/20 text-center">
              <h3 className="text-2xl font-bold text-nexus-void mb-4">Reserve su Cita de Prevención</h3>
              <p className="text-slate-600 mb-8">No espere más por sus resultados. Reciba su informe digital certificado en un tiempo récord.</p>
              <Link href="https://wa.me/51986396733" className="inline-block bg-nexus-void text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-clinical-blue transition-all shadow-glow-blue">
                Consultar Horarios vía WhatsApp
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
