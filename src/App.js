import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ThreeCanvas from './components/ThreeModel'; // Ensure the import is correct
import './App.css';

const App = () => {
  const [modelType, setModelType] = useState('office'); // Default modelType

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
            <Route path="/" element={<Home setModelType={setModelType} />} />
            <Route path="/model" element={<ThreeCanvas modelType={modelType} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;






