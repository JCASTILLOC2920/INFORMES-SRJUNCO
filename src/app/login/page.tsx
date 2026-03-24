'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Using requested credentials
    if (username === 'josehpcastillo' && password === '41457466') {
      localStorage.setItem('isAuthenticated', 'true');
      document.cookie = "auth=true; path=/";
      router.push('/admin');
    } else {
      setError('Credenciales incorrectas. Verifique e intente de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl p-12 border border-gray-100 animate-fade-in">
        <div className="text-center mb-10">
          <div className="bg-clinical-blue-deep w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Acceso Médico</h1>
          <p className="text-gray-400 text-sm font-medium mt-2">Portal Interno JC PATH LAB</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Usuario</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-clinical-blue/5 focus:border-clinical-blue transition-all outline-none font-medium text-gray-900" 
              placeholder="nombre_usuario"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-clinical-blue/5 focus:border-clinical-blue transition-all outline-none font-medium text-gray-900" 
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-500 text-xs font-bold text-center animate-pulse">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-clinical-blue-deep hover:bg-gray-900 text-white font-black py-5 rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 uppercase tracking-widest text-sm"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="text-center text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-12">
          Encriptación de Grado Clínico Activa
        </p>
      </div>
    </div>
  );
}
