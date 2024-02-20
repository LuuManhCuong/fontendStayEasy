/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        DEFAULT: "5px",
        lg: "8px",
        xl: "16px",
      },
    },
  },
  plugins: [],
};
