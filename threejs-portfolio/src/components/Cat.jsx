import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

// Cat component to load the 3D model and play the specified animation
const Cat = ({ animationName = 'Idle', origin = [0, 0, 0], ...props }) => {  // <------ Added `origin` prop
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/public/assets/Cat_01_Idle_Faster.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    console.log("Nodes in model:", Object.keys(nodes));
    console.log("Available animations:", animations.map(anim => anim.name));

    if (actions[animationName]) {
      actions[animationName]
        .reset()
        .fadeIn(0.5)
        .setLoop(THREE.LoopRepeat)
        .play();
    } else {
      console.error(`Animation "${animationName}" not found.`);
    }

    return () => {
      if (actions[animationName]) {
        actions[animationName].stop();
      }
    };
  }, [animationName, actions, nodes]);

  return (
    <group {...props} dispose={null}>
      {/* Outer group to set origin */}
      <group position={origin}>  {/* <------ Updated to allow positioning based on `origin` prop */}
        <group ref={group}>
          <group name="Scene">
            <mesh
              name="Collar"
              castShadow
              receiveShadow
              geometry={nodes.Collar.geometry}
              material={materials.Collar}
            />
            <mesh
              name="Brow"
              castShadow
              receiveShadow
              geometry={nodes.Brow.geometry}
              material={materials.Black2}
              position={[0, 2.879, 0.418]}
            />
            <mesh
              name="Eye"
              castShadow
              receiveShadow
              geometry={nodes.Eye.geometry}
              material={materials['Cat_Eye_Texture.002']}
              position={[0, 2.752, 0.443]}
            />
            <mesh
              name="Nose"
              castShadow
              receiveShadow
              geometry={nodes.Nose.geometry}
              material={materials.Nose}
              position={[0, 2.525, 0.568]}
              rotation={[-0.209, 0, 0]}
            />
            <mesh
              name="Tag"
              castShadow
              receiveShadow
              geometry={nodes.Tag.geometry}
              material={materials.Tag}
              position={[0, 1.82, -0.005]}
              rotation={[0, 0, -Math.PI / 2]}
            />
            <mesh
              name="Tag2"
              castShadow
              receiveShadow
              geometry={nodes.Tag2.geometry}
              material={materials['Material.001']}
              position={[0, 1.487, 0.454]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            <group name="Armature">
              <skinnedMesh
                name="Body"
                geometry={nodes.Body.geometry}
                material={materials.Black1}
                skeleton={nodes.Body.skeleton}
              />
              <primitive object={nodes.Base} />
              <primitive object={nodes.Tail0} />
              <primitive object={nodes.Tc} />
              <primitive object={nodes.PR} />
              <primitive object={nodes.RcontR} />
              <primitive object={nodes.PL} />
              <primitive object={nodes.LcontL} />
              <primitive object={nodes.neutral_bone} />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

// preload model
useGLTF.preload('/public/assets/Cat_01_Idle_Faster.glb');

export default Cat;



