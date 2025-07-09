import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Barra from "./components/barra/barra.jsx";
import Home from "./view/home/home.view.jsx";
import Profile from "./view/profile/profile.view.jsx";
import Citas from "./view/citas/citas.view.jsx";
import styles from "./components/barra/barra.module.css";
function App() {
  const [menu, setMenu] = useState(false);
  const [miniMenu, setMiniMenu] = useState(false);

  return (
    <Router>
      <Barra
        menu={menu}
        setMenu={setMenu}
        miniMenu={miniMenu}
        setMiniMenu={setMiniMenu}
      >
        <main className={`${styles.main} ${menu ? styles.minMain : ""}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/citas" element={<Citas />} />
            <Route path="/perfil" element={<Profile />} />
          </Routes>
        </main>
      </Barra>
    </Router>
  );
}

export default App;
