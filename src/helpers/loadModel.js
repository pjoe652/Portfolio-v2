import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


export default function loadModel(scene, objectLink) {
  const loader = new GLTFLoader();
  return new Promise((resolve, reject) => {
    loader.load(objectLink, function(gltf){
      let object = gltf.scene.children[2];
  
      const material = new THREE.MeshPhongMaterial({
        color: 0x66FCF1,
        specular: 0x050505,
        shininess: 500
      })
  
      object.material = material;
      object.material.shading = THREE.SmoothShading;
      object.position.set(4, 6,-5);

      gltf.scene.traverse(function (node) {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      })
      resolve(object);
    })
  })
}