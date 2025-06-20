import { useState } from "react";
import { Eclipse, SunMoon} from "lucide-react";
import "./App.css";
import Barra from "./components/barra";




function App() {
  const [mode, setMode] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const toggleMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
    document.documentElement.setAttribute('data-theme', mode );
  };
const [menu, setMenu] = useState(false);

  return (
    <>
    <Barra menu={menu} colapso={() => setMenu(!menu)} />
      <button type="button" onClick={()=>toggleMode()} >
        {
          mode=== "dark" && (
            <Eclipse/>
          )
          

        }
        {
          mode=== "light" && (
            <SunMoon/>
          )
        }
      </button>

    </>
  );
}

export default App;
