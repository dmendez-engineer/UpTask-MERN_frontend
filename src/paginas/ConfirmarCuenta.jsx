/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Alert from "../components/Alert"
import clienteAxios from "../config/clienteAxios"



function ConfirmarCuenta() {
  
  const [alerta,setAlerta]=useState({});
  const [cuentaConfirmada,setCuentaConfirmada]=useState(false);
  const params=useParams();
  const {id}=params;
  
  useEffect(()=>{
  
    const confirmarCuenta=async()=>{
      try{
        const url=`http://localhost:4000/api/usuarios/confirmar/${id}`;
        console.log("CUANTAS DE EJECUTA");
        const {data}=await axios.get(url);
        
         /* 
         const url='/usuarios/confirmar/${id}'
         const {data}= await clienteAxios(url);*/


        setAlerta({
          msg:data.msg,
          error:false
        });
        setCuentaConfirmada(true);

      }catch(err){
        setAlerta({
          msg:err.response.data.msg,
          error:true
        });
      }
    }
    confirmarCuenta();


  },[]);
  const {msg}=alerta;
  
  
  return (
    <div>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Confirma tu cuenta y comienza a crear tus   
      <span className="text-slate-700"> proyectos</span></h1>


    <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
    {msg && <Alert 
      alerta={alerta} 
    />}

    {cuentaConfirmada && (<Link className="block text-center my-5 text-slate-500 uppercase text-sm"
      to="/"
      >
          ¿Ya tienes una cuenta? Inicia Sesión 
      </Link>)
    }
    </div>
    
  
    

  </div>
  )
}

export default ConfirmarCuenta