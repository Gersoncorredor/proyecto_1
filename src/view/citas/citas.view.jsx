import styles from "./citas.module.css";
import CTable from "../../components/tabla/CTabla.jsx";
import { useState, useEffect } from "react";
import { getUser } from "../../services/user.js";
import { getTipoConsulta } from "../../services/tipoConsulta.js";
import { getHours } from "../../services/hours.js";
import { getSchedule } from "../../services/schedule.js";

const Citas = () => {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [citasRes, horasRes, tiposRes, usersRes] = await Promise.all([
          getSchedule(),
          getHours(),
          getTipoConsulta(),
          getUser(),
        ]);
        const citasR = citasRes.data;
        const horasR = horasRes.data;
        const tiposR = tiposRes.data;
        const usersR = usersRes.data;


        const citasFormateadas = citasR.map((cita) => {
          const user = usersR.find(
            (us) => us.id.toString() === cita.idUser.toString()
          );
          const oftalmólogo = usersR.find(
            (us) => us.id.toString() === cita.tipoOftalmologo.toString()
          );
          const horas = horasR.find(
            (ho) => ho.id.toString() === cita.fechaYhora.toString()
          );
          const tipoConsulta = tiposR.find(
            (tc) => tc.id.toString() === cita.tipoConsulta.toString()
          );
          return {
            ...cita,
            fecha: horas ? `${horas.fecha}` : "Desconocido",
            hora: horas ? `${horas.hora}` : "Desconocido",
            consulta: tipoConsulta ? `${tipoConsulta.tipo}` : "Desconocido",
            oftalmologo: oftalmólogo
              ? `${oftalmólogo.name} ${oftalmólogo.lastName}`
              : "Desconocido",
            usuario: user ? `${user.name} ${user.lastName}` : "Desconocido",
          };
        });
        setCitas(citasFormateadas);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Citas</h1>
      <CTable data={citas} />
    </div>
  );
};

export default Citas;
