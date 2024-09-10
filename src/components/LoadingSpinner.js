// LoadingSpinner.js
import React from 'react';
import './LoadingSpinner.css'; // Create a CSS file for the spinner styles

const LoadingSpinner = () => {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 100
    }}>
      <div className="loader" />
    </div>
  );
};

export default LoadingSpinner;

