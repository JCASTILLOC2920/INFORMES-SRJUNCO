/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Next.js 15 defaults should handle the 'src' folder automatically,
  // but we ensure common features are enabled for the clinical portal.
  images: {
    unoptimized: true, // For Vercel/Supabase image handling if needed
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
