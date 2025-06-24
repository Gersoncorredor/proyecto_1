import {useState } from "react";
import { Eclipse, SunMoon } from "lucide-react";
import styles from "../barra.module.css";


export const Thema = () => {
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

  return (
    <button
    className={styles.barraMenu}
      type="button"
      onClick={() => toggleMode()}
    >
      {mode === "dark" && <Eclipse />}
      {mode === "light" && <SunMoon />}
    </button>
  );
};
