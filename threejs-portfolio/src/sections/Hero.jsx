import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import CanvasLoader from "../components/CanvasLoader";
import Cat from "../components/Cat.jsx";
import "./Hero.css";

const Hero = ({ animationName, toggleAnimation }) => {
  const rectLightRef = useRef();
  const catRef = useRef();
  const cameraRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(scrollFraction);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getBasePosition = () => (screenWidth > 768 ? [-4.5, 2, 5] : [-5.5, 2, 5]);
  const getCatScale = () => (screenWidth > 1024 ? 1 : screenWidth > 768 ? 1 : 0.8);

  const rectLightSettings = {
    position: [-0.4, 1.3, 1.5],
    rotation: [0.1, 0, 0],
    width: 1.2,
    height: 0.9,
    intensity: 30,
  };

  console.log("Animation Name:", animationName);
  console.log("Toggle Animation Function:", toggleAnimation);

  return (
    <section className="relative w-full h-screen bg-black bg-opacity-35 flex items-center justify-center">
      {/* Toggle Overlay */}
      <div className="absolute z-50 bottom-4 center-4 bg-transparent p-4 rounded-md">
        <label className="toggle-switch flex items-center">
          <span className="text-white text-sm mr-2">Animation:</span>
          <input
            type="checkbox"
            checked={animationName === "Fast"}
            onChange={toggleAnimation}
            className="hidden"
          />
          <span className="slider"></span>
        </label>
      </div>

      {/* Canvas */}
      <Canvas
        className="w-full h-full"
        style={{ height: "100%" }}
        onPointerDown={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        <Suspense fallback={<CanvasLoader />}>
          <PerspectiveCamera makeDefault ref={cameraRef} />
          <CameraZoom
            scrollProgress={scrollProgress}
            cameraRef={cameraRef}
            basePosition={getBasePosition()}
          />
          <color attach="background" args={["#191B00"]} />
          <rectAreaLight
            ref={rectLightRef}
            position={rectLightSettings.position}
            rotation={rectLightSettings.rotation}
            width={rectLightSettings.width}
            height={rectLightSettings.height}
            intensity={rectLightSettings.intensity}
            color={"#6f7df7"}
          />
          <ambientLight intensity={0.1} color={"#ffffff"} />
          <directionalLight position={[5, 10, 5]} intensity={0.01} color={"#ffffff"} castShadow />
          <Cat
            ref={catRef}
            animationName={animationName}
            origin={[-0.5, -1.2, 0]}
            scale={getCatScale()}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};


// Component to manage camera movement with scroll
const CameraZoom = ({ scrollProgress, cameraRef, basePosition }) => {
  const [baseX, baseY, baseZ] = basePosition;
  const xEnd = 4,
    yEnd = -6,
    zEnd = 6,
    lookAt = [-0.5, 0, 0];

  useFrame(() => {
    if (cameraRef.current) {
      const progress = Math.min(Math.max(scrollProgress, 0), 1); // clamp between 0 and 1
      const xPos = baseX + progress * xEnd;
      const yPos = baseY - progress * yEnd;
      const zPos = baseZ - progress * zEnd;

      cameraRef.current.position.set(xPos, yPos, zPos);
      cameraRef.current.lookAt(...lookAt);
    }
  });

  return null;
};

export default Hero;
