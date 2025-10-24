/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Public Sans', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      colors: {
        'usda-blue': '#002d54',
        'usda-teal': '#00a69c',
        'usda-light-gray': '#f0f0f0',
        'usda-medium-gray': '#e0e0e0',
        'usda-dark-gray': '#a9aeb1',
        'usda-link': '#0071bc',
      }
    },
  },
  plugins: [],
}
