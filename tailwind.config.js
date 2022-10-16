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
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
