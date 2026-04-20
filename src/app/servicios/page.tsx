import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import dynamic from "next/dynamic";
import Link from "next/link";

const ChatbotVictoria = dynamic(() => import("@/components/public/ChatbotVictoria"), { ssr: false });

const services = [
  {
    title: "Anatomía Patológica (Biopsias)",
    description: "Diagnóstico histopatológico de tejidos, biopsias gástricas, prostáticas, piel y más.",
    href: "/servicios/biopsias",
    price: "Desde S/ 80",
    icon: "🔬"
  },
  {
    title: "Citología y Papanicolaou",
    description: "Despistaje preventivo con sistema Bethesda. Papanicolaou y citología de líquidos.",
    href: "/servicios/citologia",
    price: "S/ 20",
    icon: "🧬"
  },
  {
    title: "Inmunohistoquímica",
    description: "Tipificación avanzada de tumores y marcadores oncológicos de alta precisión.",
    href: "/servicios/inmunohistoquimica",
    price: "Consultar Panel",
    icon: "🎯"
  }
];

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Header />
      
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-[1700px] mx-auto">
          <div className="text-center mb-20 animate-reveal">
            <h1 className="text-5xl font-black text-nexus-void mb-6">Nuestros Servicios Médicos</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
              Diagnóstico de alta precisión con tecnología de punta y tiempos de entrega récord en Lima Norte.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <Link 
                key={idx} 
                href={service.href}
                className="group bg-white p-10 rounded-[2.5rem] shadow-elite border border-slate-100 hover:border-clinical-blue transition-all duration-500 hover:-translate-y-2"
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h2 className="text-2xl font-black text-nexus-void mb-4 group-hover:text-clinical-blue transition-colors">
                  {service.title}
                </h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-clinical-blue font-bold tracking-wider uppercase text-sm">
                    {service.price}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-clinical-blue group-hover:text-white transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ChatbotVictoria />
    </main>
  );
}
