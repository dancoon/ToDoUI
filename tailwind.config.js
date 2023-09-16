/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "index.html",
    "./public/**/*.js",
],
  theme: {
    extend: {
      colors: {
        'coal': "#353a40",
        'purple': "#6841da",
        'dark': "#111B21",
        'gray': "#202C33",
        'blur': "#3f494f",
      },
    },
  },
  plugins: [],
}

