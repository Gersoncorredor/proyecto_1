import { useState, useEffect } from "react";
import styles from "./tipoOftalmologo.module.css";
import Select from "react-select";
import { getUserByRole } from "../../services/user.js";
 
 const TipoOftalmologo = () => {
    const [tipoOftalmologo, setTipoOftalmologo] = useState([]);
    useEffect(() => {
      getUserByRole(2).then((res) => {
        const oftalmologo = res.data.map((user) => ({
          value: user.id,
          label: `${user.name} ${user.lastName}`,
        }));
        setTipoOftalmologo(oftalmologo);
      });
    }, []);
    const handleChange = (selectedOption) => {
      console.log("nombre selecionado:", selectedOption);
    };

    return (
      <>
        Tipo de Oftalmologo:
        <Select
          options={tipoOftalmologo}
          onChange={handleChange}
          className={styles.SHselect}
        />
      </>
    );
  };

  export default TipoOftalmologo;