import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import VerifyCodeImage from '../../assets/images/verify_code_illustration.jpg';

const schema = yup.object({
  code: yup.string().required('Code is required').min(6, 'Code must be 6 digits')
});

const VerifyCodePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Code verified:', data.code);
      // Navigate to set new password
      navigate('/set-password');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleResend = async () => {
    try {
      setResendLoading(true);
      setResendSuccess(false);
      
      // Simulate resend API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 3000);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setResendLoading(false);
    }
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
              <h1 className="h2 mb-2 fw-bold text-dark">Verify code</h1>
              <p className="text-muted mb-0">An authentication code has been sent to your email.</p>
            </div>

            {/* Success Message for Resend */}
            {resendSuccess && (
              <Alert variant="info" className="mb-3">
                <i className="bi bi-check-circle me-2"></i>
                Code sent successfully!
              </Alert>
            )}

            {/* Form */}
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <Form.Label className="fw-medium text-dark">Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your code"
                  {...register('code')}
                  isInvalid={!!errors.code}
                  maxLength={6}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #e1e5e9',
                    fontSize: '16px'
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.code?.message}
                </Form.Control.Feedback>
              </div>

              {/* Resend Section */}
              <div className="mb-4">
                <p className="text-muted mb-0">
                  Didn't receive a code?{' '}
                  <button
                    type="button"
                    className="btn btn-link p-0 text-decoration-underline"
                    onClick={handleResend}
                    disabled={resendLoading}
                    style={{ 
                      color: '#0066FF',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}
                  >
                    {resendLoading ? 'Sending...' : 'Resend'}
                  </button>
                </p>
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
                    Verifying...
                  </>
                ) : (
                  'Verify'
                )}
              </Button>
            </Form>

          </div>
        </Col>

        {/* Right Side - Verify Code Image */}
        <Col lg={6} className="d-none d-lg-flex align-items-center justify-content-center bg-white p-4">
          <div className="text-center">
            <img 
              src={VerifyCodeImage} 
              alt="Verify code illustration" 
              className="img-fluid" 
              style={{ maxWidth: '400px', height: 'auto' }} 
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyCodePage;