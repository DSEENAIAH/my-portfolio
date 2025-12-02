/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Clash Display', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#3b82f6', // Blue 500
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#6366f1', // Indigo 500
          foreground: '#ffffff',
        },
        dark: {
          DEFAULT: '#020617', // Slate 950 (Obsidian)
          200: '#0f172a', // Slate 900
          300: '#1e293b', // Slate 800
        },
        light: {
          DEFAULT: '#f8fafc', // Slate 50
          200: '#e2e8f0', // Slate 200
        },
        accent: {
          cyan: '#06b6d4', // Cyan 500
          purple: '#8b5cf6', // Violet 500
        }
      },
      animation: {
        'blob': 'blob 7s infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'reveal': 'reveal 1s cubic-bezier(0.77, 0, 0.175, 1) 0.5s forwards',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        reveal: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        }
      },
    },
  },
  plugins: [],
};
