// src/App.js
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import AdminLayouts from './components/admin/AdminLayouts';
import Userlayouts from './components/users/Userlayouts';
import Login from './components/users/auth/Login';
import AdminLogin from './components/admin/pages/AdminLogin';

function App() {
 
  useEffect(() => {
    const adminExists = localStorage.getItem('admin');
    if (!adminExists) {
      const admin = {
        email: 'soaib1002@gmail.com',
        password: '1002',
        name: 'Soaib Shaikh'
      };
      localStorage.setItem('admin', JSON.stringify(admin));
    }
  }, []);

  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/*" element={<AdminLayouts />} />

      {/* User Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Userlayouts />} />
    </Routes>
  );
}

export default App;
