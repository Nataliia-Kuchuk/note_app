import React from "react";
import './Modal.css'
const Modal = ({ children, onDeleted, closeModal }) => {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div className="text">{children}</div>
        <button onClick={onDeleted} className="btn">
          Delete
        </button>
        <button onClick={closeModal} className="btn">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Modal;
