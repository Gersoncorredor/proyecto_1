import React, { useState } from "react";
import styles from "./barra.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Thema } from "./thema/thema";
import {
  Menu,
  House,
  CircleUser,
  LogOut,
  CalendarCog,
} from "lucide-react";

const Barra = () => {
  const navigate = useNavigate();

  const [menu, setMenu] = useState(true);

  return (
    <div className={`${styles.barra} ${menu ? "" : styles.expandida}`}>
      <button className={styles.barraMenu} onClick={() => setMenu(!menu)}>
        <Menu />
        {!menu && "Menu"}
      </button>
      <div>
        {!menu && <h1>Menu</h1>}
        <button onClick={() => navigate("/")} className={styles.barraMenu}>
          <House />
          {!menu && "Inicio"}
        </button>
        <button onClick={() => navigate("/citas")} className={styles.barraMenu}>
          <CalendarCog />
          {!menu && "Citas"}
        </button>

        <button
          onClick={() => navigate("/perfil")}
          className={styles.barraMenu}
        >
          <CircleUser />
          {!menu && " Acerca de"}
        </button>
      </div>
      <div className={styles.barraFooter}>
        <button onClick={() => navigate("/login")} className={styles.barraMenu}>
          <LogOut />
          {!menu && " Cerrar sesión"}
        </button>
        <Thema />
      </div>
    </div>
  );
};

export default Barra;
