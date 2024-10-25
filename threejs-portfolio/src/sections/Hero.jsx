

import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei"; 
import Star from '../components/Star.jsx';
import { Suspense } from "react";
import CanvasLoader from "../components/CanvasLoader";
import { useControls, Leva } from "leva";


const Hero = () => {
  const x = useControls( 'Star', {
    positionX: {
      value: 2.5,
      min: -10,
      max: 10
    },
    positionY: {
      value: 2.5,
      min: -10,
      max: 10
    },
    positionZ: {
      value: 2.5,
      min: -10,
      max: 10
    },
    rotationX: {
      value: 0,
      min: -10,
      max: 10
    },
    rotationY: {
      value: 0,
      min: -10,
      max: 10
    },
    rotationZ: {
      value: 0,
      min: -10,
      max: 10
    },
    scale: {
      value: 1,
      min: 0.1,
      max: 10
    }
  }
  )
  return (
    <section className="min-h-screen w-full flex flex-col relative">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        {/* add hero_tag to text only, keep waving hand visible */}
        <p className="hero_tag">
          {/* Hi, I'm Elya{" "} */}
          {/* <span className="waving-hand" style={{ color: "white" }}>💖</span> */}
        </p>
        <p className="hero_tag text-gray_gradient">
          {/* Software Engineer */}
        </p>
      </div>

      <div className="w-full h-full absolute inset-0">
      <Leva />
        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader/>}>

            <PerspectiveCamera makeDefault position={[0, 0, 30]} />
            <Star 
            position={[0, -7, 0]} 
            rotation={[0, 0, 0]} 
            scale={[7, 7, 7]} 
            />
            {/* <Star 
              position={[x.positionX, x.positionY, x.positionZ]} 
              rotation={[x.rotationX, x.rotationY, x.rotationZ]} 
              scale={[x.scale, x.scale, x.scale]} 
              // scale={10} 
              position={[0, -15, 0]} 
              rotation={[0, 0, 0]} 
              scale={[x.positionX, x.positionY, x.positionZ]}
            /> */}
            <ambientLight 
              intensity={1} 
            />
            <directionalLight 
              position={[10, 10, 10]} 
              intensity={5} 
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Hero;
