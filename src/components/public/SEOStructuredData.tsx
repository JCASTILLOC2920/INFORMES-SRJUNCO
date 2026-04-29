'use client';

import React from 'react';

type SEOStructuredDataProps = {
  city: string;
  service: string;
  region: string;
  url: string;
  description: string;
};

export default function SEOStructuredData({ city, service, region, url, description }: SEOStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": "https://informes-srjunco.vercel.app/#organization",
        "name": `JC PATH LAB - Sede ${city}`,
        "url": url,
        "logo": "https://informes-srjunco.vercel.app/logo-circular.png",
        "image": "https://informes-srjunco.vercel.app/logo-circular.png",
        "description": description,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": city,
          "addressRegion": region,
          "addressCountry": "PE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "-11.8596",
          "longitude": "-77.0763"
        },
        "telephone": "+51986396733",
        "priceRange": "$$",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `¿Dónde realizan ${service} en ${city}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `JC PATH LAB ofrece servicios especializados de ${service} en ${city}. Contamos con recojo de muestras y diagnóstico experto por el Dr. Castillo.`
            }
          },
          {
            "@type": "Question",
            "name": `¿Cuánto tiempo tardan los resultados de ${service} en ${region}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Los resultados de ${service} se entregan en un plazo de 72 a 96 horas hábiles, con envío digital directo a su celular o médico tratante.`
            }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
