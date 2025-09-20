import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicPortal from './pages/PublicPortal';
import InstitutionAdmin from './pages/InstitutionAdmin';
import SuperAdmin from './pages/SuperAdmin';
import Login from './pages/Login';
import { AuthContext } from './contexts/AuthContext';

const AppRoutes: React.FC = () => {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicPortal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/institution-admin" element={user?.role === 'institution_admin' ? <InstitutionAdmin /> : <Login />} />
        <Route path="/admin" element={user?.role === 'admin' ? <SuperAdmin /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;