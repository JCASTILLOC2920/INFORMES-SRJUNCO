import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import dynamic from "next/dynamic";
import Link from "next/link";
import provincialData from "@/data/nacional.json";

const ChatbotVictoria = dynamic(() => import("@/components/public/ChatbotVictoria"), { ssr: false });

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const [cityId, serviceId] = params.slug.split('-');
  const city = provincialData.cities.find(c => c.id === cityId);
  const service = (provincialData.serviceDetails as any)[serviceId];

  if (!city || !service) return { title: "JC PATH LAB" };

  return {
    title: `${service.title} en ${city.name} | JC PATH LAB Nacional`,
    description: `Servicio de ${serviceId} de alta precisión en ${city.name}, ${city.region}. Resultados en 3-4 días envíos nacionales a todo el Perú.`,
  };
}

export default function NationalDynamicPage({ params }: Props) {
  const { slug } = params;
  
  // Lógica simple de parsing: ciudad-servicio (ej: trujillo-biopsia)
  const [cityId, serviceId] = slug.split('-');
  
  const city = provincialData.cities.find(c => c.id === cityId);
  const service = (provincialData.serviceDetails as any)[serviceId];

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
              "JC PATH LAB sirve a la comunidad médica de {city.name} y la región {city.region} con diagnósticos de anatomía patológica de máxima precisión humana y tecnológica."
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
                href="https://wa.me/51986396733"
                className="block text-center bg-nexus-void text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-clinical-blue transition-all shadow-glow-blue"
              >
                {service.cta}
              </Link>
            </div>

            <div className="prose prose-slate max-w-none text-slate-600">
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
    </main>
  );
}
