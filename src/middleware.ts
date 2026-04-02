import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * JC PLATFORM - MIDDLEWARE DE SEGURIDAD (NIVEL ANTIGRAVITY)
 * Validación perimetral antes de que el servidor empiece el renderizado.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get('auth');
  
  // 1. Proteger rutas administrativas
  if (pathname.startsWith('/admin')) {
    if (!authCookie || authCookie.value !== 'true') {
      const url = new URL('/login', request.url);
      return NextResponse.redirect(url);
    }
  }

  // 2. Redirigir al dashboard si ya está autenticado y trata de ir al login
  if (pathname === '/login' && authCookie?.value === 'true') {
    const url = new URL('/admin', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Limitar el middleware a rutas relevantes para máximo rendimiento
export const config = {
  matcher: ['/admin/:path*', '/login'],
};
