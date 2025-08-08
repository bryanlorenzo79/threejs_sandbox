import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class ModelLoader {
  constructor(scene) {
    this.scene = scene;
    this.loader = new GLTFLoader();
  }

  // A focused, segregated interface. This method only concerns itself with loading a model.
  load(callback) {
    this.loader.load(
      // 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@2a9757a/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf',
      './models/proa.gltf',
      // './proa.glb',
      (gltf) => {
        const model = gltf.scene;
        model.position.y = -1;

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
          }
        });
        this.scene.add(model);
        callback(model);
      },
      undefined,
      (error) => {
        console.error('An error occurred loading the model', error);
      }
    );
  }
}
