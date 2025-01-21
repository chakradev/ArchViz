import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ThreeModel from './ThreeModel';
import LoadingSpinner from './LoadingSpinner';
import { modelConfigurations, modelData } from './data'; // Import modelData for marker labels
import './ThreeCanvas.css'; // Add styles for the hamburger menu

const ThreeCanvas = ({ modelType }) => {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const location = useLocation();
  const modelFileURL = (location.state) ? location.state.modelFileURL : undefined

  // Get configuration and marker labels based on modelType
  const config = modelConfigurations[modelType] || {};
  const { camera } = config;
  const markerLabels = modelData[modelType]?.markerLabels || [];

  useEffect(() => {
    // Reset loading state when modelType changes
    setLoading(true);
    setSelectedMarker(null);
  }, [modelType]);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const handleDropdownClick = (index) => {
    setSelectedMarker(index);
  };

  return (
    <div className="three-canvas-container">
      {/* Hamburger Menu */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        &#9776;
      </div>

      {/* Dropdown menu (conditionally rendered) */}
      {menuOpen && (
        <div className="dropdown-menu">
          <ul>
            {markerLabels.map((label, index) => (
              <li key={index} onClick={() => handleDropdownClick(index)}>
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {loading && <LoadingSpinner />}

      <Canvas 
        camera={{ position: camera?.position || [0, 0, 15], fov: camera?.fov || 75 }}
        onCreated={() => setLoading(false)}
      >
        <ThreeModel modelType={modelType} setLoading={setLoading} selectedMarker={selectedMarker} modelFileURL={modelFileURL}/>
        <OrbitControls />
      </Canvas>

      <div className="three-canvas-footer">
        {/* Footer content here */}
      </div>
    </div>
  );
};

export default ThreeCanvas;
