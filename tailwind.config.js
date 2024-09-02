module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dojored: "#FF595F",
        dojogray: {
          100: "#B3B3B3",
          600: "#3C3C3C",
          900: "#1B1B1B",
        },
      },
      transformOrigin: {
        0: "0%",
      },
      zIndex: {
        "-1": "-1",
      },
    },
  },
  variants: {
    borderColor: ["responsive", "hover", "focus", "focus-within"],
    opacity: ["disabled"],
    extend: {},
  },
  plugins: [],
};
