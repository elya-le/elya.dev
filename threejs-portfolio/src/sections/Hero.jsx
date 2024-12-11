import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import CanvasLoader from "../components/CanvasLoader";
import Cat from "../components/Cat.jsx";
import "./Hero.css";

const Hero = () => {
  const [animationName, setAnimationName] = useState("Slow"); // state to toggle between animations
  const rectLightRef = useRef(); // reference for RectAreaLight
  const catRef = useRef(); // reference for the Cat group
  const cameraRef = useRef(); // reference for the camera
  const [scrollProgress, setScrollProgress] = useState(0); // scroll progress state

  // scroll tracking logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / docHeight;
      setScrollProgress(scrollFraction);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleWheel = (e) => {
    // prevent OrbitControls zoom only if a modifier key is pressed (optional)
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
    }
  };

  // toggle animation state with a debug log
  const toggleAnimation = () => {
    setAnimationName((prev) => {
      const newAnimation = prev === "Slow" ? "Fast" : "Slow";
      console.log("toggling animation:", newAnimation); // added debugging log
      return newAnimation;
    });
  };

  return (
    <section className="w-full h-screen flex flex-col relativ top-0 left-0 bg-black bg-opacity-80">
      <div
        className="w-full"
        style={{ height: "100vh", border: "1px solid red", marginBottom: "0" }}
        onWheel={handleWheel}
      >
        <Canvas
          className="w-full h-full"
          style={{ height: "100%" }}
          onPointerDown={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
        >
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera
              makeDefault
              ref={cameraRef}
              position={[-8, 1.5, 9.5]} // initial position
              onUpdate={(camera) => {
                camera.layers.enable(0); // render objects on layer 0
                camera.layers.enable(1); // render objects on layer 1
              }}
            />

            <CameraZoom scrollProgress={scrollProgress} cameraRef={cameraRef} />

            <rectAreaLight
              ref={rectLightRef}
              position={[0, 1.57, 1.65]}
              rotation={[0.135, 0, 0]}
              width={1.45}
              height={1.05}
              intensity={20}
              color={"#6f7df7"}
            />

            <Cat ref={catRef} animationName={animationName} origin={[0, 0, 0]} />

            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.1, 32, 32]} />
              <meshBasicMaterial color="red" />
            </mesh>
          </Suspense>
        </Canvas>
      </div>

      <div className="flex justify-center items-center">
        <div className="toggle-container">
          {animationName !== "Fast" && <span className="faster-text">!</span>}
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

// component to handle camera zoom and rotation
const CameraZoom = ({ scrollProgress, cameraRef }) => {
  useFrame(() => {
    if (cameraRef.current) {
      // interpolate position based on scroll progress
      const zPosition = 6.5 - scrollProgress * 10; // move closer to the model
      const yPosition = 4 - scrollProgress * -2; // adjust height slightly
      const xPosition = -8 + scrollProgress * 2; // move to the back-facing view

      cameraRef.current.position.set(xPosition, yPosition, zPosition);
      cameraRef.current.lookAt(0, 0, 0); // focus on the center of the scene
    }
  });

  return null;
};

export default Hero;
