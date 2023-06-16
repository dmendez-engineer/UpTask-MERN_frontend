import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Alert from "../components/Alert"



function NuevoPassword() {
  const params=useParams();
  //const {token}=useParams();
  const {token}=params;
  
  
  const urL=`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password/${token}`;
  const[alerta,setAlerta]=useState({});
  const[password,setPassword]=useState('');
  const [tokenValido,setTokenValido]=useState(false);
  const[passwordChanged,setPasswordChanged]=useState(false);
  useEffect(()=>{
    
    //validar token
    const validarToken=async()=>{
     
     try{
      const {data}=await axios.get(urL);
      setTokenValido(true);
      console.log("DATA: ",data);
     }catch(err){
      setAlerta({
        msg:err.response.data.msg,
        error:true
      });
      console.log("ERROR: ",err);
     }
    
    }
    validarToken();


  },[]);

  const handleSubmit=async (e)=>{
    e.preventDefault();

    if(password.length<6){
       
      setAlerta({
        msg:"El password es muy corto, agrega mínimo 6 caracteres",
        error:true
      });
      return;
    }

    try{
      const {data}=await axios.post(urL,{
        password:password
      });
      setAlerta({
        msg:data.msg,
        error:false
      });
      setPasswordChanged(true);

    }catch(err){
      setAlerta({
        msg:err.response.data.msg,
        error:true
      });
      
    }
    

    
  }
  const {msg}=alerta;
  return (
    <div>
    <h1 className="text-sky-600 font-black text-6xl capitalize">Reestablece tu password y no pierdas acceso a tus  
    <span className="text-slate-700"> proyectos</span></h1>

    {msg && <Alert alerta={alerta}/>}
    
    {tokenValido &&  (<form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
        

      <div className="my-5">
          <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Nuevo Password:</label>
          <input
          type="password"
          id="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="Escribe tu nuevo Password de registro"
          className=" w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
      </div>

  

      <input type="submit" value="Guardar Nuevo Password"
      className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
      />

</form>)}

{passwordChanged && (<Link className="block text-center my-5 text-slate-500 uppercase text-sm"
to="/"
>
     Inicia Sesión 
</Link>)
}

</div>
  )
}

export default NuevoPassword