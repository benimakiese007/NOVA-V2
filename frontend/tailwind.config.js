/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/index.html",
    "./src/pages/**/*.{html,js}",
    "./src/services/**/*.js",
    "./src/components/**/*.{html,js}",
    "./public/components/**/*.{html,js}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

