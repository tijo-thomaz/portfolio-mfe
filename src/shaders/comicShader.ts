// Comic-style shader for 3D objects
import * as THREE from "three";

const comicShader = {
  uniforms: {
    color: { value: null },
    lightPosition: { value: new THREE.Vector3(5, 5, 5) },
  },

  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  fragmentShader: `
    uniform vec3 color;
    uniform vec3 lightPosition;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      // Calculate light direction
      vec3 lightDir = normalize(lightPosition);
      
      // Simple cel shading with 4 levels
      float intensity = dot(vNormal, lightDir);
      vec3 shading;
      
      if (intensity > 0.95) {
        shading = color;
      } else if (intensity > 0.5) {
        shading = color * 0.8;
      } else if (intensity > 0.25) {
        shading = color * 0.6;
      } else {
        shading = color * 0.4;
      }
      
      // Add edge highlight
      float edgeFactor = abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
      if (edgeFactor < 0.3) {
        shading = mix(vec3(0.0, 0.0, 0.0), shading, edgeFactor / 0.3);
      }
      
      // Add halftone pattern
      float scale = 100.0;
      vec2 center = floor(gl_FragCoord.xy / scale) * scale + vec2(scale/2.0);
      float dist = distance(gl_FragCoord.xy, center);
      float radius = (0.7 + intensity * 0.3) * scale/2.0;
      
      if (dist > radius) {
        shading *= 0.8;
      }
      
      gl_FragColor = vec4(shading, 1.0);
    }
  `,
};
export default comicShader;
