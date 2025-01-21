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
      navigate(`/custom`, {state: {modelFileURL: fileURL}});
    } else {
      alert("Please upload a valid GLB model file.");
    }
  };

  return (
    <div className="home-container">
      <div className="content">
        <p>Explore and interact with building 3D models.</p>
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
            accept=".glb"
            className="custom-model-input"
            onChange={handleCustomModelUpload}
          />
          <button className="custom-model-button" onClick={handleLoadCustomModel}>
            Load Custom Model (.glb)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;


