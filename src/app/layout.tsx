import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import SocialProofWidget from "@/components/public/SocialProofWidget";
import PropagandaInjector from "@/components/public/PropagandaInjector";
import PWAInstallBanner from "@/components/public/PWAInstallBanner";
import FloatingWhatsAppHub from "@/components/public/FloatingWhatsAppHub";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL = "https://informes-srjunco.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "JC PATH LAB | Laboratorio de Anatomía Patológica #1 en Lima Norte",
    template: "%s | JC PATH LAB - Anatomía Patológica",
  },
  description:
    "Laboratorio de Anatomía Patológica de alta precisión en Lima Norte. Expertos en Biopsias, Citología, Papanicolaou e Inmunohistoquímica en Puente Piedra. Resultados certificados en 3-4 días hábiles. +50,000 diagnósticos oncológicos realizados. Reserve al 986 396 733.",
  keywords: [
    "páginas de anatomía patológica",
    "laboratorio de anatomía patológica",
    "laboratorio de anatomía patológica lima",
    "laboratorio patología Perú",
    "biopsia Trujillo",
    "papanicolaou Arequipa",
    "citología Cusco",
    "inmunohistoquímica envío nacional",
    "resultados biopsia rápidos Perú",
    "laboratorio oncológico nacional",
    "diagnóstico oncológico patológico",
    "JC PATH LAB anatomía patológica Perú"
  ],
  authors: [{ name: "JC PATH LAB - Centro Especializado de Patología", url: SITE_URL }],
  creator: "JC PATH LAB",
  publisher: "JC PATH LAB",
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: SITE_URL,
    siteName: "JC PATH LAB - Especialistas en Anatomía Patológica Nacional",
    title: "JC PATH LAB | Laboratorio de Anatomía Patológica #1 en TODO EL PERÚ",
    description:
      "Líder en Diagnóstico de Anatomía Patológica a nivel NACIONAL. Recibimos muestras de todas las provincias del Perú. Biopsias, Citología e Inmunohistoquímica con tecnología de punta.",
    images: [
      {
        url: `${SITE_URL}/hero-bg.jpg`,
        width: 1200,
        height: 630,
        alt: "JC PATH LAB - Laboratorio de Anatomía Patológica en Lima Norte",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JC PATH LAB | Patología de Precisión en Lima Norte",
    description:
      "Biopsias, Papanicolaou e Inmunohistoquímica en Puente Piedra. Resultados en 3-4 días. +50,000 diagnósticos.",
    images: [`${SITE_URL}/hero-bg.jpg`],
  },
  verification: {
    google: "PENDING_VERIFICATION_CODE",
  },
  category: "health",
};

// JSON-LD Schemas — MedicalLaboratory + LocalBusiness + FAQPage
const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["MedicalOrganization", "LocalBusiness", "MedicalClinic"],
      "@id": `${SITE_URL}/#organization`,
      name: "JC PATH LAB - Laboratorio de Anatomía Patológica",
      alternateName: "JC PATH LAB Patología",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.webp`,
        width: 180,
        height: 60,
      },
      image: `${SITE_URL}/hero-bg.jpg`,
      description:
        "Laboratorio de Anatomía Patológica especializado en diagnóstico de cáncer y enfermedades tisulares en Lima Norte. Realizamos Biopsias, Citología Oncológica e Inmunohistoquímica con máxima precisión médica.",
      telephone: "+51986396733",
      email: "jclab59@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Mz M2 lote 13 Jardines de Chillón",
        addressLocality: "Puente Piedra",
        addressRegion: "Lima",
        postalCode: "15114",
        addressCountry: "PE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -11.859,
        longitude: -77.079,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      priceRange: "S/ 80 - S/ 350",
      currenciesAccepted: "PEN",
      paymentAccepted: "Efectivo, Yape, Plin, Transferencia bancaria",
      areaServed: [
        { "@type": "City", name: "Trujillo" },
        { "@type": "City", name: "Arequipa" },
        { "@type": "City", name: "Cusco" },
        { "@type": "City", name: "Iquitos" },
        { "@type": "City", name: "Piura" },
        { "@type": "City", name: "Chiclayo" },
        { "@type": "City", name: "Huancayo" },
        { "@type": "City", name: "Lima Norte" },
        { "@type": "Country", name: "Perú" }
      ],
      hasMap: "https://maps.google.com/?q=Jardines+de+Chillon+Puente+Piedra+Lima",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "5000",
        bestRating: "5",
        worstRating: "1",
      },
      medicalSpecialty: [
        "Anatomical Pathology",
        "Cytopathology",
        "Surgical Pathology",
        "Immunohistochemistry",
      ],
      availableService: [
        { "@type": "MedicalTest", name: "Biopsia Gástrica", description: "Diagnóstico histopatológico de tejido gástrico" },
        { "@type": "MedicalTest", name: "Papanicolaou", description: "Citología cervical para despistaje de cáncer" },
        { "@type": "MedicalTest", name: "Inmunohistoquímica", description: "Paneles de marcadores tumorales para diagnóstico oncológico" },
        { "@type": "MedicalTest", name: "Biopsia de Próstata", description: "Estudio histopatológico de tejido prostático" },
        { "@type": "MedicalTest", name: "Biopsia de Piel", description: "Diagnóstico dermatopatológico especializado" },
      ],
      sameAs: [],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Cuánto tiempo tardan los resultados de biopsia en Lima?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "En JC PATH LAB entregamos los resultados de biopsia en 3 a 4 días hábiles, uno de los tiempos más rápidos en Lima Norte. Para biopsias urgentes, contáctenos al 986 396 733.",
          },
        },
        {
          "@type": "Question",
          name: "¿Dónde hacerse un Papanicolaou en Puente Piedra?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "JC PATH LAB está ubicado en Mz M2 lote 13 Jardines de Chillón, Puente Piedra. Realizamos Papanicolaou con tecnología avanzada y entregamos resultados en 3-4 días. Atendemos de Lunes a Sábado de 9:00 AM a 6:00 PM.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuánto cuesta una biopsia en Lima Norte?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "En JC PATH LAB, las biopsias tienen precios desde S/ 80 (biopsia gástrica). Contamos con los precios más competitivos de Lima Norte sin sacrificar calidad. Llame al 986 396 733 para más información.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué es la Inmunohistoquímica y para qué sirve?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La Inmunohistoquímica es una técnica especializada que permite identificar proteínas específicas en tejidos mediante anticuerpos. Es fundamental para caracterizar tumores y definir el tratamiento oncológico más adecuado. JC PATH LAB ofrece paneles completos de marcadores tumorales.",
          },
        },
        {
          "@type": "Question",
          name: "¿Hacen envíos de biopsias desde provincias a Lima?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí, en JC PATH LAB recibimos muestras de todo el Perú. Atendemos envíos nacionales de biopsias, láminas de Papanicolaou y bloques de parafina para Inmunohistoquímica. Coordinamos con su courier de confianza para recibir su muestra en Lima.",
          },
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "JC PATH LAB",
      description: "Laboratorio de Anatomía Patológica en Lima Norte",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "es-PE",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <meta name="geo.region" content="PE-LIM" />
         <meta name="geo.placename" content="Puente Piedra, Lima, Perú" />
        <meta name="geo.position" content="-11.859;-77.079" />
        <meta name="ICBM" content="-11.859, -77.079" />
        <meta name="theme-color" content="#001B2E" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="manifest" href="/manifest.json" />
        <Script
          id="json-ld-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        {children}
        <SocialProofWidget />
        <PropagandaInjector />
        <PWAInstallBanner />
        <FloatingWhatsAppHub />
        {/* VICTORIA ASISTENTE B2B */}
        <link rel="stylesheet" href="/modulo_chat/chat.css" />
        <Script src="/modulo_chat/config.js" strategy="lazyOnload" />
        <Script src="/modulo_chat/chat.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
