import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import dynamic from "next/dynamic";
import Link from "next/link";
import provincialData from "@/data/nacional.json";
import ViralSocialHub from "@/components/public/ViralSocialHub";

const ChatbotVictoria = dynamic(() => import("@/components/public/ChatbotVictoria"));
const DynamicFAQ = dynamic(() => import("@/components/public/DynamicFAQ"));
const SEOStructuredData = dynamic(() => import("@/components/public/SEOStructuredData"));

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const [cityId, serviceId] = params.slug.split('-');
  const city = provincialData.cities.find(c => c.id === cityId);
  const service = (provincialData.serviceDetails as any)[serviceId];

  if (!city || !service) return { title: "Alerta Médica Urgente" };

  const title = `⚠️ URGENTE: ${service.title} en ${city.name} | Resultados en 72h`;
  const description = `Servicio de diagnóstico acelerado en ${city.name}. Recojo prioritario para casos críticos. Resultados certificados por el Dr. Castillo con envío digital inmediato.`;

  return {
    title,
    description,
    openGraph: {
      title: `🚨 ALERTA: Diagnóstico Crítico en ${city.name}`,
      description,
      type: "article",
      url: `https://informes-srjunco.vercel.app/urgencia/${params.slug}`,
      images: [{ url: "https://informes-srjunco.vercel.app/alert-bg.jpg" }],
    },
  };
}

export default function UrgenciaDynamicPage({ params }: Props) {
  const [cityId, serviceId] = params.slug.split('-');
  const city = provincialData.cities.find(c => c.id === cityId);
  const service = (provincialData.serviceDetails as any)[serviceId];

  if (!city || !service) return <div>404 - Nodo No Encontrado</div>;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Header />
      
      {/* ADN Visual Urgencia: Rojo/Blanco/Urgencia */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full text-xs font-black uppercase tracking-widest mb-8 animate-pulse">
            <span className="w-2 h-2 bg-white rounded-full"></span> Canal de Atención Urgente Nacional
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-red-700 mb-8 leading-tight tracking-tighter">
            ¿Necesita una {service.title} <br/> Urgente en <span className="text-slate-900 underline">{city.name}</span>?
          </h1>
          
          <p className="text-xl text-slate-600 mb-12 italic border-l-8 border-red-600 pl-6 bg-red-50 py-6 rounded-r-3xl leading-relaxed">
            "El tiempo es el factor crítico en el diagnóstico oncológico. En <strong>{city.name}</strong>, eliminamos la espera. Procesamos su caso con prioridad máxima en nuestro Nodo Central, garantizando certeza cuando más la necesita."
          </p>

          <div className="bg-red-700 p-10 rounded-[3rem] shadow-glow-red text-white mb-16">
            <h2 className="text-3xl font-black mb-6">Protocolo de Emergencia {city.region}</h2>
            <p className="text-red-100 text-lg mb-8 leading-relaxed">
                No espere meses. Recogemos su muestra en {city.name} y entregamos resultados en un periodo de 72h-96h hábiles. Ideal para cirugías programadas y segundos diagnósticos.
            </p>
            
            <a 
                href="https://wa.me/51986396733?text=Hola+Dr.+Castillo,+tengo+un+caso+urgente+desde+provincia"
                className="block text-center bg-white text-red-700 py-6 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] transition-transform"
            >
                Hablar con Especialista AHORA
            </a>
          </div>

          <ViralSocialHub city={city.name} service={service.title} />
        </div>
      </section>

      <section className="pb-20">
        <DynamicFAQ city={city.name} service={service.title} region={city.region} />
      </section>

      <Footer />
      <ChatbotVictoria />

      <SEOStructuredData 
        city={city.name} 
        service={service.title} 
        region={city.region} 
        url={`https://informes-srjunco.vercel.app/urgencia/${params.slug}`}
        description={`Servicio de URGENCIA de ${service.title} en ${city.name}. Prioridad diagnóstica.`}
      />
    </main>
  );
}
