import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

// get canvas element from the DOM
const canvas = document.getElementById('canvas');

// create the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#222222');

// add camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// create and add the torus knot geometry and toon material
const geometry = new THREE.TorusKnotGeometry(1, 0.4, 100, 16); // torus knot geometry
const material = new THREE.MeshToonMaterial({
    color: '#3C1518', // color
    flatShading: true // toon shading for a cartoony effect
});
const torusKnot = new THREE.Mesh(geometry, material); // create the mesh with torus knot and material

// add the torus knot to the scene
scene.add(torusKnot);

// add light to the scene
const light = new THREE.SpotLight(0xFFFFFF, 100);
light.position.set(2, 2, 2);
scene.add(light);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft white ambient light
scene.add(ambientLight);

// set up renderer and attach it to the canvas
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// adjust the renderer size and camera aspect ratio when the window is resized
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // update the renderer and camera aspect ratio
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// add orbit control
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;

// add animations
function animate() {
  requestAnimationFrame(animate);

  // rotate the torus knot for some animation
  torusKnot.rotation.x += 0.001;
  torusKnot.rotation.y += 0.001;
  
  controls.update();
  
  // render the scene
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
