console.log("Hello now we can start three js....");
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

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

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = ()=>{
  console.log("loading started");
}
loadingManager.onLoad = ()=>{
  console.log("loading finished");
}
loadingManager.onProgress= ()=>{
    console.log("loading progressing");
}
loadingManager.onError = ()=>{
  console.log("loading error");
}

const rgbLoader = new RGBELoader(loadingManager);

rgbLoader.load("/environment_map.hdr",(envMap)=>{
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = envMap;
  scene.environment = envMap;
})

const texturesLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = texturesLoader.load("/textures/door/color.jpg");
colorTexture.colorSpace = THREE.SRGBColorSpace;
const alphaTexture = texturesLoader.load("/textures/door/alpha.jpg");
const heightTexture = texturesLoader.load("/textures/door/height.jpg");
const normalTexture = texturesLoader.load("/textures/door/normal.jpg");
const metalnessTexture = texturesLoader.load("/textures/door/metalness.jpg");
const roughnessTexture = texturesLoader.load("/textures/door/roughness.jpg");
const ambientOcclusionTexture = texturesLoader.load("/textures/door/ambientOcclusion.jpg");
const matCapTexture = texturesLoader.load("/matcaps/9.jpg");

// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;

// colorTexture.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// colorTexture.rotation = Math.PI * 0.25;
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;
// colorTexture.generateMipmaps = false;
// colorTexture.minFilter = THREE.NearestFilter;
// colorTexture.magFilter = THREE.NearestFilter;

// load images
// const image= new Image();
// const textures = new THREE.Texture(image);
// textures.colorSpace = THREE.SRGBColorSpace;
// image.onload = ()=>{
//     textures.needsUpdate = true;
//     console.log("image loaded");
// }
// image.src = "/textures/door/color.jpg";
// define our size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
// console.log(sizes)

// create scene
const scene = new THREE.Scene();

// add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(2,2,2);
scene.add(pointLight);

//light helper
const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLightHelper);


// create a group
const group = new THREE.Group();
scene.add(group);

// create object
const boxGeomatery = new THREE.BoxGeometry(1,1,1);
// console.log(boxGeomatery.attributes.uv)



const boxMaterial = new THREE.MeshStandardMaterial();
boxMaterial.side = THREE.DoubleSide;
boxMaterial.map = colorTexture;
boxMaterial.metalness = 0.9;
boxMaterial.roughness = 0.7;
boxMaterial.aoMap = ambientOcclusionTexture;
boxMaterial.aoMapIntensity =1;
boxMaterial.normalMap = normalTexture;
// boxMaterial.displacementMap = heightTexture;
// boxMaterial.displacementScale = 1;

// boxMaterial.transparent = true;
// boxMaterial.alphaMap = alphaTexture;
// boxMaterial.transparent = true;
boxMaterial.metalnessMap = metalnessTexture;
boxMaterial.roughnessMap = roughnessTexture;


cubeFolder.add(boxMaterial, "metalness").min(0).max(1).step(0.0001);
cubeFolder.add(boxMaterial, "roughness").min(0).max(1).step(0.0001);

const boxMesh = new THREE.Mesh(boxGeomatery,boxMaterial);
boxMesh.rotation.reorder("YXZ");
boxMesh.position.x = 1;
scene.add(boxMesh);


// create sphere geometry
const sphereGeometry = new THREE.SphereGeometry(0.5, 64, 64);
// const sphereMaterial = new THREE.MeshPhysicalMaterial();
// const sphereMaterial = new THREE.MeshLambertMaterial(); // as it is basic materical
const sphereMaterial = new THREE.MeshMatcapMaterial();
// sphereMaterial.wireframe = true;
// sphereMaterial.color.set(new THREE.Color("green"))
sphereMaterial.side = THREE.DoubleSide;
// sphereMaterial.map = colorTexture;
// sphereMaterial.flatShading = true;
sphereMaterial.matcap = matCapTexture;

// sphereMaterial.metalness = 0.9;
// sphereMaterial.roughness = 0.7;
// sphereMaterial.clearcoat = 1;
// sphereMaterial.clearcoatRoughness = 0;

sphereMaterial.shininess = 150;

const cube = gui.addFolder("cube");
// cube.add(sphereMaterial, "clearcoat").min(0).max(1).step(0.0001);
// cube.add(sphereMaterial, "clearcoatRoughness").min(0).max(1).step(0.0001);


const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereMesh.position.x = -1;
scene.add(sphereMesh);



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
renderer.setClearColor("0x000000",0);

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

