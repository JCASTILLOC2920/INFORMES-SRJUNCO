import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 text-white mb-6">
              <svg className="h-8 w-8 text-clinical-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-2xl font-bold tracking-tight">JC PATH LAB</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Laboratorio líder en servicios de anatomía patológica, citología y diagnóstico especializado.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/" className="hover:text-clinical-blue transition-colors">Inicio</Link></li>
              <li><Link href="#servicios" className="hover:text-clinical-blue transition-colors">Servicios</Link></li>
              <li><Link href="/login" className="hover:text-clinical-blue transition-colors font-black text-clinical-blue-light uppercase tracking-tighter">Resultados en Línea</Link></li>
              <li><Link href="/login" className="hover:text-clinical-blue transition-colors font-black text-clinical-blue-light uppercase tracking-tighter">Portal Médico</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Atención Clínica</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <span className="mr-3 text-clinical-blue">🕒</span>
                <span>Lun - Vie: 9:00 AM - 6:00 PM<br />Sáb: 9:00 AM - 1:00 PM</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-clinical-blue">📍</span>
                <span>Mz M2 lote 13 Jardines de Chillón<br />Puente Piedra, Lima</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contacto</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center">
                <span className="mr-3 text-clinical-blue">📞</span>
                <span>986396733</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-clinical-blue">✉️</span>
                <span>jclab59@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>© 2024 JC PATH LAB. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Política de Privacidad</Link>
            <Link href="#" className="hover:text-white transition-colors">Términos de Servicio</Link>
            <Link href="/admin" className="text-gray-600 hover:text-clinical-blue transition-colors flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Acceso Personal (Intranet)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
