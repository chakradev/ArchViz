import React, { useRef, useState } from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const ClickableSphere = ({ position, onClick, label, cameraPosition, info, rightClickInfo, onOptionClick }) => {
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const [rightClicked, setRightClicked] = useState(false);
  const ref = useRef();
  const labelRef = useRef();

  const handleClick = (event) => {
    click(!clicked);
    onClick(event, ref.current, position, cameraPosition);
  };

  const handlePointerDown = (event) => {
    if (event.button === 2) { // Right-click
      event.stopPropagation();
      setRightClicked(!rightClicked);
    }
  };

  const handleOptionClick = (option) => {
    if (onOptionClick) {
      onOptionClick(option);
    }
    setRightClicked(false); // Optionally hide the right-click box after an option is selected
  };

  return (
    <>
      {/* Sphere */}
      <mesh
        ref={ref}
        position={position}
        scale={clicked ? 1.5 : 1}
        onClick={handleClick}
        onPointerDown={handlePointerDown} // Handle right-click
        onPointerOver={(event) => {
          event.stopPropagation();
          hover(true);
        }}
        onPointerOut={() => hover(false)}
      >
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color={clicked ? 'red' : 'grey'} />
      </mesh>

      {/* Border */}
      <mesh
        position={position}
        scale={clicked ? 1.52 : 1.12} // Adjust scale for the border
      >
        <sphereGeometry args={[0.12, 32, 32]} /> {/* Border geometry */}
        <meshBasicMaterial color='white' side={THREE.BackSide} />
      </mesh>

      {/* Info Box */}
      {hovered && (
        <mesh position={[position[0], position[1] + 0.5, position[2]]}>
          <boxGeometry args={[1, 0.7, 0.05]} />
          <meshStandardMaterial color="black" />
          <Text
            position={[0, 0, 0.03]} // Position text slightly in front of the box
            fontSize={0.1}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={0.9}
            lineHeight={1.2}
          >
            {info}
          </Text>
        </mesh>
      )}

      {/* Label */}
      {clicked && (
        <mesh position={[position[0], position[1] + 0.5, position[2]]}>
          <Text
            ref={labelRef}
            fontSize={0.25}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {label}
          </Text>
        </mesh>
      )}

      {/* Right-click Box */}
      {rightClicked && (
        <>
          <mesh position={[position[0] - 0.8, position[1] + 0.3, position[2]]}>
            <boxGeometry args={[1.5, 1.5, 0.05]} /> {/* Increased height */}
            <meshStandardMaterial color="black" />
            
            {/* MENU Text */}
            <Text
              position={[0, 0.6, 0.03]} // Position text slightly in front of the box
              fontSize={0.15}
              color="white"
              anchorX="center"
              anchorY="middle"
              maxWidth={1.4}
              lineHeight={1.2}
            >
              MENU
            </Text>
          </mesh>

          {/* Option 1 */}
          <mesh position={[position[0] - 1.0, position[1] + 0.6, position[2]]} onClick={() => handleOptionClick('Option 1')}>
            <boxGeometry args={[0.5, 0.2, 0.05]} />
            <meshStandardMaterial color="blue" />
            <Text
              position={[0, 0, 0.03]} // Position text slightly in front of the box
              fontSize={0.1}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              Option 1
            </Text>
          </mesh>

          {/* Option 2 */}
          <mesh position={[position[0] - 1.0, position[1] + 0.3, position[2]]} onClick={() => handleOptionClick('Option 2')}>
            <boxGeometry args={[0.5, 0.2, 0.05]} />
            <meshStandardMaterial color="green" />
            <Text
              position={[0, 0, 0.03]} // Position text slightly in front of the box
              fontSize={0.1}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              Option 2
            </Text>
          </mesh>

          {/* Option 3 */}
          <mesh position={[position[0] - 1.0, position[1], position[2]]} onClick={() => handleOptionClick('Option 3')}>
            <boxGeometry args={[0.5, 0.2, 0.05]} />
            <meshStandardMaterial color="red" />
            <Text
              position={[0, 0, 0.03]} // Position text slightly in front of the box
              fontSize={0.1}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              Option 3
            </Text>
          </mesh>
        </>
      )}
    </>
  );
};

export default ClickableSphere;






