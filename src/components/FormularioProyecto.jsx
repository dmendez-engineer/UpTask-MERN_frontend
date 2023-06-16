/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import useProyecto from '../hooks/useProyecto';
import Alert from './Alert';
import { useParams } from 'react-router-dom';

function FormularioProyecto() {
  const [id,setId]=useState(null);
   const [nombre,setNombre]=useState('');
   const [descripcion,setDescripcion]=useState('');
   const [fechaEntrega,setFechaEntrega]=useState('');
   const [cliente,setCliente]=useState('');
   const params=useParams();
  
  const {mostrarAlerta,alerta,submitProyecto,proyecto,edit,obtenerProyecto}=useProyecto();

  useEffect(()=>{
    if(params.id && proyecto.nombre){
     // obtenerProyecto(params.id);
      setId(proyecto._id);
      setNombre(proyecto.nombre);
      setDescripcion(proyecto.descripcion);
      setFechaEntrega(proyecto.fechaEntrega.split("T")[0]);
      setCliente(proyecto.cliente);

    }else{

    }
  },[params]);

   const handleSubmit= async (e)=>{
      e.preventDefault();

      if([nombre,descripcion,fechaEntrega,cliente].includes('')){
          mostrarAlerta({
            msg:"ALl the fields are mandatory",
            error:true
          });
          return;
      }
      await submitProyecto({
        id:id,
        nombre:nombre,
        descripcion:descripcion,
        fechaEntrega:fechaEntrega,
        cliente:cliente
      });
      setId(null);
      setNombre('');
      setDescripcion('');
      setFechaEntrega('');
      setCliente('');

      //Sent the data to the provider



   }
   const {msg}=alerta;
  return (
    <form className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'
    onSubmit={handleSubmit}
    >
    {msg && <Alert alerta={alerta}/>}
      <div className='mb-5'>
        <label className='text-gray-700 uppercase font-bold text-sm'>
         Nombre del Proyecto:
        </label>
        <input
        id='nombre'
        type='text'
        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
        placeholder='Nombre del proyecto'
        value={nombre}
        onChange={(e)=>setNombre(e.target.value)}

        />
      </div>

      <div className='mb-5'>
        <label className='text-gray-700 uppercase font-bold text-sm'>
         Descripcion:
        </label>
        <textarea
        id='descripcion'
        type='text'
        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
        placeholder='Descripcion del proyecto'
        value={descripcion}
        onChange={(e)=>setDescripcion(e.target.value)}

        />
      </div>

      <div className='mb-5'>
        <label className='text-gray-700 uppercase font-bold text-sm'>
         Fecha Entrega:
        </label>
        <input
        id='fecha-entrega'
        type='date'
        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
        value={fechaEntrega}
        onChange={(e)=>setFechaEntrega(e.target.value)}

        />
      </div>

      <div className='mb-5'>
        <label className='text-gray-700 uppercase font-bold text-sm'>
         Nombre del Cliente:
        </label>
        <input
        id='cliente'
        type='text'
        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
        placeholder='Nombre del cliente'
        value={cliente}
        onChange={(e)=>setCliente(e.target.value)}

        />
      </div>

      <input type='submit' value={id?'Edit Project':'Create project'} className='p-2 bg-sky-600 w-full text-white uppercase font-bold rounded-lg cursor-pointer
      hover:bg-sky-700 transition-colors'/>
    </form>
  )
}

export default FormularioProyecto