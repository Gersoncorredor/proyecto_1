import "../../App.css";
import { UserRoundPen } from "lucide-react";
import styles from "./profile.module.css";
import Modal, { useModal } from "../../components/modal/index.jsx";
import { useState, useEffect } from "react";

function Profile() {
  const [imagePreview, setImagePreview] = useState(null);
  const { open, onClose, onOpen } = useModal();

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
  });

  const handleSubmit = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setImagePreview("../../../public/Avatares/id1.jpg");
  }, []);

  return (
    <div className={styles.profileContainer}>
      <h1>Perfil</h1>
      <div className={styles.profile}>
        <div className={styles.iconProfile}>
          {imagePreview ? (
            <img
              className={styles.iconImagen}
              src={imagePreview}
              alt="Preview"
            />
          ) : (
            <UserRoundPen size={100} />
          )}
        </div>
        <div className={styles.profileContent}>
          <h2>Contenido</h2>
          <p>contenido</p>
          <button onClick={onOpen}>Editar</button>
          <Modal title="PERFIL" open={open} onClose={onClose}>
            <h2>Editar perfil</h2>

            <label htmlFor="name" className={styles.inputGroup}>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleSubmit}
              />
              <span>Nombres:</span>
            </label>
            <label htmlFor="lastName" className={styles.inputGroup}>
              <input
                type="text"
                name="lastName"
                id="lastName"
                required
                value={formData.lastName}
                onChange={handleSubmit}
              />
              <span>Apellidos:</span>
            </label>
            <label htmlFor="email" className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleSubmit}
              />
              <span>Correo:</span>
            </label>
            <div className={styles.profileFooter}>
              <button>Guardar</button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Profile;
