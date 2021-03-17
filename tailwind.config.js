module.exports = {
  purge: {
    content: ["./src/**/*.{html,ts}"]
  },
  darkMode: "media",
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["odd", "even"],
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
