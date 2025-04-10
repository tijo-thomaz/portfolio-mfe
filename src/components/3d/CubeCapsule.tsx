import React, { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import SuperheroAvatar from "./SuperheroAvatar";
import comicShader from "../../shaders/comicShader";

interface CubeCapsuleProps {
  onHover?: (isHovered: boolean) => void;
  onRotationChange?: (rotation: THREE.Euler) => void;
}

const CubeCapsule: React.FC<CubeCapsuleProps> = ({
  onHover,
  onRotationChange,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Create shader material using our comic shader
  const shaderMaterial = useMemo(() => {
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0x4287f5) },
        lightPosition: { value: new THREE.Vector3(5, 5, 5) },
      },
      vertexShader: comicShader.vertexShader,
      fragmentShader: comicShader.fragmentShader,
      side: THREE.DoubleSide,
    });

    return material;
  }, []);

  // Handle hover state
  const handlePointerOver = () => {
    setHovered(true);
    if (onHover) onHover(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
    if (onHover) onHover(false);
  };

  // Animation on hover
  useEffect(() => {
    if (!meshRef.current) return;

    if (hovered) {
      // Open the cube slightly when hovered
      gsap.to(meshRef.current.rotation, {
        x: Math.PI * 0.05,
        y: Math.PI * 0.25,
        duration: 0.5,
        ease: "power2.out",
      });

      // Scale up slightly
      gsap.to(meshRef.current.scale, {
        x: 1.05,
        y: 1.05,
        z: 1.05,
        duration: 0.3,
        ease: "back.out(1.7)",
      });

      // Also animate the edges
      if (edgesRef.current) {
        gsap.to(edgesRef.current.material, {
          opacity: 1,
          duration: 0.3,
        });
      }
    } else {
      // Return to continuous rotation
      gsap.to(meshRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.3,
        ease: "power2.inOut",
      });

      // Fade edges slightly
      if (edgesRef.current) {
        gsap.to(edgesRef.current.material, {
          opacity: 0.7,
          duration: 0.3,
        });
      }
    }
  }, [hovered]);

  // Animation on click
  useEffect(() => {
    if (!meshRef.current || !clicked) return;

    // Create a pulse effect when clicked
    gsap.to(meshRef.current.scale, {
      x: 1.2,
      y: 1.2,
      z: 1.2,
      duration: 0.2,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
      onComplete: () => setClicked(false),
    });
  }, [clicked]);

  // Continuous rotation animation
  useFrame((_state, delta) => {
    if (meshRef.current && !hovered) {
      // Slow continuous rotation when not hovered
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x += delta * 0.1;

      // Update edges rotation to match
      if (edgesRef.current) {
        edgesRef.current.rotation.copy(meshRef.current.rotation);
      }

      // Notify parent of rotation changes
      if (onRotationChange) {
        onRotationChange(meshRef.current.rotation);
      }
    }
  });

  // Comic-style outline material
  const outlineMaterial = new THREE.LineBasicMaterial({
    color: 0x000000,
    linewidth: 3,
    opacity: 0.7,
    transparent: true,
  });

  return (
    <group>
      {/* Main cube */}
      <mesh
        ref={meshRef}
        onClick={() => setClicked(true)}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry args={[2, 2, 2]} />
        <primitive object={shaderMaterial} attach="material" />

        {/* Avatar inside the cube */}
        <SuperheroAvatar isHovered={hovered} />
      </mesh>

      {/* Comic-style outline */}
      <lineSegments ref={edgesRef}>
        <edgesGeometry
          attach="geometry"
          args={[new THREE.BoxGeometry(2.05, 2.05, 2.05)]}
        />
        <primitive object={outlineMaterial} attach="material" />
      </lineSegments>
    </group>
  );
};

export default CubeCapsule;
