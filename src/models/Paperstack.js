/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useRef, useState } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { THREE } from "enable3d";
import { useFrame } from '@react-three/fiber'
import { a, config, useSpring } from "@react-spring/three";
import pageOne from '../assets/samplePage1.png';
import pageTwo from '../assets/samplePage2.png';
import { EffectComposer, Outline } from '@react-three/postprocessing';

export default function Model(props) {
  const group = useRef()
  const [active, setActive] = useState(false)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
  })

  function positionViewMode(){
    if (props.viewMode === "desktop") {
      return props.active ? [3.5, 1, 2.5] : [3.5, 5, 2.5]
    } else if (props.viewMode === "tablet") {
      return props.active ? [3, 1, 2.5] : [3, 5, 2.5]
    } else if (props.viewMode === "tabletSM") {
      return props.active ? [2.5, 1, 2.5] : [2.5, 5, 2.5]
    }
  }

  const { color, rotation, position, opacity } = useSpring({
    position: positionViewMode(),
    positionSecondStack: props.active ? [0.32, 0, 0] : [0.32, 0, 0],
    rotation: active ? [0, 2 * Math.PI, 0] : [0, 0, 0],
    color: active ? props.mainColor : 'white',
    opacity: props.viewMode === "desktop" ? [1] : [0.5],
    onRest: () => props.enableScroll,
    reset: true
  })

  const samplePageOneTexture = useTexture(pageOne)  
  const samplePageTwoTexture = useTexture(pageTwo)

  console.log(props)

  const { nodes, materials } = useGLTF('/paperstack.glb')
  return (
    <a.group 
      ref={group} 
      scale={[2, 2, 2]}
      position={position} 
      rotation={rotation} 
      onClick={e => setActive(!active)}
      receiveShadow={props.active}
      castShadow={props.active}
    >
      <a.mesh
        geometry={nodes.Stack_of_Paper002.geometry}
        position={[0.32, 0, 0]}
        receiveShadow={props.active}
        castShadow={props.active}
        transparent
        opacity={opacity}
      >
        <a.meshStandardMaterial color={color} transparent opacity={opacity}/>
      </a.mesh>
      <a.mesh 
        geometry={nodes.Stack_of_Paper.geometry} 
        receiveShadow={props.active}
        castShadow={props.active}
        transparent
        opacity={opacity}
        >
        <a.meshStandardMaterial color={color} transparent opacity={opacity}/>
      </a.mesh>
    </a.group>
  )
}

useGLTF.preload('/paperstack.glb')
