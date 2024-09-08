import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const ClickableSphere = ({ position, onClick, label, cameraPosition, info, onOptionClick, isSelected }) => {
  const [hovered, hover] = useState(false);
  const [rightClicked, setRightClicked] = useState(false);
  const ref = useRef();
  const labelRef = useRef();
  const infoBoxRef = useRef();
  const menuBoxRef = useRef(); // Ref for the menu box
  const optionRefs = [useRef(), useRef()]; // Refs for the two options
  const { camera } = useThree(); // Access the camera directly

  const handleClick = (event) => {
    onClick(event, ref.current, position, cameraPosition);
  };

  const handleContextMenu = (event) => {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault(); // Prevent the default context menu
    }
    if (event && typeof event.stopPropagation === 'function') {
      event.stopPropagation(); // Stop the event from propagating
    }
    setRightClicked(!rightClicked); // Toggle right-click menu visibility
  };

  const handleOptionClick = (option) => {
    if (onOptionClick) {
      onOptionClick(option);
    }
    setRightClicked(false); // Optionally hide the right-click box after an option is selected
  };

  // Use frame to update the menu box, info box, label, and each option text rotation to face the camera
  useFrame(() => {
    const cameraPosition = new THREE.Vector3();
    camera.getWorldPosition(cameraPosition);

    if (menuBoxRef.current) {
      menuBoxRef.current.lookAt(cameraPosition);
    }

    if (infoBoxRef.current) {
      infoBoxRef.current.lookAt(cameraPosition);
    }

    if (labelRef.current) {
      labelRef.current.lookAt(cameraPosition);
    }

    optionRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.lookAt(cameraPosition);
      }
    });
  });

  useEffect(() => {
    if (!isSelected) {
      setRightClicked(false); // Dismiss menu if not selected
    }
  }, [isSelected]);

  return (
    <>
      {/* Sphere */}
      <mesh
        ref={ref}
        position={position}
        scale={isSelected ? 1.5 : 1}
        onClick={handleClick}
        onContextMenu={handleContextMenu} // Handle right-click
        onPointerOver={(event) => {
          event.stopPropagation();
          hover(true);
        }}
        onPointerOut={() => hover(false)}
      >
        <sphereGeometry args={[0.06, 32, 32]} />
        <meshStandardMaterial color={isSelected ? 'white' : 'grey'} />
      </mesh>

      {/* Border */}
      <mesh
        position={position}
        scale={isSelected ? 1.52 : 1.12} // Adjust scale for the border
      >
        <sphereGeometry args={[0.07, 32, 32]} /> {/* Border geometry */}
        <meshBasicMaterial color='white' side={THREE.BackSide} />
      </mesh>

      {/* Info Box */}
      {hovered && (
        <mesh
          ref={infoBoxRef}
          position={[position[0], position[1] + 0.5, position[2]]}
        >
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
      {isSelected && (
        <mesh
          ref={labelRef}
          position={[position[0], position[1] + 0.3, position[2]]}
        >
          <Text
            fontSize={0.2}
            color="rgba(255, 255, 255, 0)"
            anchorX="center"
            anchorY="middle"
          >
            {label}
          </Text>
        </mesh>
      )}

      {/* Right-click Menu Box */}
      {rightClicked && (
        <mesh
          ref={menuBoxRef}
          position={[position[0] - 0.8, position[1] + 0.6, position[2]]}
        >
          <boxGeometry args={[0.8, 1.0, 0.05]} /> {/* Outer box geometry */}
          <meshStandardMaterial color="black" />
          
          {/* MENU Text */}
          <Text
            position={[0, 0.3, 0.03]} // Position text slightly in front of the box
            fontSize={0.15}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.4}
            lineHeight={1.2}
          >
            MENU
          </Text>

          {/* Option 1: Go to Next Room */}
          <Text
            ref={optionRefs[0]}
            position={[0, 0.0, 0.03]} // Positioned below "MENU" text
            fontSize={0.15}
            color="red"
            anchorX="center"
            anchorY="middle"
            onClick={() => handleOptionClick('Next')}
          >
            Next →
          </Text>

          {/* Option 2: Go to Previous Room */}
          <Text
            ref={optionRefs[1]}
            position={[0, -0.3, 0.03]} // Positioned below the first option
            fontSize={0.15}
            color="green"
            anchorX="center"
            anchorY="middle"
            onClick={() => handleOptionClick('Previous')}
          >
            ← Previous
          </Text>
        </mesh>
      )}
    </>
  );
};

export default ClickableSphere;





