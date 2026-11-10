
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ConsumerDashboard from './pages/ConsumerDashboard/ConsumerDashboard';
import ProviderDashboard from './pages/ProviderDashboard/ProviderDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
