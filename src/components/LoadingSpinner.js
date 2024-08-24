// LoadingSpinner.js
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 100,
      color: 'white',
      fontSize: '24px'
    }}>
      <div>Loading...</div>
      <div style={{
        border: '4px solid white',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 1s linear infinite'
      }} />
    </div>
  );
};

export default LoadingSpinner;

