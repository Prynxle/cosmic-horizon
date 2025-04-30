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

//load Earth
const earthTexture = new THREE.TextureLoader().load('Planets/earth/textures/Material.001_baseColor.jpeg');
const normalTexture = new THREE.TextureLoader().load('Planets/earth/textures/Material.002_baseColor.jpeg');

const earthGeometry = new THREE.SphereGeometry(25, 32, 31);
const earthMat = new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture,
});


const displacementTexture = new THREE.TextureLoader().load('Planets/earth/textures/Lava004_1K-JPG_Emission.jpg');
const ethicsGeometry = new THREE.SphereGeometry(25, 32, 31);
const ethicsMat = new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture,
    emissiveMap: displacementTexture,
    emissive: 0xdc881e,
    emissiveIntensity: .3,

});

//load pluto
const plutoTexture = new THREE.TextureLoader().load('Planets/Pluto/textures/Scene_-_Root_baseColor.jpeg');
const plutoGeometry = new THREE.SphereGeometry(20, 32, 32);
const plutoMat = new THREE.MeshStandardMaterial({
    map: plutoTexture,
});

//star
function addStar(){
    const geometry = new THREE.SphereGeometry(0.24, 24 , 24);
    const material = new THREE.MeshStandardMaterial( {color: 0xffffff} );
    const star = new THREE.Mesh(geometry, material);
    const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(800));

    star.position.set(x,y,z);
    scene.add(star);
}
Array(800).fill().forEach(addStar);

const earth = new THREE.Mesh(earthGeometry, earthMat);
scene.add(earth);
earth.position.set(-9, 8, 15); 
const pluto = new THREE.Mesh(plutoGeometry, plutoMat);
pluto.position.set(29, 48, 150); 
scene.add(pluto);


const ethics = new THREE.Mesh(ethicsGeometry, ethicsMat);
scene.add(ethics);
ethics.position.set(100, -399, 15);


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(25, 25, 25);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    earth.rotation.y += 0.0075;
    pluto.rotation.y += 0.0075; 
    ethics.y += 0.0075;
    camera.position.z = 50 + t * -0.07; // Adjust the multiplier for smoother movement
    camera.position.x = -10 + t * -0.02;
    camera.position.y = 10 + t * -0.02;
    let x = $(window).innerHeight();
    let y = $(window).scrollTop();
    let z = $('main').height();
    
    
}

document.body.onscroll = moveCamera;
$('#earth').on('scroll', moveCamera); 
$('#pluto').on('scroll', moveCamera); 


function animate() {
    requestAnimationFrame(animate);
    
    // earth.rotation.x += 0.005;
    earth.rotation.y += 0.002;
    pluto.rotation.y += 0.002; 
    ethics.rotation.y += 0.002;
    renderer.render(scene, camera);
    
}


animate();

// Scroll horizontal first until it reaches the end of the page, then scroll vertically

$('#earth').on('wheel', function (e) {
    const delta = e.originalEvent.deltaY; 
    const scrollLeft = $(this).scrollLeft();
    const maxScrollLeft = this.scrollWidth - $(this).outerWidth(); 

    const isAtStart = scrollLeft === 0;
    const isAtEnd = scrollLeft >= maxScrollLeft;

    let y = $(window).scrollTop();



    if ((!isAtEnd && delta > 0) || (!isAtStart && delta < 0)) {
        // Prevent vertical scrolling and scroll horizontally
        if (y <= 0){
            e.preventDefault();
            $(this).scrollLeft(scrollLeft + delta);
        }
    }
});

$('#pluto').on('wheel', function (e) {
    
    const delta = e.originalEvent.deltaY;
    const scrollLeft = $(this).scrollLeft(); 
    const maxScrollLeft = this.scrollWidth - $(this).outerWidth(); 

    const isAtStart = scrollLeft === 0;
    const isAtEnd = scrollLeft >= maxScrollLeft;



    let x = $(window).innerHeight();
    let y = $(window).scrollTop();
    let z = $('main').height();
    console.log('answer: ', x+y);

    if ((!isAtEnd && delta > 0) || (!isAtStart && delta < 0)) {
        if (x+y >=z) {
            e.preventDefault();
            $(this).scrollLeft(scrollLeft + delta);
        }
    }
});





 let clicked = false; 
$('#ethics').click(function() {
    gsap.to(camera.position, {
        x: 100,
        y: -399,
        z: 50,
        duration: 4,
    })
  
})


//ss

