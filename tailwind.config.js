/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  // mode: 'jit',
  // purge: [
  //   './src/**/*.html',
  //   './src/**/*.js',
  // ],
  // darkMode: false,
  theme: {
    extend: {},
  },
  // variants: {
  //   extend: {},
  // },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
