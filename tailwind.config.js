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
        darkBg: '#0F172A', // Slate 900
        darkCard: 'rgba(30, 41, 59, 0.45)', // Glassmorphism backdrop-blur
        accent: {
          primary: '#2563EB', // Blue 600
          hover: '#1D4ED8', // Blue 700
          light: '#3B82F6',
        },
        success: '#22C55E', // Green 500
        danger: '#EF4444', // Red 500
        warning: '#F59E0B', // Amber 500
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-glow': '0 0 20px 0 rgba(37, 99, 235, 0.15)',
        'glow-green': '0 0 15px 0 rgba(34, 197, 94, 0.25)',
        'glow-red': '0 0 15px 0 rgba(239, 68, 68, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
