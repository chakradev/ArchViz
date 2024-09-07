import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleLoadModel = () => {
    const model = document.getElementById('model-select').value;
    navigate(`/${model}`);
  };

  return (
    <div className="home-container">
      <div className="content">
        <h1>Welcome to the 3D Architecture View</h1>
        <p>Explore and interact with stunning 3D models.</p>
        <div className="button-group">
          <select
            id="model-select"
            className="model-dropdown"
          >
            <option value="office">Office Model</option>
            <option value="room">Room Model</option>
            <option value="house">House Model</option>
            <option value="restaurant">Restaurant Model</option>
          </select>
          <button
            className="explore-button"
            onClick={handleLoadModel}
          >
            Load Model
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;


