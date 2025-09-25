import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ size = 'sm', variant = 'primary' }) => {
  return (
    <Spinner animation="border" size={size} variant={variant} role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default LoadingSpinner;