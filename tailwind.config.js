/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        ninety: "90%",
        fourtyfive: "45%",
        fourty8: "48%",
      },
      height: {
        ninety: "90%",
        fourtyfive: "45%",
        fourty8: "48%",
      },
      fontFamily: {
        sora: ["Sora", "sans-serif"],
      },
      colors: {
        primary: "#DB5461",
        secondary: "#162748",
        'airbnb-red': '#FF5A5F',
        'airbnb-gray': '#484848',
        'airbnb-light-gray': '#F7F7F7',
        colorMan: "linear-gradient(180deg, #DB5461 0%, #7B61FF 100%)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
