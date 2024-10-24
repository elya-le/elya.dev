import * as THREE from 'three';

// 1. create the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#222222');

// ----- add camera (fov/aspect ratio = window/near and far planes)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

// ----- create a custom curve for the tube geometry
class CustomSinCurve extends THREE.Curve {
    constructor(scale = 1) {
        super();
        this.scale = scale;
    }

    getPoint(t, optionalTarget = new THREE.Vector3()) {
        const tx = t * 3 - 1.5;   // x position
        const ty = Math.sin(2 * Math.PI * t);   // y position (sine wave pattern)
        const tz = 0;             // z position (2d in xy plane)
        return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale); // apply scale
    }
}

// create the path using CustomSinCurve
const path = new CustomSinCurve(10);

// create the tube geometry (path, tubular segments, radius, radial segments, closed)
const geometry = new THREE.TubeGeometry(path, 20, 2, 8, false);

// ----- create the toon material
const material = new THREE.MeshToonMaterial({
    color: '#3C1518', // red-orange color
    flatShading: true // toon shading for a cartoony effect
});

// create the mesh with the tube geometry and material
const tube = new THREE.Mesh(geometry, material);

// add the tube to the scene
scene.add(tube);

// ----- add spotlight and ambient light
const light = new THREE.SpotLight(0xFFFFFF, 100); // white spotlight
light.position.set(3, 3, );
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft white ambient light
scene.add(ambientLight);

// ----- set up renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// adjust the renderer size and camera aspect ratio when the window is resized
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // update the renderer and camera aspect ratio
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// ----- animate the scene
function animate() {
  requestAnimationFrame(animate);

  tube.rotation.x += 0.001; // rotate slower for smoother animation
  tube.rotation.y += 0.001;

  renderer.render(scene, camera);
}

animate();
