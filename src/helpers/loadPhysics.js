import { THREE, AmmoPhysics } from "enable3d";

export default async function loadPhysics(camera, scene, renderer, object, floor) {
  const physics = await AmmoPhysics(scene);
  physics.debug.enable(true)

  physics.addMesh( floor );

  object.instanceMatrix.setUsage( THREE.DynamicDrawUsage ); // will be updated every frame
  object.castShadow = true;
  object.receiveShadow = true;
  scene.add( object );
  physics.add.existing( object );

  renderer.shadowMap.enabled = true;
  renderer.outputEncoding = THREE.sRGBEncoding;

  return physics;
}