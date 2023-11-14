/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#3485ff",
        // primaryBg: "#151517",
        primaryBoxShadow: "0px 0px 15px 2px rgba(0, 0, 0, 0.25)",
        headerBg: "rgba(42, 44, 51, 0.55)",
        containerBg: "#3e4148",
      },
      fontFamily: {
        primaryFont: "Montserrat,sans-serif",
      },
      transitionTimingFunction: {
        DEFAULT: "ease-in-out",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
    },
  },
  plugins: [],
}
