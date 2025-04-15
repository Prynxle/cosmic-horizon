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

// control the spin
const controller = new OrbitControls(camera, renderer.domElement);



function animate() {
    requestAnimationFrame(animate);

    controller.update(); 

    renderer.render(scene, camera);
}

animate()