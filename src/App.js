import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ThreeCanvas from './components/ThreeCanvas'; // Ensure the import is correct
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="logo">
            <img src="image/chakralogo.png" alt="Logo" />
          </div>
          <h1 className="title">ArchViz</h1>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/office" element={<ThreeCanvas modelType="office" />} />
            <Route path="/room" element={<ThreeCanvas modelType="room" />} />
            <Route path="/house" element={<ThreeCanvas modelType="house" />} />
            <Route path="/restaurant" element={<ThreeCanvas modelType="restaurant" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;






