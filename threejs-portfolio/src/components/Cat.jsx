import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three'; // import for loop settings

// cat component to load the 3d model and play the specified animation
const Cat = ({ animationName = 'Tailtap', ...props }) => {
  // create a reference to the group that contains the 3d model
  const group = useRef();
  
  // load the model, materials, and animations from the specified glb file
  const { nodes, materials, animations } = useGLTF('/public/assets/Cat_01.glb'); 
  
  // extract animation actions for controlling animations
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // log available nodes and animations for debugging purposes
    console.log("Nodes in model:", Object.keys(nodes));
    console.log("Available animations:", animations.map(anim => anim.name));

    // check if the specified animation exists and play it in a loop
    if (actions[animationName]) {
      actions[animationName]
        .reset() // reset the animation to the start
        .fadeIn(0.5) // smoothly fade in the animation
        .setLoop(THREE.LoopRepeat) // set the animation to loop indefinitely
        .play(); // play the animation
    } else {
      console.error(`Animation "${animationName}" not found or node targets are missing.`);
    }

    // clean up the animation when the component unmounts
    return () => {
      if (actions[animationName]) {
        actions[animationName].stop(); // stop the animation
      }
    };
  }, [animationName, actions, nodes]); // dependencies to rerun the effect if any change

  // return the 3d model group with its meshes and materials
  return (
    <group ref={group} {...props} dispose={null}>
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
  );
};

// preload the glb model to optimize loading performance
useGLTF.preload('/public/assets//Cat_01.glb');  // <------ this line has been updated

export default Cat;










