import * as THREE from 'https://cdn.skypack.dev/three@0.128'; // or latest
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128/examples/jsm/controls/OrbitControls.js';




// Initialize Three.js components
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio); 
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);



//load

const earthTexture = new THREE.TextureLoader().load('Planets/Earth/textures/TERRE_baseColor.jpeg');
const normalTexture = new THREE.TextureLoader().load('Planets/Earth/textures/NUAGES_baseColor.png');
const geometry = new THREE.SphereGeometry(15, 32, 32);
const material = new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture,
});


const planet = new THREE.Mesh(geometry, material);
scene.add(planet);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(25, 25, 25);


const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);








// Define marker positions
const markerData = [
    { position: new THREE.Vector3(10, 5, 10), label: 'TOdolist' },
    { position: new THREE.Vector3(-10, 8, -5), label: 'Aicafe' },
    { position: new THREE.Vector3(5, -10, 15), label: 'Exam maker' },
];

// Array to store markers
const markers = [];

// Add markers and labels
markerData.forEach((data) => {
    // Create marker
    const markerTexture = new THREE.TextureLoader().load('marker-icon.png'); // Replace with your marker icon
    const markerMaterial = new THREE.SpriteMaterial({ map: markerTexture });
    const marker = new THREE.Sprite(markerMaterial);

    // Position the marker on the Earth's surface
    marker.position.copy(data.position.normalize().multiplyScalar(15)); // Scale to Earth's radius
    scene.add(marker);
    markers.push(marker);

    // Create label
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Dynamically adjust canvas size based on text width
    context.font = 'bold 64px Arial'; // Set a large font size
    const textWidth = context.measureText(data.label).width;
    canvas.width = textWidth + 100; // Add padding to the width
    canvas.height = 150; // Increase height for better visibility

    // Ensure the canvas is cleared before drawing
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Add background color
    context.fillStyle = 'rgba(0, 0, 0, 0.9)'; // Opaque black background
    context.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas with the background

    // Draw text on the canvas
    context.fillStyle = 'white';
    context.font = 'bold 64px Arial'; // Large font size for better visibility
    context.textAlign = 'center';
    context.textBaseline = 'middle'; // Center the text vertically
    context.fillText(data.label, canvas.width / 2, canvas.height / 2); // Center the text

    // Create a texture from the canvas
    const labelTexture = new THREE.CanvasTexture(canvas);
    labelTexture.needsUpdate = true; // Ensure the texture updates properly
    const labelMaterial = new THREE.SpriteMaterial({ map: labelTexture });
    const label = new THREE.Sprite(labelMaterial);

    // Scale the label sprite for better visibility
    label.scale.set(canvas.width / 100, canvas.height / 100, 1); // Adjust scale based on canvas size

    // Position the label slightly above the marker
    label.position.copy(data.position.normalize().multiplyScalar(15.5)); // Adjust distance from Earth
    scene.add(label);
});

// Raycaster for detecting clicks
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Add event listener for mouse clicks
window.addEventListener('click', (event) => {
    // Convert mouse position to normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections with all markers
    const intersects = raycaster.intersectObjects(markers);
    if (intersects.length > 0) {
        console.log('Marker clicked:', intersects[0].object);
        // Add your custom logic here (e.g., display information or trigger an action)
    }
});





// control the spin
const controller = new OrbitControls(camera, renderer.domElement);





// Responsive
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
});


function animate() {
    requestAnimationFrame(animate);

    controller.update(); 

    renderer.render(scene, camera);
}

animate()