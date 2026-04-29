'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import SEOStructuredData from '@/components/public/SEOStructuredData';

const DynamicFAQ = dynamic(() => import('@/components/public/DynamicFAQ'));
const ChatbotVictoria = dynamic(() => import('@/components/public/ChatbotVictoria'));
const ViralSocialHub = dynamic(() => import('@/components/public/ViralSocialHub'));


export default function MitosPapanicolaouPage() {
  const service = { title: "Mitos del Papanicolaou" };
  const city = { name: "Lima Norte" };
  const region = "Lima";
  const url = "https://jcpathlab.com/propaganda/seo-contenido/mitos-papanicolaou";

  return (
    <div className="min-h-screen bg-slate-50">
      <SEOStructuredData 
        city={city.name} 
        service={service.title} 
        region={region} 
        url={url} 
        description="Mitos y verdades sobre el examen de Papanicolaou. Infórmate con JC PATH LAB." 
      />

      <header className="bg-gradient-to-r from-blue-900 to-indigo-900 py-20 text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">Mitos y Verdades del Papanicolaou</h1>
        <p className="text-xl opacity-90">Desmantelando la desinformación para salvar vidas.</p>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-4">
        <section className="prose prose-slate lg:prose-xl bg-white p-8 rounded-2xl shadow-xl mb-12">
          <h2>La Verdad que Nadie te Dice</h2>
          <p>
            En <strong>JC PATH LAB</strong>, bajo la dirección del equipo Castillo, hemos procesado miles de muestras de Papanicolaou. 
            Sabemos que el miedo y los mitos detienen a muchas mujeres de realizarse este examen vital. 
            Aquí, con el respaldo de nuestra <strong>Inteligencia Titan</strong>, desmentimos los errores más comunes.
          </p>

          <div className="grid gap-6 mt-8">
            <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50 rounded-r-lg">
              <h3 className="text-red-700 font-bold">Mito 1: "Si no tengo síntomas, no necesito el PAP."</h3>
              <p className="text-slate-700 font-medium"><strong>REALIDAD:</strong> El Papanicolaou es preventivo. Detecta lesiones PRE-CANCEROSAS años antes de que aparezcan síntomas.</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg">
              <h3 className="text-blue-700 font-bold">Mito 2: "El procedimiento es extremadamente doloroso."</h3>
              <p className="text-slate-700 font-medium"><strong>REALIDAD:</strong> Es una molestia leve de segundos. En JC PATH LAB usamos técnicas de toma de muestra optimizadas.</p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50 rounded-r-lg">
              <h3 className="text-purple-700 font-bold">Mito 3: "Un resultado anormal significa que tengo cáncer."</h3>
              <p className="text-slate-700 font-medium"><strong>REALIDAD:</strong> La mayoría de resultados anormales indican inflamación o VPH, que son tratables. El diagnóstico definitivo lo da la Biopsia, procesada aquí en nuestro Nodo 186.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Preguntas Frecuentes (FAQ)</h2>
          <DynamicFAQ city={city.name} service={service.title} region={region} />
        </section>

        <ViralSocialHub city={city.name} service={service.title} />
      </main>

      <footer className="bg-slate-900 text-white py-8 text-center">
        <p>© 2026 JC PATH LAB - Infraestructura Titan Activa</p>
      </footer>

      <ChatbotVictoria />
    </div>
  );
}
