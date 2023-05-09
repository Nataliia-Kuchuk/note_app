import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "./Modal";
import { Context } from "../../contex/Contex";
import './Modal.css'


const ModalWrapper = ({ children }) => {
  const {isOpen, setIsOpen, deleteNote, active} = useContext(Context)

  const closeModal = () => {
    setIsOpen(false);
  };
  const onDeleted = () => {
    closeModal()
     deleteNote(active)
}
  return (
    <>
      {isOpen &&
        ReactDOM.createPortal(
          <Modal closeModal={closeModal} onDeleted={onDeleted}>
            {children}
          </Modal>,
          document.getElementById("modal")
        )}
    </>
  );
};

export default ModalWrapper;
