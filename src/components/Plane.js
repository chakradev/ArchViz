import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

const Plane = ({ planeConfig }) => {
  const grassTexture = useLoader(TextureLoader, '/textures/terr.jpg');

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={planeConfig?.position || [0, 0, 0]}>
      <planeGeometry args={planeConfig?.args || [20, 20]} />
      <meshStandardMaterial map={grassTexture} />
    </mesh>
  );
};

export default Plane;
