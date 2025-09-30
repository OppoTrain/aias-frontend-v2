import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const Pagination = ({ children, ...props }) => {
  return <BootstrapPagination {...props}>{children}</BootstrapPagination>;
};

export default Pagination;