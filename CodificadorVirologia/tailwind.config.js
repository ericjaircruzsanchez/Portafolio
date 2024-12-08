/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'mobile': '300px',
        'laptop' : '1150px'
      }
    },
  },
  plugins: [],
}

