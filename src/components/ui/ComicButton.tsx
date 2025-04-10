import React, { useState } from "react";
import gsap from "gsap";

interface ComicButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: "red" | "blue" | "yellow" | "green";
  size?: "sm" | "md" | "lg";
  rotate?: number;
  className?: string;
}

const ComicButton: React.FC<ComicButtonProps> = ({
  children,
  onClick,
  color = "yellow",
  size = "md",
  rotate = 0,
  className = "",
}) => {
  const [isPressed, setIsPressed] = useState(false);

  // Determine color class
  const getColorClass = () => {
    switch (color) {
      case "red":
        return "bg-red-500 hover:bg-red-600";
      case "blue":
        return "bg-blue-500 hover:bg-blue-600";
      case "green":
        return "bg-green-500 hover:bg-green-600";
      case "yellow":
      default:
        return "bg-yellow-400 hover:bg-yellow-500";
    }
  };

  // Determine size class
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "text-sm py-1 px-3";
      case "lg":
        return "text-xl py-3 px-6";
      case "md":
      default:
        return "text-base py-2 px-4";
    }
  };

  // Handle button press animation
  const handleMouseDown = () => {
    setIsPressed(true);
    const button = document.activeElement as HTMLElement;
    gsap.to(button, {
      y: 4,
      boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 1)",
      duration: 0.1,
    });
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    const button = document.activeElement as HTMLElement;
    gsap.to(button, {
      y: 0,
      boxShadow: "4px 4px 0px 0px rgba(0, 0, 0, 1)",
      duration: 0.1,
    });
  };

  return (
    <button
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => isPressed && handleMouseUp()}
      className={`
        ${getColorClass()}
        ${getSizeClass()}
        font-comic font-bold text-white
        rounded-lg border-3 border-black
        shadow-comic
        transition-transform duration-100
        relative z-10
        ${className}
      `}
      style={{
        transform: `rotate(${rotate}deg)`,
        opacity: 1,
      }}
    >
      {children}
    </button>
  );
};

export default ComicButton;
