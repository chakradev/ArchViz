import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import ClickableSphere from './ClickableSphere';
import LoadingSpinner from './LoadingSpinner';
import { modelPaths, markerPositions, markerLabels, markerInfos, cameraPositions } from './data';

const ThreeModel = ({ modelType, setLoading }) => {
  const group = useRef();
  const [selected, setSelected] = useState(null);
  const [cameraTarget, setCameraTarget] = useState(null);

  const modelPath = modelPaths[modelType];

  const gltf = useLoader(GLTFLoader, modelPath);
  const grassTexture = useLoader(TextureLoader, '/textures/terr.jpg');

  useEffect(() => {
    if (!gltf) return;

    const box = new THREE.Box3().setFromObject(gltf.scene);
    const center = box.getCenter(new THREE.Vector3());
    gltf.scene.position.sub(center);
    group.current.add(gltf.scene);
    console.log("Model positioned in the scene");
    setLoading(false);
  }, [gltf, setLoading]);

  const handleClick = (event, mesh, position, cameraPosition) => {
    if (selected) {
      selected.material.color.set('grey');
    }
    mesh.material.color.set('red');
    setSelected(mesh);

    setCameraTarget({ position: new THREE.Vector3(...position), cameraPosition: new THREE.Vector3(...cameraPosition) });
  };

  useFrame(({ camera }) => {
    if (cameraTarget) {
      const { position, cameraPosition } = cameraTarget;
      const distance = 6;
      const offset = new THREE.Vector3(0, 2, distance);
      const targetPosition = position.clone().add(offset);

      camera.position.lerp(cameraPosition, 0.1);
      camera.lookAt(position);

      if (camera.position.distanceTo(cameraPosition) < 0.1) {
        setCameraTarget(null);
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <group ref={group}>
        <primitive object={gltf.scene} />
        {markerPositions.map((position, index) => (
          <ClickableSphere
            key={index}
            position={position}
            onClick={handleClick}
            label={markerLabels[index]}
            info={markerInfos[index]} // Passing unique info to each sphere
            cameraPosition={cameraPositions[index]} 
          />
        ))}
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial map={grassTexture} />
      </mesh>
      <OrbitControls />
    </>
  );
};

const ThreeCanvas = ({ modelType }) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingSpinner />}
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <ThreeModel modelType={modelType} setLoading={setLoading} />
      </Canvas>
    </>
  );
};

export default ThreeCanvas;


