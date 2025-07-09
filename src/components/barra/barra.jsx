import { useState, useEffect } from "react";
import styles from "./barra.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Thema } from "./thema/thema.jsx";
import UseProfile from "../UserProfile/UserProfile.jsx";
import { getUserId } from "../../services/user.js";
import {
  Menu,
  Plus,
  House,
  CircleUser,
  LogOut,
  CircleX,
  CalendarCog,
  EllipsisVertical,
  Cloud,
} from "lucide-react";

const Barra = ({ menu, setMenu, miniMenu, setMiniMenu, children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const location = useLocation();

  useEffect(() => {
    const userID = localStorage.getItem("id");

    getUserId(1).then((user) => {
      setUser({
        name: user.data.name,
        email: user.data.email,
      });
    });

    if (window.innerWidth <= 360) {
      setMenu(!menu);
    }
  }, []);

  return (
    <div className={styles.bBody}>
      <div className={`${styles.menu}`} onClick={() => setMiniMenu(!miniMenu)}>
        {miniMenu ? <CircleX /> : <Menu />}
      </div>
      <div
        className={`${styles.barraLateral} ${
          menu ? styles.miniBarraLateral : ""
        } 
        ${miniMenu ? styles.maxBarraLateral : ""}       
        `}
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
            <li className={`${location.pathname === "/" ? styles.activo : ""}`}>
              <a onClick={() => navigate("/")}>
                <House size={20} className={styles.icon} />
                <span className={menu ? styles.oculto : ""}>Home</span>
              </a>
            </li>

            <li
              className={`${
                location.pathname === "/citas" ? styles.activo : ""
              }`}
            >
              <a onClick={() => navigate("/citas")}>
                <CalendarCog size={20} className={styles.icon} />
                <span className={menu ? styles.oculto : ""}>Citas</span>
              </a>
            </li>

            <li
              className={`${
                location.pathname === "/perfil" ? styles.activo : ""
              }`}
            >
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
      {children}
    </div>
  );
};

export default Barra;
