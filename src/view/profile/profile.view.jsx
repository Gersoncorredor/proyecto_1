import "../../App.css";
import { UserRoundPen } from "lucide-react";
import styles from "./profile.module.css";
import { useState, useEffect } from "react";
import { getUserId, updateUser } from "../../services/user.js";

function Profile() {
  const [imagePreview, setImagePreview] = useState(null);

  const [isDisabled, setIsDisabled] = useState(true);
  const id = 1;
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    lastName: "",
    email: "",
  });
  const [originData, setOriginData] = useState("");

  const handleSubmit = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    if (isDisabled) {
      setIsDisabled(false);
      return;
    }

    if (JSON.stringify(formData) !== JSON.stringify(originData)) {
      const confirm = window.confirm(
        "Los datos han cambiado. ¿Deseas continuar?"
      );
      if (!confirm) return;
      updateUser(id, formData).then((response) => {
        setOriginData(formData);
        setIsDisabled(true);
      });
    } else {
      setIsDisabled(true);
    }
  };

  useEffect(() => {
    setImagePreview("../../../public/Avatares/id1.jpg");
    setOriginData(formData);
    getUserId(id).then((response) => {
      setOriginData(response.data);
      setFormData(response.data);
    });
  }, []);

  return (
    <>
      <h1>Perfil</h1>
      <div className={styles.profile}>
        <div className={styles.contanierProfile}>
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

          <span>
            {formData.name}
            {formData.lastName}
          </span>
          <span>{formData.email}</span>
        </div>
        
        <div className={styles.profileContent}>
          <h2>Datos</h2>
          <label htmlFor="name" className={styles.inputGroup}>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleSubmit}
              disabled={isDisabled}
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
              disabled={isDisabled}
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
              disabled={isDisabled}
            />
            <span>Correo:</span>
          </label>
          <button onClick={handleEdit}>
            {isDisabled ? "Editar" : "Guardar"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
