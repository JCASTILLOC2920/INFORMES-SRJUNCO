'use client';

import React from 'react';
import Link from 'next/link';

interface B2BMedicalPortalProps {
  city: string;
  region: string;
}

export default function B2BMedicalPortal({ city, region }: B2BMedicalPortalProps) {
  return (
    <section className="my-16 p-10 bg-nexus-void rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
      {/* Decorative Neural Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1">
            <div className="inline-block px-4 py-1 bg-clinical-blue/20 border border-clinical-blue/30 rounded-full text-clinical-blue text-xs font-bold uppercase tracking-widest mb-6">
              Área para Profesionales de la Salud
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
              ¿Dirige una Clínica o Consultorio en <span className="text-clinical-blue">{city}</span>?
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Establezca una alianza estratégica con **JC PATH LAB**. Ofrecemos a los médicos de la región {region} un canal prioritario para el procesamiento de biopsias con resultados certificados por el Dr. Castillo en tiempo récord.
            </p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3">
                <span className="text-clinical-blue text-xl">✓</span>
                <span className="text-slate-200 font-medium">Protocolos de transporte especializados desde {city}.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-clinical-blue text-xl">✓</span>
                <span className="text-slate-200 font-medium">Acceso a plataforma de informes digitales para su centro médico.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-clinical-blue text-xl">✓</span>
                <span className="text-slate-200 font-medium">Tarifas institucionales competitivas para convenios regionales.</span>
              </li>
            </ul>
          </div>

          <div className="w-full lg:w-80 bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 text-center">
            <h3 className="text-xl font-bold mb-4">Solicitar Convenio</h3>
            <p className="text-sm text-slate-400 mb-6">Descargue nuestro Manual de Protocolo Médico para la región {region}.</p>
            
            <div className="space-y-4">
              <Link 
                href={`https://wa.me/51986396733?text=Hola,%20soy%20médico%20en%20${city}%20y%20quisiera%20información%20sobre%20convenios%20B2B`}
                target="_blank"
                className="block w-full py-4 bg-clinical-blue hover:bg-clinical-blue/80 text-white rounded-2xl font-black transition-all shadow-lg"
              >
                HABLAR CON EL DR. CASTILLO
              </Link>
              <button className="block w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-sm transition-all border border-white/5">
                DESCARGAR MANUAL PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
