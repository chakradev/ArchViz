import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import ClickableSphere from './ClickableSphere';
import LoadingSpinner from './LoadingSpinner';
import { modelPaths, markerPositions, markerLabels, markerInfos, cameraPositions, modelConfigurations } from './data';
import CameraTransition from './CameraTransition';
import Plane from './Plane';

const ThreeModel = ({ modelType, setLoading }) => {
  const group = useRef();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cameraTarget, setCameraTarget] = useState(null);
  const cameraRef = useRef();

  const modelPath = modelPaths[modelType];
  const gltf = useLoader(GLTFLoader, modelPath);

  const config = modelConfigurations[modelType] || {};
  const { planeGeometry: planeConfig } = config;

  // Load and position the model
  useEffect(() => {
    if (!gltf) return;

    const box = new THREE.Box3().setFromObject(gltf.scene);
    const center = box.getCenter(new THREE.Vector3());
    gltf.scene.position.sub(center);
    group.current.add(gltf.scene);
    setLoading(false);
  }, [gltf, setLoading]);

  // Handle sphere click to change camera position
  const handleClick = (event, mesh, position, cameraPosition) => {
    if (mesh) {
      setSelectedIndex(markerPositions.indexOf(position));
    }
    setCameraTarget({
      position: new THREE.Vector3(...position),
      cameraPosition: new THREE.Vector3(...cameraPosition),
    });
  };

  // Handle navigation between markers
  const handleOptionClick = (option) => {
    setCameraTarget(null);
    setSelectedIndex((prevIndex) => {
      const newIndex = option === 'Next'
        ? (prevIndex + 1) % markerPositions.length
        : (prevIndex - 1 + markerPositions.length) % markerPositions.length;

      setCameraTarget({
        position: new THREE.Vector3(...markerPositions[newIndex]),
        cameraPosition: new THREE.Vector3(...cameraPositions[newIndex]),
      });

      return newIndex;
    });
  };

  useFrame(({ camera }) => {
    cameraRef.current = camera; // Set camera reference for transitions
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
            label={markerLabels[index]} // Passing markerLabels
            info={markerInfos[index]}   // Passing markerInfos
            onClick={handleClick}
            cameraPosition={cameraPositions[index]}
            isSelected={index === selectedIndex}
            onOptionClick={handleOptionClick}
          />
        ))}
      </group>
      <Plane planeConfig={planeConfig} />
      {cameraTarget && <CameraTransition camera={cameraRef.current} cameraTarget={cameraTarget} />}
    </>
  );
};

export default ThreeModel;
