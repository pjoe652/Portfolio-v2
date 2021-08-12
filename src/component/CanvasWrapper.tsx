import { Physics } from '@react-three/cannon';
import { Canvas } from '@react-three/fiber';
import React from 'react';
import AboutMe from '../models/Aboutme';
import Orbit from '../models/Orbit';
import Paperstack from '../models/Paperstack';
import Plane from '../models/Plane';
import Work from '../models/Work';

export default function CanvasWrapper(props) {
  return (
    <Canvas style={{"position": "fixed"}} shadows={true} camera={{position: [4.5,2,4.5], near: 0.1, far: 1000, zoom: 1.3}}>
      <hemisphereLight intensity={0.35} />
      <spotLight position={[15, 15, 15]} angle={0.3} penumbra={1} intensity={2} castShadow />
      {
        props.orbit ? 
        <React.Fragment>
          <gridHelper args={[ 10,10, 'white', 'gray']} />
          <Orbit />
        </React.Fragment>
        :
        <React.Fragment/>
      }
      <Physics>
        <Plane />
        <AboutMe mainColor={props.mainColor} active={props.order === 0} enableScroll={props.enableScroll} viewMode={props.viewMode}/>
        <Paperstack mainColor={props.mainColor} active={props.order === 1} enableScroll={props.enableScroll} viewMode={props.viewMode}/>
        <Work mainColor={props.mainColor} active={props.order === 2} enableScroll={props.enableScroll} viewMode={props.viewMode}/>
      </Physics>
    </Canvas>
  )
}