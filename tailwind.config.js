/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          base: '#080B14',
          surface: '#0D1322',
          card: 'rgba(16, 24, 39, 0.7)',
          border: 'rgba(0, 217, 255, 0.15)',
          'border-violet': 'rgba(139, 92, 246, 0.2)',
          highlight: 'rgba(255, 255, 255, 0.05)',
        },
        cyber: {
          cyan: '#00D9FF',
          'cyan-glow': 'rgba(0, 217, 255, 0.4)',
          violet: '#8B5CF6',
          'violet-glow': 'rgba(139, 92, 246, 0.4)',
          emerald: '#10B981',
          rose: '#F43F5E',
          amber: '#F59E0B',
        },
        light: {
          base: '#F1F5F9',
          surface: '#FFFFFF',
          card: 'rgba(255, 255, 255, 0.85)',
          border: 'rgba(148, 163, 184, 0.2)',
          text: '#0F172A',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        heading: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 20px -3px rgba(0, 217, 255, 0.35)',
        'neon-violet': '0 0 25px -4px rgba(139, 92, 246, 0.4)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-card-hover': '0 12px 40px 0 rgba(0, 217, 255, 0.15), 0 0 1px 1px rgba(0, 217, 255, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'glow-spin': 'spin 12s linear infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'wave': 'wave 15s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        wave: {
          '0%': { transform: 'translateX(0) translateZ(0) scaleY(1)' },
          '50%': { transform: 'translateX(-25%) translateZ(0) scaleY(1.05)' },
          '100%': { transform: 'translateX(-50%) translateZ(0) scaleY(1)' },
        }
      },
    },
  },
  plugins: [],
}
