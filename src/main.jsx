import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";

import './index.css'
import Login from './pages/login/Login.jsx';
import Register from './pages/login/Register.jsx';
import ForgotPassword from './pages/login/ForgotPassword.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
