import React from 'react';
import { Container } from 'react-bootstrap';

const Layout = ({ children, fluid = false, className = '' }) => {
  return (
    <Container fluid={fluid} className={`min-vh-100 ${className}`}>
      {children}
    </Container>
  );
};

export default Layout;