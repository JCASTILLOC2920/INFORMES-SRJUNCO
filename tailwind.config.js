module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'clinical-blue-deep': '#0a192f',
        'clinical-blue': '#0284c7',
        'clinical-blue-light': '#f0f9ff',
        'nexus-void': '#001b2e',
        'cyan-pulse': '#00e5ff',
        'premium-silver': '#f8fafc',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'], // For headings
      },
      boxShadow: {
        'elite': '0 20px 50px -10px rgba(0, 61, 99, 0.12), 0 8px 20px -6px rgba(0, 61, 99, 0.08)',
        'premium': '0 30px 60px -12px rgba(10, 25, 47, 0.15), 0 18px 36px -18px rgba(10, 25, 47, 0.1)',
        'glow-cyan': '0 0 20px rgba(0, 229, 255, 0.15)',
        'glow-blue': '0 0 25px rgba(2, 132, 199, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'clinical-gradient': 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        'glass-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.6) 100%)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-aura': 'pulse-aura 3s ease-in-out infinite',
        'reveal': 'reveal 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        'glow-pulse': 'glow-pulse 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-aura': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(0, 229, 255, 0.1)' },
          '50%': { boxShadow: '0 0 45px rgba(0, 229, 255, 0.25)' },
        },
        reveal: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(0, 229, 255, 0.2), 0 0 10px rgba(0, 229, 255, 0.1)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(0, 229, 255, 0.4), 0 0 30px rgba(0, 229, 255, 0.2)',
            transform: 'scale(1.02)'
          },
        }
      }
    },
  },
  plugins: [],
};
