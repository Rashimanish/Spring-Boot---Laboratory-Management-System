import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register';

function App() {
  return (
  
    <Router>
    <div>
      <Routes>
      <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;