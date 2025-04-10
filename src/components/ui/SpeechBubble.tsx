import React from "react";

interface SpeechBubbleProps {
  children: React.ReactNode;
  tailPosition?: "left" | "right" | "top" | "bottom";
  rotate?: number;
  className?: string;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  children,
  tailPosition = "bottom",
  rotate = 0,
  className = "",
}) => {
  // Determine the tail position class
  const getTailClass = () => {
    switch (tailPosition) {
      case "left":
        return "before:left-[-20px] before:top-1/2 before:border-r-white before:border-r-[20px] before:border-y-transparent before:border-y-[15px] before:border-l-0";
      case "right":
        return "after:right-[-20px] after:top-1/2 after:border-l-white after:border-l-[20px] after:border-y-transparent after:border-y-[15px] after:border-r-0";
      case "top":
        return "before:top-[-20px] before:left-1/2 before:border-b-white before:border-b-[20px] before:border-x-transparent before:border-x-[15px] before:border-t-0";
      case "bottom":
      default:
        return "after:bottom-[-20px] after:left-1/2 after:border-t-white after:border-t-[20px] after:border-x-transparent after:border-x-[15px] after:border-b-0";
    }
  };

  return (
    <div
      className={`relative bg-white p-4 rounded-lg border-3 border-black shadow-comic ${getTailClass()} ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        opacity: 1,
        zIndex: 10,
        position: "relative",
      }}
    >
      {/* Speech bubble content */}
      <div className="relative z-10">{children}</div>

      {/* Tail for speech bubble */}
      <div
        className={`absolute ${
          tailPosition === "left"
            ? "left-[-20px] top-1/2 transform -translate-y-1/2"
            : tailPosition === "right"
            ? "right-[-20px] top-1/2 transform -translate-y-1/2"
            : tailPosition === "top"
            ? "top-[-20px] left-1/2 transform -translate-x-1/2"
            : "bottom-[-20px] left-1/2 transform -translate-x-1/2"
        }`}
      >
        <div
          className="w-0 h-0 border-solid border-8 border-transparent"
          style={{
            borderTopColor: tailPosition === "bottom" ? "white" : "transparent",
            borderBottomColor: tailPosition === "top" ? "white" : "transparent",
            borderLeftColor: tailPosition === "right" ? "white" : "transparent",
            borderRightColor: tailPosition === "left" ? "white" : "transparent",
            borderWidth: "10px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default SpeechBubble;
