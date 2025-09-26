import React, { useState } from 'react';
import { Form, Row, Col, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../index';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  code: yup.string().required('Code is required').min(6, 'Code must be 6 digits')
});

const VerifyCodeForm = () => {
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
    <div className="verify-code-form-container">
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
        <Row className="mb-3">
          <Col>
            <Form.Label className="fw-medium text-dark">Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your code"
              {...register('code')}
              isInvalid={!!errors.code}
              className="form-control-lg"
              maxLength={6}
            />
            <Form.Control.Feedback type="invalid">
              {errors.code?.message}
            </Form.Control.Feedback>
          </Col>
        </Row>

        {/* Resend Section */}
        <Row className="mb-4">
          <Col>
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
          </Col>
        </Row>

        <Row>
          <Col>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-100"
              disabled={loading}
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
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default VerifyCodeForm;