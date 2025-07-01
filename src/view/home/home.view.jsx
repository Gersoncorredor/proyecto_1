import "../../App.css";
import "@fullcalendar/common/main.css";
import styles from "./home.module.css";
import { useEffect, useState } from "react";
import Modal, { useModal } from "../../components/modal/index";
import SeleccionarHorario from "../../components/seleccionarHorarios/seleccionarHorarios.jsx";
import Calendario from "../../components/calendario/calendario.jsx";

function Home() {
  const { open, onClose, onOpen } = useModal();
  const [formData, setFormData] = useState({
    fecha: "",

  });

  const handleSelect = (info) => {
    setFormData({
      fecha: info.startStr,
    });
    onOpen();
  };

  return (
    <div className={styles.home}>
      <Calendario handleSelect={handleSelect} />
      <Modal isOpen={open} onClose={onClose} className={styles.modalHome}>
        <h2>Agendar</h2>
        <strong>Fecha: {formData.fecha}</strong>
        <SeleccionarHorario />
      </Modal>
    </div>
  );
}

export default Home;
