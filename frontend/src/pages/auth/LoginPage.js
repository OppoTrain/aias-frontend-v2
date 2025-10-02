import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import LoginImage from '../../assets/images/login_logo.png';

const schema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required')
});

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      setShowError(false);
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication
      if (data.email && data.password) {
        localStorage.setItem('aias_token', 'mock_token_123');
        onLogin();
      } else {
        setShowError(true);
      }
    } catch (error) {
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <Container fluid className="min-vh-100 bg-light">
      <Row className="min-vh-100 g-0">
        <Col lg={6} className="d-flex align-items-center justify-content-center p-4">
          <div style={{ maxWidth: '460px', width: '100%' }}>
            <div className="mb-4">
              <h1 className="h2 mb-2 fw-bold text-dark">Login</h1>
              <p className="text-muted mb-0">Login to access your AIAS account</p>
            </div>

            {showError && (
              <Alert variant="danger" className="mb-3">
                Invalid credentials. Please try again.
              </Alert>
            )}

            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <Form.Label className="fw-medium text-dark">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="enter your email"
                  {...register('email')}
                  isInvalid={!!errors.email}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #e1e5e9',
                    fontSize: '16px'
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </div>

              <div className="mb-3">
                <Form.Label className="fw-medium text-dark">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="enter your password"
                  {...register('password')}
                  isInvalid={!!errors.password}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #e1e5e9',
                    fontSize: '16px'
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </div>

              <div className="mb-4 text-end">
                <button
                  type="button"
                  className="btn btn-link p-0 text-primary text-decoration-none"
                  onClick={handleForgotPassword}
                >
                  Forgot Password
                </button>
              </div>

              <Button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#6B8FB5',
                  borderColor: '#6B8FB5',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Logging in...
                  </>
                ) : (
                  'Log in'
                )}
              </Button>
            </Form>
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

export default LoginPage;