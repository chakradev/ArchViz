import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

const ClickableSphere = ({ position, onClick, label, cameraPosition }) => {
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const ref = useRef();
  const labelRef = useRef();

  return (
    <>
      <mesh
        ref={ref}
        position={position}
        scale={clicked ? 1.5 : 1}
        onClick={(event) => {
          click(!clicked);
          onClick(event, ref.current, position, cameraPosition);
        }}
        onPointerOver={(event) => (event.stopPropagation(), hover(true))}
        onPointerOut={(event) => hover(false)}
      >
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color={clicked ? 'red' : 'grey'} />
      </mesh>
      <mesh
        position={position}
        scale={clicked ? 1.52 : 1.12} // Adjust scale for the border
      >
        <sphereGeometry args={[0.12, 32, 32]} /> {/* Border geometry */}
        <meshBasicMaterial color='white' side={THREE.BackSide} />
      </mesh>
      {clicked && (
        <Text
          ref={labelRef}
          position={[position[0] + 0.5, position[1] + 0.3, position[2]]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      )}
    </>
  );
};

const ThreeModel = ({ camera, controls }) => {
  const group = useRef();
  const [selected, setSelected] = useState(null);
  const [cameraTarget, setCameraTarget] = useState(null);
  const { scene } = useLoader(GLTFLoader, '/models/space/scene.gltf');
  const grassTexture = useLoader(TextureLoader, '/textures/terr.jpg');

  const markerPositions = [
    [1.5, -0.8, 0],
    [1.5, -0.8, -3.5],
    [-1.5, -0.8, -3.5],
    [-1.5, -0.8, 0.5],
    [-1.5, -0.8, 3.5],
    [2, -1.5, 2], // Extra marker for a total of 6
  ];

  const markerLabels = [
    "2. Table",
    "3. Office 1",
    "5. Office 2",
    "4. Conference hall",
    "6. Washroom",
    "1. Main Room",
  ];

  const cameraPositions = [
    [2.5, 0, 3], // Camera position for each sphere
    [3, -0.8, -4.5],
    [-6, 0, -3],
    [-5, 0, 2],
    [-4, 0, 6],
    //[1, -1.5, 4.5], // Example positions, adjust as needed
    [0, 0, 6], // Example positions, adjust as needed
  ];

  useEffect(() => {
    if (!scene) return;

    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);
    group.current.add(scene);
  }, [scene]);

  const handleClick = (event, mesh, position, cameraPosition) => {
    if (selected) {
      selected.material.color.set('grey');
    }
    mesh.material.color.set('red');
    setSelected(mesh);

    // Set the target position for the camera
    setCameraTarget({ position: new THREE.Vector3(...position), cameraPosition: new THREE.Vector3(...cameraPosition) });
  };

  useFrame(({ camera }) => {
    if (cameraTarget) {
      // Smoothly move the camera towards the target position
      const { position, cameraPosition } = cameraTarget;
      const distance = 6; // Adjust distance for a better view
      const offset = new THREE.Vector3(0, 2, distance);
      const targetPosition = position.clone().add(offset);

      // Smoothly interpolate the camera position
      camera.position.lerp(cameraPosition, 0.1);
      camera.lookAt(position);

      // Optional: Stop the camera movement when it is close to the target
      if (camera.position.distanceTo(cameraPosition) < 0.1) {
        setCameraTarget(null); // Stop camera movement when close enough
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <group ref={group}>
        <primitive object={scene} />
        {markerPositions.map((position, index) => (
          <ClickableSphere
            key={index}
            position={position}
            onClick={handleClick}
            label={markerLabels[index]}
            cameraPosition={cameraPositions[index]} // Pass cameraPosition here
          />
        ))}
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial map={grassTexture} />
      </mesh>
      <OrbitControls ref={controls} />
    </>
  );
};

const ThreeCanvas = () => {
  const camera = useRef();
  const controls = useRef();

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 75 }} ref={camera}>
      <ThreeModel camera={camera.current} controls={controls} />
    </Canvas>
  );
};

export default ThreeCanvas;






















