// Updated on 2025-01-01: Adjusted materials to prevent light reflections on table legs and block light through the tabletop.

import React, { useRef, useEffect, forwardRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const Cat = forwardRef(({ animationName = "Slow", origin = [0, 0, 0], ...props }, ref) => {
  const group = useRef(); // local reference for the group
  const { nodes, materials, animations } = useGLTF("/assets/cat_15.glb");
  const { actions } = useAnimations(animations, group);

  // forward the ref to the parent
  useEffect(() => {
    if (ref) {
      ref.current = group.current; // link the local group ref to the forwarded ref
    }
  }, [ref]);

  // handle animations
  useEffect(() => {
    if (actions && animationName) {
      // stop all running animations
      Object.values(actions).forEach((action) => action.stop());
      // play the specified animation
      actions[animationName]?.reset().play();
    }
  }, [actions, animationName]);

  // traverse and update materials for table legs and tabletop
  useEffect(() => {
    if (group.current) {
      group.current.traverse((child) => {
        if (child.isMesh) {
          // Configure table legs to avoid reflections
          if (child.name === "Legsa" || child.name === "Legsb") {
            child.material.roughness = 1; // Fully rough to avoid reflections
            child.material.metalness = 0; // Non-metallic
            child.material.transparent = false; // Ensure no light passes through
          }

          // Configure tabletop to block light
          if (child.name === "Desk") {
            child.castShadow = true; // Cast shadows onto the floor
            child.receiveShadow = true; // Receive shadows from other objects
            child.material.transparent = false; // Prevent light from passing through
          }
        }
      });
    }
  }, []); // only run once on mount

  return (
    <group {...props} ref={group} dispose={null}>
      <group position={origin}>
        <group ref={group}>
          <group name="Scene">
            {/* Collar */}
            <mesh
              name="Collar"
              castShadow
              receiveShadow
              geometry={nodes.Collar.geometry}
              material={materials.Collar}
            />
            <mesh
              name="Nose"
              castShadow
              receiveShadow
              geometry={nodes.Nose.geometry}
              material={materials.Nose}
              position={[0, 2.534, 0.568]}
            />
            <mesh
              name="Tag"
              castShadow
              receiveShadow
              geometry={nodes.Tag.geometry}
              material={materials.Tag}
              position={[0, 1.82, -0.005]}
            />
            <mesh
              name="Tag2"
              castShadow
              receiveShadow
              geometry={nodes.Tag2.geometry}
              material={materials["Material.001"]}
              position={[0, 1.487, 0.454]}
            />
            <group name="Armature">
              <skinnedMesh
                name="Body"
                geometry={nodes.Body.geometry}
                material={materials.Black1}
                skeleton={nodes.Body.skeleton}
              />
              <primitive object={nodes.Base} />
              <primitive object={nodes.Tail1} />
              <primitive object={nodes.PR} />
              <primitive object={nodes.RcontR} />
              <primitive object={nodes.PL} />
              <primitive object={nodes.LcontL} />
              <primitive object={nodes.TC} />
              <primitive object={nodes.EyeL} />
              <primitive object={nodes.EyeR} />
              <primitive object={nodes.EyeCon} />
              <primitive object={nodes.BrowL} />
              <primitive object={nodes.BrowR} />
              <primitive object={nodes.neutral_bone} />
            </group>
            <mesh
              name="Keys"
              castShadow
              receiveShadow
              geometry={nodes.Keys.geometry}
              material={materials["Material.006"]}
              position={[0, 1.502, 1.064]}
            />
            <mesh
              name="Screen"
              castShadow
              receiveShadow
              geometry={nodes.Screen.geometry}
              material={materials["Material.005"]}
              position={[0, 2.093, 1.708]}
            />
            <mesh
              name="Chair"
              castShadow
              receiveShadow
              geometry={nodes.Chair.geometry}
              material={materials["Material.004"]}
              position={[0, -0.165, -0.782]}
            />
            <mesh
              name="Pot"
              castShadow
              receiveShadow
              geometry={nodes.Pot.geometry}
              material={materials["Material.012"]}
              position={[1.937, 0, 1.081]}
            />
            <mesh
              name="Desk"
              castShadow
              receiveShadow
              geometry={nodes.Desk.geometry}
              material={materials.Material}
              position={[0, 1.402, 1.039]}
            />
            <mesh
              name="Legsa"
              castShadow
              receiveShadow
              geometry={nodes.Legsa.geometry}
              material={materials["Material.002"]}
              position={[0, 0.35, 0.243]}
            />
            <mesh
              name="Legsb"
              castShadow
              receiveShadow
              geometry={nodes.Legsb.geometry}
              material={materials["Material.003"]}
              position={[0, 0.35, 0.243]}
            />
            <mesh
              name="Mug"
              castShadow
              receiveShadow
              geometry={nodes.Mug.geometry}
              material={materials["Material.008"]}
              position={[-1.153, 1.682, 1.186]}
            />
            <mesh
              name="Mhandle"
              castShadow
              receiveShadow
              geometry={nodes.Mhandle.geometry}
              material={materials["Material.007"]}
              position={[-1.276, 1.688, 0.888]}
            />
            <mesh
              name="Soil"
              castShadow
              receiveShadow
              geometry={nodes.Soil.geometry}
              material={materials["Material.011"]}
              position={[1.937, 0.643, 1.075]}
            />
            <mesh
              name="Tea"
              castShadow
              receiveShadow
              geometry={nodes.Tea.geometry}
              material={materials["Material.013"]}
              position={[-1.153, 1.798, 1.186]}
            />
            <mesh
              name="Leaf"
              castShadow
              receiveShadow
              geometry={nodes.Leaf.geometry}
              material={materials["Material.009"]}
              position={[1.934, 1.326, 1.024]}
              rotation={[-0.573, -0.191, -0.184]}
            />
            <mesh
              name="Leaf001"
              castShadow
              receiveShadow
              geometry={nodes.Leaf001.geometry}
              material={materials["Material.009"]}
              position={[1.85, 1.742, 1.135]}
              rotation={[-2.553, 0.436, 2.783]}
            />
            <mesh
              name="Leaf002"
              castShadow
              receiveShadow
              geometry={nodes.Leaf002.geometry}
              material={materials["Material.009"]}
              position={[2.036, 1.314, 1.23]}
              rotation={[-2.212, -0.732, -2.228]}
            />
            <mesh
              name="Screen001"
              castShadow
              receiveShadow
              geometry={nodes.Screen001.geometry}
              material={materials["Material.014"]}
              position={[0, 2.088, 1.658]}
            />
          </group>
        </group>
      </group>
    </group>
  );
});

// Preload the model
useGLTF.preload("/assets/cat_15.glb");

export default Cat;