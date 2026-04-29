import dynamic from "next/dynamic";
import Header from "@/components/public/Header";
import Hero from "@/components/public/Hero";
import Footer from "@/components/public/Footer";
import Link from "next/link";

const ChatbotVictoria = dynamic(() => import("@/components/public/ChatbotVictoria"));

const SpecializedServices = dynamic(() => import("@/components/public/SpecializedServices"), {
  ssr: true,
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-50" />,
});
const Services = dynamic(() => import("@/components/public/Services"), {
  ssr: true,
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-50" />,
});
const WhyUs = dynamic(() => import("@/components/public/WhyUs"), {
  ssr: true,
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-50" />,
});
const NationalActivityMap = dynamic(() => import("@/components/public/NationalActivityMap"), {
  ssr: true,
  loading: () => <div className="min-h-[400px] animate-pulse bg-nexus-void/5" />,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Header />
      <Hero />
      <SpecializedServices />
      <Services />
      <WhyUs />
      <NationalActivityMap />
      
      {/* Sección de Propaganda Masiva: Hub Nacional */}
      <section className="py-20 bg-nexus-void text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-8">Cobertura en Todo el <span className="text-cyan-pulse">Perú</span></h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Desde Trujillo hasta Tacna, llevamos el diagnóstico de precisión a cada rincón del país con protocolos de envío garantizados.
          </p>
          <Link 
            href="/nacional" 
            className="inline-block bg-clinical-blue hover:bg-cyan-600 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-glow-blue"
          >
            Explorar Directorio Nacional →
          </Link>
        </div>
      </section>

      <Footer />
      <ChatbotVictoria />
    </main>
  );
}
