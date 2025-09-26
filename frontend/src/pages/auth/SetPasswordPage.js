import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import SecurityImage from '../../assets/images/security_illustration.png';

const schema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match')
});

const SetPasswordPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
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
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      console.log('Password set successfully');
      
      // Clean up stored email
      localStorage.removeItem('resetEmail');
      
      // Show success message then redirect to login
      setTimeout(() => {
        navigate('/login', { 
          state: { 
            message: 'Password updated successfully! Please login with your new password.',
            type: 'success'
          }
        });
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  // Success state - show after password is updated
  if (success) {
    return (
      <Container fluid className="min-vh-100 bg-light">
        <Row className="min-vh-100 g-0">
          {/* Left Side - Success Message */}
          <Col lg={6} className="d-flex align-items-center justify-content-center p-4">
            <div style={{ maxWidth: '460px', width: '100%' }} className="text-center">
              
              {/* Success Icon */}
              <div className="mb-4">
                <div 
                  className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#10B981',
                    border: '3px solid #10B981'
                  }}
                >
                  <i className="bi bi-check-lg" style={{ fontSize: '2rem', color: 'white' }}></i>
                </div>
                <h1 className="h2 mb-2 fw-bold text-dark">Password Updated</h1>
                <p className="text-muted mb-0">Your password has been successfully updated!</p>
              </div>

              {/* Success Alert */}
              <Alert variant="success" className="mb-3">
                <div className="d-flex align-items-center justify-content-center">
                  <i className="bi bi-check-circle me-2"></i>
                  <strong>Password Updated!</strong>
                </div>
                <div className="text-center mt-2 small">
                  Redirecting to login page...
                </div>
              </Alert>

              {/* Loading Spinner */}
              <div className="d-flex justify-content-center">
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>

            </div>
          </Col>

          {/* Right Side - Success Image */}
          <Col lg={6} className="d-none d-lg-flex align-items-center justify-content-center bg-white p-4">
            <div className="text-center">
              <img 
                src={SecurityImage} 
                alt="Success illustration" 
                className="img-fluid" 
                style={{ maxWidth: '400px', height: 'auto' }} 
              />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  // Normal form state
  return (
    <Container fluid className="min-vh-100 bg-light">
      <Row className="min-vh-100 g-0">
        {/* Left Side - Form */}
        <Col lg={6} className="d-flex align-items-center justify-content-center p-4">
          <div style={{ maxWidth: '460px', width: '100%' }}>
            
            {/* Header */}
            <div className="mb-4">
              <h1 className="h2 mb-2 fw-bold text-dark">Set a password</h1>
              <p className="text-muted mb-1">Your previous password has been reseted.</p>
              <p className="text-muted mb-0">Please set a new password for your account.</p>
            </div>

            {/* Form */}
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <Form.Label className="fw-medium text-dark">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
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

              <div className="mb-4">
                <Form.Label className="fw-medium text-dark">Re-enter password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Re-enter your new password"
                  {...register('confirmPassword')}
                  isInvalid={!!errors.confirmPassword}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #e1e5e9',
                    fontSize: '16px'
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword?.message}
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
                    Setting password...
                  </>
                ) : (
                  'Set password'
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

export default SetPasswordPage;