import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css'; // Mantine Styles
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/login/Login';
import Signup from './pages/SignUp/Signup';

function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* 1. Public Routes (ඕනෑම කෙනෙකුට යන්න පුළුවන්) */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-otp" element={<div>OTP Page (Coming Soon)</div>} />

            {/* 2. Protected Routes (ලොග් වුණු අයට විතරයි) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={
                <div style={{ padding: '2rem' }}>
                  <h1>Welcome to Dashboard!</h1>
                  <p>You can only see this if you are logged in.</p>
                </div>
              } />
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
