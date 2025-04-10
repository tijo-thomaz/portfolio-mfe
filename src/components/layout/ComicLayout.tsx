import React from "react";

interface ComicLayoutProps {
  children: React.ReactNode;
}

const ComicLayout: React.FC<ComicLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      {/* Base halftone background */}
      <div
        className="fixed inset-0 z-[-2]"
        style={{
          backgroundColor: "#fff8dc" /* Light yellow comic paper */,
          backgroundImage: "url('/assets/bg-halftone.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "80px 80px",
          backgroundAttachment: "fixed",
        }}
      ></div>

      {/* Paper texture overlay */}
      <div
        className="fixed inset-0 z-[-1] opacity-15 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: "url('/assets/bg-paper.png')",
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
        }}
      ></div>

      {/* Main content */}
      <div className="relative z-0 min-h-screen">{children}</div>
    </div>
  );
};

export default ComicLayout;
