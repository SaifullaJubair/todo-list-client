/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Day theme styles
      colors: {
        dayBg: "#f3f4f6", // Light gray background
        dayText: "#333", // Dark text color
      },
    },
  },
  darkMode: "class",
  variants: {
    extend: {},
  },
  plugins: [],
};
