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
      question: `¿JC PATH LAB realiza recojo de muestras para ${service} en ${city}?`,
      answer: `Sí, contamos con un protocolo de logística optimizado para ${city}. Coordinamos el recojo de su muestra (biopsias, citologías o piezas quirúrgicas) directamente en su ubicación en ${city} o a través de agencias aliadas en la región ${region}, asegurando que llegue a nuestro laboratorio central en condiciones óptimas.`
    },
    {
      id: 'dfaq-2',
      question: `¿Los resultados de ${service} en ${city} son certificados por especialistas?`,
      answer: `Absolutamente. Todos los diagnósticos de ${service} realizados para pacientes de ${city} son procesados y firmados digitalmente por el Dr. Castillo y su equipo de patólogos certificados. El informe incluye microfotografías de alta resolución y es válido para cualquier institución médica nacional o internacional.`
    },
    {
      id: 'dfaq-3',
      question: `¿Cómo puedo contactar a la Dra. Victoria para el seguimiento de mi caso en ${city}?`,
      answer: `Nuestra asistente inteligente, la Dra. Victoria, está disponible 24/7 para los pacientes de ${city}. Puede iniciar el seguimiento de su envío o consultar el estado de su informe de ${service} simplemente haciendo clic en el botón de WhatsApp. Ella le proporcionará actualizaciones en tiempo real sobre su muestra proveniente de ${region}.`
    },
    {
      id: 'dfaq-4',
      question: `¿Cuánto tiempo tarda el proceso desde que envío mi muestra desde ${city}?`,
      answer: `El tiempo promedio para ${service} en la región ${region} es de 72 a 96 horas desde la recepción de la muestra en nuestro laboratorio. Una vez emitido el diagnóstico, usted recibirá una notificación inmediata en su celular para descargar su informe en formato PDF.`
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 bg-white rounded-[2.5rem] shadow-premium border border-slate-100 mt-16 px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-black text-nexus-void mb-8 tracking-tighter">
          Preguntas Frecuentes: <span className="text-clinical-blue">{service}</span> en {city}
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
                <span className={`text-2xl font-light transition-transform ${openIndex === idx ? 'rotate-45' : 'rotate-0'}`}>
                  +
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-slate-600 pb-4 leading-relaxed text-lg">
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
