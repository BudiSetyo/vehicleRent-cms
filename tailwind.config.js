/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)"],
      },
      colors: {
        black: "#000",
        white: "#FFF",
        mercury: "#E5E5E5",
        "black-squeeze": "#F7FAFC",
        "catskill-white": "#EDF2F7",
        "picton-blue": "#4299E1",
        "oxford-blue": "#2D3748",
        "san-juan": "#2A4365",
        "marine-blue": "#3182CE",
        "chambray-blue": "#2C5282",
        "tropical-blue": "#BEE3F8",
        "algae-green": "#9AE6B4",
        "cerise-red": "#D53F8C",
        "briliant-rose": "#ED64A6",
        "geraldine-red": "#FC8181",
        "casablanca-orange": "#F6AD55",
        transparant: "rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
