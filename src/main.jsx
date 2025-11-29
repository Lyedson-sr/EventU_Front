import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css'

import Login from './pages/login/Login.jsx';
import Register from './pages/login/Register.jsx';
import ForgotPassword from './pages/login/ForgotPassword.jsx';
import ResetPassword from './pages/login/ResetPassword.jsx';
import EmailVerification from './pages/login/EmailVerification.jsx';
import PrivateRoute from "./routes/PrivateRoute.jsx";


import { AuthProvider } from "./context/AuthContext";
import Main from './pages/home/Home.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/main" element={
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
