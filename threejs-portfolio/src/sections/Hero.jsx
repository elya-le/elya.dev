import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import CanvasLoader from "../components/CanvasLoader";
import Cat from "../components/Cat.jsx";
import "./Hero.css";

const Hero = ({ animationName, onEnterProjects }) => {
  const rectLightRef = useRef(); // reference for rect area light
  const catRef = useRef(); // reference for cat model
  const cameraRef = useRef(); // reference for camera
  const [scrollProgress, setScrollProgress] = useState(0); // state for scroll progress
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // state for screen width

  // handle screen resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // get camera base position based on screen size
  const getBasePosition = () => {
    if (screenWidth > 768) return [-4.5, 2, 5]; // tablet
    return [-5.5, 2, 5]; // mobile
  };

  // get cat scale based on screen size
  const getCatScale = () => {
    if (screenWidth > 1024) return 1; // fullscreen
    if (screenWidth > 768) return 1; // tablet
    return 0.8; // mobile
  };

  // get rect area light settings based on screen size
  const getRectLightSettings = () => {
    if (screenWidth > 1024) {
      return {
        position: [-0.5, 1.57, 1.65],
        rotation: [0.135, 0, 0],
        width: 1.45,
        height: 1.05,
        intensity: 40,
      };
    } else if (screenWidth > 768) {
      return {
        position: [-0.4, 1.3, 1.5],
        rotation: [0.1, 0, 0],
        width: 1.2,
        height: 0.9,
        intensity: 30,
      };
    } else {
      return {
        position: [-0.3, 1.1, 1.3],
        rotation: [0.1, 0, 0],
        width: 1,
        height: 0.8,
        intensity: 20,
      };
    }
  };

  // track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / docHeight;
      setScrollProgress(scrollFraction);

      if (scrollFraction >= 0.8 && onEnterProjects) {
        onEnterProjects(); // Trigger transition to Projects
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onEnterProjects]);

  const handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault(); // prevent zooming with ctrl or cmd
    }
  };

  const rectLightSettings = getRectLightSettings(); // dynamically retrieve settings

  return (
    <section
      className="w-full h-screen fixed top-0 left-0 bg-black bg-opacity-35 z-0"
      id="hero"
    >
      <div
        className="w-full"
        style={{ height: "100vh" }}
        onWheel={handleWheel}
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
              basePosition={getBasePosition()} // pass basePosition dynamically
              screenWidth={screenWidth} // pass screenWidth dynamically
            />
            {/* rect area light */}
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
            <directionalLight
              position={[5, 10, 5]}
              intensity={0.01}
              color={"#ffffff"}
              castShadow
            />
            {/* cat model */}
            <Cat
              ref={catRef}
              animationName={animationName}
              origin={[-0.5, -1.2, 0]} // static Cat position
              scale={getCatScale()} // pass scale dynamically
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

// component to handle camera zoom and rotation
const CameraZoom = ({ scrollProgress, cameraRef, basePosition, screenWidth }) => {
  const getEndPosition = () => {
    if (screenWidth > 1024) {
      return {
        xEnd: 4,
        yEnd: -4,
        zEnd: 6,
        lookAt: [-0.5, 0, 0], // desktop look-at target
      };
    } else {
      return {
        xEnd: 3,
        yEnd: -4,
        zEnd: 6,
        lookAt: [-0.5, 0, 0.5], // mobile look-at target
      };
    }
  };

  const endPosition = getEndPosition();

  useFrame(() => {
    if (cameraRef.current) {
      const progress = Math.min(Math.max(scrollProgress, 0), 1); // clamp scroll progress between 0 and 1

      const [baseX, baseY, baseZ] = basePosition;

      // dynamically calculate positions based on progress and end points
      const zPosition = baseZ - progress * endPosition.zEnd; // zoom closer to the model
      const yPosition = baseY - progress * endPosition.yEnd; // adjust height slightly
      const xPosition = baseX + progress * endPosition.xEnd; // adjust horizontal position

      cameraRef.current.position.set(xPosition, yPosition, zPosition); // update camera position
      cameraRef.current.lookAt(...endPosition.lookAt); // ensure camera points to the target
    }
  });

  return null;
};

export default Hero;
