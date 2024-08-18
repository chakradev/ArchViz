import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ThreeCanvas from './components/ThreeModel'; // Ensure the import is correct
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="logo">
            <img src="image/chakralogo.png" alt="Logo" />
          </div>
          <h1 className="title">3D Architecture View</h1>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/model" element={<ThreeCanvas />} />
          </Routes>
        </main>
        <footer className="App-footer">
          <p>&copy; 2024 Sidan</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;






