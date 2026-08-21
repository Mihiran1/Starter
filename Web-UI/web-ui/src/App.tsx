import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { AnimatePresence } from 'framer-motion';
import '@mantine/core/styles.css'; // Mantine Styles
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PageTransition from './components/PageTransition';

import Login from './pages/login/Login';
import Signup from './pages/SignUp/Signup';
import VerifyOtp from './pages/VerifyOtp/VerifyOtp';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* 1. Public Routes (ඕනෑම කෙනෙකුට යන්න පුළුවන්) */}
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
        <Route path="/verify-otp" element={<PageTransition><VerifyOtp /></PageTransition>} />
        <Route path="/forgot-password" element={<PageTransition><ForgotPassword /></PageTransition>} />
        <Route path="/reset-password" element={<PageTransition><ResetPassword /></PageTransition>} />

        {/* 2. Protected Routes (ලොග් වුණු අයට විතරයි) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<PageTransition><DashboardLayout /></PageTransition>}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Future routes like /settings or /profile will go here */}
          </Route>
        </Route>

        {/* වැරදි URL එකක් ගැහුවොත්, කෙලින්ම Dashboard එකට හෝ Login එකට යවනවා */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
