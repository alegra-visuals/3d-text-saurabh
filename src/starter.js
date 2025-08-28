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
scene.add(boxMesh);








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


function animate(){

  camera.lookAt(boxMesh.position);
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

