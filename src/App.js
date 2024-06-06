import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Layout from './pages/layout';
import Login from './pages/login'
import Signup from './pages/signup'


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/about" element={<Login />} />
        <Route path="/contact" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
