import React, { useState } from 'react';
import { Form, Row, Col, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../index';
import { useNavigate } from 'react-router-dom';

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

const SetPasswordForm = () => {
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

  if (success) {
    return (
      <div className="set-password-form-container">
        <div className="text-center">
          {/* Success State */}
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

          <Alert variant="success" className="mb-3">
            <div className="d-flex align-items-center justify-content-center">
              <i className="bi bi-check-circle me-2"></i>
              <strong>Password Updated!</strong>
            </div>
            <div className="text-center mt-2 small">
              Redirecting to login page...
            </div>
          </Alert>

          <div className="d-flex justify-content-center">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="set-password-form-container">
      {/* Header */}
      <div className="mb-4">
        <h1 className="h2 mb-2 fw-bold text-dark">Set a password</h1>
        <p className="text-muted mb-1">Your previous password has been reseted.</p>
        <p className="text-muted mb-0">Please set a new password for your account.</p>
      </div>

      {/* Form */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3">
          <Col>
            <Form.Label className="fw-medium text-dark">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              {...register('password')}
              isInvalid={!!errors.password}
              className="form-control-lg"
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Form.Label className="fw-medium text-dark">Re-enter password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-enter your new password"
              {...register('confirmPassword')}
              isInvalid={!!errors.confirmPassword}
              className="form-control-lg"
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword?.message}
            </Form.Control.Feedback>
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
                  Setting password...
                </>
              ) : (
                'Set password'
              )}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SetPasswordForm;