import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './hooks/useAuth';
import Sidebar from './components/layout/Sidebar';
import DashboardPage from './pages/dashboard/DashboardPage';
import MembersPage from './pages/members/MembersPage';
import LoginPage from './pages/auth/LoginPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import VerifyCodePage from './pages/auth/VerifyCodePage';
import SetPasswordPage from './pages/auth/SetPasswordPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('aias_token');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          {!isAuthenticated ? (
            <Routes>
              <Route path="/login" element={<LoginPage onLogin={() => setIsAuthenticated(true)} />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/verify-code" element={<VerifyCodePage />} />
              <Route path="/set-password" element={<SetPasswordPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          ) : (
            <div className="app-layout">
              <Sidebar onLogout={handleLogout} />
              <main className="main-content">
                <Routes>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/members" element={<MembersPage />} />
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </main>
            </div>
          )}
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
