/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  theme: {
    extend: {},
  },

  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
