'use client';

import React, { useState, useEffect } from 'react';

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Mostrar banner después de 10 segundos de navegación
      setTimeout(() => setShowBanner(true), 10000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the PWA install');
    }
    setDeferredPrompt(null);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-36 right-8 left-8 md:left-auto md:w-96 z-[9999] animate-bounce-in">
      <div className="bg-nexus-void border border-white/20 p-6 rounded-[2.5rem] shadow-premium-dark backdrop-blur-xl">
        <div className="flex gap-4">
          <div className="w-14 h-14 bg-clinical-blue rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 animate-pulse">
            📱
          </div>
          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-widest mb-1">Infiltración Móvil</h3>
            <p className="text-slate-300 text-xs font-medium leading-relaxed">
              Instale la App de JC PATH LAB para acceso instantáneo a sus resultados y consultas nacionales.
            </p>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button 
            onClick={handleInstall}
            className="flex-1 bg-clinical-blue text-white py-3 rounded-xl font-bold text-[0.7rem] uppercase tracking-widest hover:bg-cyan-pulse transition-all"
          >
            Instalar App
          </button>
          <button 
            onClick={() => setShowBanner(false)}
            className="px-4 py-3 text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
