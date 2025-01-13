import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber"; // fiber for 3d rendering
import { PerspectiveCamera } from "@react-three/drei"; // drei for easier 3d setups
import { Suspense } from "react"; // react suspense for lazy loading
import CanvasLoader from "../components/CanvasLoader"; // component to display a loader while 3d elements are loading
import Cat from "../components/Cat.jsx"; // custom 3d cat model component
import "./Hero.css"; // import specific styles for hero component

// hero component to render the 3d scene and toggle animation
const Hero = ({ animationName, toggleAnimation }) => {
  const rectLightRef = useRef(); // reference for the rectangle area light
  const catRef = useRef(); 
  const cameraRef = useRef(); // reference for the perspectivecamera
  const [scrollProgress, setScrollProgress] = useState(0); // track the user's scroll progress
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // track the current screen width

  // handle screen resizing and update the state
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize); // add resize listener
    return () => window.removeEventListener("resize", handleResize); // cleanup listener on unmount
  }, []);

  // track scroll progress to adjust the camera's position
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY; // current scroll position
      const docHeight = document.documentElement.scrollHeight - window.innerHeight; // total scrollable height
      
      // Adjust the scroll fraction to amplify the effect of scrolling
      const scrollFactor = 3; // Decrease this value to require less scrolling
      const adjustedScrollFraction = Math.min((scrollTop / docHeight) * scrollFactor, 1); // clamp to [0, 1]
  
      setScrollProgress(adjustedScrollFraction);
    };
  
    window.addEventListener("scroll", handleScroll); // add scroll listener
    return () => window.removeEventListener("scroll", handleScroll); // cleanup listener on unmount
  }, []);

  // determine the base position of the camera based on screen width
  const getBasePosition = () => (screenWidth > 768 ? [-4, 2, 5] : [-5, 3, 6]);  // [ x, y, z ]

  // determine the scale of the cat model based on screen width
  const getCatScale = () => (screenWidth > 1024 ? 1 : screenWidth > 768 ? 1 : 0.9);

  // settings for the rectangle area light based on screen width
    const rectLightSettings = screenWidth > 768 
    ? {
        position: [-0.4, 1.4, 1.6], // light's position for larger screens
        rotation: [0.1, 0, 0], // light's rotation
        width: 1.2, // light's width
        height: 0.9, // light's height
        intensity: 30, // brightness of the light
      }
    : {
        position: [-0.3, 1.2, 1.4], // light's position for smaller screens
        rotation: [0.1, 0, 0], // light's rotation
        width: 1.0, // light's width
        height: 0.7, // light's height
        intensity: 20, // brightness of the light
      };

  console.log("Animation Name:", animationName); // log the current animation state
  console.log("Toggle Animation Function:", toggleAnimation); // verify the toggle function is working

  return (
    <section className="relative w-full h-[80vh] sm:h-[99vh] bg-black bg-opacity-35 flex items-center justify-center z-10">
      {/* toggle overlay */}
      <div className="absolute z-30 bottom-20 left-1/4 transform -translate-x-1/2 bg-transparent p-2">
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

      {/* canvas */}
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
            color={"#6F74F7"}
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

// component to manage camera movement with scroll
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