import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Barra from './components/barra/barra.jsx';
import Home from './view/home/home.view.jsx';
import Profile from './view/profile/profile.view.jsx';
import Citas from './view/citas/citas.view.jsx';

function App() {
  return (
    <Router> 
      <Barra /> 
      <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/citas" element={<Citas />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;