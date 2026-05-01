import Link from 'next/link';
import React from 'react';
import { NAV_LINKS } from '@/data/publicContent';

const FooterLink = React.memo(({ link }: { link: typeof NAV_LINKS[0] }) => (
  <li>
    <Link href={link.href} className="hover:text-cyan-pulse transition-all flex items-center group relative overflow-hidden w-max">
      <span className="w-0 h-[2px] bg-cyan-pulse mr-0 group-hover:w-4 group-hover:mr-3 transition-all duration-300"></span>
      {link.name}
    </Link>
  </li>
));

FooterLink.displayName = 'FooterLink';

export default function Footer() {
  return (
    <footer className="footer-nexus bg-nexus-void text-slate-400 py-[8rem] border-t border-white/10 relative overflow-hidden">
      {/* Footer Accent - O(1) impact */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-clinical-blue/15 rounded-full blur-[150px] -z-10 animate-pulse-aura"></div>
      
      <div className="max-w-[1700px] mx-auto px-[1.5rem] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[5rem] mb-[5rem]">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-4 text-white mb-8 group cursor-default">
              <div className="w-12 h-12 bg-white text-clinical-blue rounded-2xl flex items-center justify-center shadow-elite border border-white/20 group-hover:bg-clinical-blue group-hover:text-white transition-all duration-700 shadow-glow-cyan">
                <svg className="h-7 w-7 transition-transform group-hover:rotate-12 duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tighter font-outfit">JC PATH <span className="text-transparent bg-clip-text bg-gradient-to-r from-clinical-blue to-cyan-pulse italic">LAB</span></span>
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
                <span className="mr-4 text-clinical-blue font-black opacity-60">01</span>
                <span className="leading-relaxed opacity-80">Mz M2 lote 13 Jardines de Chillón<br />Puente Piedra, Lima - Perú</span>
              </li>
              <li className="flex items-start">
                <span className="mr-4 text-clinical-blue font-black opacity-60">02</span>
                <span className="leading-relaxed opacity-80">Lun - Sáb: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-[0.7rem] uppercase tracking-[0.4em] mb-8">Contacto Elite</h4>
            <ul className="space-y-4 text-[0.95rem] font-medium">
              <li className="flex items-center group hover:bg-white/5 p-2 -ml-2 rounded-xl transition-colors cursor-default">
                <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mr-4 group-hover:bg-clinical-blue group-hover:text-white group-hover:shadow-glow-blue transition-all duration-500">
                    📞
                </span>
                <span className="text-white font-black tracking-widest transition-colors group-hover:text-cyan-pulse">986 396 733</span>
              </li>
              <li className="flex items-center group hover:bg-white/5 p-2 -ml-2 rounded-xl transition-colors cursor-default">
                <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mr-4 group-hover:bg-clinical-blue group-hover:text-white group-hover:shadow-glow-blue transition-all duration-500">
                    ✉️
                </span>
                <span className="opacity-80 group-hover:opacity-100 transition-opacity">jclab59@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center text-[0.65rem] uppercase font-black tracking-[0.3em] overflow-hidden">
          <p className="opacity-50 tracking-widest">© {new Date().getFullYear()} JC PATH LAB • Engineered for Precision.</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-10 mt-6 md:mt-0">
            <Link href="/directorio-nacional" className="text-slate-500 hover:text-clinical-blue transition-all flex items-center group">
              <span className="mr-3 opacity-50 group-hover:opacity-100 transition-opacity group-hover:scale-110">🌐</span> 
              <span className="opacity-60 group-hover:opacity-100 transition-opacity">Directorio Nacional 1,979 Nodos</span>
            </Link>
            <Link href="/admin" className="text-slate-500 hover:text-cyan-pulse transition-all flex items-center group">
              <span className="mr-3 opacity-50 group-hover:opacity-100 transition-opacity group-hover:scale-110">🔐</span> 
              <span className="opacity-60 group-hover:opacity-100 transition-opacity">Admin Control Center</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
