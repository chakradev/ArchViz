import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import ThreeCanvas from './components/ThreeCanvas';
import './App.css';

const App = () => {
  // Retrieve theme from local storage or default to true (dark mode)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  // Apply dark mode class based on the state
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/" className="logo">
            <img src="image/chakralogo.png" alt="Logo" />
          </Link>
          <h1 className="title">Building Elements</h1>
          <button onClick={toggleDarkMode}>
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </button>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
            <Route path="/office" element={<ThreeCanvas modelType="office" />} />
            <Route path="/room" element={<ThreeCanvas modelType="room" />} />
            <Route path="/house" element={<ThreeCanvas modelType="house" />} />
            <Route path="/restaurant" element={<ThreeCanvas modelType="restaurant" />} />
            <Route path="/custom" element={<ThreeCanvas modelType="custom" />} />
          </Routes>
        </main>
        <footer className="App-footer">
          <p>© 2025  Chakra Network Solutions Private Limited. Contact us at: <a href="mailto:info@chakranetwork.com">mail us</a></p>
        </footer>
      </div>
    </Router>
  );
};

export default App;






