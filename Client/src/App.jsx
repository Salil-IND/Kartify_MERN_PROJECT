import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Routes, Route, useNavigate } from 'react-router-dom';
import { axiosInstance } from './axiosCalls/axios';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';

import { AuthProvider } from './context/authContext';

import ProtectedRoutes from './components/ProtectedRoutes';
import PublicRoutes from './components/PublicRoutes';
import ProductsPage from './pages/ProductsPage';
import ProductDetails from './pages/ProductDetails';




function App() {
  return (
        <AuthProvider>
        <BrowserRouter>
          <Routes>
            
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
              <Route path="/login" element={<PublicRoutes><Login /></PublicRoutes>} />
              <Route path="/logout" element={<ProtectedRoutes><Logout/></ProtectedRoutes>}/>
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<ProtectedRoutes><ProductsPage/></ProtectedRoutes>}/>
              <Route path="/products/:id" element={<ProtectedRoutes><ProductDetails/></ProtectedRoutes>}/>
              
          </Routes>
        </BrowserRouter>
        </AuthProvider>
    
  );
}

export default App;