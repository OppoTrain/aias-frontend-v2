import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';

const Card = ({ children, className = '', ...props }) => {
  return (
    <BootstrapCard className={`shadow-sm ${className}`} {...props}>
      {children}
    </BootstrapCard>
  );
};

Card.Body = BootstrapCard.Body;
Card.Header = BootstrapCard.Header;
Card.Footer = BootstrapCard.Footer;

export default Card;