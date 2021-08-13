import { OrbitControls } from "@react-three/drei"
import { useEffect, useRef } from "react"


export default function Camera(props) {
  const orbitRef = useRef()

  useEffect(() => {
    if (orbitRef.current && !props.orbitEnable) {
      orbitRef.current.reset()
    } 
  })
  
  return (
    <OrbitControls ref={orbitRef} enablePan={props.orbitEnable} enableZoom={props.orbitEnable} enableRotate={props.orbitEnable} />
  )
}