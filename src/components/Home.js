import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const [customModelFile, setCustomModelFile] = useState(null);

  useEffect(() => {
    // Update the theme dynamically based on the isDarkMode prop
    const theme = isDarkMode ? 'dark' : 'light';
    document.body.className = `${theme}-mode`;
  }, [isDarkMode]);

  const handleLoadModel = () => {
    const model = document.getElementById('model-select').value;
    navigate(`/${model}`);
  };

  const handleCustomModelUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCustomModelFile(file);
    }
  };

  const handleLoadCustomModel = () => {
    if (customModelFile) {
      // Pass the file to the viewer through the route
      const fileURL = URL.createObjectURL(customModelFile);
      navigate(`/custom?model=${encodeURIComponent(fileURL)}`);
    } else {
      alert("Please upload a valid GLTF/GLB model file.");
    }
  };

  return (
    <div className="home-container">
      <div className="content">
        <h1>Welcome to the 3D Architecture View</h1>
        <p>Explore and interact with stunning 3D models.</p>
        <div className="button-group">
          <select id="model-select" className="model-dropdown">
            <option value="office">Office Model</option>
            <option value="room">Room Model</option>
            <option value="house">House Model</option>
            <option value="restaurant">Restaurant Model</option>
          </select>
          <button className="explore-button" onClick={handleLoadModel}>
            Load Model
          </button>
        </div>

        {/* Custom Model Upload and Load Button */}
        <div className="custom-model-section">
          <input
            type="file"
            accept=".glb, .gltf"
            className="custom-model-input"
            onChange={handleCustomModelUpload}
          />
          <button className="custom-model-button" onClick={handleLoadCustomModel}>
            Load Custom Model
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

export default Home;

