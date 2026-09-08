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
          hover: "#b5966c",
          light: "#E5D4BC",
        },
        charcoal: {
          deep: "#121417",
          card: "#1A1D22",
          surface: "#22262C",
        },
        cream: {
          warm: "#FAF8F5",
          soft: "#F4F1EA",
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
