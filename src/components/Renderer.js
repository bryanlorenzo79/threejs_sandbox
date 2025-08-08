import * as THREE from 'three';

export class Renderer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: false });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;
    // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  getRenderer() {
    return this.renderer;
  }

  getDomElement() {
    return this.renderer.domElement;
  }

  setSize(width, height) {
    this.renderer.setSize(width, height);
  }

  render(scene, camera) {
    this.renderer.render(scene, camera);
  }
}
