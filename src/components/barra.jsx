import { useState } from "react";
import {Menu} from "lucide-react";

const Barra = () => {

return (
<div className="barra">
    <button className="barra-menu">
    <Menu /> Menu
    </button>
    <h1>Menu</h1>
    <li>
        <a href="#">Inicio</a>
    </li>
</div>
)

}

export default Barra;
