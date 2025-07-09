import "../../App.css";
import "@fullcalendar/common/main.css";
import styles from "./home.module.css";
import { useState } from "react";
import Modal, { useModal } from "../../components/modal/index";
import SeleccionarHorario from "../../components/seleccionarHorarios/seleccionarHorarios.jsx";
import Calendario from "../../components/calendario/calendario.jsx";
import TipoConsulta from "../../components/tipoconsulta/tipoConsulta.jsx";
import TipoOftalmologo from "../../components/tipooftalmologo/tipoOftalmologo.jsx";
import { schedule } from "../../services/schedule.js";

function Home() {
  const { open, onClose, onOpen } = useModal();
  const user = localStorage.getItem("user_id");
  const [fecha, setFecha] = useState("");
  const [formData, setFormData] = useState({
    fechaYhora: null,
    tipoConsulta: null,
    tipoOftalmologo: null,
    idUser: 3,
  });

  const handleSelect = (info) => {
    setFecha(info.startStr);

    onOpen();
  };

  const handleSubmit = async () => {
    try {
      await schedule(formData);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.home}>
      <div className={styles.calendario}>
      <Calendario handleSelect={handleSelect} />
      </div>
      <Modal isOpen={open} onClose={onClose} className={styles.modalHome}>
        <h2>Agendar</h2>
        <strong>Fecha: {fecha}</strong>
        <SeleccionarHorario
          fecha={fecha}
          selecionarHora={(id) => {
            setFormData({ ...formData, fechaYhora: id });
          }}
        />
        <TipoConsulta
          seleccionarConsulta={(id) => {
            setFormData({ ...formData, tipoConsulta: id });
          }}
        />
        <TipoOftalmologo
          seleccionarOftalmologo={(id) =>
            setFormData({
              ...formData,
              tipoOftalmologo: id,
            })
          }
        />
        <button type="submit" className={styles.homebtn} onClick={handleSubmit}>
          Agendar
        </button>
      </Modal>
    </div>
  );
}

export default Home;
