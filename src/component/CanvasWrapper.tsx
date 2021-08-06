import { Canvas } from '@react-three/fiber'
import React, { useEffect, useState } from 'react';
import { Physics } from '@react-three/cannon'
import AboutMe from '../models/Aboutme'
import Plane from '../models/Plane'
import Orbit from '../models/Orbit';
import { a, useSpring } from "@react-spring/three";

const backgroundColors = ["#1F2833", "#1A1A1D"]


export default function CanvasWrapper(props) {
  // const { backgroundColors, order, prevOrder } = props
  const [currentOrder, setOrder] = useState(0)
  const [change, setChange] = useState(0)

  const [orderChanged, setOrderChanged] = useState(false);

  const { args } = useSpring({
    args: (orderChanged) ? ["#1F2833"] : ["#1A1A1D"],
    reset: true
  })

  console.log(args)
  console.log(orderChanged)

  useEffect(() => {
    window.addEventListener('wheel', goToNextSection)
  });

  const goToNextSection = (e) => {

    let sectionOrder = window.innerHeight % window.scrollY;
    let goDown = e.wheelDelta && e.wheelDelta < 0

    setChange(sectionOrder)
  }

  return (
    <Canvas style={{"position": "fixed"}} shadows={true} camera={{position: [4.5,2,4.5], near: 0.1, far: 1000, zoom: 1.3}}>
      {/* <a.color attach="background" args={color}/> */}
      <a.color attach="background" args={args} />
      <hemisphereLight intensity={0.35} />
      <spotLight position={[15, 15, 15]} angle={0.3} penumbra={1} intensity={2} castShadow />
      {/* <gridHelper args={[ 10,10, 'white', 'gray']} /> */}
      {/* <Orbit /> */}
      <Physics>
        <Plane />
        <AboutMe />                      
      </Physics>
    </Canvas>
  )
}