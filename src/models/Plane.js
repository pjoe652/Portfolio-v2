import { usePlane } from '@react-three/cannon'

export default function Plane(props) {
  const [ref] = usePlane(() => ({ mass: 0, rotation: [-Math.PI / 2, 0, 0], ...props }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshPhongMaterial attach="material" color="#f3f3f3" />
      <shadowMaterial attach="material" color="#171717" opacity={0.8} />
    </mesh>
  )
}