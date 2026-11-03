/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        jet: '#000000',
        ivory: '#FFFFFF',
        gold: {
          DEFAULT: '#D4AF37',
          soft: '#E6C65C',
          deep: '#A8862A',
        },
      },
      fontFamily: {
        // Instrument Serif: a display serif drawn for large sizes with tight,
        // even letterfit and a strong italic (regular + italic only — headings
        // should not ask for weights above 400). Jost: geometric body/labels.
        display: ['"Instrument Serif"', '"Times New Roman"', 'Georgia', 'serif'],
        sans: ['Jost', 'Futura', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.35em',
      },
      minHeight: {
        touch: '44px',
      },
      minWidth: {
        touch: '44px',
      },
      boxShadow: {
        gold: '0 0 0 1px #D4AF37, 0 0 28px 2px rgba(212, 175, 55, 0.55)',
        'gold-soft': '0 0 20px rgba(212, 175, 55, 0.25)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      animation: {
        marquee: 'marquee 60s linear infinite',
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-gold': 'pulseGold 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
