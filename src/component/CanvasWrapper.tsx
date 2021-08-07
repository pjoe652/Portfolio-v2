import { Canvas } from '@react-three/fiber'
import React, { useEffect, useState } from 'react';
import { Physics } from '@react-three/cannon'
import AboutMe from '../models/Aboutme'
import Plane from '../models/Plane'
import Orbit from '../models/Orbit';
import { a, useSpring } from "@react-spring/three";
import LocomotiveScroll from 'locomotive-scroll';

const backgroundColors = ["#1A1A1D", "#1F2833"]
const scroll = new LocomotiveScroll({
  getDirection: true,
});

export default function CanvasWrapper(props) {
  // const { backgroundColors, order, prevOrder } = props
  // const [prevOrder, setPrevOrder] = useState(0)
  // const [currentOrder, setOrder] = useState(0)
  // const [change, setChange] = useState(0)

  // const [orderChanged, setOrderChanged] = useState(false);

  // const { args } = useSpring({
  //   args: (orderChanged) ? [backgroundColors[currentOrder]] : [backgroundColors[prevOrder]],
  //   reset: true
  // })

  // useEffect(() => {
  //   // window.addEventListener('wheel', goToNextSection)
  //   // scroll.on("scroll", goToNextSection)
  // });

  // const goToNextSection = (e) => {
  //   console.log("------------Start-------------")
  //   console.log(prevOrder)
  //   console.log(currentOrder)
  //   let tempCurrentOrder = currentOrder;
  //   let nextOrder = currentOrder;
  //   if (e.direction === "down") {
  //     // Go Down
  //     nextOrder = currentOrder + 1 < props.sections.length ? currentOrder + 1 : currentOrder;
  //   } else {
  //     // Go Up
  //     nextOrder = currentOrder - 1 >= 0 ? currentOrder - 1 : currentOrder;
  //   }

  //   transitionColor(tempCurrentOrder, nextOrder)
  // }

  // const transitionColor = (prevOrder, nextOrder) => {
  //   if (prevOrder !== nextOrder) {
  //     setOrderChanged(true)
  //   }
  //   setOrder(nextOrder)
  //   setPrevOrder(prevOrder)
  //   console.log("------------End-------------")
  //   console.log(prevOrder)
  //   console.log(nextOrder)
  // }

  return (
    <Canvas style={{"position": "fixed"}} shadows={true} camera={{position: [4.5,2,4.5], near: 0.1, far: 1000, zoom: 1.3}}>
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