// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'lol-gold': {
          DEFAULT: '#C89B3C', // Oro principal
          dark: '#785A28',    // Oro oscuro para sombras/bordes
          light: '#F0E6D2',  // Color papiro/texto claro
        },
        'lol-blue': {
          dark: '#010A13',   // Azul casi negro para fondos
          medium: '#0A1428', // Azul oscuro para UI
          accent: '#0BC6E3',  // Cian Hextech para acentos
        },
      },
      fontFamily: {
        // Usa 'Cinzel' como una alternativa gratuita y similar a la fuente de LoL (Beaufort)
        // Para el cuerpo, 'Roboto' es una opción limpia y legible.
        display: ['Cinzel', 'serif'],
        body: ['Roboto', 'sans-serif'],
      },
      // Añadimos un text-shadow personalizado para ese efecto "épico"
      textShadow: {
        'default': '0 2px 4px rgba(0, 0, 0, 0.5)',
        'md': '0 4px 8px rgba(0, 0, 0, 0.7)',
        'lg': '0 6px 12px rgba(0, 0, 0, 0.8)',
      },
    },
  },
  // Plugin para usar la utilidad de text-shadow
  plugins: [
    require('tailwindcss-textshadow'),
    require('@tailwindcss/aspect-ratio'), // <-- AÑADÍ ESTA LÍNEA

  ],
};