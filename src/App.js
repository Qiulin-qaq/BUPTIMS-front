import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './pages/layout';
import Login from './pages/login'
import Signup from './pages/signup'
import SearchPage from './pages/search';
import NewsDetail from './pages/newsDetail';
import AdminHome from './pages/adminLayout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to ="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/display" element={<Layout />} />
        <Route path="/search/:keyword" element={<SearchPage />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/adminLayout" element={<AdminHome/>} />
      </Routes>
    </Router>
  );
};

export default App;
