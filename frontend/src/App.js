import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthProvider } from './hooks/useAuth';
import { LoginForm } from './components';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginImage from './assets/images/login_logo.png'; // ← import الصورة

const queryClient = new QueryClient();

const LoginPage = () => {
  return (
    <Container fluid className="min-vh-100 bg-light">
      <Row className="min-vh-100 g-0">
        <Col lg={6} className="d-flex align-items-center justify-content-center p-4">
          <div style={{ maxWidth: '400px', width: '100%' }}>
            <LoginForm />
          </div>
        </Col>

        <Col lg={6} className="d-none d-lg-flex align-items-center justify-content-center bg-white p-4">
          <div className="text-center">
            <img 
              src={LoginImage} 
              alt="Login illustration" 
              className="img-fluid" 
              style={{ maxWidth: '400px', height: 'auto' }} 
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
