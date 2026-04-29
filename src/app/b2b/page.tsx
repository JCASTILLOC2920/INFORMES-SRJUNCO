'use client';

import React from 'react';
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import dynamic from "next/dynamic";

const ChatbotVictoria = dynamic(() => import("@/components/public/ChatbotVictoria"));

export default function B2BPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Header />
      
      {/* Hero Section B2B */}
      <section className="pt-40 pb-24 bg-nexus-void relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-clinical-blue) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
          <span className="inline-block px-6 py-2 bg-clinical-blue/20 text-cyan-pulse border border-clinical-blue/30 rounded-full text-[0.7rem] font-bold uppercase tracking-[0.3em] mb-8 animate-reveal">
            Soberanía Institucional
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tighter">
            El Partner Diagnóstico <br/> <span className="text-clinical-blue">Líder para su Clínica</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
            JC PATH LAB orquesta la logística y el diagnóstico de anatomía patológica para centros médicos en todo el Perú. Resultados de alta precisión en 72h-96h, directo a su sistema.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-clinical-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest shadow-glow-blue hover:bg-white hover:text-nexus-void transition-all">
              Solicitar Tarifario B2B
            </button>
            <button className="bg-white/10 border border-white/20 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest backdrop-blur-md hover:bg-white/20 transition-all">
              Protocolo de Envío Nacional
            </button>
          </div>
        </div>
      </section>

      {/* Value Props B2B */}
      <section className="py-24 max-w-[1400px] mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          <B2BCard 
            icon="🚚" 
            title="Logística Nacional" 
            desc="Convenios con los principales couriers del país para recojo prioritario de muestras en su clínica."
          />
          <B2BCard 
            icon="📊" 
            title="Descuentos por Volumen" 
            desc="Escalas comerciales competitivas diseñadas para laboratorios y clínicas de alta rotación."
          />
          <B2BCard 
            icon="🖥️" 
            title="Integración Digital" 
            desc="Acceso preferencial al Portal de Resultados y soporte técnico para integración de órdenes vía IA."
          />
        </div>
      </section>

      {/* Convencer Section */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black text-nexus-void mb-8">Únase a la <span className="text-clinical-blue">Red Diagnóstica</span> más potente del Perú</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Actualmente servimos a más de 50 instituciones médicas en todo el territorio nacional. Nuestra soberanía cloud permite que la distancia no sea un obstáculo para la precisión clínica.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 font-bold text-nexus-void">
                <span className="text-green-500">✓</span> Procesamiento masivo de Biopsias y PAP
              </li>
              <li className="flex items-center gap-3 font-bold text-nexus-void">
                <span className="text-green-500">✓</span> Informes firmados digitalmente (Validez Legal)
              </li>
              <li className="flex items-center gap-3 font-bold text-nexus-void">
                <span className="text-green-500">✓</span> Capacitación para su personal de enfermería en toma de muestras
              </li>
            </ul>
          </div>
          <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-200 shadow-premium">
            <h3 className="text-2xl font-black text-nexus-void mb-6">Inicie el Convenio Hoy</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Nombre de la Institución" className="w-full p-4 rounded-xl border border-slate-300 focus:outline-none focus:border-clinical-blue font-bold" />
              <input type="text" placeholder="Ciudad / Región" className="w-full p-4 rounded-xl border border-slate-300 focus:outline-none focus:border-clinical-blue font-bold" />
              <input type="email" placeholder="Correo Corporativo" className="w-full p-4 rounded-xl border border-slate-300 focus:outline-none focus:border-clinical-blue font-bold" />
              <button className="w-full py-5 bg-nexus-void text-white rounded-xl font-black uppercase tracking-widest hover:bg-clinical-blue transition-all">
                Enviar Solicitud B2B
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
      <ChatbotVictoria />
    </main>
  );
}

function B2BCard({ icon, title, desc }: { icon: string, title: string, desc: string }) {
  return (
    <div className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-premium transition-all group">
      <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-xl font-black text-nexus-void mb-4">{title}</h3>
      <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}
