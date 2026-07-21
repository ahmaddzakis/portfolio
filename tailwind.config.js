/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./assets/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          emerald: '#10B981',
          darkGreen: '#059669',
          dark: '#0F0F0F',
          surface: '#161616',
          border: '#222222',
        },
      },
    },
  },
  plugins: [],
}
