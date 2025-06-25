import React, { useState } from "react";
import styles from "./modal.module.css";

const Modal = ({ open, onClose, children, title }) => {
  return (
    <>
      <div
        className={open ? styles.modal : styles.modalHidden}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <form method="POST" className={styles.modalContent}>
          {children}
        </form>
      </div>
    </>
  );
};

export default Modal;
