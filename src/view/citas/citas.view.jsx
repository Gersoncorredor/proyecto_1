import styles from "./citas.module.css";
import CTable from "../../components/tabla/CTabla.jsx";
import { useState, useEffect } from "react";
import { getUser } from "../../services/user.js";
import { getTipoConsulta } from "../../services/tipoConsulta.js";
import { getHours } from "../../services/hours.js";
import { getSchedule } from "../../services/schedule.js";

const Citas = () => {
  const [citas, setCitas] = useState([]);

  const formatearCita = (cita, usersRes, horasRes, tiposRes) => {
    const user = usersRes.data.find((us) => Number(us.id) === Number(cita.idUser));
    const oftalmólogo = usersRes.data.find(
      (us) => Number(us.id) === Number(cita.tipoOftalmologo)
    );
    const horas = horasRes.data.find((ho) => Number(ho.id) === Number(cita.fechaYhora));
    const tipoConsulta = tiposRes.data.find(
      (tc) => Number(tc.id) === Number(cita.tipoConsulta)
    );
    return {
      ...cita,
      fecha: horas?.fecha || "Desconocido",
      hora: horas?.hora || "Desconocido",
      consulta: tipoConsulta?.tipo || "Desconocido",
      oftalmologo: oftalmólogo
        ? `${oftalmólogo.name} ${oftalmólogo.lastName}`
        : "Desconocido",
      usuario: user ? `${user.name} ${user.lastName}` : "Desconocido",
    };
  };

  useEffect(() => {

    const fetchAll = async () => {
      try {
        const [citasRes, horasRes, tiposRes, usersRes] = await Promise.all([
          getSchedule(),
          getHours(),
          getTipoConsulta(),
          getUser(),
        ]);
        const citasFormateadas = citasRes.data.map((cita) =>
          formatearCita(cita, usersRes, horasRes, tiposRes)
        );
        setCitas(citasFormateadas);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    fetchAll();


  }, []);

  const columnas = [
    { header: "Fecha", accessor: "fecha" },
    { header: "Hora", accessor: "hora" },
    { header: "Consulta", accessor: "consulta" },
    { header: "Oftalmólogo", accessor: "oftalmologo" },
    { header: "Usuario", accessor: "usuario" },
  ];
  return (
    <div className={styles.container}>
      <h1>Citas</h1>
      <CTable data={citas} columns={columnas} />
    </div>
  );
};

export default Citas;
