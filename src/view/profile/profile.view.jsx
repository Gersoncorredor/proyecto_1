import "../../App.css";
import { UserRoundPen } from "lucide-react";
import styles from "./profile.module.css";
import { useState, useEffect } from "react";
import { getUserId, updateUser } from "../../services/user.js";
import UseProfile from "../../components/UserProfile/UserProfile.jsx";

function Profile() {
  const [isDisabled, setIsDisabled] = useState(true);
  const id = 1;
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    lastName: "",
    email: "",
  });
  const [originData, setOriginData] = useState("");
  const [isModified, setIsModified] = useState(false);

  const renderButtonLabel  = isDisabled ? "Ediatar" : "Guardar cambios"

  const handleSubmit = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updateData = { ...prevData, [name]: value };
      setIsModified(JSON.stringify(updateData) !== JSON.stringify(originData));
      return updateData;
    });
  };

  const handleEdit = () => {
    if (isDisabled) {
      setIsDisabled(false);
      return;
    }

    if (isModified) {
      const confirm = window.confirm("Los datos han cambiado. ¿Deseas continuar?");
      if (!confirm) return;

      updateUser(id, formData).then((response) => {
        setIsDisabled(true);
        setOriginData(formData);
      });
    } else {
      setIsDisabled(true);
    }
  };

  useEffect(() => {
    getUserId(id).then((response) => {
      setFormData(response.data);
    });
  }, []);

  return (
    <>
      <h1>Perfil</h1>
      <div className={styles.profile}>
        <div className={styles.contanierProfile}>
          <div className={styles.iconProfile}>
            <UseProfile />
          </div>
          <span>{`${formData.name} ${formData.lastName}`}</span>
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
            {renderButtonLabel}
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
