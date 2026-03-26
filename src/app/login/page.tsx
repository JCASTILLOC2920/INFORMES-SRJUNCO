'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Small artificial delay for "activation" feel
    await new Promise(resolve => setTimeout(resolve, 500));

    // Using requested credentials
    if (username === 'josehpcastillo' && password === '41457466') {
      localStorage.setItem('isAuthenticated', 'true');
      document.cookie = "auth=true; path=/; SameSite=Lax";
      window.location.href = '/admin';
    } else {
      setError('Credenciales incorrectas. Verifique e intente de nuevo.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-[1.5rem] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10rem] left-[-10rem] w-[30rem] h-[30rem] bg-[#008de3]/5 rounded-full blur-[8rem]"></div>
      <div className="absolute bottom-[-10rem] right-[-10rem] w-[25rem] h-[25rem] bg-[#003d63]/5 rounded-full blur-[6rem]"></div>

      <div className="max-w-[28rem] w-full bg-white/70 backdrop-blur-2xl rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.05)] p-[3rem] border border-white/50 animate-fade-in relative z-10">
        <div className="text-center mb-[2.5rem]">
          <div className="bg-[#003d63] w-[4rem] h-[4rem] rounded-[1.25rem] flex items-center justify-center text-white mx-auto mb-[1.5rem] shadow-[0_15px_30px_rgba(0,61,99,0.2)]">
            <svg className="w-[1.75rem] h-[1.75rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-[1.75rem] font-black text-[#003d63] tracking-tighter italic">Acceso Médico</h1>
          <p className="text-gray-400 text-[0.7rem] font-black uppercase tracking-[0.2em] mt-[0.5rem]">Portal Interno Precision</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-[1.5rem]">
          <div className="space-y-[0.5rem]">
            <label className="block text-[0.625rem] font-black text-gray-400 uppercase tracking-widest ml-[0.25rem]">Usuario</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-[1.5rem] py-[1rem] bg-gray-50/50 border border-gray-100 rounded-[1.25rem] focus:ring-4 focus:ring-[#008de3]/5 focus:border-[#008de3] transition-all outline-none font-medium text-gray-900" 
              placeholder="nombre_usuario"
              required
            />
          </div>
          <div className="space-y-[0.5rem] relative">
            <label className="block text-[0.625rem] font-black text-gray-400 uppercase tracking-widest ml-[0.25rem]">Contraseña</label>
            <div className="relative group">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-[1.5rem] py-[1rem] bg-gray-50/50 border border-gray-100 rounded-[1.25rem] focus:ring-4 focus:ring-[#008de3]/5 focus:border-[#008de3] transition-all outline-none font-medium text-gray-900 pr-[3.5rem]" 
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-[1rem] top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#008de3] transition-colors p-[0.5rem]"
              >
                {showPassword ? (
                  <svg className="w-[1.25rem] h-[1.25rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-[1.25rem] h-[1.25rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-[0.7rem] font-black text-center animate-pulse uppercase tracking-wider">{error}</p>}

          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#003d63] hover:bg-[#008de3] text-white font-black py-[1.25rem] rounded-[1.25rem] shadow-[0_10px_30px_rgba(0,61,99,0.15)] transition-all transform active:scale-95 uppercase tracking-[0.2em] text-[0.75rem] flex items-center justify-center space-x-[0.75rem] ${isLoading ? 'opacity-70 cursor-not-allowed translate-y-0' : 'hover:-translate-y-1'}`}
          >
            {isLoading ? (
              <>
                <div className="w-[1rem] h-[1rem] border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>AUTENTICANDO...</span>
              </>
            ) : (
              <span>Entrar al Centro</span>
            )}
          </button>
        </form>

        <div className="mt-[3rem] pt-[2rem] border-t border-gray-100/50 flex flex-col items-center">
             <p className="text-[0.6rem] text-gray-300 font-black uppercase tracking-[0.3em] mb-[1rem]">JC PATH LAB • Seguridad</p>
             <div className="flex space-x-[0.5rem]">
                <div className="w-[0.4rem] h-[0.4rem] bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-[0.4rem] h-[0.4rem] bg-green-400 rounded-full animate-pulse opacity-60"></div>
                <div className="w-[0.4rem] h-[0.4rem] bg-green-400 rounded-full animate-pulse opacity-30"></div>
             </div>
        </div>
      </div>
    </div>
  );
}
