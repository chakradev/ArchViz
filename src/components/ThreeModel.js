import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import ClickableSphere from './ClickableSphere';
import LoadingSpinner from './LoadingSpinner';
import { modelPaths, modelData, modelConfigurations } from './data';
import CameraTransition from './CameraTransition';
import Plane from './Plane';

const ThreeModel = ({ modelType, setLoading, selectedMarker }) => {
  const group = useRef();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cameraTarget, setCameraTarget] = useState(null);
  const cameraRef = useRef();

  const modelPath = modelPaths[modelType];
  const gltf = useLoader(GLTFLoader, modelPath);

  const config = modelConfigurations[modelType] || {};
  const { planeGeometry: planeConfig, sphereSize } = config;

  const { markerPositions, markerLabels, markerInfos, cameraPositions } = modelData[modelType] || {};

  useEffect(() => {
    if (!gltf) return;

    // Center the model
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const center = box.getCenter(new THREE.Vector3());
    gltf.scene.position.sub(center);
    group.current.add(gltf.scene);

    // Apply transparency if modelType is "house"
    if (modelType === 'house') {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.material.transparent = true;
          child.material.opacity = 0.5; // Adjust opacity as needed
        }
      });
    }

    setLoading(false);
  }, [gltf, setLoading, modelType]);

  // Update camera target based on selectedMarker
  useEffect(() => {
    if (selectedMarker !== null && markerPositions) {
      setSelectedIndex(selectedMarker);
      setCameraTarget({
        position: new THREE.Vector3(...markerPositions[selectedMarker]),
        cameraPosition: new THREE.Vector3(...cameraPositions[selectedMarker]),
      });
    }
  }, [selectedMarker, markerPositions, cameraPositions]);

  const handleClick = (event, mesh, position, cameraPosition) => {
    if (mesh) {
      setSelectedIndex(markerPositions.indexOf(position));
    }
    setCameraTarget({
      position: new THREE.Vector3(...position),
      cameraPosition: new THREE.Vector3(...cameraPosition),
    });
  };

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
    cameraRef.current = camera;
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <group ref={group}>
        {gltf ? <primitive object={gltf.scene} /> : <LoadingSpinner />}
        {markerPositions?.map((position, index) => (
          <ClickableSphere
            key={index}
            position={position}
            label={markerLabels[index]} 
            info={markerInfos[index]}   
            onClick={handleClick}
            cameraPosition={cameraPositions[index]}
            isSelected={index === selectedIndex}
            onOptionClick={handleOptionClick}
            sphereSize={sphereSize}
          />
        ))}
      </group>
      <Plane planeConfig={planeConfig} />
      {cameraTarget && <CameraTransition camera={cameraRef.current} cameraTarget={cameraTarget} />}
    </>
  );
};

export default ThreeModel;
