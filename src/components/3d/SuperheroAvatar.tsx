import React, { useRef, useEffect, useState } from "react";
import { Plane } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { loadTexture } from "../../utils/textureLoader";

interface SuperheroAvatarProps {
  isHovered: boolean;
  position?: [number, number, number];
}

const SuperheroAvatar: React.FC<SuperheroAvatarProps> = ({
  isHovered,
  position = [0, 0, 0.5],
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  // Load texture using our utility
  useEffect(() => {
    let isMounted = true;

    const loadAvatarTexture = async () => {
      try {
        const loadedTexture = await loadTexture("/assets/avatar-hero.png");

        // Only update state if component is still mounted
        if (isMounted) {
          if (loadedTexture instanceof THREE.Texture) {
            loadedTexture.colorSpace = THREE.SRGBColorSpace;
            setTexture(loadedTexture);
          }
        }
      } catch (error) {
        console.error("Failed to load avatar texture:", error);
      }
    };
    loadAvatarTexture();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  // Animation effect when hover state changes
  useEffect(() => {
    if (!groupRef.current) return;

    if (isHovered) {
      // Animate avatar to pop out when cube is hovered
      gsap.to(groupRef.current.position, {
        z: 1.2,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });

      // Scale up slightly
      gsap.to(groupRef.current.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    } else {
      // Return to original position
      gsap.to(groupRef.current.position, {
        z: position[2],
        duration: 0.5,
        ease: "back.in(2)",
      });

      // Return to original scale
      gsap.to(groupRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [isHovered, position]);

  // Don't render until texture is loaded
  if (!texture) return null;

  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]}>
      <Plane args={[1.5, 1.5]} position={[0, 0, 0]}>
        <meshBasicMaterial
          map={texture}
          transparent={true}
          side={THREE.DoubleSide}
          alphaTest={0.1}
        />
      </Plane>
    </group>
  );
};

export default SuperheroAvatar;
