import React from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';

const Table = ({ children, ...props }) => {
  return <BootstrapTable {...props}>{children}</BootstrapTable>;
};

export default Table;