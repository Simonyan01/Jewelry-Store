/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#3485ff",
        primaryBg: "#151517",
        headerBg: "rgba(42, 44, 51, 0.55)",
        containerBg: "#2F333A",
        cardBg: "#3B4048",
        activeCardBg: "#202226",
        boxColor: "rgba(130, 130, 130, 0.55)",
      },
      boxShadow: {
        primaryBoxShadow: "0px 0px 15px 2px rgba(0, 0, 0, 0.40)",
      },
      fontFamily: {
        primaryFont: "Montserrat,sans-serif",
      },
      clipPath: {
        clipPath: "polygon(0% 0%, 90% 0, 100% 50%, 90% 100%, 0% 100%)",
      },
      transitionTimingFunction: {
        DEFAULT: "ease-out",
      },
      transitionDuration: {
        DEFAULT: "350ms",
      },
    },
  },
  plugins: [],
}
