import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);


const spotlight = new THREE.SpotLight(0xffffff, 1);
spotlight.position.set(0, 0, 10);
spotlight.castShadow = true;
scene.add(spotlight);


const ringGeometry = new THREE.RingGeometry(1, 2, 32);
const ringMaterial = new THREE.MeshPhongMaterial({ color: 0x0077ff, side: THREE.DoubleSide }); // Preserving the blue color
const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
ringMesh.receiveShadow = true;
scene.add(ringMesh);


const cylinderGeometry = new THREE.CylinderGeometry(0.05, 0.05, 5, 32);
const cylinderMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinderMesh.position.set(0, 0, 0);
cylinderMesh.rotation.x = Math.PI / 2;
cylinderMesh.castShadow = true;
scene.add(cylinderMesh);


const particleGeometry = new THREE.BufferGeometry();
const particleMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.05
});
const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);


const particlePositions = new Float32Array(1000 * 3);
for (let i = 0; i < 1000; i++) {
    particlePositions[i * 3] = Math.random() * 20 - 10;
    particlePositions[i * 3 + 1] = Math.random() * 20 - 10;
    particlePositions[i * 3 + 2] = Math.random() * 20 - 10;
}
particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));


function animate() {
    requestAnimationFrame(animate);
    ringMesh.rotation.x += 0.01;
    ringMesh.rotation.y += 0.01;
    cylinderMesh.rotation.z += 0.01;


    spotlight.position.x = Math.sin(Date.now() * 0.001) * 10;
    spotlight.position.y = Math.cos(Date.now() * 0.001) * 10;

    renderer.render(scene, camera);
}
animate();
