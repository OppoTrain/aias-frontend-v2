import React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';

const Modal = ({ children, show, onHide, title, ...props }) => {
  return (
    <BootstrapModal show={show} onHide={onHide} {...props}>
      {title && (
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title>{title}</BootstrapModal.Title>
        </BootstrapModal.Header>
      )}
      {children}
    </BootstrapModal>
  );
};

Modal.Body = BootstrapModal.Body;
Modal.Footer = BootstrapModal.Footer;

export default Modal;