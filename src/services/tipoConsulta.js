import api from "./api";
import endpoints from "./endpoints";

export const getTipoConsulta = () =>{
   return api.get(endpoints.getTipoConsulta) 
}