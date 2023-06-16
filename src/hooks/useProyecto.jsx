import { useContext } from "react";
import ProyectoContext from "../context/ProyectoContext";

const useProyecto=()=>{
    return useContext(ProyectoContext);
}
export default useProyecto;