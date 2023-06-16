/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import useProyecto from '../hooks/useProyecto'
import ListadoProyectos from '../components/ListadoProyectos.jsx';
import Alert from '../components/Alert';
import io from 'socket.io-client'

let socket;
function Proyectos() {

   const {proyectos,setCargando,alerta}=useProyecto();

   useEffect(()=>{
    /*socket=io(import.meta.env.VITE_BACKEND_URL);

    socket.emit('prueba',proyectos);

    socket.on('respuesta',(respuesta)=>{
      console.log("SOCKET: ",respuesta);
    });*/
    setCargando(false);
   });

   const {msg}=alerta;
  return (
    <div>
     <h1 className='text-4xl font-black'>Proyectos</h1>
    {msg && <Alert alerta={alerta}/>}
     <div className='bg-white rounded-xl shadow-2xl mt-10'>
     {proyectos.length ?  proyectos.map(p=>(
      <ListadoProyectos 
      key={p._id}
      proyecto={p}/>
     )):'There are no projects to show'
    }
    </div>
    
    </div>
  )
}

export default Proyectos