import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ThreeModel from './ThreeModel';
import LoadingSpinner from './LoadingSpinner';
import { modelConfigurations } from './data';

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
        <OrbitControls />
      </Canvas>
    </>
  );
};

export default ThreeCanvas;
