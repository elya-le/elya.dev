import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, Center } from "@react-three/drei"; 
import { Suspense } from "react";
import CanvasLoader from "../components/CanvasLoader";
import Cat from "../components/Cat.jsx";  

const Hero = () => {
  return (
    <section className="min-h-screen w-full flex flex-col relative">
      <div className="w-full h-full absolute inset-0">
        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            {/* Add Perspective Camera */}
            <PerspectiveCamera makeDefault position={[-6, 0, 5]} />
            <ambientLight intensity={1.2} />
            <directionalLight position={[10, 20, 15]} intensity={6} />

            {/* Center Cat model */}
            <Center>
              <Cat animationName="Idle1" />  
            </Center>
            
            {/* Add OrbitControls to enable rotation */}
            <OrbitControls 
              maxPolarAngle={Math.PI / 2} // Limit the vertical rotation angle
              minPolarAngle={0} // Prevent looking under the model
              enableZoom={true} // Allow zooming in/out
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Hero;




