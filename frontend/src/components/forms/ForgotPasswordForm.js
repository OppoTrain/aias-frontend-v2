import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import SecurityImage from '../../assets/images/security_illustration.png';

const schema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required')
});

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      // Store email for later steps
      localStorage.setItem('resetEmail', data.email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Password reset requested for:', data.email);
      // Navigate to verify code
      navigate('/verify-code');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <Container fluid className="min-vh-100 bg-light">
      <Row className="min-vh-100 g-0">
        {/* Left Side - Form */}
        <Col lg={6} className="d-flex align-items-center justify-content-center p-4">
          <div style={{ maxWidth: '460px', width: '100%' }}>
            
            {/* Back to Login Button */}
            <div className="mb-4">
              <button
                type="button"
                className="btn btn-link p-0 text-decoration-none d-flex align-items-center"
                onClick={handleBackToLogin}
                style={{ 
                  color: '#6B8FB5',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Login
              </button>
            </div>

            {/* Header */}
            <div className="mb-4">
              <h1 className="h2 mb-2 fw-bold text-dark">Forgot your password?</h1>
              <p className="text-muted mb-0">Enter your email so you can reset a new password</p>
            </div>

            {/* Form */}
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
                    Sending...
                  </>
                ) : (
                  'Reset the password'
                )}
              </Button>
            </Form>

          </div>
        </Col>

        {/* Right Side - Security Image */}
        <Col lg={6} className="d-none d-lg-flex align-items-center justify-content-center bg-white p-4">
          <div className="text-center">
            <img 
              src={SecurityImage} 
              alt="Security illustration" 
              className="img-fluid" 
              style={{ maxWidth: '400px', height: 'auto' }} 
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPasswordPage;