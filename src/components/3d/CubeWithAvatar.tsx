import React, { useState, useCallback, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import CubeCapsule from "./CubeCapsule";

interface CubeWithAvatarProps {
  onHover?: (isHovered: boolean) => void;
}

const CubeWithAvatar: React.FC<CubeWithAvatarProps> = ({ onHover }) => {
  const [, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle hover state from the cube
  const handleHover = useCallback(
    (hovered: boolean) => {
      setIsHovered(hovered);
      if (onHover) onHover(hovered);
    },
    [onHover]
  );

  // Set loaded state after component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        // Ensure this container is visible
        opacity: 1,
        visibility: "visible",
      }}
    >
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          // Ensure canvas is visible
          opacity: 1,
          visibility: "visible",
          zIndex: 5, // Lower z-index to not interfere with other content
        }}
        dpr={[1, 2]} // Optimize for performance and quality
        shadows
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* Camera */}
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

        {/* Cube Capsule */}
        <CubeCapsule onHover={handleHover} />

        {/* Controls - limit interaction to prevent issues */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          rotateSpeed={0.5}
        />
      </Canvas>

      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-100 bg-opacity-50 z-10">
          <div className="text-xl font-comic font-bold">Loading 3D Hero...</div>
        </div>
      )}
    </div>
  );
};
export default CubeWithAvatar;
