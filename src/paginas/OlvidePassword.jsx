import { Link, json, useParams } from "react-router-dom"

import { useState } from "react";
import Alert from './../components/Alert';
import axios  from 'axios';


function OlvidePassword() {
  
 // const {id}=useParams();
  const [email,setEmail]=useState('');
  const [alerta,setAlerta]=useState({});
  
  const handleSubmit= async (e)=>{
    e.preventDefault();

    if(email==='' || email.length<6){
      setAlerta({
        msg:'El email es obligatorio',
        error:true
      });
      return;
    }

    const urL=`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password`;
    try{

      const {data}=await axios.post(urL,{
        email:email
      });
      console.log("DATA: ",data);
      setAlerta({
        msg:data.msg,
        error:false
      });
      
    }catch(err){
      console.log("ERROR: ",err);
      setAlerta({
        msg:err.response.data.msg,
        error:true
      });
    }
      
  }

  const {msg}=alerta;
  return (
    <div>
    <h1 className="text-sky-600 font-black text-6xl capitalize"> Recupera tu acceso y no pierdas tus   
    <span className="text-slate-700"> proyectos</span></h1>
   {msg && <Alert alerta={alerta}/>}
    <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
        <div className="my-5">
          <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email:</label>
          <input
          type="email"
          id="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Nombre de registro"
          className=" w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
      </div>
    
      <input type="submit" value="Enviar instrucciones"
      className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
      />
    </form>

    <nav className="lg:flex lg:justify-between">
        <Link
        className="block text-center my-5 text-slate-500 uppercase text-sm"
        to="/"
        >
            ¿Ya tienes una cuenta? Inicia Sesión 
        </Link>
        <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="registrar"
            >
                ¿No tienes cuenta? Registrate 
            </Link>
        
    </nav>

</div>
  )
}

export default OlvidePassword