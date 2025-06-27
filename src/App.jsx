import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Barra from './components/barra/barra.jsx';
import Home from './view/home/home.view.jsx';
import Profile from './view/profile/profile.view.jsx';

function App() {
  return (
    <Router> 
      <Barra /> 
      <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/citas" element={<Profile />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;