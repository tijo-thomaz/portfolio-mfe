/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        comic: ['"Comic Neue"', "cursive"],
      },
      borderWidth: {
        3: "3px",
      },
      boxShadow: {
        comic: "4px 4px 0px 0px rgba(0, 0, 0, 1)",
        "comic-sm": "2px 2px 0px 0px rgba(0, 0, 0, 1)",
        "comic-lg": "6px 6px 0px 0px rgba(0, 0, 0, 1)",
      },
      backgroundColor: {
        "comic-yellow": "#FFFACD",
      },
      backgroundImage: {
        "comic-bg": "url('/public/assets/pattern.png')",
      },
    },
  },
  plugins: [],
};
