import * as THREE from 'https://cdn.skypack.dev/three@0.128'; // or latest
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128/examples/jsm/loaders/GLTFLoader.js';

// Initialize Three.js components
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Transparent background
document.getElementById('canvas-container').appendChild(renderer.domElement);


// Load the Earth model
const loader = new GLTFLoader();
loader.load('Planets/Earth/scene.gltf', function (gltf) {
    const earth = gltf.scene;
    scene.add(earth);
    console.log("Loaded Earth:", earth); // Inspect the loaded scene

    //Adjust the earth scale and position.
    earth.scale.set(1, 1, 1); // Change from 0.01 to 1);
    earth.position.set(0,0,0);
});

// Add lighting
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 3, 5);
scene.add(directionalLight);

// Set camera position
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the Earth
    scene.traverse(function (object) {
        if (object.isMesh) {
            object.rotation.y += 0.001;
        }
    });

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', function () {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});