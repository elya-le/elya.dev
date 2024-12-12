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
      className="w-full h-screen fixed top-0 left-0 bg-black bg-opacity-80 z-0" // hero remains fixed in the background
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
              position={[-8, 1.5, 9.5]} // initial camera position
            />
            <CameraZoom scrollProgress={scrollProgress} cameraRef={cameraRef} /> {/* <-- updated here */}

            {/* rect area light */}
            <rectAreaLight
              ref={rectLightRef} // <-- updated here
              position={[0, 1.57, 1.65]} // <-- updated here
              rotation={[0.135, 0, 0]} // <-- updated here
              width={1.45} // <-- updated here
              height={1.05} // <-- updated here
              intensity={20} // <-- updated here
              color={"#6f7df7"} // <-- updated here
            />

            {/* cat model */}
            <Cat ref={catRef} animationName={animationName} origin={[0, 0, 0]} /> {/* <-- updated here */}

            {/* debug sphere */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.1, 32, 32]} />
              <meshBasicMaterial color="red" />
            </mesh>
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

// component to handle camera zoom and rotation
const CameraZoom = ({ scrollProgress, cameraRef }) => {
  useFrame(() => {
    if (cameraRef.current) {
      const progress = Math.min(Math.max(scrollProgress, 0), 1); // clamp scroll progress between 0 and 1

      const zPosition = 6.5 - progress * 10; // zoom closer to the model
      const yPosition = 4 - progress * -2; // adjust height slightly
      const xPosition = -8 + progress * 2; // adjust horizontal position

      cameraRef.current.position.set(xPosition, yPosition, zPosition); // update camera position
      cameraRef.current.lookAt(0, 0, 0); // ensure camera points to the center of the scene
    }
  });

  return null;
};

export default Hero;
