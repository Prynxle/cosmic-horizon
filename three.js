import * as THREE from 'https://cdn.skypack.dev/three@0.128'; // or latest
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128/examples/jsm/controls/OrbitControls.js';




// Initialize Three.js components
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(1000, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio); 
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);



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
earth.position.set(0, 0, 0); 
// const sun = new THREE.Mesh(sunGeometry, sunMat);
// sun.position.setZ(50);
// sun.position.setX(-10);
// scene.add(sun);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(25, 25, 25);


const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    earth.rotation.x += 0.05;
    earth.rotation.y += 0.075;
    sun.rotation.y += 0.01;
    camera.position.z = t * -0.70;
    
}

document.body.onscroll = moveCamera;

// control the spin
const controller = new OrbitControls(camera, renderer.domElement);


console.log(camera)


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