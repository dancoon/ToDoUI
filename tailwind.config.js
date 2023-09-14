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
      },
    },
  },
  plugins: [],
}

