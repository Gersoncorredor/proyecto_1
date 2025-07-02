import { useState, useEffect } from "react";
import styles from "./tipoConsulta.module.css"
import Select from "react-select";
import { getTipoConsulta } from "../../services/tipoConsulta.js";

const TipoConsulta = () => {
  const [tipoConsulta, setTipoConsulta] = useState([]);

  useEffect(() => {
    getTipoConsulta().then((res) => {
      console.log(res.data);
      const consulta = res.data.map((tipoConsulta) => ({
        value: tipoConsulta.id,
        label: tipoConsulta.tipo,
      }));
      setTipoConsulta(consulta);
    });
  }, []);

  const handleChange = (selectedOption) => {
    console.log("nombre selecionado:", selectedOption);
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
