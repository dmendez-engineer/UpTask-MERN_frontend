/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alert from './../components/Alert';
import clienteAxios from './../config/clienteAxios';
import useAuth from "../hooks/useAuth";
import useProyecto from "../hooks/useProyecto";



function Login() {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[alerta,setAlerta]=useState({});
    const navigate=useNavigate();
    const{auth,setAuth,cargando}=useAuth();
  

    const handleSubmit=async(e)=>{
        e.preventDefault();

      /*  if(email.length<=5 || password.length<=5){
           
        }*/
        if([email,password].includes('')){
            setAlerta({
                msg:'Todos los campos son obligatorios',
                error:true
            });
            return;
        }

        const url=`/usuarios/login`
        try{
            const {data}=await clienteAxios.post(url,{
                email:email,
                password:password
            });
            
           localStorage.setItem('token',data.token);
           setAuth(data);
           setAlerta({});
           navigate("/proyectos");

        }catch(err){
            setAlerta({
                msg:err.response.data.msg,
                error:true
              });
              console.log("ERROR: ",err);
        }
        
    }
    const {msg}=alerta;

  return (
    <div>
        <h1 className="text-sky-600 font-black text-6xl capitalize"> Inicia sesión y administra tus 
        <span className="text-slate-700"> proyectos</span></h1>
        {msg && <Alert alerta={alerta}/>}
        
        <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
            <div className="my-5">
                <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email:</label>
                <input
                type="email"
                id="email"
                placeholder="Email de registro"
                className=" w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
            </div>

            <div className="my-5">
                <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password:</label>
                <input
                type="password"
                id="password"
                placeholder="Password de registro"
                className=" w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
            </div>

            <input type="submit" value="Iniciar sesión"
            className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />

        </form>

        <nav className="lg:flex lg:justify-between">
            <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="registrar"
            >
                ¿No tienes cuenta? Registrate 
            </Link>
            <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="olvide-password"
            >
                Olvidé mi password 
            </Link>
            
        </nav>

    </div>
  )
}

export default Login