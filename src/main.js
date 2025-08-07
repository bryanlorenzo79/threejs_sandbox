// Import the Three.js library
// import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';


// Define the base resolution for a "240p" feel
const baseResolution = 480;

// Initialize your Three.js scene, camera, and renderer
const scene = new THREE.Scene();
let renderer;

const gltfLoader = new GLTFLoader();

// Handle window resizing and determine the rendering resolution
function onWindowResize() {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  let renderWidth, renderHeight;


  // Update the renderer size
  if (!renderer) {
    // Initial setup
    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    document.body.appendChild(renderer.domElement);
    // renderer.domElement.id = 'webgl-canvas';
    // renderer.domElement.style.height = '100%';
  }
  renderer.setSize(baseResolution, baseResolution, false);
  renderer.setPixelRatio(1);
  // cssRenderer.setSize(window.innerWidth, window.innerHeight);

  // Update camera aspect ratio to match the display siz240e (100vw, 100vh)
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

// Initialize the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
// camera.lookAt(new THREE.Vector3(0, 0, 0));
camera.position.y = 1;
camera.position.z = 3;

let cube;
let material;
let proa;

gltfLoader.load(
  'proa.gltf',
  function(gltf) {
    gltf.scene.traverse((node) => {
      console.log(node);
      if(node.isMesh){
        node.castShadow = true;
      }
      if(node.material){
        const materials = Array.isArray(node.material) ? node.material : [node.material];
        materials.forEach(material => {
          material.map.minFilter = THREE.NearestFilter;
          material.map.magFilter = THREE.NearestFilter;
        })
      }


    })
    // gltf.scene.traverse((node) => {
    //   if(node.isMesh && node.material){
    //     const materials = Array.isArray(node.material) ? node.material : [node.material];
    //     materials.forEach(material => {
    //       // Check if the material has a texture map
    //       material.alphaHash = false;
    //       material.transparent = true;
    //       material.alphaTest = 0.5;
    //       // Set both minFilter and magFilter to NearestFilter for pixelation
    //       material.map.minFilter = THREE.NearestFilter;
    //       material.map.magFilter = THREE.NearestFilter;

    //       // It's good practice to mark the texture as needing an update
    //       material.map.needsUpdate = true;
    //       if (material.map) {
    //       }
    //     });
    //     node.castShadow = true;
    //     node.receiveShadow = true;
    //   }

    // })
    proa = gltf.scene;
    scene.add(proa);
  },
  undefined,
  function(error) {
    console.error('An error occured while loading the model: ', error);
  }
);


const loader = new THREE.TextureLoader();
loader.load('img/tile01.png', (texture) => {
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  material = new THREE.MeshStandardMaterial({ 
    map: texture,
    // roughness: 0.5,
    // metalness: 0.2
  });
  cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  scene.add(cube);
})

const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x80808 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
plane.receiveShadow = true;
scene.add(plane);

// AmbientLight provides general, soft lighting from all directions.
const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // soft white light
scene.add(ambientLight);

// PointLight acts like a single light bulb, with a specific position.
// const pointLight = new THREE.PointLight(0xffffff, 250, 200);
// pointLight.position.set(2, 4, 4);
// pointLight.castShadow = true;
// scene.add(pointLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 5.5);
// const directionalLight = new THREE.DirectionalLight(0xff8838, 5.5);
directionalLight.castShadow = true;
// directionalLight.setPosition(2, 5, 2);
directionalLight.position.x = 0.2;
directionalLight.position.z = 1;
scene.add(directionalLight);
scene.add(directionalLight.target);

// CSS2DRenderer Set
// const cssRenderer = new CSS2DRenderer();
// cssRenderer.setSize(window.innerWidth, window.innerHeight);
// cssRenderer.domElement.id = 'css-renderer-container';
// document.body.appendChild(cssRenderer.domElement);

// Get the login form HTML element
// const loginFormElement = document.getElementById('login-field-wrapper');
// Create a CSS2DObject from the login form
// const loginObject = new CSS2DObject(loginFormElement);
// Position the form in the scene
// loginObject.position.set(0, 0, 0); // Position it at the center of the scene
// scene.add(loginObject);	


// Add the event listener and call the function once to set the initial size
window.addEventListener('resize', onWindowResize, false);
onWindowResize(); // Call once to set everything up initially

// The animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube
  if(cube) {
    cube.position.x = 3;
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }
  if(proa) {
    proa.rotation.y += 0.01;
    proa.castShadow = true;
    camera.lookAt(proa.position);
  }

  // Render the scene with the dynamically determined low resolution
  if (renderer) {
    renderer.render(scene, camera);
  }
  // cssRenderer.render(scene, camera);
}

animate(); 
