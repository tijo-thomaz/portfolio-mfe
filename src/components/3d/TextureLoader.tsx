import { useEffect, useRef } from "react";
import * as THREE from "three";

interface TextureLoaderProps {
  onTexturesLoaded: (materials: THREE.MeshStandardMaterial[]) => void;
}

// This component creates materials with canvas textures
const TextureLoader: React.FC<TextureLoaderProps> = ({ onTexturesLoaded }) => {
  // Use ref to track if materials were already created
  const materialsCreatedRef = useRef(false);

  useEffect(() => {
    // Only create materials once to prevent infinite loops
    if (materialsCreatedRef.current) return;
    materialsCreatedRef.current = true;

    // Create materials with canvas textures
    const createMaterialWithText = (color: string, text: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext("2d");

      if (context) {
        // Fill background
        context.fillStyle = color;
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Add text
        context.font = 'bold 48px "Comic Neue", "Comic Sans MS", sans-serif';
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "#FFFFFF";
        context.fillText(text, canvas.width / 2, canvas.height / 2);

        // Add border
        context.strokeStyle = "#000000";
        context.lineWidth = 8;
        context.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

        // Add tech logo or icon (simplified)
        const iconSize = 40;
        context.fillStyle = "#FFFFFF";
        context.beginPath();

        // Different icon shape based on technology
        switch (text) {
          case "HTML":
            // HTML-like icon
            context.moveTo(canvas.width / 2 - iconSize, canvas.height / 2 + 60);
            context.lineTo(
              canvas.width / 2 - iconSize / 2,
              canvas.height / 2 + 60
            );
            context.lineTo(canvas.width / 2, canvas.height / 2 + 90);
            context.lineTo(
              canvas.width / 2 + iconSize / 2,
              canvas.height / 2 + 60
            );
            context.lineTo(canvas.width / 2 + iconSize, canvas.height / 2 + 60);
            context.lineTo(
              canvas.width / 2 + iconSize / 1.5,
              canvas.height / 2 + 30
            );
            context.lineTo(
              canvas.width / 2 - iconSize / 1.5,
              canvas.height / 2 + 30
            );
            break;
          case "CSS":
            // CSS-like icon
            context.arc(
              canvas.width / 2,
              canvas.height / 2 + 60,
              iconSize / 1.5,
              0,
              Math.PI * 2
            );
            break;
          case "JS":
            // JS-like icon
            context.rect(
              canvas.width / 2 - iconSize / 2,
              canvas.height / 2 + 40,
              iconSize,
              iconSize
            );
            break;
          case "REACT":
            // React-like icon (simplified atom)
            context.arc(
              canvas.width / 2,
              canvas.height / 2 + 60,
              iconSize / 2,
              0,
              Math.PI * 2
            );
            context.moveTo(canvas.width / 2 - iconSize, canvas.height / 2 + 60);
            context.ellipse(
              canvas.width / 2,
              canvas.height / 2 + 60,
              iconSize,
              iconSize / 3,
              0,
              0,
              Math.PI * 2
            );
            context.moveTo(canvas.width / 2 - iconSize, canvas.height / 2 + 60);
            context.ellipse(
              canvas.width / 2,
              canvas.height / 2 + 60,
              iconSize,
              iconSize / 3,
              Math.PI / 3,
              0,
              Math.PI * 2
            );
            context.moveTo(canvas.width / 2 - iconSize, canvas.height / 2 + 60);
            context.ellipse(
              canvas.width / 2,
              canvas.height / 2 + 60,
              iconSize,
              iconSize / 3,
              (Math.PI * 2) / 3,
              0,
              Math.PI * 2
            );
            break;
          case "NODE":
            // Node-like icon
            context.moveTo(canvas.width / 2, canvas.height / 2 + 40);
            context.lineTo(canvas.width / 2 + iconSize, canvas.height / 2 + 60);
            context.lineTo(canvas.width / 2, canvas.height / 2 + 80);
            context.lineTo(canvas.width / 2 - iconSize, canvas.height / 2 + 60);
            break;
          case "THREE":
            // Three.js-like icon
            for (let i = 0; i < 3; i++) {
              const angle = (i * Math.PI * 2) / 3 + Math.PI / 6;
              context.moveTo(canvas.width / 2, canvas.height / 2 + 60);
              context.lineTo(
                canvas.width / 2 + Math.cos(angle) * iconSize,
                canvas.height / 2 + 60 + Math.sin(angle) * iconSize
              );
            }
            break;
        }

        context.fill();
        context.stroke();
      }

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.7,
      });

      return material;
    };

    // Create materials for each face
    const materials = [
      createMaterialWithText("#E44D26", "HTML"), // HTML color
      createMaterialWithText("#264DE4", "CSS"), // CSS color
      createMaterialWithText("#F7DF1E", "JS"), // JS color
      createMaterialWithText("#61DAFB", "REACT"), // React color
      createMaterialWithText("#339933", "NODE"), // Node color
      createMaterialWithText("#000000", "THREE"), // Three.js color
    ];

    onTexturesLoaded(materials);
  }, [onTexturesLoaded]);

  return null;
};

export default TextureLoader;
