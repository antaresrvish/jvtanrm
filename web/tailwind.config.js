/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colorText: '#e9f0ec',
        colorBackground: '#1d2420',
        colorPrimary: '#a3cbb9',
        colorSecondary: '#386e55',
        colorAccent: '#55b387'
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

