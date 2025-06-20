import "../../App.css";
import { UserRoundPen } from "lucide-react";
import styles from "./profile.module.css";
import Modal from "../../components/modal/modal.jsx";
import { useState } from "react";
import Image from "../../assets/id1.jpg"


function Profile() {
  const [imagePreview, setImagePreview] = useState(null);
console.log(imagePreview)
  return (
    <div className="app">
      <div className={styles.Profile}>
        <h1>Perfil</h1>
        <div className={styles.iconProfile}>
        {!imagePreview ? 
         <img src={"../../assets/id1.jpg"} alt="Preview" />:   


         <UserRoundPen size={"300px"} />
         }
        </div>
        <Modal />
        <div></div>
      </div>
    </div>
  );
}

export default Profile;
