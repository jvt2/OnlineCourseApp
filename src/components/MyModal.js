import React from 'react';
import Modal from 'react-modal';

// This line is necessary for accessibility reasons
Modal.setAppElement('#root');

function MyModal({ isOpen, onClose, children }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      {children}
      <button onClick={onClose}>Close</button>
    </Modal>
  );
}

export default MyModal;
