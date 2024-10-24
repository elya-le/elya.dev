import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const RotatingTorusKnotGeometry = () => {
  const meshRef = useRef();

  // the useFrame hook in @react-three/fiber runs a function before each frame is rendered, allowing animation or state updates,
  // as well as control the order of updates by setting a priority.
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.001;
    }
  });

  // load gradient map
  const gradientMap = new THREE.TextureLoader().load('./src/images/textures/threeTone.jpg'); 
  gradientMap.minFilter = THREE.NearestFilter; // ensure correct filtering for toon shading
  gradientMap.magFilter = THREE.NearestFilter;

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.4, 300, 32]} />
      <meshToonMaterial
        color={"#69140E"} // set base color to light blue
        gradientMap={gradientMap}
        transparent={false} 
        opacity={1} // full opacity
        depthTest={true} // ensure depth test is enabled
        depthWrite={true} // ensure depth write is enabled
        side={THREE.DoubleSide} // render front and back
        // side={THREE.FrontSide} // render only the front side of the geometry
      />
    </mesh>
  );
};

const App = () => {
  return (
    // DOM canvas that accepts threejs elements as children
    <Canvas style={{ height: "100vh", width: "100vw" }}>
      <OrbitControls enableZoom enablePan enableRotate />

      <directionalLight position={[5, 5, 5]} intensity={30} color="#ffffff" />
      <ambientLight intensity={7} /> 

      {/* <fog attach="fog" args={["#3f7b9d", 10, 100]} /> */}
      <RotatingTorusKnotGeometry />
    </Canvas>
  );
};

export default App;
