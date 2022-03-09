// tailwind.config.js

const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Source Sans Pro"', "sans-serif"],
      serif: ["serif"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      gray: colors.neutral,
      yellow: colors.amber,
      black: colors.black,
      white: colors.white,
      red: {
        light: "#CF2340",
        DEFAULT: "#CF233C",
        dark: "#991a2f",
      },
      teal: {
        DEFAULT: "#4e5559",
      },
    },
    extend: {
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "0.9",
          },
        },
        "fade-out": {
          "0%": {
            opacity: "0.9",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
      animation: {
        "fade-in": "fade-in .25s ease-in-out forwards",
        "fade-out": "fade-out .25s ease-in-out forwards",
      },
    },
  },

  variants: {
    extend: {},
  },
  plugins: [],
};
