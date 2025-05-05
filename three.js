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


    if ((!isAtEnd && delta > 0) || (!isAtStart && delta < 0)) {
        if (x+y >=z) {
            e.preventDefault();
            $(this).scrollLeft(scrollLeft + delta);
        }
    }
});


let clicked = false; 
// Use event delegation to handle clicks on dynamically added elements
$('body').on('click', '.pajo', function() {
    if (!clicked) {
        gsap.to(camera.position, {
            x: 100,
            y: -399,
            z: 50,
            duration: 4,
        });

        // Disable scrolling
        $('main').css('overflow', 'hidden'); 
        $('.planet-section').css('overflow', 'hidden'); 
        $('body').css('overflow', 'hidden'); 
        $('.info-grid').html(`
                            <h3 class='pajo'>Environmental Sustainability</h3>
                            <br>
                            <p>Why should we care about our Earth? It is the only known planet that supports life, and all our resources—air, water, food, and energy—come from its ecosystems. If we degrade Earth's systems through pollution, deforestation, overconsumption, and climate change, we undermine the very conditions that make life possible. Sustainability is about preserving these systems so that future generations can meet their needs, just as we rely on them today.</p>
                            <br>
                            <p>Every breath we take, every drop of clean water we drink, and every bite of food we eat depends on a healthy planet. Yet, our environment is under threat from pollution, deforestation, and climate change, largely caused by human actions.</p> 
                            <p>If we continue to exploit resources without thinking of the consequences, we risk destroying the very systems that keep us alive. But it’s not too late. By making more sustainable choices—like conserving energy, reducing waste, </p> 
                            <p>and protecting nature—we can protect our planet for ourselves and for future generations. Choosing sustainability isn’t just a good idea—it’s the only responsible path forward.</p>
                            <br>
                            <p>The power to change the future is in our hands. Let’s act before it’s too late.</p>
                            `);

        scrollTo(0, 0); // Scroll to the top of the page
        clicked = true; 
    } else {
        gsap.to(camera.position, {
            x: -10,
            y: 10,
            z: 50,
            duration: 2,
            onComplete: function() {
                $('main').css('overflow', 'scroll'); 
                $('.planet-section').css('overflow', 'scroll');
                $('body').css('overflow', 'scroll'); 
                clicked = false; 
             }
            }
        );
     $('.info-grid').html(`                        <!-- Desktop View Cards -->
                        <div id="text1" class="info-card desktop-only">
                            <h3>Namesake</h3>
                            <p>earth was named after the Roman god of the underworld. The name was suggested by an 11-year-old schoolgirl, Venetia Burney, 
                                who was interested in classical mythology. The name was officially adopted in 1930.</p>
                        </div>
                        <div id="text2" class="info-card desktop-only">
                            <h3>Classification</h3>
                            <p>Once considered the ninth planet, Pluto was reclassified as a dwarf planet in 2006. 
                                It's the largest known dwarf planet in our solar system and the second-most-massive known dwarf planet after Eris.</p>
                        </div>
                        <div id="text4" class="info-card desktop-only">
                            <h3>Pluto's Characteristics</h3>
                            <p>Pluto is a complex and mysterious world with mountains, valleys, plains, craters, and glaciers. 
                                It has a thin atmosphere that expands when it comes closer to the Sun and collapses as it moves farther away.</p>
                        </div>
                        <div id="text3" class="info-card desktop-only">
                            <h3 class="pajo">Environmental Sustainability</h3>
                            <p>Ethics</p>
                        </div>


                        <!-- Mobile View Card -->
                        <div id="earth_info" class="info-card mobile-only">
                            <h3>Namesake</h3>
                            <p>earth was named after the Roman god of the underworld. The name was suggested by an 11-year-old schoolgirl, Venetia Burney, 
                                who was interested in classical mythology. The name was officially adopted in 1930.</p>
                            <br>
                            <h3>Classification</h3>
                            <p>Once considered the ninth planet, Pluto was reclassified as a dwarf planet in 2006. 
                                It's the largest known dwarf planet in our solar system and the second-most-massive known dwarf planet after Eris.</p>
                            <br>
                            <h3>Pluto's Characteristics</h3>
                            <p>Pluto is a complex and mysterious world with mountains, valleys, plains, craters, and glaciers. 
                                It has a thin atmosphere that expands when it comes closer to the Sun and collapses as it moves farther away.</p>
                                <br>
                            <h3 class="pajo">Environmental Sustainability</h3>
                            <p>Ethics</p>
                        </div>`);
    }
    console.log('clicked:', clicked);
});


//ss

// Function to update planet sizes based on screen width
function updatePlanetSizes() {
    const isMobile = window.innerWidth <= 430;
    
    // Update Earth size
    earth.scale.set(
        isMobile ? 0.5 : 1,
        isMobile ? 0.5 : 1,
        isMobile ? 0.5 : 1
    );

    // Update Pluto size
    pluto.scale.set(
        isMobile ? 0.5 : 1,
        isMobile ? 0.5 : 1,
        isMobile ? 0.5 : 1
    );
}

window.addEventListener('resize', updatePlanetSizes);

updatePlanetSizes();

