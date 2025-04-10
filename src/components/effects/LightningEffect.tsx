import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface LightningEffectProps {
  count?: number;
  triggerKey?: number | string | boolean; // Optional prop to trigger re-animation from parent
}

const LightningEffect: React.FC<LightningEffectProps> = ({
  count = 5,
  triggerKey,
}) => {
  const boltsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Generate a new lightning path for each bolt
  const generateLightningPath = () => {
    const startX = Math.random() * 100;
    const segments = 5 + Math.floor(Math.random() * 5);
    let path = `M${startX},0 `;
    let currentX = startX;
    const segmentHeight = 100 / segments;

    for (let i = 1; i <= segments; i++) {
      const nextX = currentX + (Math.random() * 30 - 15);
      const nextY = i * segmentHeight;
      path += `L${nextX},${nextY} `;
      currentX = nextX;
    }

    return path;
  };

  // Get random position and style for each bolt
  const getRandomStyle = () => ({
    top: `${Math.random() * 80}%`,
    left: `${Math.random() * 80}%`,
    transform: `scale(${0.6 + Math.random() * 1.5}) rotate(${
      Math.random() * 20 - 10
    }deg)`,
    opacity: 0,
    zIndex: 1, // Lower z-index to ensure it doesn't cover content
  });

  // Trigger animation on mount or when animationKey/triggerKey changes
  useEffect(() => {
    // Reset refs array
    boltsRef.current = boltsRef.current.slice(0, count);

    // Animate each bolt
    boltsRef.current.forEach((el, i) => {
      if (!el) return;

      // Reset any previous animations
      gsap.killTweensOf(el);

      // Set initial state
      gsap.set(el, { opacity: 0, display: "block" });

      // Create the animation timeline
      const tl = gsap.timeline({
        onComplete: () => {
          // Hide the bolt after animation completes
          if (el) {
            el.style.display = "none";
            el.style.opacity = "0";
          }
        },
      });

      // Quick flicker animation - don't affect other elements
      tl.to(el, {
        opacity: 0.8,
        duration: 0.1,
        ease: "power2.in",
      })
        .to(el, {
          opacity: 0.2,
          duration: 0.1,
          ease: "power2.out",
        })
        .to(el, {
          opacity: 1,
          duration: 0.1,
          ease: "power2.in",
        })
        .to(el, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
          delay: 0.1,
        });

      // Stagger the animations
      tl.delay(i * 0.15);
    });

    // Cleanup function
    return () => {
      boltsRef.current.forEach((el) => {
        if (el) {
          gsap.killTweensOf(el);
          // Ensure elements are hidden and don't affect other content
          el.style.opacity = "0";
          el.style.display = "none";
        }
      });
    };
  }, [count, triggerKey]);

  return (
    <div
      className="lightning-container"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1, // Lower z-index to stay behind content
        overflow: "hidden",
      }}
    >
      {[...Array(count)].map((_, i) => (
        <div
          key={`lightning-${i}-${triggerKey}`}
          ref={(el) => {
            boltsRef.current[i] = el;
          }}
          className="lightning-bolt pointer-events-none absolute"
          style={{
            ...getRandomStyle(),
            position: "absolute",
            width: "100px",
            height: "100px",
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={generateLightningPath()}
              stroke="#FFD700"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              style={{
                filter: "drop-shadow(0 0 5px rgba(255, 215, 0, 0.7))",
              }}
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
export default LightningEffect;
