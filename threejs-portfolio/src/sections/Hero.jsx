import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, Center } from "@react-three/drei"; 
import { Suspense } from "react";
import CanvasLoader from "../components/CanvasLoader";
import Cat from "../components/Cat.jsx";  

const Hero = () => {
  return (
    <section className="w-full flex flex-col relative">
      
      <div 
        className="w-full" 
        style={{ height: "800px", border: "1px solid red", marginBottom: "0" }} // Custom height and red border
      >
        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            {/* Add Perspective Camera */}
            <PerspectiveCamera makeDefault position={[-8, 0, 5]} />
            <ambientLight intensity={1.2} />
            <directionalLight position={[10, 20, 15]} intensity={6} />

            {/* Center Cat model */}
            <Center position={[-2, 0, 0]}>
              <Cat animationName="Idle1" />  
            </Center>
            
            {/* Add OrbitControls to enable rotation */}
            <OrbitControls 
              maxPolarAngle={Math.PI / 2} // Limit the vertical rotation angle
              minPolarAngle={0} // Prevent looking under the model
              enableZoom={true}
              minDistance={7}      
              maxDistance={9}  
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Hero;




