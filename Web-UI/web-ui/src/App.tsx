import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css'; // Mantine Styles
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/login/Login';
import Signup from './pages/SignUp/Signup';
import VerifyOtp from './pages/VerifyOtp/VerifyOtp';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';

function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* 1. Public Routes (ඕනෑම කෙනෙකුට යන්න පුළුවන්) */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* 2. Protected Routes (ලොග් වුණු අයට විතරයි) */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                {/* Future routes like /settings or /profile will go here */}
              </Route>
            </Route>

            {/* වැරදි URL එකක් ගැහුවොත්, කෙලින්ම Dashboard එකට හෝ Login එකට යවනවා */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
