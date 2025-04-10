// Comic theme constants and utility functions

// Colors
export const colors = {
  primary: "#FFD700", // Gold
  secondary: "#FF0000", // Red
  accent: "#0000FF", // Blue
  background: "#FFFACD", // Light yellow
  text: "#000000", // Black
  white: "#FFFFFF",
};

// Shadows
export const shadows = {
  small: "2px 2px 0px 0px rgba(0, 0, 0, 1)",
  medium: "4px 4px 0px 0px rgba(0, 0, 0, 1)",
  large: "6px 6px 0px 0px rgba(0, 0, 0, 1)",
};

// Border styles
export const borders = {
  thin: "2px solid #000000",
  medium: "3px solid #000000",
  thick: "4px solid #000000",
};

// Font styles
export const fonts = {
  comic: '"Comic Neue", "Comic Sans MS", cursive',
};

// Animation presets for GSAP
export const animations = {
  bounce: {
    y: -10,
    repeat: -1,
    yoyo: true,
    duration: 0.5,
    ease: "power1.inOut",
  },
  pulse: {
    scale: 1.05,
    repeat: -1,
    yoyo: true,
    duration: 0.8,
    ease: "power1.inOut",
  },
  shake: {
    x: 5,
    repeat: 5,
    yoyo: true,
    duration: 0.1,
    ease: "power1.inOut",
  },
  wobble: {
    rotation: 5,
    repeat: -1,
    yoyo: true,
    duration: 1,
    ease: "sine.inOut",
  },
};

// Helper function to create comic-style text with stroke
export const createStrokedText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string = "#000000",
  strokeColor: string = "#FFFFFF",
  lineWidth: number = 5
) => {
  ctx.font = "30px Comic Neue, Comic Sans MS, cursive";
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = lineWidth;
  ctx.strokeText(text, x, y);
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};
