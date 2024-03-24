
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Register from './Pages/Register';
import Login from './Pages/Login';
import PatientDashboard from './Pages/PatientDashboard';
import TechnicianDashboard from './Pages/TechnicianDashboard';
import AdminDashboard from './Pages/AdminDashboard';



const stripePromise = loadStripe('pk_test_51OtoQ3LjhdK8oyAc6cAVkkQdSKCNO4gbAECzJ3xYe6tJQ6GbHhRsKe3EHy2WQ6bnbwmPVspsIB02ARndAnqBP7lG00MavcQv6e');  
function App() {

  return (
  
    <Router>
    <div>
      <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/patient/*" element={<Elements stripe={stripePromise}><PatientDashboard /></Elements>} />
      <Route path="/patient/:selectedItem" element={<Elements stripe={stripePromise}><PatientDashboard /></Elements>} />
      <Route path="/technician/*" element={<TechnicianDashboard />} />
      <Route path="/technician/:selectedItem" element={<TechnicianDashboard />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
      <Route path="/admin/:selectedItem" element={<AdminDashboard />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;