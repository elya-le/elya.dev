import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei"; 
import { Suspense } from "react";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";
import CanvasLoader from "../components/CanvasLoader";
import Cat from "../components/Cat.jsx";  
import './Hero.css'; 

const Hero = () => {
  const [animationName, setAnimationName] = useState("Slow");
  const rectLightRef = useRef(); // Reference for RectAreaLight
  const rectLightHelperRef = useRef(); // Reference for the helper

  useEffect(() => {
    // Attach helper to RectAreaLight
    if (rectLightRef.current) {
      const helper = new RectAreaLightHelper(rectLightRef.current);
      rectLightHelperRef.current = helper;
      rectLightRef.current.add(helper);
    }
    return () => {
      // Cleanup helper
      if (rectLightRef.current && rectLightHelperRef.current) {
        rectLightRef.current.remove(rectLightHelperRef.current);
      }
    };
  }, []);

  const toggleAnimation = () => {
    setAnimationName((prev) => (prev === "Slow" ? "Fast" : "Slow"));
  };

  return (
    <section className="w-full flex flex-col relative">
      <div 
        className="w-full" 
        style={{ height: "1000px", border: "1px solid red", marginBottom: "0" }}
      >
        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera makeDefault position={[-8, -1, 6]} />

            {/* Point Light */}
            <pointLight
              position={[5, 5, 5]}
              intensity={5}
              decay={1}
              distance={100}
            />
            {/* red Dot for Point Light */}
            <mesh position={[5, 5, 5]}>
              <sphereGeometry args={[0.1, 32, 32]} />
              <meshBasicMaterial color="red" />
            </mesh>

            {/* RectAreaLight for Screen Glow */}
            <rectAreaLight
              ref={rectLightRef}
              position={[0, 0.57, 1.64]}
              rotation={[.135, 0, 0]} // Adjust rotation as needed
              width={1.45}
              height={1.05}
              intensity={10}
              color={"#ADD8E6"}
            />

            <Cat animationName={animationName} origin={[0, -1.5, 0]} />

            {/* Red marker at origin */}
            <mesh position={[0, -1.5, 0]}>
              <sphereGeometry args={[0.1, 32, 32]} />
              <meshBasicMaterial color="red" />
            </mesh>

            <OrbitControls 
              maxPolarAngle={Math.PI / 2} 
              minPolarAngle={Math.PI / 3} 
              enableZoom={true}
              minDistance={5.5}      
              maxDistance={8}  
            />
          </Suspense>
        </Canvas>
      </div>

      <div className="flex justify-center items-center mt-4">
        <div className="toggle-container">
          {animationName !== "Fast" && <span className="faster-text">FASTER!</span>}
        </div>
        <label className="toggle-switch">
          <input 
            type="checkbox" 
            onChange={toggleAnimation} 
            checked={animationName === "Fast"} 
          />
          <span className="slider"></span>
        </label>
      </div>
    </section>
  );
};

export default Hero;
