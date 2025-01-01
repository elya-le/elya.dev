import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import CanvasLoader from "../components/CanvasLoader";
import Cat from "../components/Cat.jsx";
import "./Hero.css";

const Hero = ({ animationName }) => {
  const rectLightRef = useRef(); // reference for rect area light
  const catRef = useRef(); // reference for cat model
  const cameraRef = useRef(); // reference for camera
  const [scrollProgress, setScrollProgress] = useState(0); // state for scroll progress

  // track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / docHeight;
      setScrollProgress(scrollFraction); // <-- updated here
    };

    window.addEventListener("scroll", handleScroll); // <-- updated here
    return () => {
      window.removeEventListener("scroll", handleScroll); // <-- updated here
    };
  }, []);

  const handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault(); // prevent zooming with ctrl or cmd
    }
  };

  return (
    <section
      className="w-full h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-0" // hero remains fixed in the background
      id="hero"
    >
      <div
        className="w-full"
        style={{ height: "100vh" }}
        onWheel={handleWheel} // disable default zoom behavior
      >
        <Canvas
          className="w-full h-full"
          style={{ height: "100%" }}
          onPointerDown={(e) => e.stopPropagation()} // prevent events from propagating
          onWheel={(e) => e.stopPropagation()} // prevent scroll wheel interference
        >
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera
              makeDefault
              ref={cameraRef}
            />
            <CameraZoom
              scrollProgress={scrollProgress}
              cameraRef={cameraRef}
              basePosition={[-7, 2, 7]} // pass basePosition to CameraZoom
            />
            {/* rect area light */}
            <rectAreaLight
              ref={rectLightRef} 
              position={[-.5, 1.57, 1.65]} 
              rotation={[0.135, 0, 0]} 
              width={1.45} 
              height={1.05} 
              intensity={40} 
              color={"#6f7df7"} 
            />
            <ambientLight intensity={.1} color={"#ffffff"} />
            <directionalLight
              position={[5, 10, 5]} // Position of the light source
              intensity={.01} // Brightness
              color={"#ffffff"} // Light color
              castShadow // Enable shadows
            />
            {/* cat model */}
            <Cat ref={catRef} animationName={animationName} origin={[-.5, -1.2, 0]} />

            {/* debug geo origin sphere */}
            {/* <mesh position={[0, -1.2, 0]}>
              <sphereGeometry args={[0.1, 32, 32]} />
              <meshBasicMaterial color="red" />
            </mesh> */}
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

// component to handle camera zoom and rotation
const CameraZoom = ({ scrollProgress, cameraRef, basePosition }) => {
  useFrame(() => {
    if (cameraRef.current) {
      const progress = Math.min(Math.max(scrollProgress, 0), 1); // clamp scroll progress between 0 and 1

      const [baseX, baseY, baseZ] = basePosition;

      const zPosition = baseZ - progress * 8; // zoom closer to the model
      const yPosition = baseY - progress * -4; // adjust height slightly
      const xPosition = baseX + progress * 6.5; // adjust horizontal position

      cameraRef.current.position.set(xPosition, yPosition, zPosition); // update camera position
      cameraRef.current.lookAt(-.5, 0, 0); // ensure camera points to the center of the scene
    }
  });

  return null;
};

export default Hero;
