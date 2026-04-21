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

  if (!city || !service) return { title: "Referencia Patológica Nacional" };

  const title = `Logística de ${service.title} en ${city.name} | Red Referencia B2B`;
  const description = `Servicio logístico para clínicas en ${city.name}. Recojo certificado de muestras y resultados integrados en 72h. Potencie su centro médico con nuestra red nacional.`;

  return {
    title,
    description,
    openGraph: {
      title: `🌐 RED B2B: Soluciones de Patología en ${city.name}`,
      description,
      type: "article",
      url: `https://informes-srjunco-git-main-jcastilloc2920s-projects.vercel.app/b2b/${params.slug}`,
      images: [{ url: "https://informes-srjunco.vercel.app/b2b-bg.jpg" }],
    },
  };
}

export default function B2BDynamicPage({ params }: Props) {
  const [cityId, serviceId] = params.slug.split('-');
  const city = provincialData.cities.find(c => c.id === cityId);
  const service = (provincialData.serviceDetails as any)[serviceId];

  if (!city || !service) return <div>404 - Nodo No Encontrado</div>;

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* ADN Visual B2B: Verde/Profesional */}
      <section className="pt-32 pb-20 px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            Uso Institucional - Red Nacional de Referencia
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
            Convenio de {service.title} <br/> para Clínicas en <span className="text-green-600">{city.name}</span>
          </h1>
          
          <div className="grid lg:grid-cols-2 gap-12 mt-12">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Optimización Logística</h2>
                <p className="text-slate-600 mb-6">
                    Nuestra red B2B en <strong>{city.name}</strong> está diseñada para directores médicos que exigen puntualidad. Integramos su sistema de salud con nuestro procesamiento centralizado.
                </p>
                <Link 
                    href="https://wa.me/51986396733?text=Deseo+información+sobre+tarifario+B2B+para+clinica+en+provincia"
                    className="inline-block bg-green-600 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-green-700 transition-all"
                >
                    Solicitar Tarifario {city.name}
                </Link>
            </div>
            
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <span className="text-2xl">📦</span>
                    <div>
                        <p className="font-bold text-slate-800">Recojo Diario</p>
                        <p className="text-sm text-slate-500">Logística prioritaria de muestras en todo {city.region}.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <span className="text-2xl">⚡</span>
                    <div>
                        <p className="font-bold text-slate-800">Sincronización Cloud</p>
                        <p className="text-sm text-slate-500">Resultados en PDF directo a su correo institucional.</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatbotVictoria />
    </main>
  );
}
