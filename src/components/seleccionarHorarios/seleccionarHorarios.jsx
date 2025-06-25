import { useState } from "react";
import styles from "./seleccionarHorarios.module.css";
import Select from "react-select";

const SeleccionarHorario = () => {
  const [hora, setHora] = useState("");
  const [idHorario, setIdHorario] = useState(null);
  const horarios = [
    { id: 1, hora: "08:00 AM" },
    { id: 2, hora: "09:00 AM" },
    { id: 3, hora: "10:00 AM" },
    { id: 4, hora: "11:00 AM" },
    { id: 5, hora: "12:00 PM" },
    { id: 6, hora: "01:00 PM" },
    { id: 7, hora: "02:00 PM" },
    { id: 8, hora: "03:00 PM" },
    { id: 9, hora: "04:00 PM" },
    { id: 10, hora: "05:00 PM" },
  ];

  const handleClick = (horario) => {
    if (idHorario === horario.id) {
      setHora("");
      setIdHorario(null);
    } else {
      setHora(horario.hora);
      setIdHorario(horario.id);
    }
  };

  const consulta = [
    { value: 1, label: "consulta" },
    { value: 2, label: "examen" },
  ];
  const TipoConsulta = () => {
    const handleChange = (selectedOption) => {
      console.log("nombre selecionado:", selectedOption);
    };
    return (
      <>
      Tipo de Consulta:
      <Select options={consulta} onChange={handleChange} />
      </>
    );
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
                onInput={() => handleClick(horario)}
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
      <TipoConsulta />
    </>
  );
};

export default SeleccionarHorario;
