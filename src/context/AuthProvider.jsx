/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import clienteAxios from "../config/clienteAxios";
import { createContext, useContext, useEffect, useState }
 from "react";
 

const AuthContext= createContext();


const AuthProvider=({children})=>{

   
    const[auth,setAuth]=useState({});
    const[alerta,setAlerta]=useState({});
    const[cargando,setCargando]=useState(true);
    const navigate=useNavigate();
    useEffect(()=>{
        
        const token=localStorage.getItem('token');
        
        console.log(token);
       
        const autenticarUsuario=async()=>{
            if(!token){
                setCargando(false);
                return;
            }
            else{
                const config={
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${token}`
                    }
                }

                try{
                    const {data}=await clienteAxios('/usuarios/perfil',config);
                    setAuth(data);
                    navigate('/proyectos');
                }catch(err){
                    setAuth({});
                    setCargando(false);
                }finally{
                    setCargando(false);
                }
            }
        }
        autenticarUsuario();
                
        

    },[]);

    const cerrarSesionAuth=()=>{
        setAuth({})
    }

    return(
        <AuthContext.Provider
        value={{
          auth:auth,
          setAuth:setAuth,
          cargando:cargando,
          cerrarSesionAuth:cerrarSesionAuth
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthProvider
}
export default AuthContext;
