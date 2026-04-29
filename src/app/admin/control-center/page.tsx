import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import OrderExtractionDashboard from "@/components/admin/OrderExtractionDashboard";
import dynamic from "next/dynamic";

const ChatbotVictoria = dynamic(() => import("@/components/public/ChatbotVictoria"));

export const metadata = {
  title: "Centro de Control Inteligente | JC PATH LAB Admin",
  description: "Gestión de órdenes con AI-Vision y monitoreo del Nexo Logístico Nacional."
};

export default function ControlCenterPage() {
  return (
    <main className="min-h-screen bg-premium-silver/20">
      <Header />
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="mb-12 border-b border-slate-200 pb-8">
          <h1 className="text-4xl font-black text-nexus-void mb-2 uppercase tracking-tighter">Centro de Control de <span className="text-clinical-blue">La Colmena</span></h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs underline decoration-clinical-blue/40">Soberanía Operacional | JC PATH LAB</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          {/* Main Area: AI-Vision Extraction */}
          <div className="space-y-12">
            <OrderExtractionDashboard />
            
            <div className="bg-white/60 p-10 rounded-[3rem] border border-white/80 shadow-premium">
              <h3 className="text-2xl font-black text-nexus-void mb-6">Muestras en Tránsito Nacional</h3>
              <div className="overflow-x-auto text-sm">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100 italic font-black text-slate-400 uppercase text-[0.65rem] tracking-widest">
                      <th className="pb-4">Código / Guía</th>
                      <th className="pb-4">Origen</th>
                      <th className="pb-4">Paciente</th>
                      <th className="pb-4">Estado</th>
                      <th className="pb-4">Demora</th>
                    </tr>
                  </thead>
                  <tbody className="font-bold">
                    <tr className="border-b border-slate-50">
                      <td className="py-4 text-clinical-blue">#TRUJ-9821</td>
                      <td className="py-4">Trujillo</td>
                      <td className="py-4">Vargas, M.</td>
                      <td className="py-4"><span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[0.6rem]">TRANSITO</span></td>
                      <td className="py-4 text-green-600">--</td>
                    </tr>
                    <tr className="border-b border-slate-50">
                      <td className="py-4 text-clinical-blue">#AREQ-112</td>
                      <td className="py-4">Arequipa</td>
                      <td className="py-4">Sánchez, G.</td>
                      <td className="py-4"><span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-[0.6rem]">RETRASADO</span></td>
                      <td className="py-4 text-red-600 font-black">+ 52h</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar Area: Stats */}
          <div className="space-y-6">
            <div className="bg-nexus-void text-white p-8 rounded-[2.5rem] shadow-glow-blue">
              <span className="text-[0.6rem] font-black uppercase tracking-widest opacity-60">IA Recepción</span>
              <div className="text-4xl font-black mt-2">98.2%</div>
              <p className="text-xs font-medium opacity-60 mt-1">Precisión de Extracción AI-Vision</p>
            </div>
            
            <div className="bg-clinical-blue text-white p-8 rounded-[2.5rem] shadow-premium">
              <span className="text-[0.6rem] font-black uppercase tracking-widest opacity-80">Volumen Nacional</span>
              <div className="text-4xl font-black mt-2">124</div>
              <p className="text-xs font-medium opacity-80 mt-1">Muestras recibidas de Provincias (Mes)</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ChatbotVictoria />
    </main>
  );
}

