import "../../App.css";
import { Construction, UserRoundPen } from "lucide-react";
import styles from "./profile.module.css";
import Modal from "../../components/modal/modal.jsx";
import { useState, useEffect } from "react";

function Profile() {
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    setImagePreview("../../../public/Avatares/id1.jpg");
  }, []);

  return (
    <div className={styles.profileContainer}>
      <h1>Perfil</h1>
      <div className={styles.profile}>
        <div className={styles.iconProfile}>
          {imagePreview ?
            (<img className={styles.iconImagen} src={imagePreview} alt="Preview" />)
            : (<UserRoundPen size={100} />)}
        </div>
        <div className={styles.profileContent}>
          <h2>Contenido</h2>
          <p>
            contenido
          </p>
          <Modal />
        </div>
      </div>
    </div>
  );
}

export default Profile;
