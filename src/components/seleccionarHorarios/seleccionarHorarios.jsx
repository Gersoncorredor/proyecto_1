import { useState, useEffect } from "react";
import styles from "./seleccionarHorarios.module.css";
import { getHoursFech } from "../../services/hours.js";
import { getUserByRole } from "../../services/user.js";

const SeleccionarHorario = ({ fecha , selecionarHora }) => {
  const [hora, setHora] = useState("");
  const [idHorario, setIdHorario] = useState(null);

  const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    //consulta delos horarios disponibles
    getHoursFech(fecha).then((res) => {
      setHorarios(res.data);
    });

    getUserByRole(2).then((res) => {
      res.data;
    });
  }, [fecha]);

  const handleClick = (horario) => {
    setHora(horario.hora);
    setIdHorario(horario.id);
    selecionarHora(parseInt(horario.id));
  };

  return (
    <>
      <div className={styles.SHcontainer}>
        {horarios.map((horario) => {
          return (
            <label
              htmlFor={horario.id}
              key={crypto.randomUUID()}
              className={styles.radioBtn}
            >
              <input
                type="radio"
                name="horario"
                id={horario.id}
                value={horario.hora}
                defaultChecked={hora === horario.hora}
                onChange={() => handleClick(horario)}
              />
              <span>{horario.hora}</span>
            </label>
          );
        })}
      </div>
      {idHorario ? (
        <p>
          Has selecionado: <strong>{hora}</strong>
        </p>
      ) : (
        <p>Por favor selecciona una hora</p>
      )}
    </>
  );
};

export default SeleccionarHorario;
