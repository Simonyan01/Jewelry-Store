/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#3485ff",
        primaryBg: "rgba(42, 44, 51, 0.55)",
        primaryBoxShadow: "0px 0px 15px 2px rgba(0, 0, 0, 0.25)",
        containerBg: "#3e4148",
      },
    },
  },
  plugins: [],
}
