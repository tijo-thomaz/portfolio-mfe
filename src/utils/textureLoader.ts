import * as THREE from "three";

// Utility function to load textures with proper error handling
export const loadTexture = (url: string): Promise<THREE.Texture> => {
  return new Promise((resolve, reject) => {
    const loader = new THREE.TextureLoader();

    loader.load(
      // URL
      url,

      // onLoad callback
      (texture) => {
        texture.needsUpdate = true;
        resolve(texture);
      },

      // onProgress callback
      undefined,

      // onError callback
      (err) => {
        console.error(`Error loading texture from ${url}:`, err);
        reject(err);
      }
    );
  });
};

// Preload multiple textures
export const preloadTextures = async (
  urls: string[]
): Promise<THREE.Texture[]> => {
  try {
    const texturePromises = urls.map((url) => loadTexture(url));
    return await Promise.all(texturePromises);
  } catch (error) {
    console.error("Error preloading textures:", error);
    return [];
  }
};

export default {
  loadTexture,
  preloadTextures,
};
