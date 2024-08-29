import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminSignup from './pages/AdminSignup';
import AdminLogin from './pages/AdminLogin';
import Home from './pages/Home';
import AddDoctor from './pages/AddDoctor';
import Request from './pages/Request';
import RequestDetail from './pages/RequestDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<AdminSignup />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<AddDoctor />} />
        <Route path="/request" element={<Request />} />
        <Route path="/request/:id" element={<RequestDetail />} /> {/* Corrected line */}

        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
