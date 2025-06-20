import React from "react";
import { Menu } from "lucide-react";
import styles from "./barra.module.css";

const Barra = ({menu, colapso }) => {
    return (
        <div className={`${styles.barra} ${menu ? styles.colapsada : styles.expandida}`}>
            <button className={styles.barraMenu} onClick={colapso} >
                <Menu /> 
                {!menu && "Menu"}
            </button>
            <h1>Menu</h1>
            <li>
                <a href="#">Inicio</a>
            </li>
        </div>
    )

}

export default Barra;
