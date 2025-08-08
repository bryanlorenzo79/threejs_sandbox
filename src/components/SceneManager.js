import * as THREE from 'three';

export class SceneManager {
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xcccccc);
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 5);
  }

  getScene() {
    return this.scene;
  }

  getCamera() {
    return this.camera;
  }

  // Single Responsibility: This method is only for adding a ground plane
  createGroundPlane() {
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x4444ff });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -2;
    plane.receiveShadow = true;
    this.scene.add(plane);
  }
}
