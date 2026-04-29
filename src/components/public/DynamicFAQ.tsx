'use client';

import React, { useState } from 'react';

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

type DynamicFAQProps = {
  city: string;
  service: string;
  region: string;
};

export default function DynamicFAQ({ city, service, region }: DynamicFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      id: 'dfaq-1',
      question: `¿Dónde puedo realizarme una ${service} en ${city}?`,
      answer: `JC PATH LAB es la opción líder para realizarse una ${service} en ${city}. Ofrecemos un servicio de recojo de muestras optimizado y diagnóstico por patólogos certificados. Nuestra sede central procesa muestras de toda la región ${region} con la máxima precisión.`
    },
    {
      id: 'dfaq-2',
      question: `¿Cuál es el tiempo de entrega para resultados de ${service} en ${city}?`,
      answer: `Para pacientes y clínicas en ${city}, el tiempo de entrega es de 72 a 96 horas hábiles. Los informes se envían en formato digital (PDF) vía WhatsApp o correo electrónico para mayor comodidad.`
    },
    {
      id: 'dfaq-3',
      question: `¿Cómo envío mi muestra de ${service} desde ${city} a JC PATH LAB?`,
      answer: `Es muy sencillo. Solo debe coordinar con nosotros vía WhatsApp (+51 986 396 733). Le indicaremos cómo embalar su muestra (generalmente en formol al 10%) y gestionaremos el recojo por courier desde ${city} hasta nuestro laboratorio.`
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 bg-white rounded-[2.5rem] shadow-premium border border-slate-100 mt-16 px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-black text-nexus-void mb-8 tracking-tighter">
          Preguntas Frecuentes sobre <span className="text-clinical-blue">{service}</span> en {city}
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={faq.id} className="border-b border-slate-100 pb-4">
              <button
                className="w-full flex items-center justify-between py-4 text-left group"
                onClick={() => toggle(idx)}
              >
                <span className="text-lg font-bold text-slate-800 group-hover:text-clinical-blue transition-colors">
                  {faq.question}
                </span>
                <span className={`text-2xl transition-transform ${openIndex === idx ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-slate-600 pb-4 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
