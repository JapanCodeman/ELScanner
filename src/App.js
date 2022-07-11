import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './styles/main.scss';

import Header from './components/header';
import Home from './components/home.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Header />
          <Routes>
            <Route path = '/' element={<Home/>} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
