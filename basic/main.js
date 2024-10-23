import * as THREE from 'three';

// 1. create the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#2E282A');

// ----- add camera (fov/aspect ratio = window/near and far planes)
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15

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

// ----- create the material f
const material = new THREE.MeshToonMaterial({
    color: 0xC44900, // red-orange color
    flatShading: true // makes the shading look flat like toon/cel shading
});

// create the mesh with the tube geometry and material
const tube = new THREE.Mesh(geometry, material);

// add the tube to the scene
scene.add(tube);

// ----- lighting
const light = new THREE.DirectionalLight(0x9CDBA6, 10); // (color hexadecimal, intensity)
light.position.set(1, 1, 1); // (x, y, z)
scene.add(light);

// ----- set up renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ----- animate 
function animate() {
  requestAnimationFrame(animate);

  tube.rotation.x += 0.0005;
  tube.rotation.y += 0.0005;

  renderer.render(scene, camera);
}

animate();
