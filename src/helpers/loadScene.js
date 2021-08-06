import * as THREE from "three";

export default function loadScene(scene, camera, renderer) {
    scene.background = new THREE.Color(0x1F2833)

    camera.position.setX(12.94);
    camera.position.setY(13.14);
    camera.position.setZ(-1.1);

    // camera.lookAt(-1.13, 0.6, 0.15);
    camera.rotation.set(new THREE.Euler(-1.57, 0.84, 1.56, 'XYZ'))

    renderer.render(scene, camera);

    // lights
		var dirLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
		dirLight.position.set( 10, 10, -2 );
		dirLight.castShadow = true;
		dirLight.shadow.camera.top = 0.2;
		dirLight.shadow.camera.bottom = - 0.2;
		dirLight.shadow.camera.left = - 0.2;
		dirLight.shadow.camera.right = 0.2;
		dirLight.shadow.camera.near = 0;
		dirLight.shadow.camera.far = 2;
		dirLight.shadow.mapSize.set( 1024, 1024 );
		scene.add( dirLight );

		scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

    // const light = new THREE.PointLight(0xffffff, 1, 100);
    // light.shadow.bias = -0.0005;
    // light.position.set(0, 10, 4);
    // light.castShadow = true;

    // const ambientLight = new THREE.AmbientLight(0xffffff);
  
    // scene.add( ambientLight, light );

    // const geometry = new THREE.PlaneGeometry( 100, 100);
    // const material = new THREE.MeshBasicMaterial( {color: 0x1F2833, side: THREE.DoubleSide} );
    const floor = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshPhongMaterial () );
    floor.receiveShadow = true;
    floor.castShadow = true;
    floor.rotation.x = Math.PI / 2

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById("aboutme")?.appendChild(renderer.domElement)

    return floor;
}