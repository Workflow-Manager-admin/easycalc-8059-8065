import React from 'react';
import './App.css';
import Calculator from './components/Calculator/Calculator';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> EasyCalc
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <div className="hero">
            <div className="subtitle">Simple & Intuitive</div>
            
            <h1 className="title">EasyCalc</h1>
            
            <div className="description">
              A user-friendly calculator with basic arithmetic operations
            </div>
            
            <Calculator />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;