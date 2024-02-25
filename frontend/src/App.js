import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import PatientDashboard from './Pages/PatientDashboard';
import TechnicianDashboard from './Pages/TechnicianDashboard';
import AdminDashboard from './Pages/AdminDashboard';

function App() {
  return (
  
    <Router>
    <div>
      <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/patient" element={<PatientDashboard />} />
      <Route path="/technician" element={<TechnicianDashboard />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
      <Route path="/admin/:selectedItem" element={<AdminDashboard />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;