// import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/controls/OrbitControls.js';

export class App {
  constructor(renderer, sceneManager, lightManager, modelLoader) {
    this.renderer = renderer;
    this.sceneManager = sceneManager;
    this.lightManager = lightManager;
    this.modelLoader = modelLoader;

    this.scene = this.sceneManager.getScene();
    this.camera = this.sceneManager.getCamera();
    this.spinningModel = null;

    // This is a high-level module, so it should not be responsible for creating low-level objects like controls.
    // It should use existing components to accomplish its task.
    // this.controls = new OrbitControls(this.camera, this.renderer.getDomElement());
    // this.controls.update();

    window.addEventListener('resize', () => this.onWindowResize());
  }

  start() {
    this.sceneManager.createGroundPlane();
    this.lightManager.addLights(this.scene);

    // Load the model and store a reference for animation
    this.modelLoader.load((model) => {
      this.spinningModel = model;
    });

    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Single Responsibility: App is responsible for coordinating the animation
    if (this.spinningModel) {
      this.spinningModel.rotation.y += 0.01;
    }

    // this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
}
