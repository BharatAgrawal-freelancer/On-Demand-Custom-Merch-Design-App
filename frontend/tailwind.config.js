/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        zima: "#15bcf0", // Zima Blue (primary)
        athena: "#5cd4f8", // Athena Blue (light accent)
        broadwater: "#064b75", // Broadwater Blue (dark)
        unakite: "#789c4c", // Unakite (accent green)
        breakwater: "#d0e0e5", // Breakwater (light neutral)
        fig: "#542c3c", // Fig (deep accent)
      },
      borderRadius: {
        xl: "1rem",
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
        modern: ["Poppins", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
