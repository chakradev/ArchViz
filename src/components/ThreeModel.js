import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import ClickableSphere from './ClickableSphere';
import LoadingSpinner from './LoadingSpinner';
import { modelPaths, markerPositions, markerLabels, markerInfos, cameraPositions, modelConfigurations } from './data';

const ThreeModel = ({ modelType, setLoading }) => {
  const group = useRef();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cameraTarget, setCameraTarget] = useState(null);

  const modelPath = modelPaths[modelType];
  const gltf = useLoader(GLTFLoader, modelPath);
  const grassTexture = useLoader(TextureLoader, '/textures/terr.jpg');

  // Get configuration based on modelType
  const config = modelConfigurations[modelType] || {};
  const { planeGeometry: planeConfig } = config;

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
    if (mesh) {
      setSelectedIndex(markerPositions.indexOf(position));
    }
    setCameraTarget({ position: new THREE.Vector3(...position), cameraPosition: new THREE.Vector3(...cameraPosition) });
  };

  const handleOptionClick = (option) => {
    setCameraTarget(null);
    setSelectedIndex((prevIndex) => {
      const newIndex = option === 'Next'
        ? (prevIndex + 1) % markerPositions.length
        : (prevIndex - 1 + markerPositions.length) % markerPositions.length;
      
      setCameraTarget({
        position: new THREE.Vector3(...markerPositions[newIndex]),
        cameraPosition: new THREE.Vector3(...cameraPositions[newIndex])
      });

      return newIndex;
    });
  };

  useFrame(({ camera }) => {
    if (cameraTarget) {
      const { position, cameraPosition } = cameraTarget;
      
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
        {gltf ? <primitive object={gltf.scene} /> : <LoadingSpinner />}
        {markerPositions.map((position, index) => (
          <ClickableSphere
            key={index}
            position={position}
            onClick={handleClick}
            label={markerLabels[index]}
            info={markerInfos[index]} // Passing unique info to each sphere
            cameraPosition={cameraPositions[index]}
            isSelected={index === selectedIndex} // Pass whether this sphere is selected
            onOptionClick={handleOptionClick} // Pass the option click handler
          />
        ))}
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={planeConfig?.position || [0, 0, 0]}>
        <planeGeometry args={planeConfig?.args || [20, 20]} />
        <meshStandardMaterial map={grassTexture} />
      </mesh>
      <OrbitControls />
    </>
  );
};

const ThreeCanvas = ({ modelType }) => {
  const [loading, setLoading] = useState(true);

  // Get configuration based on modelType
  const config = modelConfigurations[modelType] || {};
  const { camera } = config;

  return (
    <>
      {loading && <LoadingSpinner />}
      <Canvas camera={{ position: camera?.position || [0, 0, 15], fov: camera?.fov || 75 }}>
        <ThreeModel modelType={modelType} setLoading={setLoading} />
      </Canvas>
    </>
  );
};

export default ThreeCanvas;
