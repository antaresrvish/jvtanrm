/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colorText: '#111817',
        colorBackground: '#FFFFFF',
        colorPrimary: '#a3cbb9',
        colorSecondary: '#386e55',
        colorAccent: '#1A56DB'
      },
      fontFamily: {
        sans: [
          '"Inter var", sans-serif',
          {
            fontFeatureSettings: '"cv11", "ss01"',
            fontVariationSettings: '"opsz" 32'
          },
        ],
      },
    },
    
  },
  plugins: [],
}

