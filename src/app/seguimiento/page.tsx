import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import LogisticsTracker from "@/components/public/LogisticsTracker";
import dynamic from "next/dynamic";

const ChatbotVictoria = dynamic(() => import("@/components/public/ChatbotVictoria"), { ssr: false });

export const metadata = {
  title: "Rastreo de Muestras Nacional | JC PATH LAB",
  description: "Siga el estado de su biopsia o Papanicolaou enviado desde provincia en tiempo real."
};

export default function SeguimientoPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      <div className="pt-32 pb-20">
        <LogisticsTracker />
      </div>
      <Footer />
      <ChatbotVictoria />
    </main>
  );
}
