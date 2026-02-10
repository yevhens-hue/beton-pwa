/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0D0D0D",
        surface: "#1A1A1A",
        primary: "#E2FF00",
        secondary: "#E2FF00",
        accent: "#6366F1",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        }
      }
    },
  },
  plugins: [],
}
