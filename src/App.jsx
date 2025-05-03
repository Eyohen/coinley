import React, { useState } from 'react';
import axios from 'axios';
import {Route, Routes,Navigate} from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Payment from './pages/Payment';
import TestPay from './pages/TestPay';
import AdminRegister from './pages/AdminRegister';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import EditProfile from './pages/EditProfile';
import VerifyEmail from './pages/VerifyEmail';


// Protected route component for merchants
const MerchantRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('merchantToken');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Protected route component for admins
const AdminRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('adminToken');
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

const App = () => {

return (
  <Routes>
  <Route exact path="/" element={<Home/>}/>
  <Route exact path="/register" element={<Register/>}/>
  <Route exact path="/login" element={<Login/>}/>
  <Route exact path="/verify-email" element={<VerifyEmail/>}/>
  <Route exact path="/dashboard" element={
     <MerchantRoute>
    <Dashboard/>
    </MerchantRoute>
    }/>
      <Route exact path="/editprofile" element={
     <MerchantRoute>
    <EditProfile/>
    </MerchantRoute>
    }/>
  <Route exact path="/testpay" element={
      <MerchantRoute>
    <TestPay/>
    </MerchantRoute>
    }/>
  <Route exact path="/pay/:paymentId" element={<Payment/>}/>
  <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Admin routes */}
  <Route exact path="/admin/register" element={<AdminRegister/>}/>
  <Route exact path="/admin/login" element={<AdminLogin/>}/>
  <Route exact path="/admin/dashboard" element={
      <AdminRoute>
    <AdminDashboard/>
    </AdminRoute>
    }/>
  </Routes>
)
}

export default App