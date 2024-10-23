import * as THREE from 'three';

// 1. create the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#F0F0F0');

// 2. add camera (FOV/aspect ratio = window/near and far planes)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5

// 3. create and add an object
const geometry = new THREE.CapsuleGeometry( 1, 1, 4, 8 ); 
const material = new THREE.MeshToonMaterial({
  color: 0xC44900, // blue color
  flatShading: true, // makes the shading look flat like toon/cel shading
  gradientMap: null // optional, allows you to use a gradient texture map
});

const capsule = new THREE.Mesh(geometry, material); // create the mesh (geometry + material)

scene.add(capsule); // add the object to the scene

// 4. add lighting
const light = new THREE.DirectionalLight(0x9CDBA6, 10); // (color hexdecimal, intensity)
light.position.set(1, 1, 1); // (x, y, z)
scene.add(light);

// 5. set up renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 6. animate scene
function animate() {
  requestAnimationFrame(animate);

  capsule.rotation.x += 0.01;
  capsule.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();