const { backgroundIntensity } = require("three/tsl");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        comic: ['"Comic Neue"', '"Comic Sans MS"', "cursive"],
      },
      colors: {
        "hero-yellow": "#FFD700",
        "hero-red": "#FF0000",
        "hero-blue": "#0000FF",
      },
      borderWidth: {
        3: "3px",
      },
      boxShadow: {
        comic: "4px 4px 0px 0px rgba(0, 0, 0, 1)",
        "comic-lg": "6px 6px 0px 0px rgba(0, 0, 0, 1)",
      },
      backgroundImage: {
        "comic-bg": "url('/public/assets/pattern.png')",
      },
    },
  },
  plugins: [],
};
