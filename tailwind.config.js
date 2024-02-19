/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fav-icon': '#rgba(0, 0, 0, 0.5)',
        'fav-icon-active': '#ff385c',
      },
      boxShadow: {
        'checkout-shadow': 'rgba(0, 0, 0, 0.12) 0px 6px 16px;',
      }
    },
  },
  plugins: [],
}