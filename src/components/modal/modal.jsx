import React, { useState } from "react";
import styles from "./modal.module.css";

const Modal = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) return null;

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div className={styles.modalOverlay} onClick={handleClickOutside}>
      <form
        method="POST"
        className={`${styles.modalContent} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </form>
    </div>
  );
};

export default Modal;
