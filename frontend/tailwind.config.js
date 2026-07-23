/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ── AUMANA Luxury Palette ────────────────────────── */
        ivory: {
          DEFAULT: '#F3EFE8',   /* Luxury Ivory */
          warm: '#EAE3D8',      /* Soft Cream */
        },
        linen: {
          DEFAULT: '#DDD2C2',   /* Soft Warm Beige */
          light: '#EAE3D8',
          lighter: '#F3EFE8',
        },
        taupe: {
          DEFAULT: '#736452',   /* Muted Taupe */
          light: '#8B7B68',     /* Warm Gray Border */
          dark: '#5C4D3D',      /* Deep Mocha */
        },
        gold: {
          DEFAULT: '#9D8668',   /* Gold-Taupe Accent */
          light: '#8B7B68',     /* Warm Gray */
          dark: '#736452',      /* Muted Taupe */
          darker: '#5C4D3D',    /* Deep Mocha */
        },
        mocha: {
          DEFAULT: '#5C4D3D',   /* Deep Mocha */
          light: '#736452',
        },
        luxury: {
          black: '#050505',     /* Luxury Black */
          dark: '#1A1A1A',      /* Charcoal */
          charcoal: '#5C4D3D',
          taupe: '#736452',
          smoke: '#8B7B68',
        },
        beige: {
          DEFAULT: '#F3EFE8',
          dark: '#DDD2C2',
        },
        cream: '#F3EFE8',
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        montserrat: ['Montserrat', 'system-ui', 'sans-serif'],
        mytupi: ['Mytupi', 'serif'],
        nexa: ['Nexa', 'sans-serif'],
        times: ['"Times New Roman"', 'Times', 'serif'],
      },
      fontSize: {
        'display-xl': ['5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['4rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.25' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        section: '6rem',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #9D8668 0%, #736452 50%, #5C4D3D 100%)',
        'gold-shine': 'linear-gradient(105deg, #5C4D3D 0%, #9D8668 40%, #DDD2C2 60%, #9D8668 80%, #5C4D3D 100%)',
        'dark-gradient': 'linear-gradient(180deg, #050505 0%, #1A1A1A 100%)',
        'warm-gradient': 'linear-gradient(135deg, #050505 0%, #5C4D3D 100%)',
        'hero-overlay': 'linear-gradient(to bottom, rgba(5,5,5,0.15) 0%, rgba(5,5,5,0.72) 100%)',
        'pearl-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #F3EFE8 100%)',
        'linen-gradient': 'linear-gradient(180deg, #F3EFE8 0%, #DDD2C2 100%)',
      },
      boxShadow: {
        'gold': '0 4px 24px rgba(157,134,104,0.25)',
        'gold-lg': '0 8px 48px rgba(157,134,104,0.35)',
        'luxury': '0 8px 40px rgba(5,5,5,0.30)',
        'luxury-lg': '0 16px 64px rgba(5,5,5,0.40)',
        'card': '0 2px 16px rgba(26,26,26,0.07)',
        'card-hover': '0 8px 32px rgba(26,26,26,0.12)',
        'warm': '0 4px 24px rgba(157,134,104,0.25)',
        'warm-lg': '0 12px 48px rgba(157,134,104,0.35)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
        800: '800ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'slide-left': 'slideLeft 0.6s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(157,134,104,0.35)' },
          '50%': { boxShadow: '0 0 0 12px rgba(157,134,104,0)' },
        },
      },
    },
  },
  plugins: [],
}
