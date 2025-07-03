import { useState, useEffect } from "react";
import styles from "./tipoConsulta.module.css"
import Select from "react-select";
import { getTipoConsulta } from "../../services/tipoConsulta.js";

const TipoConsulta = ({seleccionarConsulta}) => {
  const [tipoConsulta, setTipoConsulta] = useState([]);

  useEffect(() => {
    getTipoConsulta().then((res) => {
      const consulta = res.data.map((tipoConsulta) => ({
        value: tipoConsulta.id,
        label: tipoConsulta.tipo,
      }));
      setTipoConsulta(consulta);
    });
  }, []);

  const handleChange = (selectedOption) => {
    seleccionarConsulta(selectedOption.value);
  };
  return (
    <>
      Tipo de Consulta:
      <Select
        options={tipoConsulta}
        onChange={handleChange}
        className={styles.SHselect}

      />
    </>
  );
};

export default TipoConsulta;
