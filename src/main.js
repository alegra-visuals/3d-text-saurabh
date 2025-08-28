console.log("Hello now we can start three js....");
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "lil-gui";
// get our canvas element
const canvas = document.getElementById("app");
const gui = new dat.GUI({
  title: "Debug UI",
  width: 400,
  // closeFolders: true
});
const debugObject = {}
// gui.close();
// gui.hide();
const cubeFolder = gui.addFolder("Cube Debug")

window.addEventListener("keydown",(event)=>{
  if(event.key === "h"){
    gui.show(gui._hidden);
  }
})

// define our size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
// console.log(sizes)

// create scene
const scene = new THREE.Scene();

// create a group
const group = new THREE.Group();
scene.add(group);

// create object
const boxGeomatery = new THREE.BoxGeometry(1,1,1);
const boxMaterial = new THREE.MeshBasicMaterial({ color: "red" });
const boxMesh = new THREE.Mesh(boxGeomatery,boxMaterial);
boxMesh.rotation.reorder("YXZ");
// boxMesh.position.set(0, 1, 0);
// scene.add(boxMesh);


// create buffer mesh
// const positionsArray = new Float32Array([
//   0,0,0,
//   0,1,0,
//   1,0,0
// ]);

// const positionAttribute = new THREE.BufferAttribute(positionsArray, 3);

// const bufferGeometry = new THREE.BufferGeometry();
// bufferGeometry.setAttribute("position", positionAttribute);

// const bufferMaterial = new THREE.MeshBasicMaterial({color: "green", wireframe: true});
// const customeMesh = new THREE.Mesh(bufferGeometry, bufferMaterial);
// scene.add(customeMesh);

// create multiple mesh
const customeGeometry = new THREE.BufferGeometry();
const count = 50;
const positionsArray = new Float32Array(count * 3 * 3);
for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 4;
}
// console.log(positionsArray);
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

debugObject.color = "#ec32a8"
const customeMaterial = new THREE.MeshBasicMaterial({
  color: debugObject.color,
  wireframe: true,
});

customeGeometry.setAttribute("position", positionsAttribute);
const customeMesh = new THREE.Mesh(customeGeometry, customeMaterial);
scene.add(customeMesh);


// create debug for cusotme mesh

cubeFolder.add(customeMesh.position, "y").min(-2).max(2).step(0.001).name("y-position");

cubeFolder.add(customeMaterial,"wireframe");
// cubeFolder.addColor(customeMaterial, "color");
cubeFolder.addColor(debugObject,"color").onChange(()=>{
  customeMaterial.color.set(debugObject.color);
})

// cubeFolder.add(customeMesh.rotation, "x").min(-Math.PI).max(Math.PI).step(0.001).name("x-rotation");
debugObject.animate = ()=>{
  gsap.to(customeMesh.rotation,{y:customeMesh.rotation.y + Math.PI *2})
  // customeMesh.rotation.y = Math.PI *2;
}
cubeFolder.add(debugObject, "animate");


// create camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,0.1,1000);
camera.position.z = 3;

scene.add(camera);

// create controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 1;


// carete renderer
const renderer = new THREE.WebGLRenderer({canvas});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

// geting cursor movement
let cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove",(event)=>{
  // console.log(event.clientX/sizes.width -0.5, event.clientY/sizes.height - 0.5);
  cursor.x = event.clientX/sizes.width - 0.5;
  cursor.y = event.clientY/sizes.height - 0.5;
})


// window resize handle
window.addEventListener("resize",()=>{
  sizes.height = window.innerHeight;
  sizes.width = window.innerWidth;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
  renderer.setSize(sizes.width, sizes.height);

})
window.addEventListener("dblclick",()=>{
  if(!document.fullscreenElement){
    canvas.requestFullscreen();
  }else{
    document.exitFullscreen();
  }
})
let time = Date.now();

const timer = new THREE.Clock();
// gsap.to(boxMesh.position, {duration: 1, delay: 1, x: 2});
// gsap.to(boxMesh.position, {duration: 1, delay: 2, x: 0});
// gsap.to(boxMesh.position, {duration: 1, delay: 3, x: -2});
// gsap.to(boxMesh.position, {duration: 1, delay: 4, x: 0});

function animate(){
  // const currentTime = Date.now();
  // let elapsedTime = currentTime - time;
  // time = currentTime ;
  // boxMesh.rotation.z += 0.001 * elapsedTime;
  // const elapsedTime = timer.getElapsedTime();
  // boxMesh.position.z = Math.sin(elapsedTime) * 1;
  // console.log(elapsedTime)
  // boxMesh.position.z = Math.sin(Date.now()/1000) * 0.8;
  // boxMesh.rotation.x += 0.01;
  // console.log(elapsedTime);
  // console.log(Date.now())  
  // boxMesh.rotation.y -= 0.03;

  // boxMesh.rotation.y = cursor.x;
  // boxMesh.rotation.x = cursor.y;
  
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 5;
  // customeMesh.rotation.z = Math.sin(Date.now()/1000)*1;
  camera.lookAt(boxMesh.position);
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

