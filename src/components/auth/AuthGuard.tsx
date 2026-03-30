'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for both cookie and localStorage for redundant security
    const authCookie = document.cookie.split('; ').find(row => row.startsWith('auth='));
    const authStatus = localStorage.getItem('isAuthenticated');

    if (!authCookie || authStatus !== 'true') {
      setIsAuthenticated(false);
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Optionally show a loading state while checking to avoid flashing
  if (isAuthenticated === null) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center">
          <div className="w-[3rem] h-[3rem] border-4 border-[#003d63]/20 border-t-[#003d63] rounded-full animate-spin mb-[1.5rem]" />
          <p className="text-[0.7rem] font-black text-[#003d63] uppercase tracking-[0.3em]">Verificando Credenciales de Grado Militar...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}
