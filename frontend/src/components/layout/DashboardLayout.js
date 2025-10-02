import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-grow-1 bg-light min-vh-100">
        <Container fluid>
          {children}
        </Container>
      </div>
    </div>
  );
};

export default DashboardLayout;