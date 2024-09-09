import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const ClickableSphere = ({ position, onClick, label, cameraPosition, info, onOptionClick, isSelected, sphereSize }) => {
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
        onContextMenu={isSelected ? handleContextMenu : null} // Only show right-click menu if sphere is selected
        onPointerOver={(event) => {
          event.stopPropagation();
          hover(true);
        }}
        onPointerOut={() => hover(false)}
      >
        <sphereGeometry args={[sphereSize, 32, 32]} /> {/* Use dynamic sphere size */}
        <meshStandardMaterial color={isSelected ? 'white' : 'rgba(172, 153, 163, 0.4)'} />
      </mesh>

      {/* Border */}
      <mesh
        position={position}
        scale={isSelected ? 1.52 : 1.12} // Adjust scale for the border
      >
        <sphereGeometry args={[0.065/0.06 * sphereSize, 32, 32]} /> {/* Border geometry */}
        <meshBasicMaterial color='white' side={THREE.BackSide} />
      </mesh>

      {/* Info Box */}
      {hovered && isSelected && !rightClicked && ( // Only show if sphere is selected and right-click is not active
        <mesh
          ref={infoBoxRef}
          position={[position[0], position[1] + (0.48/0.06 * sphereSize), position[2]]}
        >
          <boxGeometry args={[1/0.06 * sphereSize, 0.7/0.06 * sphereSize, 0.05/0.06 * sphereSize]} />
          <meshStandardMaterial color="black" />
          <Text
            position={[0, 0, 0.03/0.06 * sphereSize]} // Position text slightly in front of the box
            fontSize={0.1/0.06 * sphereSize}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={0.9/0.06 * sphereSize}
            lineHeight={1.2}
          >
            {info}
          </Text>
        </mesh>
      )}

      {/* Label */}
      {!hovered && isSelected && !rightClicked && ( // Hide label if info box or right-click menu is shown
        <mesh
          ref={labelRef}
          position={[position[0], position[1] + (0.3/0.06 * sphereSize), position[2]]}
        >
          <Text
            fontSize={0.2/0.06 * sphereSize}
            color="rgba(255, 255, 255, 0)"
            anchorX="center"
            anchorY="middle"
          >
            {label}
          </Text>
        </mesh>
      )}

      {/* Right-click Menu Box */}
      {rightClicked && isSelected && (
        <mesh
          ref={menuBoxRef}
          position={[position[0], position[1] + (0.48/0.06 * sphereSize), position[2]]}
        >
          <boxGeometry args={[0.8/0.06 * sphereSize, 0.6/0.06 * sphereSize, 0.05/0.06 * sphereSize]} /> {/* Outer box geometry */}
          <meshStandardMaterial color="black" />
          
          {/* MENU Text */}
          <Text
            position={[0, 0.2/0.06 * sphereSize, 0.03/0.06 * sphereSize]} // Position text slightly in front of the box
            fontSize={0.11/0.06 * sphereSize}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.4/0.06 * sphereSize}
            lineHeight={1}
          >
            MENU
          </Text>

          {/* Option 1: Go to Next Room */}
          <Text
            ref={optionRefs[0]}
            position={[0, 0.0, 0.03/0.06 * sphereSize]} // Positioned below "MENU" text
            fontSize={0.12/0.06 * sphereSize}
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
            position={[0, -0.2/0.06 * sphereSize, 0.03/0.06 * sphereSize]} // Positioned below the first option
            fontSize={0.12/0.06 * sphereSize}
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





