import React, { useState } from "react";
import styles from "./modal.module.css";

const Modal = (open) => {
  const [active, setActive] = useState(open);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
  });

  const handleSubmit = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  return (
    <>
      <button className={styles.modalBoton} onClick={() => setActive(true)}>Abrir modal</button>
      <div
        className={active ? styles.modal : styles.modalHidden}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setActive(false);
          }
        }}
      >
        <form method="POST" className={styles.modalContent}>
          <div className={styles.modalHead}>
            <h2>Modal</h2>
          </div>
          <div className={styles.modalBody}>
            <label htmlFor="name" className={styles.inputGroup}>
              <span>Nombres:</span>
              <input type="text" name="name" id="name" value={formData.name}  onChange={handleSubmit}/>
            </label>
            <label htmlFor="lastName" className={styles.inputGroup}>
              <span>Apellidos:</span>
              <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleSubmit} />
            </label>
            <label htmlFor="email" className={styles.inputGroup}>
              <span>Correo:</span>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleSubmit} />
            </label>
          </div>
          <div className={styles.modalFooter}>
            <button type="submit" className={styles.modalBoton}>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Modal;
