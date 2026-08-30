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
        },
        charcoal: {
          deep: "#121417",
          card: "#1A1D22",
        },
        cream: {
          warm: "#FAF8F5",
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
