'use client';

import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import dynamic from 'next/dynamic';

const ChatbotVictoria = dynamic(() => import('@/components/public/ChatbotVictoria'), {
  ssr: false,
});

export default function ModuloChatbot() {
  return (
    <main className="min-h-screen bg-clinical-blue-light flex flex-col">
      <Header />
      
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="max-w-4xl w-full glass-card elite-shadow p-8 text-center space-y-6 flex flex-col items-center">
            <div className="w-20 h-20 bg-nexus-void rounded-full flex items-center justify-center border-2 border-cyan-pulse animate-pulse-aura">
                <svg className="w-10 h-10 text-cyan-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
            
            <h1 className="text-3xl font-black text-primary tracking-tight">
                Sentinel-V: Unidad de Despacho
            </h1>
            
            <p className="text-lg text-text/80 max-w-2xl">
                Bienvenido al núcleo de asistencia avanzada de JC PATH LAB. Nuestra IA coordinará su consulta, agendamiento de biopsias y entrega de resultados con precisión clínica.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="p-4 bg-white/50 rounded-xl border border-white/40 flex flex-col items-center gap-2">
                    <span className="text-2xl">🩺</span>
                    <span className="font-bold text-primary">Agendamiento Directo</span>
                </div>
                <div className="p-4 bg-white/50 rounded-xl border border-white/40 flex flex-col items-center gap-2">
                    <span className="text-2xl">📋</span>
                    <span className="font-bold text-primary">Estado de Resultados</span>
                </div>
            </div>

            <div className="pt-4">
                <p className="text-sm text-secondary font-bold uppercase tracking-widest animate-pulse">
                    Haga clic en el botón flotante para iniciar la interfaz
                </p>
            </div>
        </div>
      </div>

      <ChatbotVictoria />
      <Footer />
    </main>
  );
}
