import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Assuming you have a separate CSS file for styles

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/model');
  };

  return (
    <div className="home-container">
      <div className="content">
        <h1>Welcome to the 3D Architecture View</h1>
        <p>Explore and interact with stunning 3D models.</p>
        <button onClick={handleClick} className="explore-button">
          Go to Model
        </button>
      </div>
    </div>
  );
};

export default Home;

