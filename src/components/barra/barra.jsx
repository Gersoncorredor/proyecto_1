import { useState, useEffect } from "react";
import React from "react";
import styles from "./barra.module.css";
import { useNavigate } from "react-router-dom";
import { Thema } from "./thema/thema.jsx";
import UseProfile from "../UserProfile/UserProfile.jsx";

import {
  Menu,
  Plus,
  House,
  CircleUser,
  LogOut,
  CalendarCog,
  EllipsisVertical,
  Cloud,
} from "lucide-react";

import { getUserId } from "../../services/user.js";

const Barra = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const userID = localStorage.getItem("id");

    getUserId(1).then((user) => {
      setUser({
        name: user.data.name,
        email: user.data.email,
      });
    });
  }, []);

  return (
    <div className={styles.bBody}>
      <div className={styles.menu}>
        <Menu />
      </div>
      <div
        className={`${styles.barraLateral} ${
          menu ? styles.miniBarraLateral : ""
        }`}
      >
        <div>
          <div className={styles.nombrePagina}>
            <Cloud
              size={40}
              className={styles.icono}
              onClick={() => setMenu(!menu)}
            />
            <span className={menu ? styles.oculto : ""}>
              Agendamiento de citas
            </span>
          </div>
          <button className={styles.boton}>
            <Plus size={25} className={styles.icon} />
            <span className={menu ? styles.oculto : ""}>Create</span>
          </button>
        </div>
        <nav className={styles.navegacion}>
          <ul>
            <li>
              <a onClick={() => navigate("/")}>
                <House size={20} className={styles.icon} />
                <span className={menu ? styles.oculto : ""}>Home</span>
              </a>
            </li>
            <li>
              <a onClick={() => navigate("/citas")}>
                <CalendarCog size={20} className={styles.icon} />
                <span className={menu ? styles.oculto : ""}>Citas</span>
              </a>
            </li>
            <li>
              <a onClick={() => navigate("/perfil")}>
                <CircleUser size={20} className={styles.icon} />
                <span className={menu ? styles.oculto : ""}>Perfil</span>
              </a>
            </li>
          </ul>
        </nav>
        <div>
          <div className={styles.linea} />
          <Thema menu={menu} />
          <div className={styles.usuario}>
            <UseProfile />
            <div className={styles.infoUsuario}>
              <div className={styles.nombreEmail}>
                <span className={`${styles.name} ${menu ? styles.oculto : ""}`}>
                  {user.name}
                </span>
                <span
                  className={`${styles.email} ${menu ? styles.oculto : ""}`}
                >
                  {user.email}
                </span>
              </div>
              <EllipsisVertical
                className={`${styles.icon} ${menu ? styles.oculto : ""}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Barra;
