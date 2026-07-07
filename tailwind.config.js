/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#FD8D39',
          dark: '#E67722',
          light: '#FFA85C',
        },
        navy: {
          DEFAULT: '#1B2A4A',
          light: '#2A3E63',
          dark: '#111C33',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'mesh-hero':
          'radial-gradient(60% 60% at 15% 20%, rgba(253,141,57,0.35) 0%, rgba(253,141,57,0) 60%), radial-gradient(50% 50% at 85% 15%, rgba(253,141,57,0.20) 0%, rgba(253,141,57,0) 60%), linear-gradient(180deg, #111C33 0%, #1B2A4A 55%, #1B2A4A 100%)',
        'grid-pattern':
          'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(253,141,57,0.4), 0 0 24px rgba(253,141,57,0.35)',
        'glow-lg': '0 0 0 1px rgba(253,141,57,0.55), 0 0 48px rgba(253,141,57,0.45)',
        'navy-glow': '0 0 0 1px rgba(27,42,74,0.5), 0 8px 32px rgba(27,42,74,0.35)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(253,141,57,0.55)' },
          '50%': { boxShadow: '0 0 0 8px rgba(253,141,57,0)' },
        },
        'pulse-glow-alert': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(220,68,68,0.55)' },
          '50%': { boxShadow: '0 0 0 10px rgba(220,68,68,0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translate(-16px, 8px)' },
          '100%': { opacity: '1', transform: 'translate(0, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        'draw-circle': {
          to: { strokeDashoffset: '0' },
        },
        'draw-check': {
          to: { strokeDashoffset: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-glow': 'pulse-glow 2s ease-out infinite',
        'pulse-glow-alert': 'pulse-glow-alert 1.2s ease-out infinite',
        'slide-in-left': 'slide-in-left 0.4s ease-out forwards',
        float: 'float 7s ease-in-out infinite',
        'draw-circle': 'draw-circle 0.6s ease forwards',
        'draw-check': 'draw-check 0.35s 0.5s ease forwards',
      },
    },
  },
  plugins: [],
}
