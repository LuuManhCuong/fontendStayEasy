/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'ssm': '320px', // Tạo breakpoint 'sm' với độ rộng tối thiểu là 320px
        '2lg': '1350px', // Tạo breakpoint 'xl' với độ rộng tối thiểu là 1280px
      },
      colors: {
        'fav-icon': '#rgba(0, 0, 0, 0.5)',
        'fav-icon-active': '#ff385c',
        'checkout-bg': 'rgb(221, 221, 221)',
      },
      boxShadow: {
        'checkout-shadow': 'rgba(0, 0, 0, 0.12) 0px 6px 16px;',
      }
    },
  },
  plugins: [],
}