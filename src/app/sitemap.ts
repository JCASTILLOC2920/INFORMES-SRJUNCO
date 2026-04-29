import { MetadataRoute } from 'next';
import provincialData from '@/data/nacional.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const SITE_URL = 'https://informes-srjunco.vercel.app';
  
  // Rutas estáticas base
  const staticRoutes = [
    '',
    '/servicios',
    '/login',
    '/seguimiento',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  }));

  // Generación dinámica de rutas nacionales (Saturación Tri-Entidad)
  const types = ['nacional', 'b2b', 'urgencia'];
  const nationalRoutes = types.flatMap((type) => 
    provincialData.cities.flatMap((city) => 
      city.services.map((serviceId) => ({
        url: `${SITE_URL}/${type}/${city.id}-${serviceId}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: type === 'nacional' ? 0.9 : 0.7,
      }))
    )
  );

  return [...staticRoutes, ...nationalRoutes];
}
