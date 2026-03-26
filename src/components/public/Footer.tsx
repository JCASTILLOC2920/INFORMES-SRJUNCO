import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#001b2b] text-gray-400 py-24 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-20 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 text-white mb-8">
              <div className="w-10 h-10 bg-[#008de3] rounded-xl flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tighter">JC PATH LAB</span>
            </div>
            <p className="text-sm leading-relaxed mb-8 font-medium">
              Ingeniería diagnóstica de precisión bajo estándares globales en anatomía patológica y citología especializada.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-8">Estrategia</h4>
            <ul className="space-y-5 text-sm font-medium">
              <li><Link href="/" className="hover:text-[#008de3] transition-all">Inicio</Link></li>
              <li><Link href="#servicios" className="hover:text-[#008de3] transition-all">Servicios</Link></li>
              <li><Link href="#contacto" className="hover:text-[#008de3] transition-all">Soporte Médico</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-8">Ubicación Norte</h4>
            <ul className="space-y-5 text-sm font-medium">
              <li className="flex items-start">
                <span className="mr-4 text-[#008de3] font-bold opacity-50">#01</span>
                <span className="leading-relaxed">Mz M2 lote 13 Jardines de Chillón<br />Puente Piedra, Lima - Perú</span>
              </li>
              <li className="flex items-start">
                <span className="mr-4 text-[#008de3] font-bold opacity-50">#02</span>
                <span className="leading-relaxed">Lun - Sáb: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-8">Contacto Elite</h4>
            <ul className="space-y-5 text-sm font-medium">
              <li className="flex items-center">
                <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mr-4 group-hover:bg-[#008de3] transition-all">📞</span>
                <span className="text-white font-bold">986 396 733</span>
              </li>
              <li className="flex items-center">
                <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mr-4">✉️</span>
                <span className="text-gray-400">jclab59@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase font-black tracking-widest">
          <p className="opacity-40">© 2024 JC PATH LAB • Engineered for Precision.</p>
          <div className="flex space-x-10 mt-6 md:mt-0">
            <Link href="/admin" className="text-gray-600 hover:text-[#008de3] transition-all flex items-center">
              <span className="mr-2">🔐</span> Admin Control Center
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
