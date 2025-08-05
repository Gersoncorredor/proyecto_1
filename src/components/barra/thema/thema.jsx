import { useState, useEffect } from "react";
import { Eclipse, SunMoon } from "lucide-react";
import styles from "../barra.module.css";

export const Thema = ({ menu }) => {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
   return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(()=> {
    document.documentElement.setAttribute("data-Theme", mode);

  },[mode])

  const toggleMode = () => {
    setMode((prev) => {
      const newmode = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newmode);
      localStorage.setItem("theme", newmode)
      return newmode;
    });
  };

  return (
    <div className={styles.modoOscuro}>
      <div className={styles.info}>
        {mode === "dark" && <Eclipse size={20} className={styles.iconMode} />}
        {mode === "light" && <SunMoon size={20} className={styles.iconMode} />}
        <span className={menu ? styles.oculto : ""}>{mode}</span>
      </div>
      <div className={styles.switch} onClick={toggleMode}>
        <div className={styles.base}>
          <div
            className={`${styles.circulo} ${
              mode === "dark" ? styles.prendido : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};
