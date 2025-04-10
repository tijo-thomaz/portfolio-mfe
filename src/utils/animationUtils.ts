import gsap from "gsap";

// Configure GSAP to always clear properties after animations
// This prevents elements from being left with opacity: 0 or visibility: hidden
export const configureGsap = () => {
  gsap.defaults({
    clearProps: "opacity,visibility",
    overwrite: "auto",
  });
};

// Safe animation function that ensures elements remain visible
export const safeAnimate = (
  target: gsap.TweenTarget,
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars
) => {
  // Ensure we don't leave elements invisible
  const safeToVars = {
    ...toVars,
    onComplete: () => {
      // Set explicit visibility after animation
      if (Array.isArray(target)) {
        target.forEach((el) => {
          if (el instanceof HTMLElement) {
            el.style.opacity = "1";
            el.style.visibility = "visible";
          }
        });
      } else if (target instanceof HTMLElement) {
        target.style.opacity = "1";
        target.style.visibility = "visible";
      }

      // Call original onComplete if it exists
      if (toVars.onComplete) {
        toVars.onComplete();
      }
    },
  };

  return gsap.fromTo(target, fromVars, safeToVars);
};

export default {
  configureGsap,
  safeAnimate,
};
