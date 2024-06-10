import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './pages/layout';
import Login from './pages/login'
import Signup from './pages/signup'
import PrivateRoute from './components/PrivateRoute';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to ="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* proctected */}
        <Route path="/display" element={<Layout />} />
        {/* <Route path="/layout" element={<PrivateRoute><Layout /></PrivateRoute>} /> */}
      </Routes>
    </Router>
  );
};

export default App;
