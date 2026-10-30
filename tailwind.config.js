/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        anton: ['"Anton"', 'sans-serif'],
        archivo: ['"Archivo Black"', 'sans-serif'],
        spartan: ['"League Spartan"', 'sans-serif'],
        sora: ['"Sora"', 'sans-serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
      },
      colors: {
        brandRed: '#B8001F',
        brandRedDeep: '#9E001A',
        creamWhite: '#FFF3E3',
      },
    },
  },
  plugins: [],
};
