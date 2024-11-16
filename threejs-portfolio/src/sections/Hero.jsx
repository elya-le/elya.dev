import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, Center } from "@react-three/drei"; 
import { Suspense, useState } from "react";
import CanvasLoader from "../components/CanvasLoader";
import Cat from "../components/Cat.jsx";  
import './Hero.css'; 

const Hero = () => {
  const [animationName, setAnimationName] = useState("Idle"); // initial animation state

  const toggleAnimation = () => {
    setAnimationName(prev => (prev === "Idle" ? "Faster" : "Idle")); // toggle between "Idle" and "Faster"
  };

  return (
    <section className="w-full flex flex-col relative">
      <div 
        className="w-full" 
        style={{ height: "800px", border: "1px solid red", marginBottom: "0" }}
      >
        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera makeDefault position={[-8, 0, 5]} />
            <ambientLight intensity={0.5} color={"#FFA500"} />
            <directionalLight position={[10, 20, 15]} intensity={3} />

            <Center position={[-2, 0, 0]}>
              <Cat animationName={animationName} />
            </Center>

            <OrbitControls 
              maxPolarAngle={Math.PI / 2} 
              minPolarAngle={0} 
              enableZoom={true}
              minDistance={7}      
              maxDistance={8}  
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Add toggle switch with "FASTER!!!!" text */}
      <div className="flex justify-center items-center mt-4">
        <div className="toggle-container">
          {/* Show "FASTER!!!!" when toggle is off */}
          {animationName !== "Faster" && <span className="faster-text">FASTER!</span>}
        </div>
        <label className="toggle-switch">
          <input 
            type="checkbox" 
            onChange={toggleAnimation} 
            checked={animationName === "Faster"} 
          />
          <span className="slider"></span>
        </label>
      </div>
    </section>
  );
};

export default Hero;
