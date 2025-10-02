import React, { useState } from 'react';
import { Form, Row, Col, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../ui/Button';
import { useAuth } from '../../hooks';
import { useNavigate } from 'react-router-dom'; 

const schema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required')
});

const LoginForm = () => {
  const [showError, setShowError] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate(); // ← إنشاء navigate

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
      await login(data);
      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      setShowError(true);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="login-form-container">
      <div className="mb-4">
        <h1 className="h2 mb-2 fw-bold text-dark">Login</h1>
        <p className="text-muted mb-0">Login to access your AIAS account</p>
      </div>

      {/* Test Credentials Alert */}
      <Alert variant="info" className="mb-3">
        <strong>Test Credentials:</strong><br />
        Email: test@admin.com<br />
        Password: admin123
      </Alert>

      {showError && (
        <Alert variant="danger" className="mb-3">
          Invalid credentials. Please try again.
        </Alert>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3">
          <Col>
            <Form.Label className="fw-medium text-dark">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="enter your email"
              {...register('email')}
              isInvalid={!!errors.email}
              className="form-control-lg"
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label className="fw-medium text-dark">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="enter your password"
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
          <Col className="text-end">
            <button
              type="button"
              className="btn btn-link p-0 text-primary text-decoration-none"
              onClick={handleForgotPassword} 
            >
              Forgot Password
            </button>
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
              {loading ? 'Logging in...' : 'Log in'}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default LoginForm;
