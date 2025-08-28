console.log("Hello now we can start three js....");
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

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
// const cubeFolder = gui.addFolder("Cube Debug")

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

// get cursro position
const cursor = {
    x : 0,
    y : 0
}

window.addEventListener("mousemove",(event)=>{
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = (event.clientY / sizes.height - 0.5);
    // console.log(cursor.x, cursor.y);
})

// create scene
const scene = new THREE.Scene();

// add lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
// scene.add(ambientLight);



// load font
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
const matcapTexture = textureLoader.load("/matcaps/8.png");
const matcapTexture2 = textureLoader.load("/matcaps/4.png");
matcapTexture.colorSpace = THREE.SRGBColorSpace;
const fontLoader = new FontLoader(loadingManager);
let text;
fontLoader.load("/font/font1.typeface.json",(font)=>{
    // console.log(font);
    const textGeometry = new TextGeometry("SAURABH . KUMAR",{
      font,
      size: 0.5,
      depth:0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.003,
      bevelSize: 0.005,
      bevelOffset: 0,
      bevelSegments: 5
    })  
    textGeometry.center();
    const textMaterial = new THREE.MeshMatcapMaterial();
    textMaterial.matcap = matcapTexture;

    text = new THREE.Mesh(textGeometry, textMaterial);
    text.position.y = 0.5;
    scene.add(text);

    const textGeometry2 = new TextGeometry("KAJAL KUMARI",{
      font,
      size: 0.5,
      depth:0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.003,
      bevelSize: 0.005,
      bevelOffset: 0,
      bevelSegments: 5
    }) 
    textGeometry2.center();
    const text2 = new THREE.Mesh(textGeometry2, textMaterial);
    text2.position.y = -0.5;
    scene.add(text2);
    // add donuld


})
    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
    const donutMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture});

 // dodecaheadrongeometry
    const dodecahedronGeometry = new THREE.DodecahedronGeometry(0.3, 0);
     const dodecahedronMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture2});

for(let i = 0; i < 70; i++)
{
   
    // const randomColor = new THREE.Color(`rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},255)`);
    // console.log(randomColor);
    // donutMaterial.color = randomColor;
    const donut = new THREE.Mesh(donutGeometry, donutMaterial)
    
    donut.position.x = (Math.random() - 0.5)*10;
    donut.position.y = (Math.random() - 0.5)*10;
    donut.position.z = (Math.random() - 0.5)*10;
    let scale =( Math.random() - 0.5)*1.5;
    donut.scale.x = scale;
    donut.scale.y = scale;
    donut.scale.z = scale;
    
    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;
    donut.rotation.z = Math.random() * Math.PI;
    donut.name= "donut";
    scene.add(donut)
   
//    console.log(donut);
    const dodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial);

    dodecahedron.position.x = (Math.random() - 0.5)*10;
    dodecahedron.position.y = (Math.random() - 0.5)*10;
    dodecahedron.position.z = (Math.random() - 0.5)*10;
    dodecahedron.name = "dodecahedron";

    scene.add(dodecahedron);
    
}

// create a group
const group = new THREE.Group();
scene.add(group);

// create object
// const boxGeomatery = new THREE.BoxGeometry(1,1,1);
// const boxMaterial = new THREE.MeshBasicMaterial({ color: "red" });
// const boxMesh = new THREE.Mesh(boxGeomatery,boxMaterial);
// boxMesh.rotation.reorder("YXZ");
// scene.add(boxMesh);








// create camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,0.1,1000);
camera.position.z = 5;

scene.add(camera);

// create controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;
controls.maxPolarAngle = Math.PI ;
controls.minAzimuthAngle = -Math.PI /2 ;
controls.maxAzimuthAngle = Math.PI/2 ;
controls.minDistance = 3;
controls.maxDistance = 8;
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

const time = new THREE.Clock();

function animate(){
    const elapsedTime = time.getElapsedTime();
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    // camera.position.y = Math.sin(cursor.x * Math.PI * 2) *1;
//   camera.lookAt(text.position);
  scene.traverse((object)=>{
        // object.position.x = Math.sin(elapsedTime) * 2;
      if(object.isMesh && object.name === "donut" || object.name ==="dodecahedron"){
       
        // console.log(object.name);
      object.rotation.x = elapsedTime * 2;
      object.rotation.y = elapsedTime;
      object.rotation.z = elapsedTime;

    //   object.position.x = Math.sin(elapsedTime) * 2;
    //   object.position.y = Math.sin(elapsedTime) * 2;
    //   object.position.z = Math.sin(elapsedTime) * 2;
    }
  })
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

