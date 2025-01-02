import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import CanvasLoader from "../components/CanvasLoader";
import Cat from "../components/Cat.jsx";
import "./Hero.css";

const Hero = ({ animationName, isHeroInView }) => {
  const rectLightRef = useRef(); // reference for rect area light
  const catRef = useRef(); // reference for cat model
  const cameraRef = useRef(); // reference for camera
  const [scrollProgress, setScrollProgress] = useState(0); // track scroll progress
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // track screen width

  // handle screen resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // update scroll progress for camera movement
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = Math.min(scrollTop / docHeight, 1); // clamp to [0, 1]
      setScrollProgress(scrollFraction);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getBasePosition = () => (screenWidth > 768 ? [-4.5, 2, 5] : [-5.5, 2, 5]); // tablet/mobile
  const getCatScale = () => (screenWidth > 1024 ? 1 : screenWidth > 768 ? 1 : 0.8); // fullscreen/tablet/mobile

  const rectLightSettings = {
    position: [-0.4, 1.3, 1.5],
    rotation: [0.1, 0, 0],
    width: 1.2,
    height: 0.9,
    intensity: 30,
  };

  return (
    <section
      className="w-full h-screen bg-black bg-opacity-35"
      style={{ display: isHeroInView ? "block" : "none" }} // hide Hero when out of view
    >
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
          {/* Lighting */}
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
          {/* Cat Model */}
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
  const xEnd = 4, yEnd = -4, zEnd = 6, lookAt = [-0.5, 0, 0];

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
