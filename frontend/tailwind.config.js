/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#008751',
        gold: '#F5A623',
        dark: '#1A1A2E',
      },
    },
  },
  plugins: [],
}