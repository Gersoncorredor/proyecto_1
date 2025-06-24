import React, { useState } from "react";
import styles from "./barra.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  House,
  CircleUser,
  LogOut,
  Eclipse,
  SunMoon,
} from "lucide-react";

const Barra = () => {

  const navigate = useNavigate();
  const [mode, setMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  const toggleMode = () => {
    setMode((prev) => {
      const newmode = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newmode);
      return newmode;
    });
  };
  const [menu, setMenu] = useState(true);

  return (
    <div className={`${styles.barra} ${menu ? "" : styles.expandida}`}>
      <button className={styles.barraMenu} onClick={() => setMenu(!menu)}>
        <Menu />
        {!menu && "Menu"}
      </button>
      <div>
        {!menu && <h1>Menu</h1>}

        <button onClick={() => navigate("/")} className={styles.barraMenu} >
          <House />
          {!menu && "Inicio"}
        </button>
        <button onClick={() => navigate("/perfil")} className={styles.barraMenu} >
          <CircleUser />
          {!menu && " Acerca de"}
        </button>
      </div>
      <div className={styles.barraFooter}>

        <button onClick={() => navigate("/login")} className={styles.barraMenu} >
          <LogOut />
          {!menu && " Cerrar sesión"}
        </button>
        <button className={styles.barraMenu} type="button" onClick={() => toggleMode()}>
          {mode === "dark" && <Eclipse />}
          {mode === "light" && <SunMoon />}
        </button>
      </div>
    </div>
  );
};

export default Barra;
