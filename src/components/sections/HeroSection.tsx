import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CubeWithAvatar from "../3d/CubeWithAvatar";
import LightningEffect from "../effects/LightningEffect";
import SpeechBubble from "../ui/SpeechBubble";
import ComicButton from "../ui/ComicButton";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "TJ the Dev Hero",
  subtitle = "Coding Superhero",
  description = "Transforming ideas into digital reality with the power of code. Frontend specialist with a passion for creating immersive user experiences.",
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const [lightningTrigger, setLightningTrigger] = useState(0);
  const [cubeHovered, setCubeHovered] = useState(false);

  // Handle cube hover state to trigger lightning
  const handleCubeHover = (isHovered: boolean) => {
    setCubeHovered(isHovered);
    if (isHovered) {
      // Trigger lightning effect when cube is hovered
      setLightningTrigger((prev) => prev + 1);
    }
  };

  useEffect(() => {
    // Ensure elements are visible first
    if (sectionRef.current) {
      sectionRef.current.style.opacity = "1";
      sectionRef.current.style.visibility = "visible";
    }

    if (headingRef.current) {
      headingRef.current.style.opacity = "1";
      headingRef.current.style.visibility = "visible";
    }

    if (contentRef.current) {
      contentRef.current.style.opacity = "1";
      contentRef.current.style.visibility = "visible";
    }

    if (cubeRef.current) {
      cubeRef.current.style.opacity = "1";
      cubeRef.current.style.visibility = "visible";
    }

    // Animate heading on load with a slight delay
    gsap.fromTo(
      headingRef.current,
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        delay: 0.2,
        // Important: don't leave elements invisible after animation
        clearProps: "all",
      }
    );

    // Animate content on load
    gsap.fromTo(
      contentRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: "back.out(1.7)",
        // Important: don't leave elements invisible after animation
        clearProps: "all",
      }
    );

    // Animate cube on load
    gsap.fromTo(
      cubeRef.current,
      { scale: 0.5, opacity: 0, rotation: 45 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1.2,
        delay: 0.7,
        ease: "back.out(1.7)",
        // Important: don't leave elements invisible after animation
        clearProps: "opacity,visibility",
      }
    );

    // ScrollTrigger for section
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      onEnter: () => {
        setLightningTrigger((prev) => prev + 1); // Trigger lightning on scroll into view
      },
    });

    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-16 overflow-hidden"
      id="hero"
      style={{
        opacity: 1,
        visibility: "visible",
        position: "relative",
        zIndex: 0,
      }}
    >
      {/* Background lightning effects - contained in a div with controlled z-index */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <LightningEffect
          count={cubeHovered ? 8 : 5}
          triggerKey={lightningTrigger}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left content */}
          <div
            className="w-full lg:w-1/2 relative z-10"
            ref={contentRef}
            style={{
              opacity: 1,
              visibility: "visible",
            }}
          >
            <h1
              ref={headingRef}
              className="text-5xl md:text-6xl font-comic font-bold mb-4 transform -rotate-1"
              style={{
                opacity: 1,
                visibility: "visible",
              }}
            >
              <span className="inline-block bg-yellow-300 px-4 py-2 border-3 border-black rounded-lg shadow-comic">
                {title}
              </span>
            </h1>

            <SpeechBubble tailPosition="right" rotate={1} className="mb-8">
              <h2 className="text-2xl font-comic font-bold mb-2">{subtitle}</h2>
              <p className="font-comic text-lg">{description}</p>
            </SpeechBubble>

            <div className="flex flex-wrap gap-4">
              <ComicButton
                color="red"
                rotate={1}
                onClick={() =>
                  document
                    .getElementById("arsenal")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View My Powers
              </ComicButton>
              <ComicButton
                color="blue"
                rotate={-1}
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Contact The Hero
              </ComicButton>
            </div>
          </div>

          {/* Right content - 3D Cube with Avatar */}
          <div
            ref={cubeRef}
            className="w-full lg:w-1/2 h-[400px] md:h-[500px] comic-panel bg-gradient-to-br from-blue-100 to-purple-100 border-3 border-black rounded-lg shadow-comic-lg overflow-hidden relative"
            style={{
              opacity: 1,
              visibility: "visible",
              zIndex: 10,
            }}
          >
            <CubeWithAvatar onHover={handleCubeHover} />
          </div>
        </div>
      </div>

      {/* Comic-style decorative elements */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-300 rounded-full border-3 border-black transform rotate-12 opacity-50 z-0"></div>
      <div className="absolute top-20 -right-10 w-20 h-20 bg-red-300 rounded-full border-3 border-black transform -rotate-12 opacity-50 z-0"></div>

      {/* Comic-style action words - show more when cube is hovered */}
      <div
        className={`absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 rotate-12 transition-opacity duration-300 ${
          cubeHovered ? "opacity-100" : "opacity-0"
        } lg:block z-20`}
      >
        <div className="bg-red-400 text-white font-comic font-bold text-xl px-4 py-2 rounded-lg border-3 border-black shadow-comic">
          POW!
        </div>
      </div>
      <div
        className={`absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 -rotate-12 transition-opacity duration-300 ${
          cubeHovered ? "opacity-100" : "opacity-0"
        } lg:block z-20`}
      >
        <div className="bg-blue-400 text-white font-comic font-bold text-xl px-4 py-2 rounded-lg border-3 border-black shadow-comic">
          ZOOM!
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
