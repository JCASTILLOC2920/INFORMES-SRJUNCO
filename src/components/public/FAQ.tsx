'use client';

import React, { useState } from 'react';

const faqs = [
  {
    id: 'faq-1',
    question: '¿Cuánto tiempo tardan los resultados de biopsia en Lima?',
    answer:
      'En JC PATH LAB entregamos los resultados de biopsia en 3 a 4 días hábiles, uno de los tiempos más rápidos en Lima Norte. Para biopsias urgentes, contáctenos al 986 396 733 y coordinamos la entrega prioritaria.',
  },
  {
    id: 'faq-2',
    question: '¿Dónde hacerse un Papanicolaou en Puente Piedra?',
    answer:
      'JC PATH LAB está ubicado en Mz M2 lote 13 Jardines de Chillón, Puente Piedra. Realizamos Papanicolaou con tecnología avanzada y entregamos resultados en 3-4 días. Atendemos de Lunes a Sábado de 9:00 AM a 6:00 PM. También realizamos recojo de muestras en Comas, Los Olivos y Carabayllo.',
  },
  {
    id: 'faq-3',
    question: '¿Cuánto cuesta una biopsia en Lima Norte?',
    answer:
      'En JC PATH LAB, las biopsias tienen precios desde S/ 80 (biopsia gástrica). Contamos con los precios más competitivos de Lima Norte sin sacrificar calidad. Llame al 986 396 733 o escriba a jclab59@gmail.com para recibir el tarifario completo.',
  },
  {
    id: 'faq-4',
    question: '¿Qué es la Inmunohistoquímica y para qué sirve?',
    answer:
      'La Inmunohistoquímica (IHQ) es una técnica especializada que permite identificar proteínas específicas en tejidos mediante anticuerpos marcados. Es fundamental para caracterizar tumores, determinar el origen de metástasis y definir el tratamiento oncológico más adecuado. JC PATH LAB ofrece paneles completos de marcadores tumorales con resultados de alta precisión.',
  },
  {
    id: 'faq-5',
    question: '¿JC PATH LAB hace recojo de muestras a domicilio?',
    answer:
      'Sí, ofrecemos servicio de recojo de muestras a domicilio en toda Lima Norte: Puente Piedra, Comas, Los Olivos, Carabayllo, Independencia y zonas aledañas. Contáctenos al 986 396 733 o al correo jclab59@gmail.com para coordinar la visita.',
  },
  {
    id: 'faq-6',
    question: '¿Es seguro realizarse una biopsia?',
    answer:
      'La biopsia es un procedimiento médico mínimamente invasivo con un altísimo perfil de seguridad cuando es realizado por profesionales especializados. En JC PATH LAB contamos con más de 15 años de experiencia y +50,000 estudios realizados, garantizando la máxima precisión y seguridad en cada diagnóstico.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="preguntas-frecuentes"
      className="py-[10rem] bg-[#F8FAFC] relative overflow-hidden"
      aria-labelledby="faq-heading"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] bg-[var(--secondary)]/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-[1700px] mx-auto px-[1.5rem]">
        {/* Header */}
        <div className="text-center mb-[5rem]">
          <span className="text-[var(--secondary)] font-black text-[0.7rem] uppercase tracking-[0.5em] mb-[1.5rem] block">
            Preguntas Frecuentes
          </span>
          <h2
            id="faq-heading"
            className="text-[2.2rem] sm:text-[3rem] md:text-[4rem] font-black text-[var(--nexus-void)] mb-[1.5rem] tracking-tighter leading-none italic"
          >
            Resolvemos tus <span className="text-gradient">Dudas</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-[1rem] leading-relaxed">
            Todo lo que necesitas saber sobre nuestros servicios de anatomía patológica, biopsias y citología en Puente Piedra, Lima Norte.
          </p>
          <div className="w-[8rem] h-[0.3rem] bg-gradient-to-r from-transparent via-[var(--cyan-pulse)] to-transparent mx-auto rounded-full opacity-40 mt-6" />
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-[1.5rem]">
          {faqs.map((faq, idx) => (
            <div
              key={faq.id}
              className="bg-white rounded-[1.5rem] border border-[var(--secondary)]/10 shadow-[0_4px_24px_rgba(0,31,63,0.04)] overflow-hidden transition-all duration-300"
            >
              <button
                id={faq.id}
                aria-expanded={openIndex === idx}
                aria-controls={`${faq.id}-answer`}
                className="w-full flex items-center justify-between p-[2rem] text-left group"
                onClick={() => toggle(idx)}
              >
                <span className="text-[1.05rem] font-black text-[var(--nexus-void)] group-hover:text-[var(--secondary)] transition-colors duration-300 pr-6 leading-snug">
                  {faq.question}
                </span>
                <span
                  className={`flex-shrink-0 w-10 h-10 rounded-xl bg-[var(--secondary)]/10 flex items-center justify-center text-[var(--secondary)] transition-all duration-500 ${
                    openIndex === idx ? 'rotate-45 bg-[var(--secondary)] text-white' : ''
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>

              <div
                id={`${faq.id}-answer`}
                role="region"
                aria-labelledby={faq.id}
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-[2rem] pb-[2rem] text-gray-600 text-[0.97rem] leading-relaxed border-t border-[var(--secondary)]/5 pt-[1.5rem]">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-[5rem]">
          <p className="text-gray-500 mb-6 text-[1rem]">
            ¿Tienes más preguntas? Nuestro equipo está disponible para ayudarte.
          </p>
          <a
            href="https://wa.me/51986396733?text=Hola,%20quisiera%20más%20información%20sobre%20sus%20servicios"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-[2.5rem] py-[1rem] bg-[#25D366] text-white rounded-2xl font-black text-[0.85rem] uppercase tracking-[0.15em] shadow-xl hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all transform hover:-translate-y-0.5 active:scale-95"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.49" />
            </svg>
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
