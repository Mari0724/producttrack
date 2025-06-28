/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wine-dark': '#811D28',
        'gray-light': '#D3D3D3',
        'gray-dark': '#333333',
        'mustard-yellow': '#FFBA21',
        'olive-green': '#495E2C',
        'white-pure': '#FFFFFF',
      },
    },
  },
  plugins: [],
}
