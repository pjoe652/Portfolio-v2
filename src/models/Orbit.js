import { OrbitControls, PerspectiveCamera } from "@react-three/drei"


export default function Camera(props) {
  return (
    <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
  )
}