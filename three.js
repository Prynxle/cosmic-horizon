import * as THREE from 'https://cdn.skypack.dev/three@0.128'; // or latest
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128/examples/jsm/loaders/GLTFLoader.js';

// Initialize Three.js components
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio); 
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
camera.position.setX(-10);
camera.position.setY(10);
camera.zoom = -5; // Set initial zoom level

//load Earth

const earthTexture = new THREE.TextureLoader().load('Planets/Earth/textures/TERRE_baseColor.jpeg');
const normalTexture = new THREE.TextureLoader().load('Planets/Earth/textures/NUAGES_baseColor.png');
const earthGeometry = new THREE.SphereGeometry(15, 32, 32);
const earthMat = new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture,
});

//load Sun
const sunTexture = new THREE.TextureLoader().load('Planets/Sun/textures/Scene_-_Root_baseColor.jpeg');
const sunGeometry = new THREE.SphereGeometry(15, 32, 32);
const sunMat = new THREE.MeshStandardMaterial({
    map: sunTexture,
});

//star
function addStar(){
    const geometry = new THREE.SphereGeometry(0.24, 24 , 24);
    const material = new THREE.MeshStandardMaterial( {color: 0xffffff} );
    const star = new THREE.Mesh(geometry, material);
    const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));

    star.position.set(x,y,z);
    scene.add(star);
}
Array(200).fill().forEach(addStar);

const earth = new THREE.Mesh(earthGeometry, earthMat);
scene.add(earth);
earth.position.set(-10, 10, 15); 
const sun = new THREE.Mesh(sunGeometry, sunMat);
sun.position.set(9, 29, 85); // Set the Sun's position to the center of the scene
scene.add(sun);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(25, 25, 25);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    earth.rotation.x += 0.05;
    earth.rotation.y += 0.075;
    sun.rotation.y += 0.01; // Ensure the Sun exists before rotating
    camera.position.z = 50 + t * -0.07; // Adjust the multiplier for smoother movement
    camera.position.x = -10 + t * -0.02;
    camera.position.y = 10 + t * -0.02;
    console.log(earth.position)
}

document.body.onscroll = moveCamera;
$('#earth').on('scroll', moveCamera); 
$('#sun').on('scroll', moveCamera); 



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
    
    earth.rotation.x += 0.005;
    earth.rotation.y += 0.00075;
    sun.rotation.y += 0.001; 
    renderer.render(scene, camera);
}

animate();










//js




