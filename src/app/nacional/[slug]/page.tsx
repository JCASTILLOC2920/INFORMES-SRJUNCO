import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import dynamic from "next/dynamic";
import Link from "next/link";
import provincialData from "@/data/nacional.json";
import titanHub from "@/data/titan_knowledge_hub.json";

const ChatbotVictoria = dynamic(() => import("@/components/public/ChatbotVictoria"));
const ViralSocialHub = dynamic(() => import("@/components/public/ViralSocialHub"));
const DynamicFAQ = dynamic(() => import("@/components/public/DynamicFAQ"));
const SEOStructuredData = dynamic(() => import("@/components/public/SEOStructuredData"));
const B2BMedicalPortal = dynamic(() => import("@/components/public/B2BMedicalPortal"));

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const lastDashIndex = params.slug.lastIndexOf('-');
  const cityId = params.slug.substring(0, lastDashIndex);
  const serviceId = params.slug.substring(lastDashIndex + 1);
  
  const city = provincialData.cities.find(c => c.id === cityId);
  const service = (provincialData.serviceDetails as any)[serviceId];

  if (!city || !service) return { title: "JC PATH LAB" };

  const title = `⚠️ ALERTA MÉDICA: ${service.title} en ${city.name} | Servicio Nacional`;
  const description = `AVISO OFICIAL: Recojo prioritario de muestras en ${city.name} (${city.region}). Resultados certificados por el Dr. Castillo en 72h. Inicie su diagnóstico hoy mismo vía WhatsApp.`;

  return {
    title,
    description,
    openGraph: {
      title: `🔴 COMUNICADO: Diagnóstico de Precisión en ${city.name}`,
      description,
      type: "article",
      url: `https://informes-srjunco.vercel.app/nacional/${params.slug}`,
      images: [{ 
        url: "https://informes-srjunco.vercel.app/logo-circular.png",
        width: 1200,
        height: 630,
        alt: `Alerta Diagnóstica JC PATH LAB ${city.name}`
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: `⚡ URGENTE: ${serviceId} en ${city.name}`,
      description,
      images: ["https://informes-srjunco.vercel.app/logo-circular.png"],
    }
  };
}

export default function NationalDynamicPage({ params }: Props) {
  const { slug } = params;
  
  const lastDashIndex = slug.lastIndexOf('-');
  const cityId = slug.substring(0, lastDashIndex);
  const serviceId = slug.substring(lastDashIndex + 1);
  
  const city = provincialData.cities.find(c => c.id === cityId);
  const service = (provincialData.serviceDetails as any)[serviceId];
  
  // Extraer datos del Titan Knowledge Hub
  const hubCity = (titanHub.enriched_cities as any[]).find(c => c.id === cityId);
  const neuroHook = hubCity?.neuro_hook || `Expertos en ${serviceId} sirviendo a ${city?.name}.`;
  const viralPost = hubCity?.viral_post || `Servicio médico en ${city?.name}.`;

  if (!city || !service) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-4xl font-black text-nexus-void mb-4">404</h1>
          <p className="text-slate-500 mb-8">Nicho de propaganda no encontrado.</p>
          <Link href="/" className="px-8 py-4 bg-clinical-blue text-white rounded-full font-bold">Volver al Inicio</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Header />
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="flex mb-8 text-sm text-slate-500 gap-2">
            <Link href="/" className="hover:text-clinical-blue">Inicio</Link>
            <span>/</span>
            <Link href="/servicios" className="hover:text-clinical-blue">Servicios</Link>
            <span>/</span>
            <span className="font-bold text-nexus-void capitalize">{city.name}</span>
          </nav>
          
          <div className="animate-reveal">
            <h1 className="text-4xl md:text-5xl font-black text-nexus-void mb-6 leading-tight">
              {service.title} en <span className="text-clinical-blue">{city.name}</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-12 border-l-4 border-cyan-pulse pl-6 italic">
              "{neuroHook}"
            </p>
            
            <div className="bg-white p-10 rounded-[2.5rem] shadow-premium border border-slate-100 mb-16">
              <h2 className="text-2xl font-bold text-nexus-void mb-6">Expertos en Envío Nacional</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {service.description} Recibimos muestras de {city.name} diariamente. Nuestro protocolo de transporte asegura la integridad del tejido desde el origen hasta nuestro laboratorio central en Lima.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
                  <span className="text-2xl">🚚</span>
                  <span className="text-sm font-bold text-slate-700">Envíos desde {city.name}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
                  <span className="text-2xl">⚡</span>
                  <span className="text-sm font-bold text-slate-700">Resultados en 72h-96h</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
                  <span className="text-2xl">📱</span>
                  <span className="text-sm font-bold text-slate-700">Informes Digitales PDF</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
                  <span className="text-2xl">📧</span>
                  <span className="text-sm font-bold text-slate-700">Envío Directo a Médico</span>
                </div>
              </div>

              <Link 
                href={`https://wa.me/51986396733?text=Hola,%20quisiera%20más%20información%20sobre%20${service.title}%20en%20${city.name}`}
                target="_blank"
                className="inline-flex items-center justify-center w-full py-4 bg-[#25D366] text-white rounded-2xl font-black text-lg shadow-xl hover:shadow-green-200 transition-all gap-3"
              >
                <span>🚀 {service.cta}</span>
              </Link>
            </div>

            {/* Infiltrador Viral con Inteligencia Titan */}
            <ViralSocialHub city={city.name} service={service.title} viralPost={viralPost} />

            {/* FASE 6: Portal de Conversión B2B para Médicos y Clínicas */}
            <B2BMedicalPortal city={city.name} region={city.region} />

            {/* Automatización Suprema SEO: FAQ Dinámico */}
            <DynamicFAQ city={city.name} service={service.title} region={city.region} />

            <div className="prose prose-slate max-w-none text-slate-600 mt-16">
              <h3 className="text-2xl font-bold text-nexus-void mb-4">¿Cómo enviarnos su muestra?</h3>
              <p className="mb-4">
                Si usted es un médico o paciente en {city.name}, puede enviarnos su biopsia o lámina de PAP vía courier. Una vez recibido, la Dra. Victoria lo notificará y el Dr. Castillo procederá con la lectura diagnóstica inmediata.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Prepare la muestra en formol al 10% (biopsias) o láminas fijadas (citología).</li>
                <li>Coordine el recojo en {city.name} por su agencia de confianza.</li>
                <li>Envíenos el número de guía por WhatsApp.</li>
                <li>Reciba su diagnóstico en su celular.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatbotVictoria />
      
      {/* Datos Estructurados Mythos para Dominio de Google */}
      <SEOStructuredData 
        city={city.name} 
        service={service.title} 
        region={city.region} 
        url={`https://informes-srjunco.vercel.app/nacional/${slug}`}
        description={`Servicio oficial de ${service.title} en ${city.name}. Resultados en 72h-96h.`}
      />
    </main>
  );
}
