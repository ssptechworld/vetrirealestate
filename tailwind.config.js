/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          accent: "#C5A880",
          hover: "#B5966C",
          light: "#E5D4BC",
          dark: "#9E825A",
          bright: "#D4AF37"
        },
        charcoal: {
          pure: "#0B0C0E",
          deep: "#121417",
          card: "#181B20",
          surface: "#20242B",
          border: "rgba(255, 255, 255, 0.1)"
        },
        cream: {
          warm: "#FAF8F5",
          soft: "#F4F1EA",
          darker: "#EBE6DC"
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        cinzel: ['Cinzel', 'Playfair Display', 'serif'],
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      scale: {
        '102': '1.02',
        '108': '1.08',
      }
    },
  },
  plugins: [],
}

