import Link from 'next/link';
import React from 'react';
import { NAV_LINKS } from '@/data/publicContent';

const FooterLink = React.memo(({ link }: { link: typeof NAV_LINKS[0] }) => (
  <li>
    <Link href={link.href} className="hover:text-[var(--cyan-pulse)] transition-all flex items-center group">
      <span className="w-0 h-[2px] bg-[var(--cyan-pulse)] mr-0 group-hover:w-3 group-hover:mr-3 transition-all"></span>
      {link.name}
    </Link>
  </li>
));

FooterLink.displayName = 'FooterLink';

export default function Footer() {
  return (
    <footer className="footer-nexus bg-[var(--nexus-void)] text-gray-400 py-[8rem] border-t border-white/5 relative overflow-hidden">
      {/* Footer Accent - O(1) impact */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-[var(--secondary)]/10 rounded-full blur-[150px] -z-10 animate-pulse-aura"></div>
      
      <div className="max-w-[1700px] mx-auto px-[1.5rem] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[5rem] mb-[5rem]">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-4 text-white mb-8 group">
              <div className="w-12 h-12 bg-white text-[var(--secondary)] rounded-2xl flex items-center justify-center shadow-2xl border border-[var(--secondary)]/10 group-hover:bg-[var(--secondary)] group-hover:text-white transition-all duration-700">
                <svg className="h-7 w-7 transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tighter italic">JC PATH <span className="text-[var(--secondary)]">LAB</span></span>
            </div>
            <p className="text-[0.95rem] leading-relaxed mb-8 font-medium opacity-60">
              Ingeniería diagnóstica de precisión bajo estándares globales en anatomía patológica y citología especializada.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-black text-[0.7rem] uppercase tracking-[0.4em] mb-8">Estrategia</h4>
            <ul className="space-y-4 text-[0.95rem] font-medium">
              {NAV_LINKS.map(link => (
                <FooterLink key={link.name} link={link} />
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-[0.7rem] uppercase tracking-[0.4em] mb-8">Ubicación Norte</h4>
            <ul className="space-y-5 text-[0.95rem] font-medium">
              <li className="flex items-start">
                <span className="mr-4 text-[var(--secondary)] font-black opacity-40">01</span>
                <span className="leading-relaxed opacity-60">Mz M2 lote 13 Jardines de Chillón<br />Puente Piedra, Lima - Perú</span>
              </li>
              <li className="flex items-start">
                <span className="mr-4 text-[var(--secondary)] font-black opacity-40">02</span>
                <span className="leading-relaxed opacity-60">Lun - Sáb: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-[0.7rem] uppercase tracking-[0.4em] mb-8">Contacto Elite</h4>
            <ul className="space-y-4 text-[0.95rem] font-medium">
              <li className="flex items-center group">
                <span className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mr-4 group-hover:bg-[var(--secondary)] group-hover:text-white transition-all duration-500">
                    📞
                </span>
                <span className="text-white font-black tracking-tight transition-colors group-hover:text-[var(--secondary)]">986 396 733</span>
              </li>
              <li className="flex items-center group">
                <span className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mr-4 group-hover:bg-[var(--secondary)] group-hover:text-white transition-all duration-500">
                    ✉️
                </span>
                <span className="opacity-60 group-hover:opacity-100 transition-opacity">jclab59@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center text-[0.65rem] uppercase font-black tracking-[0.3em] overflow-hidden">
          <p className="opacity-30">© {new Date().getFullYear()} JC PATH LAB • Engineered for Precision.</p>
          <div className="flex space-x-10 mt-6 md:mt-0">
            <Link href="/admin" className="text-gray-500 hover:text-[var(--secondary)] transition-all flex items-center group">
              <span className="mr-3 opacity-50 group-hover:opacity-100 transition-opacity">🔐</span> 
              <span className="opacity-50 group-hover:opacity-100 transition-opacity">Admin Control Center</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
