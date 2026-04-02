import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import VictoriaGateway from "@/components/public/VictoriaGateway";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "JC PATH LAB | Laboratorio de Anatomía Patológica Especializada",
  description: "Diagnóstico anatomopatológico de alta precisión en Lima. Biopsias, Citología y Patología Molecular con entrega rápida y tecnología de vanguardia.",
  keywords: ["anatomía patológica", "biopsias", "citología", "papanicolaou", "patología molecular", "laboratorio clínico", "JC PATH LAB"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">

      <body className={inter.className}>
        {children}
        <VictoriaGateway />
      </body>
    </html>
  );
}
